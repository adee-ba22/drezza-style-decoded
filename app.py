import os
import json
from flask import Flask, request, jsonify, render_template, session, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db, init_db
from seed_data import seed
from services.storage_service import save_uploaded_file
from services.color_analysis import get_color_profile, PALETTES
from services.body_analysis import get_body_profile, BODY_CATEGORIES, resolve_category_key
from services.personalization import sanitize_preferences, parse_free_text_rules, DEFAULT_PREFERENCES
from services.recommendation_engine import synthesize_style_profile, answer_what_should_i_wear
from services.shopping import get_personalized_recommendations

app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = os.environ.get('SECRET_KEY', 'drezza_fashion_ai_super_secret_key_2026')
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Helper: parse json fields safely
def parse_json(val, default=None):
    if default is None:
        default = []
    if not val:
        return default
    if isinstance(val, (list, dict)):
        return val
    try:
        return json.loads(val)
    except:
        return default

def get_current_user_id():
    return session.get('user_id', 1)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# ==========================================
# 1. USER & COMPLETE PROFILE SYNTHESIS
# ==========================================

@app.route('/api/profile/full', methods=['GET'])
def get_full_profile():
    user_id = get_current_user_id()
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, email, created_at FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    if not user:
        conn.close()
        return jsonify({"authenticated": False, "error": "User session not found"}), 401

    # 1. Color Profile
    cursor.execute("SELECT * FROM color_profiles WHERE user_id = ?", (user_id,))
    raw_color = cursor.fetchone()
    color_profile = None
    if raw_color:
        color_profile = {
            'palette_name': raw_color['palette_name'],
            'description': raw_color['description'],
            'undertone': raw_color['undertone'],
            'contrast_level': raw_color['contrast_level'],
            'primary_colors': parse_json(raw_color['primary_colors']),
            'supporting_colors': parse_json(raw_color['supporting_colors']),
            'accent_colors': parse_json(raw_color['accent_colors']),
            'complement_notes': raw_color['complement_notes'],
            'combinations': parse_json(raw_color['combinations_json']),
            'image_url': raw_color['image_url'],
            'updated_at': raw_color['updated_at']
        }

    # 2. Body Profile
    cursor.execute("SELECT * FROM body_profiles WHERE user_id = ?", (user_id,))
    raw_body = cursor.fetchone()
    body_profile = None
    if raw_body:
        body_profile = {
            'body_category': raw_body['body_category'],
            'description': raw_body['description'],
            'recommended_silhouettes': parse_json(raw_body['recommended_silhouettes']),
            'clothing_cuts': parse_json(raw_body['clothing_cuts']),
            'styling_suggestions': parse_json(raw_body['styling_suggestions']),
            'outfit_directions': parse_json(raw_body['outfit_directions']),
            'image_url': raw_body['image_url'],
            'disclaimer': raw_body['disclaimer'],
            'updated_at': raw_body['updated_at']
        }

    # 3. Personal Preferences
    cursor.execute("SELECT * FROM personal_preferences WHERE user_id = ?", (user_id,))
    raw_prefs = cursor.fetchone()
    preferences = None
    if raw_prefs:
        preferences = {
            'styles': parse_json(raw_prefs['styles']),
            'favourite_colours': parse_json(raw_prefs['favourite_colours']),
            'avoided_colours': parse_json(raw_prefs['avoided_colours']),
            'fit_preference': raw_prefs['fit_preference'],
            'sleeves_preference': raw_prefs['sleeves_preference'],
            'comfort_preference': raw_prefs['comfort_preference'],
            'footwear_preference': raw_prefs['footwear_preference'],
            'aesthetic_type': raw_prefs['aesthetic_type'],
            'occasion_preferences': parse_json(raw_prefs['occasion_preferences']),
            'free_text_notes': raw_prefs['free_text_notes'],
            'rules': parse_free_text_rules(
                raw_prefs['free_text_notes'], 
                raw_prefs['sleeves_preference'], 
                raw_prefs['fit_preference'], 
                raw_prefs['footwear_preference']
            ),
            'updated_at': raw_prefs['updated_at']
        }

    # 4. Wardrobe Items
    cursor.execute("SELECT * FROM wardrobe_items WHERE user_id = ? ORDER BY id DESC", (user_id,))
    wardrobe_items = cursor.fetchall() or []

    # 5. Connected Synthesis
    synthesis = synthesize_style_profile(color_profile, body_profile, preferences, wardrobe_items)
    daily_look = answer_what_should_i_wear(color_profile, body_profile, preferences, wardrobe_items)

    conn.close()

    return jsonify({
        'authenticated': True,
        'user': user,
        'color_profile': color_profile,
        'body_profile': body_profile,
        'preferences': preferences,
        'wardrobe_count': len(wardrobe_items),
        'synthesis': synthesis,
        'daily_look': daily_look
    })

# ==========================================
# 2. FEATURE 1: COLOUR ANALYSIS API
# ==========================================

@app.route('/api/color-analysis/palettes', methods=['GET'])
def get_available_palettes():
    return jsonify({k: v['name'] for k, v in PALETTES.items()})

@app.route('/api/color-analysis/analyze', methods=['POST'])
def analyze_color():
    user_id = get_current_user_id()
    palette_key = request.form.get('palette_key')
    image_file = request.files.get('image')
    image_url = request.form.get('image_url')
    
    local_image_path = None
    if image_file:
        saved_path = save_uploaded_file(image_file, UPLOAD_FOLDER)
        if saved_path:
            image_url = saved_path
            local_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(saved_path))
    elif image_url and image_url.startswith('/uploads/'):
        local_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(image_url))

    # Analyze or generate profile
    profile = get_color_profile(palette_key or 'Warm Autumn', local_image_path)
    if image_url:
        profile['image_url'] = image_url

    # Persist in database
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO color_profiles
        (user_id, palette_name, description, undertone, contrast_level, primary_colors, supporting_colors, accent_colors, complement_notes, combinations_json, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        profile['palette_name'],
        profile['description'],
        profile['undertone'],
        profile['contrast_level'],
        json.dumps(profile['primary_colors']),
        json.dumps(profile['supporting_colors']),
        json.dumps(profile['accent_colors']),
        profile['complement_notes'],
        json.dumps(profile['combinations']),
        profile['image_url']
    ))
    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'message': f"Analysis updated for your new photo: {profile['palette_name']}",
        'profile': profile
    })

@app.route('/api/color-analysis/reset', methods=['POST'])
def reset_color_profile():
    user_id = get_current_user_id()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM color_profiles WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Colour analysis reset to empty state.'})

# ==========================================
# 3. FEATURE 2: BODY THEORY & ANALYSIS API
# ==========================================

@app.route('/api/body-analysis/categories', methods=['GET'])
def get_body_categories():
    return jsonify(list(BODY_CATEGORIES.keys()))

@app.route('/api/body-analysis/analyze', methods=['POST'])
def analyze_body():
    user_id = get_current_user_id()
    category_hint = request.form.get('category_hint')
    image_file = request.files.get('image')
    image_url = request.form.get('image_url')
    local_image_path = None

    if image_file:
        saved_path = save_uploaded_file(image_file, UPLOAD_FOLDER)
        if saved_path:
            image_url = saved_path
            local_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(saved_path))
    elif image_url and image_url.startswith('/uploads/'):
        local_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(image_url))

    profile = get_body_profile(category_hint or 'Balanced Hourglass', local_image_path, category_hint)
    if image_url:
        profile['image_url'] = image_url

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO body_profiles
        (user_id, body_category, description, recommended_silhouettes, clothing_cuts, styling_suggestions, outfit_directions, image_url, disclaimer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        profile['body_category'],
        profile['description'],
        json.dumps(profile['recommended_silhouettes']),
        json.dumps(profile['clothing_cuts']),
        json.dumps(profile['styling_suggestions']),
        json.dumps(profile['outfit_directions']),
        profile['image_url'],
        profile['disclaimer']
    ))
    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'message': f"Body styling profile decoded: {profile['body_category']}",
        'profile': profile
    })

@app.route('/api/body-analysis/reset', methods=['POST'])
def reset_body_profile():
    user_id = get_current_user_id()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM body_profiles WHERE user_id = ?", (user_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Body analysis reset to empty state.'})

# ==========================================
# 4. FEATURE 3: PERSONAL CHOICES API
# ==========================================

@app.route('/api/preferences/save', methods=['POST'])
def save_preferences():
    user_id = get_current_user_id()
    data = request.json or {}
    sanitized = sanitize_preferences(data)

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO personal_preferences
        (user_id, styles, favourite_colours, avoided_colours, fit_preference, sleeves_preference, comfort_preference, footwear_preference, aesthetic_type, occasion_preferences, free_text_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        json.dumps(sanitized['styles']),
        json.dumps(sanitized['favourite_colours']),
        json.dumps(sanitized['avoided_colours']),
        sanitized['fit_preference'],
        sanitized['sleeves_preference'],
        sanitized['comfort_preference'],
        sanitized['footwear_preference'],
        sanitized['aesthetic_type'],
        json.dumps(sanitized['occasion_preferences']),
        sanitized['free_text_notes']
    ))
    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'message': 'Personal style preferences updated.',
        'preferences': sanitized
    })

@app.route('/api/preferences/reset', methods=['POST'])
def reset_preferences():
    user_id = get_current_user_id()
    sanitized = sanitize_preferences(dict(DEFAULT_PREFERENCES))
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO personal_preferences
        (user_id, styles, favourite_colours, avoided_colours, fit_preference, sleeves_preference, comfort_preference, footwear_preference, aesthetic_type, occasion_preferences, free_text_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        json.dumps(sanitized['styles']),
        json.dumps(sanitized['favourite_colours']),
        json.dumps(sanitized['avoided_colours']),
        sanitized['fit_preference'],
        sanitized['sleeves_preference'],
        sanitized['comfort_preference'],
        sanitized['footwear_preference'],
        sanitized['aesthetic_type'],
        json.dumps(sanitized['occasion_preferences']),
        sanitized['free_text_notes']
    ))
    conn.commit()
    conn.close()
    return jsonify({
        'success': True,
        'message': 'Preferences restored to default curated values.',
        'preferences': sanitized
    })

# ==========================================
# 5. FEATURE 4: DIGITAL WARDROBE API
# ==========================================

@app.route('/api/wardrobe', methods=['GET'])
def get_wardrobe():
    user_id = get_current_user_id()
    category = request.args.get('category')
    search = request.args.get('search', '').strip().lower()
    occasion = request.args.get('occasion')
    season = request.args.get('season')

    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT * FROM wardrobe_items WHERE user_id = ?"
    params = [user_id]

    if category and category.upper() != 'ALL':
        query += " AND UPPER(category) = ?"
        params.append(category.upper().strip())

    if occasion and occasion.upper() != 'ALL':
        query += " AND UPPER(occasion) = ?"
        params.append(occasion.upper().strip())

    if season and season.upper() != 'ALL':
        query += " AND (UPPER(season) = ? OR UPPER(season) = 'ALL-SEASON')"
        params.append(season.upper().strip())

    query += " ORDER BY id DESC"
    cursor.execute(query, params)
    items = cursor.fetchall() or []

    if search:
        items = [
            it for it in items
            if search in it['name'].lower()
            or search in (it.get('subcategory') or '').lower()
            or search in (it.get('color') or '').lower()
            or search in (it.get('fabric') or '').lower()
            or search in (it.get('style') or '').lower()
        ]

    conn.close()
    return jsonify({'items': items, 'total': len(items)})

@app.route('/api/wardrobe/add', methods=['POST'])
def add_wardrobe_item():
    user_id = get_current_user_id()
    name = request.form.get('name', '').strip()
    category = request.form.get('category', 'TOPS').strip().upper()
    subcategory = request.form.get('subcategory', 'Tops').strip()
    color = request.form.get('color', 'Cream').strip()
    size = request.form.get('size', 'M').strip()
    fabric = request.form.get('fabric', 'Cotton').strip()
    pattern = request.form.get('pattern', 'Solid').strip()
    fit = request.form.get('fit', 'Regular').strip()
    style = request.form.get('style', 'Minimal').strip()
    occasion = request.form.get('occasion', 'Everyday').strip()
    season = request.form.get('season', 'All-Season').strip()
    notes = request.form.get('notes', '').strip()
    image_url = request.form.get('image_url', '').strip()

    image_file = request.files.get('image')
    if image_file:
        saved_path = save_uploaded_file(image_file, UPLOAD_FOLDER)
        if saved_path:
            image_url = saved_path

    if not name:
        return jsonify({'error': 'Item name is required'}), 400
    if not image_url:
        image_url = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80'

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO wardrobe_items
        (user_id, name, category, subcategory, color, size, fabric, pattern, fit, style, occasion, season, notes, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (user_id, name, category, subcategory, color, size, fabric, pattern, fit, style, occasion, season, notes, image_url))
    new_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'message': f"Added '{name}' to your digital wardrobe.", 'item_id': new_id})

@app.route('/api/wardrobe/edit/<int:item_id>', methods=['POST', 'PUT'])
def edit_wardrobe_item(item_id):
    user_id = get_current_user_id()
    data = request.form if request.form else (request.json or {})

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM wardrobe_items WHERE id = ? AND user_id = ?", (item_id, user_id))
    if not cursor.fetchone():
        conn.close()
        return jsonify({'error': 'Item not found'}), 404

    image_url = data.get('image_url')
    image_file = request.files.get('image') if request.files else None
    if image_file:
        saved_path = save_uploaded_file(image_file, UPLOAD_FOLDER)
        if saved_path:
            image_url = saved_path

    fields = ['name', 'category', 'subcategory', 'color', 'size', 'fabric', 'pattern', 'fit', 'style', 'occasion', 'season', 'notes']
    updates = []
    params = []
    for f in fields:
        if f in data:
            val = data[f]
            if f == 'category' and isinstance(val, str):
                val = val.strip().upper()
            updates.append(f"{f} = ?")
            params.append(val)

    if image_url:
        updates.append("image_url = ?")
        params.append(image_url)

    if updates:
        params.extend([item_id, user_id])
        cursor.execute(f"UPDATE wardrobe_items SET {', '.join(updates)} WHERE id = ? AND user_id = ?", params)
        conn.commit()

    conn.close()
    return jsonify({'success': True, 'message': 'Wardrobe item updated.'})

@app.route('/api/wardrobe/delete/<int:item_id>', methods=['DELETE', 'POST'])
def delete_wardrobe_item(item_id):
    user_id = get_current_user_id()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM wardrobe_items WHERE id = ? AND user_id = ?", (item_id, user_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Item removed from wardrobe.'})

@app.route('/api/wardrobe/reset-starter', methods=['POST'])
def reset_starter_wardrobe():
    seed()
    return jsonify({'success': True, 'message': 'Wardrobe restored to curated starter collection.'})

# ==========================================
# 6. FEATURE 5: PERSONALIZED LINKS / SHOPPING API
# ==========================================

@app.route('/api/shopping', methods=['GET'])
def get_shopping_links():
    user_id = get_current_user_id()
    query_text = request.args.get('query', '').strip()
    occasion_filter = request.args.get('occasion', '').strip()

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM color_profiles WHERE user_id = ?", (user_id,))
    raw_color = cursor.fetchone()
    color_profile = None
    if raw_color:
        color_profile = {
            'palette_name': raw_color['palette_name'],
            'primary_colors': parse_json(raw_color['primary_colors'])
        }

    cursor.execute("SELECT * FROM body_profiles WHERE user_id = ?", (user_id,))
    raw_body = cursor.fetchone()
    body_profile = None
    if raw_body:
        body_profile = {
            'body_category': raw_body['body_category'],
            'clothing_cuts': parse_json(raw_body['clothing_cuts'])
        }

    cursor.execute("SELECT * FROM personal_preferences WHERE user_id = ?", (user_id,))
    raw_prefs = cursor.fetchone()
    preferences = None
    if raw_prefs:
        preferences = {
            'styles': parse_json(raw_prefs['styles']),
            'favourite_colours': parse_json(raw_prefs['favourite_colours']),
            'avoided_colours': parse_json(raw_prefs['avoided_colours']),
            'fit_preference': raw_prefs['fit_preference'],
            'sleeves_preference': raw_prefs['sleeves_preference'],
            'rules': parse_free_text_rules(
                raw_prefs['free_text_notes'],
                raw_prefs['sleeves_preference'],
                raw_prefs['fit_preference'],
                raw_prefs['footwear_preference']
            )
        }

    cursor.execute("SELECT category FROM wardrobe_items WHERE user_id = ?", (user_id,))
    wardrobe_items = cursor.fetchall() or []

    cursor.execute("SELECT * FROM shopping_products WHERE in_stock = 1")
    raw_products = cursor.fetchall() or []
    products = []
    for p in raw_products:
        prod = dict(p)
        prod['style_tags'] = parse_json(prod.get('style_tags'))
        prod['compatible_palettes'] = parse_json(prod.get('compatible_palettes'))
        prod['compatible_silhouettes'] = parse_json(prod.get('compatible_silhouettes'))
        prod['suitable_occasions'] = parse_json(prod.get('suitable_occasions'))
        products.append(prod)

    conn.close()

    personalized_results = get_personalized_recommendations(
        products, color_profile, body_profile, preferences, wardrobe_items, query_text, occasion_filter
    )

    return jsonify({
        'query': query_text,
        'occasion': occasion_filter,
        'results': personalized_results,
        'total': len(personalized_results)
    })

# ==========================================
# 7. "WHAT SHOULD I WEAR?" RECOMMENDATION API
# ==========================================

@app.route('/api/recommendations/what-to-wear', methods=['POST'])
def get_outfit_recommendation():
    user_id = get_current_user_id()
    data = request.json or {}
    occasion = data.get('occasion', 'Everyday Casual')
    prompt = data.get('prompt', '')

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM color_profiles WHERE user_id = ?", (user_id,))
    raw_color = cursor.fetchone()
    color_profile = {'palette_name': raw_color['palette_name']} if raw_color else None

    cursor.execute("SELECT * FROM body_profiles WHERE user_id = ?", (user_id,))
    raw_body = cursor.fetchone()
    body_profile = {'body_category': raw_body['body_category'], 'recommended_silhouettes': parse_json(raw_body['recommended_silhouettes']) if raw_body else []} if raw_body else None

    cursor.execute("SELECT * FROM personal_preferences WHERE user_id = ?", (user_id,))
    raw_prefs = cursor.fetchone()
    preferences = {
        'styles': parse_json(raw_prefs['styles']) if raw_prefs else [],
        'fit_preference': raw_prefs['fit_preference'] if raw_prefs else 'Relaxed',
        'rules': parse_free_text_rules(raw_prefs['free_text_notes'], raw_prefs['sleeves_preference'], raw_prefs['fit_preference'], raw_prefs['footwear_preference']) if raw_prefs else {}
    }

    cursor.execute("SELECT * FROM wardrobe_items WHERE user_id = ?", (user_id,))
    wardrobe_items = cursor.fetchall() or []
    conn.close()

    recommendation = answer_what_should_i_wear(color_profile, body_profile, preferences, wardrobe_items, occasion, prompt)

    return jsonify(recommendation)

# ==========================================
# 8. AUTH & SESSION SWITCHING
# ==========================================

@app.route('/api/auth/demo-switch', methods=['POST'])
def switch_to_demo():
    session['user_id'] = 1
    return jsonify({'success': True, 'message': 'Switched to Sophia Vance demo profile.'})

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out.'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Drezza — Style Decoded server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)

import json
from werkzeug.security import generate_password_hash
from database import get_db, init_db
from services.color_analysis import get_color_profile
from services.body_analysis import get_body_profile
from services.personalization import sanitize_preferences

def seed():
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    # 1. Create Demo User: Sophia Vance
    cursor.execute("SELECT id FROM users WHERE email = 'sophia.vance@drezza.style'")
    existing_user = cursor.fetchone()

    if not existing_user:
        hashed_pw = generate_password_hash('drezza2026')
        cursor.execute('''
            INSERT INTO users (name, email, password_hash)
            VALUES (?, ?, ?)
        ''', ('Sophia Vance', 'sophia.vance@drezza.style', hashed_pw))
        user_id = cursor.lastrowid
    else:
        user_id = existing_user['id']

    # 2. Seed Color Profile for Sophia
    color_prof = get_color_profile('Warm Autumn')
    cursor.execute('''
        INSERT OR REPLACE INTO color_profiles
        (user_id, palette_name, description, undertone, contrast_level, primary_colors, supporting_colors, accent_colors, complement_notes, combinations_json, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        color_prof['palette_name'],
        color_prof['description'],
        color_prof['undertone'],
        color_prof['contrast_level'],
        json.dumps(color_prof['primary_colors']),
        json.dumps(color_prof['supporting_colors']),
        json.dumps(color_prof['accent_colors']),
        color_prof['complement_notes'],
        json.dumps(color_prof['combinations']),
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    ))

    # 3. Seed Body Profile for Sophia
    body_prof = get_body_profile('Balanced Hourglass')
    cursor.execute('''
        INSERT OR REPLACE INTO body_profiles
        (user_id, body_category, description, recommended_silhouettes, clothing_cuts, styling_suggestions, outfit_directions, image_url, disclaimer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        body_prof['body_category'],
        body_prof['description'],
        json.dumps(body_prof['recommended_silhouettes']),
        json.dumps(body_prof['clothing_cuts']),
        json.dumps(body_prof['styling_suggestions']),
        json.dumps(body_prof['outfit_directions']),
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
        body_prof['disclaimer']
    ))

    # 4. Seed Personal Preferences for Sophia
    prefs = sanitize_preferences({
        'styles': ['Minimal', 'Elegant', 'Indo-Western'],
        'favourite_colours': ['Cashmere Cream', 'Espresso Brown', 'Terracotta', 'Warm Olive', 'Antique Gold'],
        'avoided_colours': ['Neon Yellow', 'Electric Blue', 'Hot Pink'],
        'fit_preference': 'Relaxed',
        'sleeves_preference': 'Prefer Sleeves',
        'comfort_preference': 'Breathable & High Comfort',
        'footwear_preference': 'Flats & Low Block Heels',
        'aesthetic_type': 'Indo-Western Fusion',
        'occasion_preferences': ['Everyday Casual', 'Work & Office', 'Festive Celebrations', 'Dinner & Evenings'],
        'free_text_notes': 'I prefer breathable natural fabrics like linen and silk, and elegant relaxed fits. I do not wear high heels or sleeveless garments.'
    })

    cursor.execute('''
        INSERT OR REPLACE INTO personal_preferences
        (user_id, styles, favourite_colours, avoided_colours, fit_preference, sleeves_preference, comfort_preference, footwear_preference, aesthetic_type, occasion_preferences, free_text_notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        user_id,
        json.dumps(prefs['styles']),
        json.dumps(prefs['favourite_colours']),
        json.dumps(prefs['avoided_colours']),
        prefs['fit_preference'],
        prefs['sleeves_preference'],
        prefs['comfort_preference'],
        prefs['footwear_preference'],
        prefs['aesthetic_type'],
        json.dumps(prefs['occasion_preferences']),
        prefs['free_text_notes']
    ))

    # 5. Seed Starter Digital Wardrobe
    # Clear existing demo items for user to prevent duplicate stacking
    cursor.execute("DELETE FROM wardrobe_items WHERE user_id = ?", (user_id,))
    
    starter_wardrobe = [
        {
            'name': 'Fluid Silk Wrap Blouse',
            'category': 'TOPS',
            'subcategory': 'Blouses',
            'color': 'Cashmere Cream',
            'size': 'S',
            'fabric': '100% Mulberry Silk',
            'pattern': 'Solid',
            'fit': 'Relaxed',
            'style': 'Elegant',
            'occasion': 'Work',
            'season': 'All-Season',
            'notes': 'Graceful drape that nips subtly at waistline with soft bell sleeves.',
            'image_url': 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Oversized Poplin Boyfriend Shirt',
            'category': 'TOPS',
            'subcategory': 'Shirts',
            'color': 'Crisp White',
            'size': 'M',
            'fabric': 'Organic Poplin Cotton',
            'pattern': 'Solid',
            'fit': 'Oversized',
            'style': 'Minimal',
            'occasion': 'Everyday',
            'season': 'Spring',
            'notes': 'Relaxed architectural collar with structured cuffs.',
            'image_url': 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Fine Gauge Cashmere Knit',
            'category': 'TOPS',
            'subcategory': 'Sweaters',
            'color': 'Warm Dune',
            'size': 'S',
            'fabric': 'Grade-A Cashmere',
            'pattern': 'Solid',
            'fit': 'Regular',
            'style': 'Minimal',
            'occasion': 'Everyday',
            'season': 'Autumn',
            'notes': 'Ultra soft ribbed collar and cuffs, pairs beautifully under blazers.',
            'image_url': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'High-Rise Pleated Wool Trousers',
            'category': 'BOTTOMS',
            'subcategory': 'Trousers',
            'color': 'Espresso Brown',
            'size': 'S',
            'fabric': 'Tropical Wool Crepe',
            'pattern': 'Solid',
            'fit': 'Relaxed',
            'style': 'Elegant',
            'occasion': 'Work',
            'season': 'All-Season',
            'notes': 'Double front pleats that elongate the leg line beautifully.',
            'image_url': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Wide-Leg Washed Linen Pants',
            'category': 'BOTTOMS',
            'subcategory': 'Trousers',
            'color': 'Oatmeal Beige',
            'size': 'M',
            'fabric': '100% Belgian Linen',
            'pattern': 'Solid',
            'fit': 'Oversized',
            'style': 'Casual',
            'occasion': 'Vacation',
            'season': 'Summer',
            'notes': 'Airy and breathable with elasticated drawstring waist.',
            'image_url': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Vintage Straight Selvedge Jeans',
            'category': 'BOTTOMS',
            'subcategory': 'Jeans',
            'color': 'Deep Indigo',
            'size': 'S',
            'fabric': 'Non-Stretch Denim',
            'pattern': 'Solid',
            'fit': 'Regular',
            'style': 'Casual',
            'occasion': 'Everyday',
            'season': 'All-Season',
            'notes': 'Classic high-rise silhouette with clean hem.',
            'image_url': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Bias-Cut Silk Slip Midi Dress',
            'category': 'DRESSES',
            'subcategory': 'Midi',
            'color': 'Terracotta Ochre',
            'size': 'S',
            'fabric': 'Silk Charmeuse',
            'pattern': 'Solid',
            'fit': 'Regular',
            'style': 'Elegant',
            'occasion': 'Evening',
            'season': 'Summer',
            'notes': 'Fluid drape skims curves; styled with lightweight linen blazer for sleeve coverage.',
            'image_url': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Embroidered Chanderi Kurti Set',
            'category': 'INDIAN / ETHNIC',
            'subcategory': 'Kurti',
            'color': 'Burnt Rust',
            'size': 'S',
            'fabric': 'Chanderi Silk Cotton',
            'pattern': 'Embroidered',
            'fit': 'Relaxed',
            'style': 'Indo-Western',
            'occasion': 'Festive',
            'season': 'All-Season',
            'notes': 'Intricate zari neckline with 3/4 sleeves and matching relaxed straight pants.',
            'image_url': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Handwoven Mulberry Silk Saree',
            'category': 'INDIAN / ETHNIC',
            'subcategory': 'Saree',
            'color': 'Antique Gold',
            'size': 'Free Size',
            'fabric': 'Pure Silk',
            'pattern': 'Floral',
            'fit': 'Relaxed',
            'style': 'Traditional',
            'occasion': 'Festive',
            'season': 'All-Season',
            'notes': 'Heirloom weave with rich borders, paired with elbow-length sleeve blouse.',
            'image_url': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Structured Wool-Blend Camel Blazer',
            'category': 'OUTERWEAR',
            'subcategory': 'Blazer',
            'color': 'Dune Camel',
            'size': 'S',
            'fabric': 'Wool & Silk Blend',
            'pattern': 'Solid',
            'fit': 'Relaxed',
            'style': 'Minimal',
            'occasion': 'Work',
            'season': 'Autumn',
            'notes': 'Clean horn buttons, softly padded shoulders to harmonize hourglass balance.',
            'image_url': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Artisanal Gilded Leather Juttis',
            'category': 'FOOTWEAR',
            'subcategory': 'Juttis / Mojaris',
            'color': 'Antique Gold',
            'size': 'M',
            'fabric': 'Handcrafted Leather',
            'pattern': 'Embroidered',
            'fit': 'Regular',
            'style': 'Indo-Western',
            'occasion': 'Festive',
            'season': 'All-Season',
            'notes': 'Double-cushioned memory foam insole for all-day comfort without heels.',
            'image_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Pointed Leather Slingback Flats',
            'category': 'FOOTWEAR',
            'subcategory': 'Flats',
            'color': 'Espresso Brown',
            'size': 'S',
            'fabric': 'Supple Calf Leather',
            'pattern': 'Solid',
            'fit': 'Regular',
            'style': 'Elegant',
            'occasion': 'Work',
            'season': 'All-Season',
            'notes': 'Chic pointed toe elongates the leg while remaining completely flat.',
            'image_url': 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80'
        },
        {
            'name': 'Sculptural Leather Shoulder Bag',
            'category': 'ACCESSORIES',
            'subcategory': 'Bags',
            'color': 'Cognac Tan',
            'size': 'Free Size',
            'fabric': 'Italian Full-Grain Leather',
            'pattern': 'Solid',
            'fit': 'Regular',
            'style': 'Minimal',
            'occasion': 'Everyday',
            'season': 'All-Season',
            'notes': 'Sleek curved geometry with understated brushed brass accents.',
            'image_url': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
        }
    ]

    for item in starter_wardrobe:
        cursor.execute('''
            INSERT INTO wardrobe_items
            (user_id, name, category, subcategory, color, size, fabric, pattern, fit, style, occasion, season, notes, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            user_id, item['name'], item['category'], item['subcategory'], item['color'],
            item['size'], item['fabric'], item['pattern'], item['fit'], item['style'],
            item['occasion'], item['season'], item['notes'], item['image_url']
        ))

    # 6. Seed Curated Shopping Catalog (Personalized Links)
    cursor.execute("DELETE FROM shopping_products")
    
    catalog = [
        {
            'name': 'Draped Georgette Evening Gown with Capelet Sleeves',
            'brand': 'Atelier Solène',
            'category': 'DRESSES',
            'subcategory': 'Formal',
            'price': 285.00,
            'image_url': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
            'product_url': 'https://example.com/drezza/atelier-solene-gown',
            'delivery_info': 'Express 2-Day Delivery (Complimentary Styling Box)',
            'style_tags': json.dumps(['Party', 'Formal', 'Elegant']),
            'color': 'Terracotta Ochre',
            'compatible_palettes': json.dumps(['Warm Autumn', 'Muted Earth']),
            'compatible_silhouettes': json.dumps(['Balanced Hourglass', 'Pear / Triangle', 'All']),
            'suitable_occasions': json.dumps(['Party', 'Evening', 'Celebrations']),
            'fit': 'Relaxed',
            'sleeves_type': 'Capelet Draped Sleeves',
            'reasoning_template': 'Direct response for evening party: matches your Warm Autumn palette, provides elegant draped sleeve coverage, and flatters balanced silhouette proportions.'
        },
        {
            'name': 'Chanderi Silk Tiered Anarkali with Embroidered Dupatta',
            'brand': 'Raw Mango Heritage',
            'category': 'INDIAN / ETHNIC',
            'subcategory': 'Anarkali',
            'price': 240.00,
            'image_url': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
            'product_url': 'https://example.com/drezza/chanderi-anarkali',
            'delivery_info': 'Ships within 24 Hours • Free Alteration Card',
            'style_tags': json.dumps(['Traditional', 'Indo-Western', 'Festive']),
            'color': 'Antique Gold & Forest Olive',
            'compatible_palettes': json.dumps(['Warm Autumn', 'Deep Winter', 'Light Spring']),
            'compatible_silhouettes': json.dumps(['Balanced Hourglass', 'Soft Column', 'Pear / Triangle']),
            'suitable_occasions': json.dumps(['Festive', 'Wedding Guest', 'Celebrations']),
            'fit': 'Relaxed',
            'sleeves_type': '3/4 Elegant Sleeves',
            'reasoning_template': 'Curated for your Indo-Western preference: artisanal handloom silk in gold and olive with modest 3/4 sleeves.'
        },
        {
            'name': 'Double-Faced Wool Belted Duster Trench',
            'brand': 'Totême Studio',
            'category': 'OUTERWEAR',
            'subcategory': 'Coat',
            'price': 420.00,
            'image_url': 'https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=600&q=80',
            'product_url': 'https://example.com/drezza/toteme-duster',
            'delivery_info': 'Standard Express 2-3 Days',
            'style_tags': json.dumps(['Minimal', 'Elegant', 'Work']),
            'color': 'Dune Camel',
            'compatible_palettes': json.dumps(['Warm Autumn', 'Muted Earth', 'Light Spring']),
            'compatible_silhouettes': json.dumps(['Balanced Hourglass', 'Soft Column']),
            'suitable_occasions': json.dumps(['Work', 'Everyday', 'Travel']),
            'fit': 'Relaxed',
            'sleeves_type': 'Long Sleeves',
            'reasoning_template': 'Fills a key wardrobe gap: an investment layering piece that ties effortlessly over both Western and Indo-Western outfits.'
        },
        {
            'name': 'Handcrafted Gilded Velvet Mojaris with Memory Soles',
            'brand': 'Needledust Atelier',
            'category': 'FOOTWEAR',
            'subcategory': 'Juttis / Mojaris',
            'price': 95.00,
            'image_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
            'product_url': 'https://example.com/drezza/gilded-mojaris',
            'delivery_info': 'In Stock • Dispatches Same Day',
            'style_tags': json.dumps(['Indo-Western', 'Festive', 'Comfort']),
            'color': 'Antique Gold',
            'compatible_palettes': json.dumps(['Warm Autumn', 'Light Spring', 'Muted Earth']),
            'compatible_silhouettes': json.dumps(['All']),
            'suitable_occasions': json.dumps(['Festive', 'Party', 'Everyday']),
            'fit': 'Regular',
            'sleeves_type': 'N/A',
            'reasoning_template': 'Perfect flat footwear match: zero heel strain with artisanal zari embroidery that elevates simple outfits.'
        },
        {
            'name': 'Fluid Wide-Leg Pleated Crepe Palazzos',
            'brand': 'The Row Essentials',
            'category': 'BOTTOMS',
            'subcategory': 'Trousers',
            'price': 180.00,
            'image_url': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
            'product_url': 'https://example.com/drezza/crepe-palazzos',
            'delivery_info': 'Express Delivery in 48 Hours',
            'style_tags': json.dumps(['Minimal', 'Casual', 'Elegant']),
            'color': 'Cashmere Cream',
            'compatible_palettes': json.dumps(['Warm Autumn', 'Light Spring', 'Cool Summer']),
            'compatible_silhouettes': json.dumps(['Balanced Hourglass', 'Athletic / Inverted Triangle', 'Soft Column']),
            'suitable_occasions': json.dumps(['Work', 'Everyday', 'Vacation']),
            'fit': 'Relaxed',
            'sleeves_type': 'N/A',
            'reasoning_template': 'Pairs directly with your Silk Wrap Blouse and knitwear in wardrobe; fluid crepe creates an elongating column.'
        },
        {
            'name': 'Sculptural Brushed Brass Ear Cuff & Drops',
            'brand': 'Khaite Fine Jewelry',
            'category': 'ACCESSORIES',
            'subcategory': 'Jewellery',
            'price': 110.00,
            'image_url': 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
            'product_url': 'https://example.com/drezza/brass-ear-drops',
            'delivery_info': 'Signature Gift Packaging Included',
            'style_tags': json.dumps(['Minimal', 'Party', 'Elegant']),
            'color': 'Antique Gold',
            'compatible_palettes': json.dumps(['Warm Autumn', 'Light Spring', 'Muted Earth']),
            'compatible_silhouettes': json.dumps(['All']),
            'suitable_occasions': json.dumps(['Party', 'Evening', 'Work']),
            'fit': 'Free Size',
            'sleeves_type': 'N/A',
            'reasoning_template': 'An architectural gold accent that brings Warm Autumn warmth to both minimal casual and evening party looks.'
        }
    ]

    for prod in catalog:
        cursor.execute('''
            INSERT INTO shopping_products
            (name, brand, category, subcategory, price, image_url, product_url, delivery_info, style_tags, color, compatible_palettes, compatible_silhouettes, suitable_occasions, fit, sleeves_type, reasoning_template)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            prod['name'], prod['brand'], prod['category'], prod['subcategory'], prod['price'],
            prod['image_url'], prod['product_url'], prod['delivery_info'], prod['style_tags'],
            prod['color'], prod['compatible_palettes'], prod['compatible_silhouettes'],
            prod['suitable_occasions'], prod['fit'], prod['sleeves_type'], prod['reasoning_template']
        ))

    conn.commit()
    conn.close()
    print("Database seeded with luxury starter profile, wardrobe, and shopping links.")

if __name__ == '__main__':
    seed()

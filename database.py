import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'drezza.db')

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_db():
    conn = sqlite3.connect(DB_PATH, timeout=20.0)
    conn.row_factory = dict_factory
    conn.execute("PRAGMA foreign_keys = ON;")
    conn.execute("PRAGMA journal_mode = WAL;")
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # 1. Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ''')

    # 2. Color Profiles table (Feature 1: Colour Analysis)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS color_profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE NOT NULL,
            palette_name TEXT NOT NULL,
            description TEXT,
            undertone TEXT,
            contrast_level TEXT,
            primary_colors TEXT NOT NULL, -- JSON array of {name, hex, role}
            supporting_colors TEXT NOT NULL, -- JSON array of {name, hex, role}
            accent_colors TEXT NOT NULL, -- JSON array of {name, hex, role}
            complement_notes TEXT,
            combinations_json TEXT, -- JSON array of outfit color pairings
            image_url TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
    ''')

    # 3. Body Profiles table (Feature 2: Body Theory / Body Analysis)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS body_profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE NOT NULL,
            body_category TEXT NOT NULL,
            description TEXT,
            recommended_silhouettes TEXT NOT NULL, -- JSON array
            clothing_cuts TEXT NOT NULL, -- JSON array
            styling_suggestions TEXT NOT NULL, -- JSON array
            outfit_directions TEXT NOT NULL, -- JSON array of {title, description, pieces}
            image_url TEXT,
            disclaimer TEXT DEFAULT 'Styling intelligence for clothing cuts and silhouettes; not health or medical advice.',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
    ''')

    # 4. Personal Preferences table (Feature 3: Personal Choices)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS personal_preferences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE NOT NULL,
            styles TEXT NOT NULL, -- JSON array: Minimal, Casual, Elegant, Streetwear, Traditional, Indo-Western, Formal, Party, Trendy, Other
            favourite_colours TEXT NOT NULL, -- JSON array
            avoided_colours TEXT NOT NULL, -- JSON array
            fit_preference TEXT NOT NULL, -- Oversized, Relaxed, Regular, Fitted
            sleeves_preference TEXT DEFAULT 'Flexible', -- Prefer Sleeves, Sleeveless OK, Long Sleeves
            comfort_preference TEXT DEFAULT 'High Comfort', -- Ultra Comfortable, Balanced, Structured
            footwear_preference TEXT DEFAULT 'Flats & Low Heels', -- Flats, Low Heels, High Heels, Juttis/Mojaris, Sneakers
            aesthetic_type TEXT DEFAULT 'Mix & Match / Indo-Western', -- Western, Indian/Ethnic, Indo-Western
            occasion_preferences TEXT DEFAULT '[]', -- JSON array
            free_text_notes TEXT, -- Free-form style notes
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
    ''')

    # 5. Wardrobe Items table (Feature 4: Online Digital Wardrobe)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS wardrobe_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL, -- TOPS, BOTTOMS, DRESSES, INDIAN / ETHNIC, OUTERWEAR, FOOTWEAR, ACCESSORIES
            subcategory TEXT NOT NULL,
            color TEXT NOT NULL,
            size TEXT NOT NULL, -- XXXS, XXS, XS, S, M, L, XL, XXL, XXXL, Free Size
            fabric TEXT, -- Linen, Silk, Cotton, Cashmere, Wool, Denim, Chiffon, Satin, etc.
            pattern TEXT, -- Solid, Striped, Floral, Plaid, Houndstooth, Embroidered, etc.
            fit TEXT, -- Oversized, Relaxed, Regular, Fitted
            style TEXT, -- Minimal, Casual, Elegant, Streetwear, Traditional, Indo-Western, Formal, Party, Trendy
            occasion TEXT, -- Everyday, Work, Evening, Festive, Vacation
            season TEXT, -- Spring, Summer, Autumn, Winter, All-Season
            notes TEXT,
            image_url TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
    ''')

    # 6. Shopping Products table (Feature 5: Personalized Links / Shopping)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS shopping_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            brand TEXT NOT NULL,
            category TEXT NOT NULL,
            subcategory TEXT NOT NULL,
            price REAL NOT NULL,
            currency TEXT DEFAULT 'USD',
            image_url TEXT NOT NULL,
            product_url TEXT DEFAULT '#',
            delivery_info TEXT DEFAULT 'Standard Express Delivery',
            style_tags TEXT DEFAULT '[]', -- JSON array
            color TEXT NOT NULL,
            compatible_palettes TEXT DEFAULT '[]', -- JSON array of palette names
            compatible_silhouettes TEXT DEFAULT '[]', -- JSON array of body categories
            suitable_occasions TEXT DEFAULT '[]', -- JSON array
            fit TEXT DEFAULT 'Regular',
            sleeves_type TEXT DEFAULT 'Regular Sleeves',
            reasoning_template TEXT,
            in_stock INTEGER DEFAULT 1
        );
    ''')

    # 7. Future Extensibility Tables (Outfits, Recommendations, Saved Looks)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS outfits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            occasion TEXT NOT NULL,
            style TEXT NOT NULL,
            notes TEXT,
            image_url TEXT,
            is_favourite INTEGER DEFAULT 0,
            item_ids TEXT DEFAULT '[]', -- JSON array of wardrobe_item IDs
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recommendations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            occasion TEXT NOT NULL,
            weather TEXT,
            prompt TEXT,
            response_json TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Drezza modular database initialized successfully.")

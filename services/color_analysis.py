import json
import os
import math
from PIL import Image

# Curated Seasonal Palettes adhering to high-fashion color harmony theory
PALETTES = {
    'Warm Autumn': {
        'name': 'Warm Autumn',
        'undertone': 'Warm Golden & Rich Olive',
        'contrast_level': 'Medium to Rich Contrast',
        'description': 'Earthy, rich, and naturally radiant. Your features harmonize with warm, spiced tones that reflect natural autumnal warmth and luxurious texture.',
        'primary': [
            {'name': 'Espresso Brown', 'hex': '#362419', 'role': 'Foundational Neutral'},
            {'name': 'Cashmere Cream', 'hex': '#F2ECE4', 'role': 'Base Light Neutral'},
            {'name': 'Terracotta Ochre', 'hex': '#C26D45', 'role': 'Signature Primary'}
        ],
        'supporting': [
            {'name': 'Warm Olive', 'hex': '#606443', 'role': 'Sophisticated Tailoring'},
            {'name': 'Dune Camel', 'hex': '#B8976C', 'role': 'Transitional Outerwear'},
            {'name': 'Spiced Amber', 'hex': '#D48C46', 'role': 'Knitwear & Layering'}
        ],
        'accent': [
            {'name': 'Burnt Rust', 'hex': '#9B3E2B', 'role': 'High-Impact Statement'},
            {'name': 'Deep Teal', 'hex': '#1E4D4F', 'role': 'Jewel Accent'},
            {'name': 'Antique Gold', 'hex': '#C5A059', 'role': 'Metallic Hardware & Silk'}
        ],
        'complement_notes': 'Warm ochres, rich espresso, and olive greens harmonize with warm skin undertones, enhancing natural radiance without washing out your complexion. Avoid stark bluish whites or electric cool purples.',
        'combinations': [
            {
                'title': 'Monochrome Luxe',
                'description': 'Pair a Cashmere Cream knit with Dune Camel tailored trousers and Antique Gold accessories.',
                'pieces': ['Cashmere Cream Top', 'Dune Camel Trousers', 'Antique Gold Jewelry']
            },
            {
                'title': 'Earthy Contrast',
                'description': 'Contrast deep Espresso Brown high-rise pants with a Burnt Rust silk shirt and a Warm Olive tailored coat.',
                'pieces': ['Burnt Rust Silk Blouse', 'Espresso Tailored Pants', 'Warm Olive Overcoat']
            },
            {
                'title': 'Evening Radiance',
                'description': 'A terracotta draped evening gown paired with deep teal clutch and minimalist bronze sandals.',
                'pieces': ['Terracotta Ochre Dress', 'Deep Teal Bag', 'Bronze Minimalist Strappy Heels']
            }
        ]
    },
    'Cool Summer': {
        'name': 'Cool Summer',
        'undertone': 'Cool Rose & Muted Slate',
        'contrast_level': 'Soft, Delicate Harmony',
        'description': 'Soft, muted, and effortlessly refined. Characterized by powdery undertones, cool slate neutrals, and gentle pastels that offer a tranquil, editorial poise.',
        'primary': [
            {'name': 'French Slate', 'hex': '#4A5568', 'role': 'Foundational Cool Neutral'},
            {'name': 'Pebble White', 'hex': '#F4F5F7', 'role': 'Crisp Soft Light'},
            {'name': 'Muted Rose', 'hex': '#C48B9F', 'role': 'Signature Primary'}
        ],
        'supporting': [
            {'name': 'Powder Blue', 'hex': '#8EAEC4', 'role': 'Tailored Shirting'},
            {'name': 'Sage Smoke', 'hex': '#7A8B7B', 'role': 'Soft Separates'},
            {'name': 'Lavender Grey', 'hex': '#9B94A6', 'role': 'Fine Cashmere'}
        ],
        'accent': [
            {'name': 'Berry Port', 'hex': '#722F43', 'role': 'Evening Accent'},
            {'name': 'Cool Periwinkle', 'hex': '#5E6B9E', 'role': 'Silk & Drapes'},
            {'name': 'Brushed Platinum', 'hex': '#B0B5BD', 'role': 'Metallic Accent'}
        ],
        'complement_notes': 'Cool muted hues bring out clarity and luminosity in cool undertones. Dusty rose and slate blue prevent harsh shadows. Avoid yellowish camel or brassy oranges.',
        'combinations': [
            {
                'title': 'Editorial Serenity',
                'description': 'Muted Rose silk blouse with French Slate wide-leg trousers and brushed platinum jewelry.',
                'pieces': ['Muted Rose Top', 'French Slate Trousers', 'Silver / Platinum Watch']
            },
            {
                'title': 'Cool Monochromatic',
                'description': 'Powder Blue button-down under a Lavender Grey wool blazer with Pebble White denim.',
                'pieces': ['Powder Blue Shirt', 'Lavender Grey Blazer', 'Pebble White Jeans']
            }
        ]
    },
    'Deep Winter': {
        'name': 'Deep Winter',
        'undertone': 'Cool Porcelain, Olive or Deep Rich Ebony',
        'contrast_level': 'High Dramatic Contrast',
        'description': 'Crisp, vivid, and dramatically structured. Thrives on stark contrast, jewel-tone saturation, and immaculate monochrome tailoring.',
        'primary': [
            {'name': 'Obsidian Black', 'hex': '#141416', 'role': 'Anchor Neutral'},
            {'name': 'Pure Optical White', 'hex': '#FFFFFF', 'role': 'High-Contrast Bright'},
            {'name': 'Emerald Forest', 'hex': '#124E3F', 'role': 'Signature Jewel'}
        ],
        'supporting': [
            {'name': 'Royal Cobalt', 'hex': '#1A365D', 'role': 'Structured Outerwear'},
            {'name': 'Charcoal Frost', 'hex': '#2D3748', 'role': 'Suiting & Knits'},
            {'name': 'Icy Silver', 'hex': '#CBD5E0', 'role': 'Silk Accent'}
        ],
        'accent': [
            {'name': 'Crimson Ruby', 'hex': '#991B1B', 'role': 'Power Accent'},
            {'name': 'Deep Amethyst', 'hex': '#581C87', 'role': 'Statement Evening'},
            {'name': 'Mirror Chrome', 'hex': '#E2E8F0', 'role': 'Sharp Metal'}
        ],
        'complement_notes': 'High-contrast beauty demands high-contrast depth. Deep blacks paired with stark whites and jewel emeralds illuminate your presence without getting lost. Avoid warm beige or washed-out muddy tones.',
        'combinations': [
            {
                'title': 'Architectural Contrast',
                'description': 'Pure Optical White silk shirt tucked into Obsidian Black high-waist pants with a sharp Crimson Ruby bag.',
                'pieces': ['White Silk Shirt', 'Obsidian Black Trousers', 'Crimson Ruby Bag']
            },
            {
                'title': 'Jeweled Evening',
                'description': 'Emerald Forest velvet or satin evening dress with Chrome jewelry and black stiletto mules.',
                'pieces': ['Emerald Forest Dress', 'Black Mules', 'Silver Statement Earrings']
            }
        ]
    },
    'Light Spring': {
        'name': 'Light Spring',
        'undertone': 'Warm Peach & Golden Ivory',
        'contrast_level': 'Luminous & Delicate',
        'description': 'Fresh, radiant, and optimistic. Shines brightest in warm, clear, sunlit colors that elevate your natural glow without overpowering your delicate balance.',
        'primary': [
            {'name': 'Golden Sand', 'hex': '#D8C29D', 'role': 'Warm Light Neutral'},
            {'name': 'Ivory Silk', 'hex': '#FAF6EE', 'role': 'Soft Bright Base'},
            {'name': 'Warm Coral', 'hex': '#E06D53', 'role': 'Signature Vibrant'}
        ],
        'supporting': [
            {'name': 'Celadon Sage', 'hex': '#8FA89B', 'role': 'Modern Organic'},
            {'name': 'Apricot Glow', 'hex': '#EBB18C', 'role': 'Soft Separates'},
            {'name': 'Warm Honey', 'hex': '#CFA052', 'role': 'Linen & Leather'}
        ],
        'accent': [
            {'name': 'Poppy Red', 'hex': '#C93B2B', 'role': 'Statement Pop'},
            {'name': 'Turquoise Sea', 'hex': '#319795', 'role': 'Resort Accent'},
            {'name': 'Polished Brass', 'hex': '#D4AF37', 'role': 'Warm Metallic'}
        ],
        'complement_notes': 'Clear, golden-infused hues illuminate your features with natural radiance. Peach and warm ivory lift your complexion. Avoid heavy muddy blacks or cold greys.',
        'combinations': [
            {
                'title': 'Sunlit Tailoring',
                'description': 'Ivory Silk wrap top with Golden Sand pleated trousers and Warm Honey leather belt.',
                'pieces': ['Ivory Silk Blouse', 'Golden Sand Trousers', 'Warm Honey Belt']
            },
            {
                'title': 'Fresh Casual',
                'description': 'Warm Coral linen shirt over Celadon Sage relaxed trousers with woven espadrilles.',
                'pieces': ['Warm Coral Shirt', 'Celadon Sage Pants', 'Woven Leather Sandals']
            }
        ]
    },
    'Muted Earth': {
        'name': 'Muted Earth',
        'undertone': 'Neutral Warm Bronze & Walnut',
        'contrast_level': 'Subtle Organic Tone-on-Tone',
        'description': 'Organic, artisanal, and subtly understated. Ideal for tactile natural textures like raw linen, slub cotton, washed silks, and suede in earthy neutrals.',
        'primary': [
            {'name': 'Raw Linen', 'hex': '#DDD5C7', 'role': 'Natural Neutral'},
            {'name': 'Dark Walnut', 'hex': '#2C1D11', 'role': 'Deep Grounding'},
            {'name': 'Burnished Clay', 'hex': '#A05C44', 'role': 'Signature Earth'}
        ],
        'supporting': [
            {'name': 'Forest Lichen', 'hex': '#58604C', 'role': 'Earthy Outerwear'},
            {'name': 'Dune Sand', 'hex': '#C2B69D', 'role': 'Relaxed Suiting'},
            {'name': 'Warm Taupe', 'hex': '#8C7E72', 'role': 'Fine Knits'}
        ],
        'accent': [
            {'name': 'Spiced Ochre', 'hex': '#C68642', 'role': 'Artisanal Accent'},
            {'name': 'Copper Bronze', 'hex': '#8D4A2B', 'role': 'Leather Goods'},
            {'name': 'Matte Horn', 'hex': '#4A3B32', 'role': 'Buttons & Accents'}
        ],
        'complement_notes': 'Tone-on-tone earth tones create quiet luxury without harsh visual breaks. Perfect for layered styling and natural fiber garments.',
        'combinations': [
            {
                'title': 'Quiet Luxury Layering',
                'description': 'Raw Linen unstructured blazer with Dark Walnut silk cami and Dune Sand linen trousers.',
                'pieces': ['Raw Linen Blazer', 'Dark Walnut Cami', 'Dune Sand Pants']
            }
        ]
    }
}

def rgb_to_hex(r, g, b):
    return f"#{int(r):02x}{int(g):02x}{int(b):02x}".upper()

def analyze_image_colors(image_path):
    """
    Extracts dominant color properties and pixel metrics from an uploaded image.
    Computes warmth, luminance, contrast, and extracts dominant image tones.
    """
    metrics = {
        'palette_key': 'Warm Autumn',
        'warmth': 0.05,
        'brightness': 120.0,
        'contrast': 35.0,
        'extracted_tones': []
    }
    
    if not image_path:
        return metrics

    try:
        # Check if file exists locally
        if not os.path.isabs(image_path) and not os.path.exists(image_path):
            base_name = os.path.basename(image_path)
            upload_candidate = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads', base_name)
            if os.path.exists(upload_candidate):
                image_path = upload_candidate

        if not os.path.exists(image_path):
            return metrics

        im = Image.open(image_path).convert('RGB')
        im.thumbnail((120, 120))
        pixels = list(im.getdata())
        count = len(pixels)
        if count == 0:
            return metrics

        total_r = sum(p[0] for p in pixels)
        total_g = sum(p[1] for p in pixels)
        total_b = sum(p[2] for p in pixels)

        avg_r = total_r / count
        avg_g = total_g / count
        avg_b = total_b / count

        # Warmth ratio: (R - B) / (R + G + B + 1)
        warmth = (avg_r - avg_b) / (avg_r + avg_g + avg_b + 0.1)
        # Perceived brightness (standard ITU-R BT.601)
        brightness = (avg_r * 0.299 + avg_g * 0.587 + avg_b * 0.114)
        # Standard deviation of luminance for contrast
        lum_variance = sum(((p[0]*0.299 + p[1]*0.587 + p[2]*0.114) - brightness)**2 for p in pixels) / count
        contrast = math.sqrt(lum_variance)

        # Quantize to find top dominant tones in the user's photo
        small = im.quantize(colors=4).convert('RGB')
        palette_colors = small.getcolors(maxcolors=120*120)
        if palette_colors:
            palette_colors.sort(key=lambda x: x[0], reverse=True)
            for _, color in palette_colors[:3]:
                metrics['extracted_tones'].append(rgb_to_hex(color[0], color[1], color[2]))

        metrics['warmth'] = round(warmth, 3)
        metrics['brightness'] = round(brightness, 1)
        metrics['contrast'] = round(contrast, 1)

        # Determine seasonal profile deterministically based on image properties
        if brightness < 100 and contrast > 40:
            metrics['palette_key'] = 'Deep Winter'
        elif warmth > 0.08 and brightness > 135:
            metrics['palette_key'] = 'Light Spring'
        elif warmth > 0.03:
            metrics['palette_key'] = 'Warm Autumn'
        elif warmth < -0.02:
            metrics['palette_key'] = 'Cool Summer'
        else:
            metrics['palette_key'] = 'Muted Earth'

    except Exception as e:
        print(f"Error in analyze_image_colors: {e}")

    return metrics

def get_color_profile(palette_key='Warm Autumn', image_path=None):
    """
    Generates a full ColorProfile dictionary customized to the uploaded image.
    """
    extracted_tones = []
    undertone_note = ""

    if image_path:
        metrics = analyze_image_colors(image_path)
        palette_key = metrics['palette_key']
        extracted_tones = metrics.get('extracted_tones', [])
        warmth = metrics.get('warmth', 0.0)
        contrast = metrics.get('contrast', 30.0)
        undertone_note = f" (Warmth Index: {warmth:+.2f}, Contrast: {contrast:.0f})"

    base_palette = PALETTES.get(palette_key, PALETTES['Warm Autumn'])
    
    # Deep copy lists so modifications are safe
    primary = [dict(c) for c in base_palette['primary']]
    supporting = [dict(c) for c in base_palette['supporting']]
    accent = [dict(c) for c in base_palette['accent']]

    # If we extracted actual dominant tones from the photo, personalize the signature primary and statement accent!
    if len(extracted_tones) >= 1:
        primary[2] = {
            'name': f"Decoded Tone ({primary[2]['name']})",
            'hex': extracted_tones[0],
            'role': 'Signature Persona Tone'
        }
    if len(extracted_tones) >= 2:
        accent[0] = {
            'name': f"Photo Accent ({accent[0]['name']})",
            'hex': extracted_tones[1],
            'role': 'High-Impact Harmonic Accent'
        }

    return {
        'palette_name': base_palette['name'],
        'description': base_palette['description'],
        'undertone': base_palette['undertone'] + undertone_note,
        'contrast_level': base_palette['contrast_level'],
        'primary_colors': primary,
        'supporting_colors': supporting,
        'accent_colors': accent,
        'complement_notes': base_palette['complement_notes'],
        'combinations': base_palette['combinations'],
        'image_url': image_path or '',
        'extracted_tones': extracted_tones
    }

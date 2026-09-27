import json
import os
from PIL import Image

BODY_CATEGORIES = {
    'Balanced Hourglass': {
        'category': 'Balanced Hourglass',
        'subtitle': 'Harmonious Proportions & Defined Waist Architecture',
        'description': 'Balanced shoulder and hip proportions with natural waist definition. Styling focuses on accentuating graceful architectural balance without adding unnecessary bulk.',
        'recommended_silhouettes': [
            'Tailored Wrap Silhouettes',
            'High-Rise Pleated Drapery',
            'Belted Trench & Midi Hemlines',
            'Fitted Bodice with Fluid Skirt'
        ],
        'clothing_cuts': [
            'Wrap tops & crossover blouses',
            'V-neck, sweetheart, and scoop necklines',
            'High-waisted wide-leg trousers',
            'Bias-cut satin midi skirts',
            'Tailored single-breasted blazers that nip gently at the waist'
        ],
        'styling_suggestions': [
            'Highlight the waistline with belts or high-rise waists to preserve natural balance.',
            'Opt for fluid fabrics (silk, crepe, fine wool) that drape gently rather than stiff boxy cuts.',
            'Keep hemlines clean and intentional — midi lengths and floor-skimming wide legs elongate your stride.'
        ],
        'outfit_directions': [
            {
                'title': 'The Paris Tailored Look',
                'description': 'Pleated high-waisted wool trousers paired with a fluid silk wrap shirt, structured minimal coat draped over shoulders, and leather pointed loafers.',
                'pieces': ['Silk Wrap Blouse', 'High-Rise Pleated Trousers', 'Tailored Wool Overcoat', 'Pointed Loafers']
            },
            {
                'title': 'Contemporary Evening Grace',
                'description': 'Bias-cut champagne midi dress cinched with an architectural belt, paired with sculptural earrings and sleek ankle-strap sandals.',
                'pieces': ['Bias-Cut Midi Dress', 'Sculptural Metal Belt', 'Minimalist Strappy Heels']
            }
        ]
    },
    'Inverted Triangle': {
        'category': 'Inverted Triangle',
        'subtitle': 'Sculptural Shoulders & Athletic Poise',
        'description': 'Characterized by broad, statuesque shoulder lines tapering down to slender hips. Styling shines by balancing upper structure with soft, fluid volume on the lower half.',
        'recommended_silhouettes': [
            'Fluid Lower Volume',
            'Soft Dropped Shoulders & Raglan Cuts',
            'Deep V-Necks & Halter Drapes',
            'A-Line & Flared Hemlines'
        ],
        'clothing_cuts': [
            'Raglan and kimono sleeves with soft drape',
            'Deep V-neck and plunge wrap tops',
            'Wide-leg linen pants, cargo palazzos, and culottes',
            'A-line and pleated midi skirts that create lower movement',
            'Single-button blazers with narrow lapels'
        ],
        'styling_suggestions': [
            'Draw visual movement downward with textured skirts, wide trousers, or statement footwear.',
            'Opt for soft, unpadded shoulder lines in outerwear and jackets.',
            'V-necks and vertical open collars naturally elongate the neckline.'
        ],
        'outfit_directions': [
            {
                'title': 'Fluid Modernity',
                'description': 'Deep V-neck silk halter blouse tucked into voluminous pleated wide-leg trousers with sculptural leather sandals.',
                'pieces': ['Deep V Silk Halter Blouse', 'Voluminous Pleated Trousers', 'Sculptural Sandals']
            },
            {
                'title': 'Weekend Atelier',
                'description': 'Soft raglan cashmere crewneck over a flared A-line denim skirt and minimalist leather ankle boots.',
                'pieces': ['Raglan Cashmere Knit', 'A-Line Denim Skirt', 'Leather Ankle Boots']
            }
        ]
    },
    'Soft Column': {
        'category': 'Soft Column',
        'subtitle': 'Clean Vertical Line & Modern Minimalist Canvas',
        'description': 'A streamlined vertical silhouette with balanced shoulders and hips. Exceptional versatility for high-fashion layering, columnar monochrome dressing, and architectural tailoring.',
        'recommended_silhouettes': [
            'Longline Columnar Drapes',
            'Relaxed Architectural Suiting',
            'Asymmetric Hemlines & Draping',
            'Belted Trench Layers'
        ],
        'clothing_cuts': [
            'Boatneck and high-neck ribbed knit tops',
            'Oversized boyfriend blazers with clean lapels',
            'Wide-leg fluid palazzos and low-slung trousers',
            'Drop-waist dresses and slip silhouettes',
            'Structured trench coats with tie belts'
        ],
        'styling_suggestions': [
            'Embrace modern monochrome column looks to accentuate your streamlined elegance.',
            'Introduce visual dimension with layered textures (cashmere + washed silk + crisp poplin).',
            'Use belts over blazers or dresses when you want to define waist focal points.'
        ],
        'outfit_directions': [
            {
                'title': 'Quiet Luxury Monochrome',
                'description': 'Cream ribbed turtleneck layered under an oversized camel wool blazer with matching relaxed wide-leg trousers and clean leather sneakers.',
                'pieces': ['Ribbed Turtleneck', 'Oversized Camel Blazer', 'Relaxed Wool Trousers', 'Minimalist Leather Sneakers']
            },
            {
                'title': 'Architectural Fluidity',
                'description': 'Crisp oversized poplin shirt tucked halfway into an asymmetric pleated skirt, finished with a structured leather shoulder bag.',
                'pieces': ['Crisp Poplin Shirt', 'Asymmetric Pleated Skirt', 'Structured Leather Bag']
            }
        ]
    },
    'Pear / Triangle': {
        'category': 'Pear / Triangle',
        'subtitle': 'Graceful Hip Curve & Delicate Upper Frame',
        'description': 'Curved hips with a more delicate waist and narrower shoulders. Styling excels by creating beautiful shoulder architecture and effortless vertical drape through the hips.',
        'recommended_silhouettes': [
            'Structured Shoulder Tailoring',
            'Fit-and-Flare A-Line Cuts',
            'Statement Necklines & Wide Collars',
            'High-Rise Straight & Bootcut Pants'
        ],
        'clothing_cuts': [
            'Boatneck, square-neck, and off-the-shoulder tops',
            'Tailored blazers with subtle shoulder pads',
            'A-line skirts and fluid wrap dresses that skim the hips',
            'High-waisted straight-leg or flare trousers in drape-friendly fabrics',
            'Statement sleeve blouses (puff or flutter)'
        ],
        'styling_suggestions': [
            'Highlight your collarbones and waist with fitted bodices and statement jewelry.',
            'Select trousers in medium-weight drapey fabrics like crepe or fluid wool that glide smoothly.',
            'Use shoulder structure in coats and jackets to harmonize upper and lower proportions.'
        ],
        'outfit_directions': [
            {
                'title': 'Statement Tailored Chic',
                'description': 'Square-neck knit top paired with a structured blazer, dark-wash straight-leg trousers, and block-heel mules.',
                'pieces': ['Square-Neck Knit Top', 'Structured Blazer', 'High-Rise Straight Trousers', 'Block-Heel Mules']
            },
            {
                'title': 'Festive Splendor',
                'description': 'Anarkali kurta with intricately embroidered yoke and shoulder detailing, flowing into an effortless flare.',
                'pieces': ['Embroidered Anarkali Kurta', 'Churidar Pants', 'Statement Jhumkas']
            }
        ]
    },
    'Oval / Apple': {
        'category': 'Oval / Apple',
        'subtitle': 'Statuesque Bust & Elegant Leg Proportions',
        'description': 'Fuller midsection with slender legs, lovely bustline, and graceful shoulders. Styling shines with elongated vertical lines, open-front layers, and highlighting beautiful limbs.',
        'recommended_silhouettes': [
            'Vertical Lengthening Lines',
            'Empire Drapes',
            'Flowing Monochromatic Silhouettes',
            'Open-Front Layers'
        ],
        'clothing_cuts': [
            'Elongating V-neck and scoop tunics',
            'Open-front duster cardigans and longline blazers',
            'Straight-leg and cigarette ankle-length trousers',
            'Flowing shift and empire waist midi dresses',
            '3/4 length sleeve tops that highlight delicate wrists'
        ],
        'styling_suggestions': [
            'Create elongating vertical lines with open-front jackets, monochromatic inner layers, and V-necklines.',
            'Showcase slender legs with tailored ankle trousers or flirty knee/midi dresses.',
            'Choose fluid, matte fabrics (matte jersey, crepe, linen blends) that skim rather than cling.'
        ],
        'outfit_directions': [
            {
                'title': 'Editorial Longline',
                'description': 'Fine gauge black V-neck top tucked into tailored slim ankle trousers, layered beneath an unbuttoned oatmeal duster coat with leather loafers.',
                'pieces': ['Fine V-Neck Knit', 'Slim Ankle Trousers', 'Longline Oatmeal Duster', 'Leather Loafers']
            },
            {
                'title': 'Cocktail Poise',
                'description': 'Fluid empire-waist midi wrap dress in midnight navy with metallic statement cuffs and sleek pointed flats.',
                'pieces': ['Fluid Wrap Midi Dress', 'Metallic Statement Cuffs', 'Pointed Slingback Flats']
            }
        ]
    }
}

ALIASES = {
    'balanced hourglass': 'Balanced Hourglass',
    'hourglass': 'Balanced Hourglass',
    'inverted triangle': 'Inverted Triangle',
    'athletic': 'Inverted Triangle',
    'athletic / inverted triangle': 'Inverted Triangle',
    'soft column': 'Soft Column',
    'column': 'Soft Column',
    'soft column / rectangle': 'Soft Column',
    'rectangle': 'Soft Column',
    'pear': 'Pear / Triangle',
    'triangle': 'Pear / Triangle',
    'pear / triangle': 'Pear / Triangle',
    'oval': 'Oval / Apple',
    'apple': 'Oval / Apple',
    'oval / apple': 'Oval / Apple'
}

def resolve_category_key(key):
    if not key:
        return 'Balanced Hourglass'
    norm = key.strip().lower()
    return ALIASES.get(norm, 'Balanced Hourglass')

def analyze_image_body(image_path=None, hint=None):
    """
    Analyzes body image proportions or categorizes based on styling theory.
    """
    if hint:
        return resolve_category_key(hint)
        
    try:
        if image_path:
            if not os.path.isabs(image_path) and not os.path.exists(image_path):
                base_name = os.path.basename(image_path)
                upload_candidate = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads', base_name)
                if os.path.exists(upload_candidate):
                    image_path = upload_candidate

            if os.path.exists(image_path):
                im = Image.open(image_path)
                width, height = im.size
                ratio = height / (width + 0.1)
                # Differentiate based on aspect ratio and contour density
                if ratio > 1.7:
                    return 'Soft Column'
                elif ratio > 1.4:
                    return 'Balanced Hourglass'
                else:
                    return 'Inverted Triangle'
    except Exception as e:
        print(f"Body analysis fallback: {e}")
        
    return 'Balanced Hourglass'

def get_body_profile(category_key='Balanced Hourglass', image_path=None, hint=None):
    """
    Generates a full BodyProfile dictionary.
    """
    resolved_key = resolve_category_key(hint or category_key)
    if image_path and not hint:
        resolved_key = analyze_image_body(image_path, hint)
        
    profile = BODY_CATEGORIES.get(resolved_key, BODY_CATEGORIES['Balanced Hourglass'])
    return {
        'body_category': profile['category'],
        'subtitle': profile['subtitle'],
        'description': profile['description'],
        'recommended_silhouettes': profile['recommended_silhouettes'],
        'clothing_cuts': profile['clothing_cuts'],
        'styling_suggestions': profile['styling_suggestions'],
        'outfit_directions': profile['outfit_directions'],
        'image_url': image_path or '',
        'disclaimer': 'Drezza styling guidance is strictly for fashion silhouette balance and clothing cuts. Not health, medical, or anatomical judgment.'
    }

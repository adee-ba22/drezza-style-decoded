import json

DEFAULT_PREFERENCES = {
    'styles': ['Minimal', 'Elegant', 'Indo-Western'],
    'favourite_colours': ['Cream', 'Espresso', 'Terracotta', 'Olive Green', 'Gold'],
    'avoided_colours': ['Neon Green', 'Hot Pink', 'Electric Blue'],
    'fit_preference': 'Relaxed', # Oversized, Relaxed, Regular, Fitted
    'sleeves_preference': 'Prefer Sleeves', # Prefer Sleeves, Sleeveless OK, Long Sleeves
    'comfort_preference': 'Breathable & High Comfort', # Breathable & High Comfort, Balanced Structure, Tailored & Crisp
    'footwear_preference': 'Flats & Low Block Heels', # Flats & Low Block Heels, Sneakers Only, Stilettos & High Heels, Juttis & Mojaris
    'aesthetic_type': 'Indo-Western Fusion', # Western Contemporary, Indian / Ethnic, Indo-Western Fusion
    'occasion_preferences': ['Everyday Casual', 'Work & Office', 'Festive Celebrations', 'Dinner & Evenings'],
    'free_text_notes': 'I prefer breathable fabrics and elegant relaxed fits. I do not wear high heels or sleeveless garments.'
}

def parse_free_text_rules(notes_text, sleeves_pref=None, fit_pref=None, footwear_pref=None):
    """
    Parses natural language notes and selected preferences to extract operational styling constraints.
    Example: 'I do not like sleeveless clothes' or 'I don't like sleeveless' -> avoid_sleeveless: True
    """
    rules = {
        'avoid_sleeveless': False,
        'prefer_oversized': False,
        'prefer_neutrals': False,
        'avoid_heels': False,
        'prefer_ethnic': False,
        'notes_summary': notes_text or ''
    }
    
    if sleeves_pref == 'Prefer Sleeves':
        rules['avoid_sleeveless'] = True

    if fit_pref == 'Oversized':
        rules['prefer_oversized'] = True

    if footwear_pref in ['Flats & Low Block Heels', 'Sneakers Only', 'Juttis & Mojaris']:
        rules['avoid_heels'] = True
    
    if not notes_text:
        return rules
        
    text_lower = notes_text.lower()
    
    if any(k in text_lower for k in [
        'no sleeveless', "don't like sleeveless", "do not like sleeveless", 
        'avoid sleeveless', 'prefer sleeves', 'modest sleeves', 'no bare shoulders',
        'without sleeves', 'dislike sleeveless'
    ]):
        rules['avoid_sleeveless'] = True
        
    if any(k in text_lower for k in ['oversized', 'baggy', 'loose', 'relaxed']):
        rules['prefer_oversized'] = True
        
    if any(k in text_lower for k in ['neutral', 'earth tone', 'minimal colors', 'subtle tones', 'beige']):
        rules['prefer_neutrals'] = True
        
    if any(k in text_lower for k in [
        'no heels', "don't wear heels", "do not wear heels", "avoid heels", 
        'avoid high heels', 'flats only', 'sneakers only', 'no stilettos', 'never wear heels'
    ]):
        rules['avoid_heels'] = True
        
    if any(k in text_lower for k in ['indian', 'ethnic', 'kurti', 'saree', 'traditional', 'desi', 'indo-western']):
        rules['prefer_ethnic'] = True
        
    return rules

def sanitize_preferences(raw_data):
    """
    Validates and formats incoming user preferences data.
    """
    if not raw_data:
        return dict(DEFAULT_PREFERENCES)
        
    styles = raw_data.get('styles', DEFAULT_PREFERENCES['styles'])
    if isinstance(styles, str):
        try:
            styles = json.loads(styles)
        except:
            styles = [styles]
            
    fav_colours = raw_data.get('favourite_colours', DEFAULT_PREFERENCES['favourite_colours'])
    if isinstance(fav_colours, str):
        try:
            fav_colours = json.loads(fav_colours)
        except:
            fav_colours = [fav_colours]
            
    avoid_colours = raw_data.get('avoided_colours', DEFAULT_PREFERENCES['avoided_colours'])
    if isinstance(avoid_colours, str):
        try:
            avoid_colours = json.loads(avoid_colours)
        except:
            avoid_colours = [avoid_colours]
            
    occasions = raw_data.get('occasion_preferences', DEFAULT_PREFERENCES['occasion_preferences'])
    if isinstance(occasions, str):
        try:
            occasions = json.loads(occasions)
        except:
            occasions = [occasions]
            
    notes = raw_data.get('free_text_notes', DEFAULT_PREFERENCES['free_text_notes'])
    fit_pref = raw_data.get('fit_preference', 'Relaxed')
    sleeves_pref = raw_data.get('sleeves_preference', 'Prefer Sleeves')
    footwear_pref = raw_data.get('footwear_preference', 'Flats & Low Block Heels')
    
    return {
        'styles': styles,
        'favourite_colours': fav_colours,
        'avoided_colours': avoid_colours,
        'fit_preference': fit_pref,
        'sleeves_preference': sleeves_pref,
        'comfort_preference': raw_data.get('comfort_preference', 'Breathable & High Comfort'),
        'footwear_preference': footwear_pref,
        'aesthetic_type': raw_data.get('aesthetic_type', 'Indo-Western Fusion'),
        'occasion_preferences': occasions,
        'free_text_notes': notes,
        'rules': parse_free_text_rules(notes, sleeves_pref, fit_pref, footwear_pref)
    }

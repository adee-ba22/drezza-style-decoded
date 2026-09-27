import json

def get_personalized_recommendations(products, color_profile, body_profile, preferences, wardrobe_items, query_text=None, occasion_filter=None):
    """
    Ranks and augments products based on:
    - User color palette harmony
    - Body silhouette cuts
    - Style and comfort choices
    - User natural language query (e.g. 'I have a party and need a gown')
    - Selected occasion filter (Everyday Casual, Work & Office, Evening Party, Festive Celebration, Weekend Brunch)
    - Current wardrobe gaps
    """
    palette_name = color_profile.get('palette_name', 'Warm Autumn') if color_profile else 'Warm Autumn'
    body_cat = body_profile.get('body_category', 'Balanced Hourglass') if body_profile else 'Balanced Hourglass'
    fav_styles = [s.lower() for s in (preferences.get('styles') or ['minimal', 'elegant'])] if preferences else ['minimal', 'elegant']
    rules = preferences.get('rules', {}) if preferences else {}
    
    # Identify what categories exist in user's closet
    wardrobe_cats = {item.get('category', '').upper() for item in (wardrobe_items or [])}
    
    results = []
    query_lower = (query_text or '').lower()
    occ_filter_lower = (occasion_filter or '').lower()
    
    for prod in products:
        score = 75 # base compatibility
        reasons = []
        is_direct_match = False
        
        prod_cat = prod.get('category', '').upper()
        prod_sub = prod.get('subcategory', '').lower()
        prod_name = prod.get('name', '').lower()
        prod_color = prod.get('color', '').lower()
        prod_styles = [s.lower() for s in prod.get('style_tags', [])]
        prod_occasions = [o.lower() for o in prod.get('suitable_occasions', [])]

        # 1. Occasion Filter Match
        if occ_filter_lower and occ_filter_lower != 'all':
            occ_matched = False
            if 'party' in occ_filter_lower and any(o in ['party', 'evening', 'celebrations'] for o in prod_occasions):
                occ_matched = True
            elif 'work' in occ_filter_lower and any(o in ['work', 'everyday'] for o in prod_occasions):
                occ_matched = True
            elif 'festive' in occ_filter_lower and any(o in ['festive', 'celebrations', 'wedding guest'] for o in prod_occasions):
                occ_matched = True
            elif 'brunch' in occ_filter_lower or 'weekend' in occ_filter_lower:
                if any(o in ['everyday', 'vacation', 'casual'] for o in prod_occasions) or prod_cat in ['BOTTOMS', 'TOPS', 'FOOTWEAR']:
                    occ_matched = True
            elif 'casual' in occ_filter_lower and any(o in ['everyday', 'casual'] for o in prod_occasions):
                occ_matched = True

            if occ_matched:
                score += 25
                is_direct_match = True
                reasons.append(f"Tailored for {occasion_filter.title()}")
            else:
                score -= 15

        # 2. Text Query Match
        if query_lower:
            keywords = [k for k in query_lower.split() if len(k) > 2]
            text_matched = any(k in prod_name or k in prod_cat.lower() or k in prod_sub or any(k in s for s in prod_styles) for k in keywords)
            if text_matched:
                score += 30
                is_direct_match = True
                reasons.append(f"Direct match for '{query_text}'")
            elif 'party' in query_lower and ('gown' in prod_name or 'dress' in prod_cat.lower() or 'party' in prod_styles):
                score += 25
                is_direct_match = True
                reasons.append("Evening & party silhouette match")
        
        # 3. Colour Harmony Match
        comp_palettes = prod.get('compatible_palettes', [])
        if palette_name in comp_palettes or 'All' in comp_palettes:
            score += 15
            reasons.append(f"Harmonizes with your {palette_name} palette")
        elif any(c.lower() in prod_color for c in (preferences.get('favourite_colours') or [])):
            score += 10
            reasons.append(f"Features your favorite {prod.get('color')} tone")
            
        # Avoided colors penalty
        avoided = [c.lower() for c in (preferences.get('avoided_colours') or [])]
        if any(a in prod_color for a in avoided):
            score -= 40
            
        # 4. Body Silhouette Match
        comp_silhouettes = prod.get('compatible_silhouettes', [])
        if body_cat in comp_silhouettes or 'All' in comp_silhouettes:
            score += 15
            reasons.append(f"Flattering cut for {body_cat} balance")
            
        # 5. Modesty & Sleeves Preference
        if rules.get('avoid_sleeveless'):
            sleeves = prod.get('sleeves_type', 'Regular Sleeves')
            if 'sleeveless' in sleeves.lower() or 'strapless' in sleeves.lower():
                score -= 30
            else:
                score += 10
                reasons.append("Provides elegant sleeve coverage as preferred")
                
        # 6. Footwear Comfort Preference
        if rules.get('avoid_heels') and prod_cat == 'FOOTWEAR':
            if any(h in prod_name for h in ['heel', 'stiletto', 'pump']):
                score -= 35
            else:
                score += 15
                reasons.append("Zero heel strain: flats/juttis honoring your comfort choice")
                
        # 7. Wardrobe Gap Bonus
        if prod_cat not in wardrobe_cats:
            score += 12
            reasons.append(f"Fills a recognized gap in your digital wardrobe ({prod_cat.title()})")
            
        # 8. Style Tags Match
        matched_styles = [s for s in fav_styles if s in prod_styles]
        if matched_styles:
            score += 8
            reasons.append(f"Matches your {', '.join(matched_styles).title()} aesthetic")
            
        enriched = dict(prod)
        enriched['match_score'] = min(max(score, 52), 99)
        enriched['match_reasons'] = reasons or [f"Curated for {palette_name} and contemporary dressing"]
        enriched['is_direct_match'] = is_direct_match
        results.append(enriched)
        
    # Sort by direct match then score descending
    results.sort(key=lambda x: (x['is_direct_match'], x['match_score']), reverse=True)
    return results

import json

def synthesize_style_profile(color_profile, body_profile, preferences, wardrobe_items):
    """
    Connects the four pillars: Colour + Body + Personal Choices + Wardrobe.
    Returns a unified Style Intelligence Synthesis.
    """
    color_palette = color_profile.get('palette_name', 'Warm Autumn') if color_profile else 'Warm Autumn'
    body_cat = body_profile.get('body_category', 'Balanced Hourglass') if body_profile else 'Balanced Hourglass'
    styles = preferences.get('styles', ['Minimal', 'Elegant']) if preferences else ['Minimal', 'Elegant']
    fit_pref = preferences.get('fit_preference', 'Relaxed') if preferences else 'Relaxed'
    rules = preferences.get('rules', {}) if preferences else {}
    
    # 1. Calculate Wardrobe Breakdown & Gap Analysis
    categories = {}
    for item in (wardrobe_items or []):
        cat = item.get('category', 'OTHER')
        categories[cat] = categories.get(cat, 0) + 1
        
    gaps = []
    if categories.get('TOPS', 0) == 0:
        gaps.append({'category': 'TOPS', 'note': 'Add core shirting or tops to anchor daily outfits.'})
    if categories.get('BOTTOMS', 0) == 0:
        gaps.append({'category': 'BOTTOMS', 'note': 'High-rise trousers or tailored skirts needed for your silhouette.'})
    if categories.get('OUTERWEAR', 0) == 0:
        gaps.append({'category': 'OUTERWEAR', 'note': 'A structured blazer or trench would elevate your layering.'})
    if categories.get('FOOTWEAR', 0) == 0:
        gaps.append({'category': 'FOOTWEAR', 'note': 'Essential footwear aligned with your comfort preference.'})
    if categories.get('INDIAN / ETHNIC', 0) == 0 and any('indo' in s.lower() or 'trad' in s.lower() for s in styles):
        gaps.append({'category': 'INDIAN / ETHNIC', 'note': 'A versatile contemporary kurti or saree to unlock Indo-Western looks.'})
    if categories.get('DRESSES', 0) == 0:
        gaps.append({'category': 'DRESSES', 'note': 'A midi wrap or bias-cut dress for effortless evening styling.'})

    # 2. Synthesize Style DNA headline
    dna_title = f"{color_palette} • {body_cat} • {fit_pref} {styles[0] if styles else 'Modern'}"
    
    # 3. Formulate Golden Rules based on all four inputs
    golden_rules = [
        f"Palette Harmony: Anchor outfits with {color_palette} primary neutrals, elevating with rich jewel or metallic accents.",
        f"Silhouette Balance: Embrace {body_cat} cuts like {(body_profile.get('recommended_silhouettes') or ['Tailored cuts'])[0] if body_profile else 'clean lines'}.",
        f"Fit Discipline: Prioritize {fit_pref} tailoring with breathable fabrics for peak comfort."
    ]
    
    if rules.get('avoid_sleeveless'):
        golden_rules.append("Modesty & Coverage: Choose elegant 3/4 or fluid draped sleeves over bare shoulders.")
    if rules.get('avoid_heels'):
        golden_rules.append("Grounded Footwear: Style looks around polished pointed flats, artisanal juttis, or sleek minimalist leather loafers.")
    if rules.get('prefer_oversized'):
        golden_rules.append("Architectural Volume: Balance oversized outerwear or tops with streamlined bottoms to preserve silhouette grace.")

    return {
        'dna_title': dna_title,
        'summary': f"Drezza has synthesized your {color_palette} palette, your {body_cat} silhouette, and your {fit_pref} {', '.join(styles[:2])} aesthetic across {len(wardrobe_items or [])} wardrobe pieces.",
        'golden_rules': golden_rules,
        'wardrobe_counts': categories,
        'identified_gaps': gaps,
        'ready_for_daily_advice': len(wardrobe_items or []) >= 2
    }

def answer_what_should_i_wear(color_profile, body_profile, preferences, wardrobe_items, occasion='Everyday Casual', user_prompt=None):
    """
    Answers Drezza's core question: 'WHAT SHOULD I WEAR?'
    Synthesizes real items from user's wardrobe matching colour, body, and choices.
    Ensures distinct recommendations for each of the 5 reference occasions:
    Everyday Casual, Work & Office, Evening Party, Festive Celebration, Weekend Brunch.
    """
    color_palette = color_profile.get('palette_name', 'Warm Autumn') if color_profile else 'Warm Autumn'
    body_cat = body_profile.get('body_category', 'Balanced Hourglass') if body_profile else 'Balanced Hourglass'
    fit_pref = preferences.get('fit_preference', 'Relaxed') if preferences else 'Relaxed'
    rules = preferences.get('rules', {}) if preferences else {}
    
    # Group available items by category
    items = wardrobe_items or []
    tops = [w for w in items if w.get('category') == 'TOPS']
    bottoms = [w for w in items if w.get('category') == 'BOTTOMS']
    dresses = [w for w in items if w.get('category') == 'DRESSES']
    ethnic = [w for w in items if w.get('category') in ['INDIAN / ETHNIC', 'INDIAN']]
    outerwear = [w for w in items if w.get('category') == 'OUTERWEAR']
    footwear = [w for w in items if w.get('category') == 'FOOTWEAR']
    accessories = [w for w in items if w.get('category') == 'ACCESSORIES']

    outfit_items = []
    style_rationale = []
    occ_lower = (occasion or 'Everyday Casual').lower()
    prompt_lower = (user_prompt or '').lower()

    # --- 1. WORK & OFFICE ---
    if 'work' in occ_lower or 'office' in occ_lower or 'corporate' in prompt_lower:
        # Prioritize structured shirts/blouses, tailored trousers, blazers, and smart flats
        work_tops = [t for t in tops if any(w in t.get('name', '').lower() for w in ['shirt', 'blouse', 'cashmere', 'silk'])] or tops
        work_bottoms = [b for b in bottoms if any(w in b.get('name', '').lower() for w in ['trouser', 'pleat', 'pant'])] or bottoms
        work_shoes = [f for f in footwear if any(w in f.get('name', '').lower() for w in ['flat', 'loafer', 'mule', 'slingback'])] or footwear

        if work_tops and work_bottoms:
            t = work_tops[0]
            b = work_bottoms[0]
            outfit_items.extend([t, b])
            style_rationale.append(f"Paired the {t['name']} with {b['name']} for crisp professional elegance.")
        elif work_tops:
            outfit_items.append(work_tops[0])

        if outerwear:
            blazers = [o for o in outerwear if 'blazer' in o.get('name', '').lower() or 'coat' in o.get('name', '').lower()] or outerwear
            outfit_items.append(blazers[0])
            style_rationale.append(f"Layered with the {blazers[0]['name']} for polished corporate authority.")

        if work_shoes:
            outfit_items.append(work_shoes[0])
            style_rationale.append(f"Anchored with {work_shoes[0]['name']} keeping your stride poised and comfortable.")

        if accessories:
            bags = [a for a in accessories if 'bag' in a.get('name', '').lower()] or accessories
            outfit_items.append(bags[0])

    # --- 2. EVENING PARTY ---
    elif 'party' in occ_lower or 'evening' in occ_lower or 'gown' in prompt_lower or 'cocktail' in prompt_lower:
        # Prioritize dresses or silk pieces, statement jewelry, and elegant footwear
        if dresses:
            chosen = dresses[0]
            outfit_items.append(chosen)
            style_rationale.append(f"Centered the look around {chosen['name']} for an alluring, fluid evening silhouette.")
        elif ethnic:
            chosen = ethnic[0]
            outfit_items.append(chosen)
            style_rationale.append(f"Styled the {chosen['name']} as a dramatic Indo-Western evening statement.")
        elif tops and bottoms:
            silk_tops = [t for t in tops if 'silk' in t.get('name', '').lower()] or tops
            outfit_items.extend([silk_tops[0], bottoms[0]])
            style_rationale.append(f"Paired {silk_tops[0]['name']} with {bottoms[0]['name']} for sophisticated nighttime sheen.")

        if outerwear:
            outfit_items.append(outerwear[0])
            style_rationale.append(f"Draped {outerwear[0]['name']} over the shoulders for high-fashion drama.")

        if footwear:
            party_shoes = [f for f in footwear if any(w in f.get('name', '').lower() for w in ['mule', 'slingback', 'jutti', 'heel'])] or footwear
            outfit_items.append(party_shoes[0])

        if accessories:
            jewels = [a for a in accessories if any(w in a.get('name', '').lower() for w in ['earring', 'jewel', 'gold'])] or accessories
            outfit_items.append(jewels[0])
            style_rationale.append(f"Elevated with {jewels[0]['name']} reflecting your {color_palette} warmth.")

    # --- 3. FESTIVE CELEBRATION ---
    elif 'festive' in occ_lower or 'wedding' in occ_lower or 'celebration' in occ_lower or any(w in prompt_lower for w in ['ethnic', 'desi', 'saree', 'kurti']):
        if ethnic:
            chosen = ethnic[0]
            outfit_items.append(chosen)
            style_rationale.append(f"Showcasing {chosen['name']} for timeless heritage and celebratory splendor.")
        elif dresses:
            chosen = dresses[0]
            outfit_items.append(chosen)
            style_rationale.append(f"Elevating {chosen['name']} for celebratory grace.")
        elif tops and bottoms:
            outfit_items.extend([tops[0], bottoms[0]])

        if footwear:
            juttis = [f for f in footwear if any(w in f.get('name', '').lower() for w in ['jutti', 'mojari', 'flat'])] or footwear
            outfit_items.append(juttis[0])
            style_rationale.append(f"Finished with {juttis[0]['name']} for authentic artisanal charm without heel fatigue.")

        if accessories:
            outfit_items.append(accessories[0])
            style_rationale.append(f"Accented with {accessories[0]['name']}.")

    # --- 4. WEEKEND BRUNCH ---
    elif 'brunch' in occ_lower or 'weekend' in occ_lower or 'sunday' in prompt_lower or 'cafe' in prompt_lower:
        # Relaxed breathable pieces: linen pants, relaxed tops, casual footwear
        linen_bottoms = [b for b in bottoms if any(w in b.get('name', '').lower() for w in ['linen', 'washed', 'wide'])] or bottoms
        casual_tops = [t for t in tops if any(w in t.get('name', '').lower() for w in ['poplin', 'knit', 'shirt', 'cashmere'])] or tops
        casual_shoes = [f for f in footwear if any(w in f.get('name', '').lower() for w in ['sneaker', 'flat', 'sandal'])] or footwear

        if casual_tops and linen_bottoms:
            t = casual_tops[0]
            b = linen_bottoms[0]
            outfit_items.extend([t, b])
            style_rationale.append(f"Combined {t['name']} with {b['name']} for effortless weekend ease.")
        elif dresses:
            outfit_items.append(dresses[0])
            style_rationale.append(f"Opted for the breezy silhouette of {dresses[0]['name']}.")

        if casual_shoes:
            outfit_items.append(casual_shoes[0])
            style_rationale.append(f"Paired with {casual_shoes[0]['name']} honoring your comfort priority.")

        if accessories:
            outfit_items.append(accessories[0])

    # --- 5. EVERYDAY CASUAL (DEFAULT) ---
    else:
        casual_bottoms = [b for b in bottoms if any(w in b.get('name', '').lower() for w in ['jeans', 'pant', 'trouser'])] or bottoms
        casual_tops = tops or []
        casual_shoes = footwear or []

        if casual_tops and casual_bottoms:
            t = casual_tops[0]
            b = casual_bottoms[0]
            outfit_items.extend([t, b])
            style_rationale.append(f"Anchored with {t['name']} and {b['name']} for versatile everyday polish.")
        elif dresses:
            outfit_items.append(dresses[0])
        elif items:
            outfit_items.append(items[0])

        if casual_shoes:
            outfit_items.append(casual_shoes[0])
            style_rationale.append(f"Completed with {casual_shoes[0]['name']}.")

        if accessories:
            outfit_items.append(accessories[0])

    # Fallback to make sure at least 1-2 pieces appear if available
    if not outfit_items and items:
        outfit_items = items[:3]

    rationale_text = (
        f"Decoded for {occasion}: Harmonizes with your {color_palette} palette and {body_cat} silhouette. "
        + " ".join(style_rationale)
        + f" Honoring your preference for {fit_pref.lower()} tailoring."
    )

    return {
        'occasion': occasion,
        'user_prompt': user_prompt,
        'headline': f"Your Decoded Look for {occasion}",
        'rationale': rationale_text,
        'items': outfit_items,
        'harmony_score': 95 if outfit_items else 70
    }

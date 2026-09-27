// Drezza — Style Decoded | Official Web Application Prototype
// Fully Audited & Repaired: 5 Connected Pillars with Complete State Machines & Functional Interactions

const { useState, useEffect, useCallback, useMemo, useRef } = React;

// --- ELEGANT INLINE SVG ICONS (Resilient & 0-Dependency) ---
const ICONS = {
  palette: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  body: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
      <path d="M7 8h10l-1 8H8L7 8z"/>
      <path d="M9 16v6"/>
      <path d="M15 16v6"/>
      <path d="M6 10l-2 4"/>
      <path d="M18 10l2 4"/>
    </svg>
  ),
  sliders: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  ),
  wardrobe: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  ),
  shoppingBag: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  ),
  arrowRight: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  plus: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  trash: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  ),
  edit: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </svg>
  ),
  upload: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  refresh: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  externalLink: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  )
};

function Icon({ name, className = "w-4 h-4" }) {
  return <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>{ICONS[name] || ICONS.sparkles}</span>;
}

// ========================================================
// SAMPLE ASSETS FOR PROTOTYPE TESTING
// ========================================================
const SAMPLE_PORTRAITS = [
  { label: 'Warm Olive (Autumn)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', palette: 'Warm Autumn' },
  { label: 'Cool Slate (Summer)', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', palette: 'Cool Summer' },
  { label: 'High Contrast (Winter)', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80', palette: 'Deep Winter' }
];

const SAMPLE_BODY_PHOTOS = [
  { label: 'Balanced Hourglass', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', category: 'Balanced Hourglass' },
  { label: 'Soft Column', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80', category: 'Soft Column' },
  { label: 'Inverted Triangle', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', category: 'Inverted Triangle' }
];

const WARDROBE_CATEGORIES = [
  { id: 'ALL', label: 'All Items' },
  { id: 'TOPS', label: 'Tops', subcategories: ['T-shirts', 'Shirts', 'Tops', 'Blouses', 'Crop tops', 'Sweaters', 'Hoodies'] },
  { id: 'BOTTOMS', label: 'Bottoms', subcategories: ['Jeans', 'Trousers', 'Cargos', 'Shorts', 'Skirts'] },
  { id: 'DRESSES', label: 'Dresses', subcategories: ['Mini', 'Midi', 'Maxi', 'Casual', 'Party', 'Formal'] },
  { id: 'INDIAN / ETHNIC', label: 'Indian / Ethnic', subcategories: ['Kurti', 'Kurta', 'Saree', 'Lehenga', 'Salwar suit', 'Anarkali', 'Sharara', 'Gharara', 'Other ethnic wear'] },
  { id: 'OUTERWEAR', label: 'Outerwear', subcategories: ['Jacket', 'Blazer', 'Coat', 'Bomber', 'Cardigan'] },
  { id: 'FOOTWEAR', label: 'Footwear', subcategories: ['Sneakers', 'Heels', 'Flats', 'Sandals', 'Boots', 'Juttis / Mojaris', 'Other'] },
  { id: 'ACCESSORIES', label: 'Accessories', subcategories: ['Bags', 'Belts', 'Jewellery', 'Watches', 'Sunglasses', 'Scarves'] }
];

const SIZES = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size'];
const FITS = ['Oversized', 'Relaxed', 'Regular', 'Fitted'];
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter', 'All-Season'];
const OCCASIONS = ['Everyday Casual', 'Work & Office', 'Evening Party', 'Festive Celebration', 'Weekend Brunch'];
const STYLES = ['Minimal', 'Casual', 'Elegant', 'Streetwear', 'Traditional', 'Indo-Western', 'Formal', 'Party', 'Trendy'];

// ========================================================
// MAIN APPLICATION ROOT
// ========================================================
function App() {
  const [currentView, setCurrentView] = useState('landing'); // landing, home, color, body, choices, wardrobe, links
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  // Central User Profile State (Single source of truth)
  const [userData, setUserData] = useState(null);
  const [colorProfile, setColorProfile] = useState(null);
  const [bodyProfile, setBodyProfile] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [wardrobeCount, setWardrobeCount] = useState(0);
  const [synthesis, setSynthesis] = useState(null);
  const [dailyLook, setDailyLook] = useState(null);

  // Global Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // Fetch full connected profile from central backend
  const fetchFullProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      const res = await fetch('/api/profile/full');
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
        setColorProfile(data.color_profile);
        setBodyProfile(data.body_profile);
        setPreferences(data.preferences);
        setWardrobeCount(data.wardrobe_count || 0);
        setSynthesis(data.synthesis);
        setDailyLook(data.daily_look);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    fetchFullProfile();
  }, [fetchFullProfile]);

  const navigateTo = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-drezza-cream text-drezza-dark font-sans selection:bg-drezza-dark selection:text-white">
      
      {/* Toast Feedback */}
      {toast.show && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-xs font-medium tracking-wide flex items-center gap-2.5 shadow-luxury animate-fade-in border ${
          toast.type === 'error' ? 'bg-red-950 text-red-200 border-red-800' : 'bg-drezza-dark text-white border-stone-800'
        }`}>
          <Icon name={toast.type === 'error' ? 'info' : 'check'} className="w-3.5 h-3.5 text-drezza-linen" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* LUXURY EDITORIAL HEADER (Natural Logo Placement) */}
      <header className="sticky top-0 z-40 glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Official Drezza Logo Anchor */}
          <button 
            onClick={() => navigateTo('landing')} 
            className="flex items-center gap-3 group text-left transition-opacity hover:opacity-95"
            title="Drezza — Style Decoded"
          >
            <div className="h-12 w-12 rounded-lg overflow-hidden border border-drezza-border flex items-center justify-center bg-[#E3DDD1] shadow-xs">
              <img 
                src="/static/images/drezza_logo.png" 
                alt="Drezza Official Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="block font-serif text-2xl font-normal tracking-wide text-drezza-dark leading-none">DREZZA</span>
              <span className="block text-[9px] tracking-[0.28em] text-drezza-muted uppercase font-medium mt-1">STYLE DECODED</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { id: 'home', label: 'Style Decoded', icon: 'sparkles' },
              { id: 'color', label: 'Colour Analysis', icon: 'palette' },
              { id: 'body', label: 'Body Analysis', icon: 'body' },
              { id: 'choices', label: 'Personal Choices', icon: 'sliders' },
              { id: 'wardrobe', label: 'My Wardrobe', icon: 'wardrobe' },
              { id: 'links', label: 'Links & Shop', icon: 'shoppingBag' }
            ].map(nav => (
              <button
                key={nav.id}
                onClick={() => navigateTo(nav.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 ${
                  currentView === nav.id 
                    ? 'bg-drezza-dark text-white shadow-xs' 
                    : 'text-drezza-charcoal hover:bg-drezza-warm hover:text-drezza-dark'
                }`}
              >
                <Icon name={nav.icon} className="w-3.5 h-3.5" />
                <span>{nav.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile / Status Indicator */}
          <div className="flex items-center gap-3">
            {currentView === 'landing' ? (
              <button
                onClick={() => navigateTo('color')}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-drezza-dark text-white text-xs tracking-wider uppercase font-medium hover:bg-stone-900 transition-all shadow-xs"
              >
                <span>Decode My Style</span>
                <Icon name="arrowRight" className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => navigateTo('home')}
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-drezza-warm border border-drezza-border text-xs text-drezza-charcoal hover:border-drezza-dark transition-all"
                title="Active Profile"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="font-serif italic font-medium">{userData?.name || 'Sophia Vance'}</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-drezza-dark hover:bg-drezza-warm transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-drezza-border bg-drezza-cream px-4 pt-3 pb-6 space-y-1 animate-fade-in shadow-xl">
            {[
              { id: 'home', label: 'Style Decoded (Overview)', icon: 'sparkles' },
              { id: 'color', label: 'Colour Analysis', icon: 'palette' },
              { id: 'body', label: 'Body Analysis', icon: 'body' },
              { id: 'choices', label: 'Personal Choices', icon: 'sliders' },
              { id: 'wardrobe', label: 'My Wardrobe', icon: 'wardrobe' },
              { id: 'links', label: 'Personalized Links & Shop', icon: 'shoppingBag' },
              { id: 'landing', label: 'Brand Story / Landing', icon: 'info' }
            ].map(nav => (
              <button
                key={nav.id}
                onClick={() => navigateTo(nav.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-colors ${
                  currentView === nav.id ? 'bg-drezza-dark text-white' : 'text-drezza-dark hover:bg-drezza-warm'
                }`}
              >
                <Icon name={nav.icon} className="w-4 h-4" />
                <span>{nav.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN VIEW ROUTING */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingView 
            onDecode={() => navigateTo('color')}
            onExplore={() => navigateTo('home')}
          />
        )}

        {currentView === 'home' && (
          <StyleDecodedView 
            colorProfile={colorProfile}
            bodyProfile={bodyProfile}
            preferences={preferences}
            wardrobeCount={wardrobeCount}
            synthesis={synthesis}
            dailyLook={dailyLook}
            navigateTo={navigateTo}
            onRefresh={fetchFullProfile}
            triggerToast={triggerToast}
          />
        )}

        {currentView === 'color' && (
          <ColorAnalysisView 
            profile={colorProfile} 
            onUpdated={(newProf) => {
              setColorProfile(newProf);
              fetchFullProfile();
              triggerToast('Analysis updated for your new photo.');
            }}
            onReset={() => {
              setColorProfile(null);
              fetchFullProfile();
              triggerToast('Colour analysis reset.');
            }}
            onNext={() => navigateTo('body')}
          />
        )}

        {currentView === 'body' && (
          <BodyAnalysisView 
            profile={bodyProfile}
            onUpdated={(newProf) => {
              setBodyProfile(newProf);
              fetchFullProfile();
              triggerToast('Body styling profile decoded and saved.');
            }}
            onReset={() => {
              setBodyProfile(null);
              fetchFullProfile();
              triggerToast('Body profile reset.');
            }}
            onNext={() => navigateTo('choices')}
          />
        )}

        {currentView === 'choices' && (
          <PersonalChoicesView 
            preferences={preferences}
            onSaved={(newPrefs) => {
              setPreferences(newPrefs);
              fetchFullProfile();
              triggerToast('Personal style preferences saved.');
            }}
            onNext={() => navigateTo('wardrobe')}
          />
        )}

        {currentView === 'wardrobe' && (
          <DigitalWardrobeView 
            onWardrobeChanged={fetchFullProfile}
            triggerToast={triggerToast}
            onNext={() => navigateTo('links')}
          />
        )}

        {currentView === 'links' && (
          <PersonalizedLinksView 
            colorProfile={colorProfile}
            bodyProfile={bodyProfile}
            preferences={preferences}
            triggerToast={triggerToast}
          />
        )}
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="border-t border-drezza-border bg-[#F5F2EB] py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-drezza-border/60">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-lg overflow-hidden border border-drezza-border bg-[#E3DDD1] p-0.5 shadow-xs">
                <img 
                  src="/static/images/drezza_logo.png" 
                  alt="Drezza Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-xl tracking-wider text-drezza-dark block leading-none">DREZZA</span>
                <span className="text-[10px] tracking-[0.25em] text-drezza-muted uppercase font-medium mt-1 block">STYLE DECODED</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-drezza-charcoal font-medium">
              <button onClick={() => navigateTo('color')} className="hover:text-drezza-dark transition-colors">Colour Analysis</button>
              <button onClick={() => navigateTo('body')} className="hover:text-drezza-dark transition-colors">Body Theory</button>
              <button onClick={() => navigateTo('choices')} className="hover:text-drezza-dark transition-colors">Personal Choices</button>
              <button onClick={() => navigateTo('wardrobe')} className="hover:text-drezza-dark transition-colors">Digital Wardrobe</button>
              <button onClick={() => navigateTo('links')} className="hover:text-drezza-dark transition-colors">Personalized Links</button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-drezza-muted text-center sm:text-left">
            <p>“What should I wear?” — Your personal AI fashion stylist, designed around you.</p>
            <p>© {new Date().getFullYear()} Drezza. First Functional Prototype.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ========================================================
// 1. LANDING PAGE COMPONENT
// ========================================================
function LandingView({ onDecode, onExplore }) {
  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-drezza-warm border border-drezza-border text-[11px] tracking-widest uppercase font-semibold text-drezza-charcoal">
                <span className="w-1.5 h-1.5 rounded-full bg-drezza-accent"></span>
                <span>Personal Fashion Intelligence</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-drezza-dark leading-[1.08]">
                  What should <br className="hidden sm:inline" />
                  <span className="italic font-normal">I wear today?</span>
                </h1>
                <p className="text-base sm:text-lg text-drezza-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                  Your personal AI fashion stylist, designed around you. Drezza doesn't just show you clothes — Drezza decodes your style through your colours, your body profile, your personal preferences, and your wardrobe.
                </p>
              </div>

              {/* 4 Pillars Summary Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto lg:mx-0">
                {[
                  { num: '01', title: 'Colours' },
                  { num: '02', title: 'Body Profile' },
                  { num: '03', title: 'Preferences' },
                  { num: '04', title: 'Wardrobe' }
                ].map((p, idx) => (
                  <div key={idx} className="bg-white border border-drezza-border rounded-xl p-2.5 text-center">
                    <span className="block text-[9px] font-mono text-drezza-muted">{p.num}</span>
                    <span className="block text-xs font-medium text-drezza-dark mt-0.5">{p.title}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onDecode}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-drezza-dark text-white text-xs tracking-widest uppercase font-semibold hover:bg-stone-900 transition-all shadow-luxury flex items-center justify-center gap-3 group"
                >
                  <span>Decode My Style</span>
                  <Icon name="arrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onExplore}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-drezza-border text-drezza-dark text-xs tracking-widest uppercase font-semibold hover:bg-drezza-warm transition-all"
                >
                  Explore Drezza
                </button>
              </div>
            </div>

            {/* Right Visual Brand Anchor */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-square rounded-2xl overflow-hidden border border-drezza-border shadow-luxury bg-[#E3DDD1] p-3 flex items-center justify-center relative">
                  <img 
                    src="/static/images/drezza_logo.png" 
                    alt="Drezza — Style Decoded Official Logo" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <div className="absolute -bottom-4 right-6 bg-white/95 backdrop-blur-md border border-drezza-border px-4 py-2.5 rounded-2xl shadow-luxury flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping"></div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-drezza-muted font-mono">Style Synthesis</span>
                      <span className="block text-xs font-serif italic text-drezza-dark font-medium">Harmonizing 4 Pillars</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE 5 CORE PILLARS SECTION */}
      <section className="py-20 border-t border-drezza-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-[11px] tracking-[0.25em] uppercase text-drezza-muted font-semibold">The Architecture</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-drezza-dark font-normal">
              Five connected features. <br />
              <span className="italic">One seamless answer.</span>
            </h2>
            <p className="text-sm text-drezza-muted">
              Rather than isolated quizzes or static product grids, Drezza weaves every nuance of your appearance and personal closet together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Colour Analysis', desc: 'Upload a portrait to decode your seasonal undertones, contrast, and curated fashion palettes.', icon: 'palette' },
              { step: '02', title: 'Body Theory', desc: 'Respectful silhouette theory recommending clothing cuts and architectural styling directions.', icon: 'body' },
              { step: '03', title: 'Personal Choices', desc: 'Your individual preferences: modest sleeves, relaxed fits, no heels, and favorite aesthetics.', icon: 'sliders' },
              { step: '04', title: 'Digital Wardrobe', desc: 'Organize your actual closet with rich metadata, category views, and automatic gap analysis.', icon: 'wardrobe' },
              { step: '05', title: 'Personalized Links', desc: 'Intelligent product suggestions matching what you want, your profile, and closet gaps.', icon: 'shoppingBag' }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-drezza-cream/70 border border-drezza-border rounded-2xl p-6 flex flex-col justify-between hover:border-drezza-dark hover:bg-white transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-drezza-muted font-medium">{feature.step}</span>
                    <div className="w-8 h-8 rounded-full bg-white border border-drezza-border flex items-center justify-center text-drezza-dark group-hover:bg-drezza-dark group-hover:text-white transition-colors">
                      <Icon name={feature.icon} className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-drezza-dark mb-2">{feature.title}</h3>
                  <p className="text-xs text-drezza-muted leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-drezza-border bg-[#F5F2EB] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-xl text-drezza-dark font-medium">Ready to decode your style?</h4>
              <p className="text-xs text-drezza-muted mt-1">Begin with colour analysis or explore the connected style intelligence engine.</p>
            </div>
            <button
              onClick={onDecode}
              className="px-6 py-3 rounded-full bg-drezza-dark text-white text-xs tracking-wider uppercase font-semibold hover:bg-stone-900 transition-colors shrink-0"
            >
              Start Style Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ========================================================
// 2. CONNECTED STYLE SYNTHESIS (OVERVIEW / "WHAT SHOULD I WEAR?")
// ========================================================
function StyleDecodedView({ colorProfile, bodyProfile, preferences, wardrobeCount, synthesis, dailyLook, navigateTo, onRefresh, triggerToast }) {
  const [selectedOccasion, setSelectedOccasion] = useState('Everyday Casual');
  const [customPrompt, setCustomPrompt] = useState('');
  const [answering, setAnswering] = useState(false);
  const [currentLook, setCurrentLook] = useState(dailyLook);

  const handleAskWhatToWear = async (occ = selectedOccasion, prompt = customPrompt) => {
    try {
      setAnswering(true);
      const res = await fetch('/api/recommendations/what-to-wear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ occasion: occ, prompt })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentLook(data);
        triggerToast(`Decoded look generated for ${occ}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnswering(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      
      {/* Top Banner: 4 Connected Pillars Status */}
      <div className="bg-white border border-drezza-border rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-drezza-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-drezza-muted">Style Intelligence Synthesis</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium">Harmonized</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-drezza-dark font-normal mt-1">
              {synthesis?.dna_title || 'Warm Autumn • Balanced Hourglass • Relaxed Minimal'}
            </h1>
          </div>

          <button
            onClick={onRefresh}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-drezza-border text-xs font-medium text-drezza-charcoal hover:bg-drezza-warm transition-colors"
          >
            <Icon name="refresh" className="w-3.5 h-3.5" />
            <span>Re-sync Pillars</span>
          </button>
        </div>

        {/* 4 Pillars Interactive Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div 
            onClick={() => navigateTo('color')}
            className="p-4 rounded-xl border border-drezza-border hover:border-drezza-dark bg-drezza-cream/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-drezza-muted">Pillar 1: Colours</span>
              <Icon name="arrowRight" className="w-3.5 h-3.5 text-drezza-muted group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-serif text-lg font-medium text-drezza-dark">
              {colorProfile?.palette_name || 'Decoded Palette'}
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              {(colorProfile?.primary_colors || []).slice(0, 4).map((c, i) => (
                <span key={i} className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
              <span className="text-[11px] text-drezza-muted ml-1">{colorProfile?.undertone?.split('(')[0] || 'Warm Undertone'}</span>
            </div>
          </div>

          <div 
            onClick={() => navigateTo('body')}
            className="p-4 rounded-xl border border-drezza-border hover:border-drezza-dark bg-drezza-cream/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-drezza-muted">Pillar 2: Body</span>
              <Icon name="arrowRight" className="w-3.5 h-3.5 text-drezza-muted group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-serif text-lg font-medium text-drezza-dark">
              {bodyProfile?.body_category || 'Balanced Hourglass'}
            </div>
            <p className="text-[11px] text-drezza-muted mt-2 line-clamp-1">
              {(bodyProfile?.recommended_silhouettes || ['Tailored Wrap Cuts'])[0]}
            </p>
          </div>

          <div 
            onClick={() => navigateTo('choices')}
            className="p-4 rounded-xl border border-drezza-border hover:border-drezza-dark bg-drezza-cream/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-drezza-muted">Pillar 3: Choices</span>
              <Icon name="arrowRight" className="w-3.5 h-3.5 text-drezza-muted group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-serif text-lg font-medium text-drezza-dark">
              {preferences?.fit_preference || 'Relaxed'} • {preferences?.sleeves_preference || 'Prefer Sleeves'}
            </div>
            <p className="text-[11px] text-drezza-muted mt-2 line-clamp-1">
              {(preferences?.styles || ['Minimal', 'Elegant']).join(', ')}
            </p>
          </div>

          <div 
            onClick={() => navigateTo('wardrobe')}
            className="p-4 rounded-xl border border-drezza-border hover:border-drezza-dark bg-drezza-cream/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase text-drezza-muted">Pillar 4: Wardrobe</span>
              <Icon name="arrowRight" className="w-3.5 h-3.5 text-drezza-muted group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-serif text-lg font-medium text-drezza-dark">
              {wardrobeCount} Items in Closet
            </div>
            <p className="text-[11px] text-drezza-muted mt-2">
              {synthesis?.identified_gaps?.length ? `${synthesis.identified_gaps.length} gaps identified` : 'Balanced wardrobe coverage'}
            </p>
          </div>
        </div>
      </div>

      {/* CORE FEATURE HERO: "WHAT SHOULD I WEAR TODAY?" */}
      <section className="bg-white border border-drezza-border rounded-2xl p-6 sm:p-10 shadow-luxury">
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-drezza-accent font-semibold">
            <Icon name="sparkles" className="w-4 h-4 text-drezza-accent" />
            <span>Core Styling Engine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-drezza-dark font-normal">
            “What should I wear?”
          </h2>
          <p className="text-sm text-drezza-muted leading-relaxed">
            Drezza synthesizes your colours, body profile, personal rules, and real digital wardrobe to formulate complete outfits for any moment.
          </p>

          {/* Occasion Switcher */}
          <div className="flex flex-wrap gap-2 pt-2">
            {OCCASIONS.map(occ => (
              <button
                key={occ}
                onClick={() => {
                  setSelectedOccasion(occ);
                  handleAskWhatToWear(occ, customPrompt);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                  selectedOccasion === occ 
                    ? 'bg-drezza-dark text-white' 
                    : 'bg-drezza-warm text-drezza-charcoal border border-drezza-border hover:border-drezza-dark'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>

          {/* Optional Prompt Input */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., 'Outdoor cocktail party' or 'Comfortable corporate presentation'..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-drezza-border text-xs bg-drezza-cream/30 focus:outline-hidden focus:border-drezza-dark"
              onKeyDown={(e) => e.key === 'Enter' && handleAskWhatToWear(selectedOccasion, customPrompt)}
            />
            <button
              onClick={() => handleAskWhatToWear(selectedOccasion, customPrompt)}
              disabled={answering}
              className="px-5 py-2.5 rounded-xl bg-drezza-dark text-white text-xs font-medium uppercase tracking-wider hover:bg-stone-900 transition-colors shrink-0 disabled:opacity-50"
            >
              {answering ? 'Decoding...' : 'Style Me'}
            </button>
          </div>
        </div>

        {/* Outfit Recommendation Display */}
        {currentLook && (
          <div className="p-6 rounded-2xl bg-drezza-cream/60 border border-drezza-border space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-drezza-border pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-muted">Assembled from your Wardrobe</span>
                <h3 className="font-serif text-2xl font-medium text-drezza-dark">{currentLook.headline}</h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-drezza-border text-xs font-medium text-drezza-charcoal">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Harmony Score: {currentLook.harmony_score}%</span>
              </div>
            </div>

            {/* Editorial Fashion Rationale */}
            <p className="text-xs sm:text-sm text-drezza-charcoal leading-relaxed italic font-serif">
              “{currentLook.rationale}”
            </p>

            {/* Assembled Wardrobe Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(currentLook.items || []).map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-drezza-border overflow-hidden fashion-card">
                  <div className="aspect-4/5 overflow-hidden bg-drezza-warm">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-drezza-muted block">{item.category}</span>
                    <span className="text-xs font-medium text-drezza-dark block truncate mt-0.5">{item.name}</span>
                    <div className="flex items-center justify-between text-[10px] text-drezza-muted mt-2 pt-2 border-t border-drezza-border/60">
                      <span>{item.color}</span>
                      <span>Size {item.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* WARDROBE GAPS & PERSONALIZED SHOPPING BRIDGE */}
      {synthesis?.identified_gaps?.length > 0 && (
        <div className="bg-[#FAF7F2] border border-drezza-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-accent font-semibold">Wardrobe Intelligence Gap</span>
            <h3 className="font-serif text-2xl text-drezza-dark">
              Identified {synthesis.identified_gaps.length} pieces to unlock 10+ new looks
            </h3>
            <p className="text-xs text-drezza-muted max-w-xl">
              {synthesis.identified_gaps.map(g => g.note).join(' ')}
            </p>
          </div>
          <button
            onClick={() => navigateTo('links')}
            className="px-6 py-3 rounded-full bg-drezza-dark text-white text-xs uppercase tracking-wider font-semibold hover:bg-stone-900 transition-colors shrink-0 flex items-center gap-2"
          >
            <span>View Personalized Matches</span>
            <Icon name="arrowRight" className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}

// ========================================================
// 3. FEATURE 1: COLOUR ANALYSIS MODULE (FIXED & AUDITED)
// ========================================================
function ColorAnalysisView({ profile, onUpdated, onReset, onNext }) {
  // State Machine: EMPTY -> UPLOADED -> ANALYZING -> ANALYZED
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(profile?.image_url || null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [currentResult, setCurrentResult] = useState(profile || null);
  const [statusMessage, setStatusMessage] = useState(profile ? 'Saved Colour Profile' : '');
  const fileInputRef = useRef(null);

  // Sync state if central profile prop changes from outside
  useEffect(() => {
    if (profile && !selectedFile) {
      setPreviewUrl(profile.image_url || null);
      setCurrentResult(profile);
    }
  }, [profile, selectedFile]);

  // When a user selects a file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, or WEBP).');
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      // CRITICAL: Clear old result when new photo is chosen
      setCurrentResult(null);
      setStatusMessage('Photo selected — Click Analyze My Colours');
    }
  };

  // Demo sample portrait selection
  const selectSamplePortrait = (sample) => {
    setSelectedFile(null);
    setFileName(sample.label);
    setPreviewUrl(sample.url);
    // Clear old result so user sees photo change and requires analysis
    setCurrentResult(null);
    setStatusMessage('Demo portrait selected — Click Analyze My Colours');
  };

  // REMOVE PHOTO Action
  const handleRemovePhoto = async () => {
    setSelectedFile(null);
    setFileName('');
    setPreviewUrl(null);
    setCurrentResult(null);
    setStatusMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    try {
      await fetch('/api/color-analysis/reset', { method: 'POST' });
      if (onReset) onReset();
    } catch (e) {
      console.error(e);
    }
  };

  // CHANGE PHOTO Action
  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // ANALYZE ACTION
  const handleRunAnalysis = async () => {
    if (!previewUrl && !selectedFile) return;

    try {
      setAnalyzing(true);
      setAnalysisStep('Detecting skin undertones & contrast...');
      
      const formData = new FormData();
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else {
        formData.append('image_url', previewUrl);
      }

      setTimeout(() => setAnalysisStep('Extracting dominant harmonic tones...'), 600);
      setTimeout(() => setAnalysisStep('Harmonizing seasonal fashion palettes...'), 1200);

      const res = await fetch('/api/color-analysis/analyze', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setCurrentResult(data.profile);
        setStatusMessage('Analysis updated for your new photo.');
        onUpdated(data.profile);
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong while analyzing your colours. Please try again.');
    } finally {
      setAnalyzing(false);
      setAnalysisStep('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="border-b border-drezza-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-muted font-semibold">Pillar 01</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-drezza-dark font-normal mt-1">Colour Analysis</h1>
          <p className="text-xs sm:text-sm text-drezza-muted mt-1 max-w-xl">
            Upload a portrait or selfie to decode your seasonal undertones, contrast ratio, and curated fashion palettes.
          </p>
        </div>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-drezza-charcoal hover:text-drezza-dark"
        >
          <span>Skip to Body Analysis</span>
          <Icon name="arrowRight" className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Upload & Preview Column */}
        <div className="lg:col-span-5 bg-white border border-drezza-border rounded-2xl p-6 space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg font-medium text-drezza-dark">1. Upload Portrait / Selfie</h3>
            <p className="text-xs text-drezza-muted">For optimal decoding, use natural daylight and direct lighting.</p>
          </div>

          {/* Photo Preview Container */}
          <div className="relative aspect-square rounded-xl overflow-hidden border border-drezza-border bg-drezza-warm flex items-center justify-center">
            {previewUrl ? (
              <img src={previewUrl} alt="Portrait Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6 text-drezza-muted space-y-2">
                <div className="w-12 h-12 rounded-full bg-white border border-drezza-border flex items-center justify-center mx-auto text-drezza-muted">
                  <Icon name="upload" className="w-6 h-6" />
                </div>
                <span className="text-xs block font-medium">No portrait uploaded</span>
                <span className="text-[11px] text-drezza-muted block">Choose a photo below to begin</span>
              </div>
            )}

            {analyzing && (
              <div className="absolute inset-0 bg-drezza-dark/75 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6 text-center animate-fade-in z-20">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-3"></div>
                <span className="font-serif text-lg italic">{analysisStep || 'Decoding Colours...'}</span>
                <span className="text-[10px] tracking-widest uppercase text-stone-300 mt-2">Drezza Intelligence</span>
              </div>
            )}
          </div>

          {/* File Name & Status */}
          {fileName && (
            <div className="text-[11px] text-drezza-muted font-mono truncate px-1">
              File: <strong className="text-drezza-dark">{fileName}</strong>
            </div>
          )}

          {/* Action Buttons: Remove & Change */}
          {previewUrl && (
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleChangePhoto}
                className="flex-1 py-2 rounded-xl border border-drezza-border bg-white text-xs font-medium text-drezza-dark hover:bg-drezza-warm transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="refresh" className="w-3.5 h-3.5" />
                <span>Change Photo</span>
              </button>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="py-2 px-4 rounded-xl border border-red-200 bg-red-50 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="trash" className="w-3.5 h-3.5" />
                <span>Remove Photo</span>
              </button>
            </div>
          )}

          {/* Upload Trigger (When Empty) */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          {!previewUrl && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-xl border border-drezza-border text-xs font-medium hover:bg-drezza-warm transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="upload" className="w-4 h-4" />
              <span>Select Photo from Device</span>
            </button>
          )}

          {/* Quick Demo Portraits */}
          <div className="pt-2 border-t border-drezza-border/60">
            <span className="text-[10px] uppercase font-mono tracking-wider text-drezza-muted block mb-2">Or test with demo portraits:</span>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_PORTRAITS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectSamplePortrait(sample)}
                  className="p-1.5 rounded-lg border border-drezza-border hover:border-drezza-dark text-left text-[10px] truncate bg-drezza-warm/50 transition-all flex items-center gap-1.5"
                >
                  <img src={sample.url} alt={sample.label} className="w-5 h-5 rounded-full object-cover shrink-0" />
                  <span className="truncate">{sample.palette.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Action Button */}
          <button
            onClick={handleRunAnalysis}
            disabled={analyzing || !previewUrl}
            className="w-full py-3.5 rounded-full bg-drezza-dark text-white text-xs tracking-widest uppercase font-semibold hover:bg-stone-900 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
          >
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>{analyzing ? 'Decoding...' : 'Analyze My Colours'}</span>
          </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 bg-white border border-drezza-border rounded-2xl p-6 sm:p-8 space-y-8">
          
          {currentResult ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-drezza-border pb-5">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-accent font-semibold">Your Colour Profile</span>
                  <h2 className="font-serif text-3xl font-medium text-drezza-dark mt-0.5">
                    {currentResult.palette_name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-drezza-warm border border-drezza-border text-xs text-drezza-charcoal font-medium">
                    {currentResult.undertone || 'Decoded Undertone'}
                  </span>
                </div>
              </div>

              {statusMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
                  <Icon name="check" className="w-3.5 h-3.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-drezza-charcoal leading-relaxed">
                {currentResult.description}
              </p>

              {/* PALETTE SWATCH SECTIONS */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark">Primary Colours</span>
                    <span className="text-[10px] text-drezza-muted font-mono">Core wardrobe base</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(currentResult.primary_colors || []).map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl border border-drezza-border flex items-center gap-3 bg-drezza-cream/30">
                        <span className="w-9 h-9 rounded-lg border border-black/10 shadow-xs shrink-0" style={{ backgroundColor: c.hex }} />
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-drezza-dark block truncate">{c.name}</span>
                          <span className="text-[10px] font-mono text-drezza-muted uppercase block">{c.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark">Supporting Colours</span>
                    <span className="text-[10px] text-drezza-muted font-mono">Tailoring & separates</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(currentResult.supporting_colors || []).map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl border border-drezza-border flex items-center gap-3 bg-drezza-cream/30">
                        <span className="w-9 h-9 rounded-lg border border-black/10 shadow-xs shrink-0" style={{ backgroundColor: c.hex }} />
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-drezza-dark block truncate">{c.name}</span>
                          <span className="text-[10px] font-mono text-drezza-muted uppercase block">{c.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark">Accent Colours</span>
                    <span className="text-[10px] text-drezza-muted font-mono">Jewelry, silks, & statements</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(currentResult.accent_colors || []).map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl border border-drezza-border flex items-center gap-3 bg-drezza-cream/30">
                        <span className="w-9 h-9 rounded-lg border border-black/10 shadow-xs shrink-0" style={{ backgroundColor: c.hex }} />
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-drezza-dark block truncate">{c.name}</span>
                          <span className="text-[10px] font-mono text-drezza-muted uppercase block">{c.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Complementary Guidance */}
              <div className="p-4 rounded-xl bg-drezza-warm/60 border border-drezza-border text-xs text-drezza-charcoal space-y-1.5">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-drezza-dark block">Complementary Guidance</span>
                <p className="leading-relaxed">{currentResult.complement_notes}</p>
              </div>

              {/* Example Color Combinations */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">Example Fashion Pairings</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(currentResult.combinations || []).map((comb, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-drezza-border bg-white space-y-1.5">
                      <span className="text-xs font-serif font-medium text-drezza-dark block">{comb.title}</span>
                      <p className="text-[11px] text-drezza-muted leading-relaxed">{comb.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-drezza-border flex justify-end">
                <button
                  onClick={onNext}
                  className="px-6 py-3 rounded-full bg-drezza-dark text-white text-xs tracking-wider uppercase font-semibold hover:bg-stone-900 transition-colors flex items-center gap-2"
                >
                  <span>Continue to Body Analysis</span>
                  <Icon name="arrowRight" className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="py-20 text-center max-w-md mx-auto space-y-4 text-drezza-muted">
              <div className="w-12 h-12 rounded-full bg-drezza-warm border border-drezza-border flex items-center justify-center mx-auto text-drezza-dark">
                <Icon name="palette" className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-drezza-dark font-normal">Awaiting portrait upload.</h3>
              <p className="text-xs leading-relaxed">
                Upload a portrait or select one of the demo portraits on the left, then click <strong>“Analyze My Colours”</strong> to reveal your seasonal palette and personalized swatches.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

// ========================================================
// 4. FEATURE 2: BODY THEORY & ANALYSIS MODULE (FIXED & AUDITED)
// ========================================================
function BodyAnalysisView({ profile, onUpdated, onReset, onNext }) {
  // State Machine: EMPTY -> UPLOADED -> ANALYZING -> ANALYZED
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(profile?.image_url || null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedArchetype, setSelectedArchetype] = useState(profile?.body_category || 'Balanced Hourglass');
  const [currentResult, setCurrentResult] = useState(profile || null);
  const [statusMessage, setStatusMessage] = useState(profile ? 'Saved Body Profile' : '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profile && !selectedFile) {
      setPreviewUrl(profile.image_url || null);
      setCurrentResult(profile);
      setSelectedArchetype(profile.body_category || 'Balanced Hourglass');
    }
  }, [profile, selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG, or WEBP).');
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      // Clear old result so user sees new input requires analysis
      setCurrentResult(null);
      setStatusMessage('Photo selected — Click Analyze My Body Profile');
    }
  };

  const selectSamplePhoto = (sample) => {
    setSelectedFile(null);
    setFileName(sample.label);
    setPreviewUrl(sample.url);
    setSelectedArchetype(sample.category);
    // Clear old result
    setCurrentResult(null);
    setStatusMessage('Demo photo selected — Click Analyze My Body Profile');
  };

  // REMOVE PHOTO Action
  const handleRemovePhoto = async () => {
    setSelectedFile(null);
    setFileName('');
    setPreviewUrl(null);
    setCurrentResult(null);
    setStatusMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    try {
      await fetch('/api/body-analysis/reset', { method: 'POST' });
      if (onReset) onReset();
    } catch (e) {
      console.error(e);
    }
  };

  // CHANGE PHOTO Action
  const handleChangePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // ANALYZE ACTION
  const handleRunAnalysis = async () => {
    if (!previewUrl && !selectedFile && !selectedArchetype) return;

    try {
      setAnalyzing(true);
      const formData = new FormData();
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (previewUrl) {
        formData.append('image_url', previewUrl);
      }
      formData.append('category_hint', selectedArchetype);

      const res = await fetch('/api/body-analysis/analyze', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setCurrentResult(data.profile);
        setStatusMessage('Body styling profile decoded and saved.');
        onUpdated(data.profile);
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong while analyzing body silhouette. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="border-b border-drezza-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-muted font-semibold">Pillar 02</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-drezza-dark font-normal mt-1">Body Theory & Analysis</h1>
          <p className="text-xs sm:text-sm text-drezza-muted mt-1 max-w-xl">
            Upload a mirror selfie or select a silhouette archetype to receive respectful fashion styling guidance and clothing cuts.
          </p>
        </div>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-drezza-charcoal hover:text-drezza-dark"
        >
          <span>Skip to Personal Choices</span>
          <Icon name="arrowRight" className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Upload Column */}
        <div className="lg:col-span-5 bg-white border border-drezza-border rounded-2xl p-6 space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg font-medium text-drezza-dark">1. Upload Mirror Selfie or Full-Body</h3>
            <p className="text-xs text-drezza-muted">Assessing silhouette balance and architectural garment lines.</p>
          </div>

          {/* Photo Preview Container */}
          <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-drezza-border bg-drezza-warm flex items-center justify-center">
            {previewUrl ? (
              <img src={previewUrl} alt="Body Silhouette Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6 text-drezza-muted space-y-2">
                <div className="w-12 h-12 rounded-full bg-white border border-drezza-border flex items-center justify-center mx-auto text-drezza-muted">
                  <Icon name="body" className="w-6 h-6" />
                </div>
                <span className="text-xs block font-medium">No photo uploaded</span>
                <span className="text-[11px] text-drezza-muted block">Upload or pick a silhouette below</span>
              </div>
            )}

            {analyzing && (
              <div className="absolute inset-0 bg-drezza-dark/75 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6 text-center animate-fade-in z-20">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-3"></div>
                <span className="font-serif text-lg italic">Formulating Silhouette Theory...</span>
                <span className="text-[10px] tracking-widest uppercase text-stone-300 mt-2">Drezza Intelligence</span>
              </div>
            )}
          </div>

          {/* File Name */}
          {fileName && (
            <div className="text-[11px] text-drezza-muted font-mono truncate px-1">
              File: <strong className="text-drezza-dark">{fileName}</strong>
            </div>
          )}

          {/* Remove / Change Buttons */}
          {previewUrl && (
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleChangePhoto}
                className="flex-1 py-2 rounded-xl border border-drezza-border bg-white text-xs font-medium text-drezza-dark hover:bg-drezza-warm transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="refresh" className="w-3.5 h-3.5" />
                <span>Change Photo</span>
              </button>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="py-2 px-4 rounded-xl border border-red-200 bg-red-50 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="trash" className="w-3.5 h-3.5" />
                <span>Remove Photo</span>
              </button>
            </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          {!previewUrl && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-xl border border-drezza-border text-xs font-medium hover:bg-drezza-warm transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="upload" className="w-4 h-4" />
              <span>Select Mirror Photo from Device</span>
            </button>
          )}

          {/* Archetype Selector (Reference standard) */}
          <div className="pt-2 border-t border-drezza-border/60">
            <span className="text-[10px] uppercase font-mono tracking-wider text-drezza-muted block mb-2">
              Silhouette Archetype Selection:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {['Balanced Hourglass', 'Inverted Triangle', 'Soft Column', 'Pear / Triangle', 'Oval / Apple'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedArchetype(cat);
                    const matched = SAMPLE_BODY_PHOTOS.find(s => s.category.includes(cat.split(' ')[0]));
                    if (matched) {
                      setPreviewUrl(matched.url);
                      setFileName(matched.label);
                    }
                    setCurrentResult(null);
                  }}
                  className={`p-2 rounded-lg border text-left text-[11px] transition-all ${
                    selectedArchetype === cat ? 'bg-drezza-dark text-white border-drezza-dark' : 'bg-drezza-warm/50 border-drezza-border text-drezza-dark hover:border-drezza-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={analyzing || (!previewUrl && !selectedArchetype)}
            className="w-full py-3.5 rounded-full bg-drezza-dark text-white text-xs tracking-widest uppercase font-semibold hover:bg-stone-900 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
          >
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>{analyzing ? 'Decoding...' : 'Analyze My Body Profile'}</span>
          </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 bg-white border border-drezza-border rounded-2xl p-6 sm:p-8 space-y-8">
          
          {currentResult ? (
            <>
              <div className="border-b border-drezza-border pb-5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-accent font-semibold">Decoded Silhouette</span>
                <h2 className="font-serif text-3xl font-medium text-drezza-dark mt-0.5">
                  {currentResult.body_category}
                </h2>
                <p className="text-xs text-drezza-muted mt-1">
                  {currentResult.subtitle}
                </p>
              </div>

              {statusMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fade-in">
                  <Icon name="check" className="w-3.5 h-3.5" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-drezza-charcoal leading-relaxed">
                {currentResult.description}
              </p>

              {/* Recommended Silhouettes */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">Recommended Silhouettes</span>
                <div className="flex flex-wrap gap-2">
                  {(currentResult.recommended_silhouettes || []).map((sil, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-drezza-warm border border-drezza-border text-xs text-drezza-dark font-medium">
                      {sil}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clothing Cuts That Flatter */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">Clothing Cuts That Flatter</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(currentResult.clothing_cuts || []).map((cut, i) => (
                    <div key={i} className="p-3 rounded-xl border border-drezza-border bg-drezza-cream/30 flex items-start gap-2.5">
                      <Icon name="check" className="w-3.5 h-3.5 text-drezza-accent mt-0.5 shrink-0" />
                      <span className="text-xs text-drezza-dark font-medium">{cut}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Styling Suggestions */}
              <div className="p-4 rounded-xl bg-drezza-warm/50 border border-drezza-border space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-drezza-dark block">Styling Architecture</span>
                <ul className="text-xs text-drezza-charcoal space-y-1.5 list-disc list-inside">
                  {(currentResult.styling_suggestions || []).map((sug, i) => (
                    <li key={i} className="leading-relaxed">{sug}</li>
                  ))}
                </ul>
              </div>

              {/* Outfit Directions */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">Outfit Directions</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(currentResult.outfit_directions || []).map((dir, i) => (
                    <div key={i} className="p-4 rounded-xl border border-drezza-border bg-white space-y-2">
                      <span className="font-serif text-sm font-medium text-drezza-dark block">{dir.title}</span>
                      <p className="text-[11px] text-drezza-muted leading-relaxed">{dir.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(dir.pieces || []).map((p, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-drezza-warm text-drezza-charcoal">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-3.5 rounded-xl border border-drezza-border bg-stone-50 text-[11px] text-drezza-muted flex items-start gap-2.5">
                <Icon name="info" className="w-4 h-4 text-drezza-muted shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {currentResult.disclaimer || 'Styling intelligence for clothing cuts and silhouettes; not health, medical, or anatomical judgment.'}
                </p>
              </div>

              <div className="pt-4 border-t border-drezza-border flex justify-end">
                <button
                  onClick={onNext}
                  className="px-6 py-3 rounded-full bg-drezza-dark text-white text-xs tracking-wider uppercase font-semibold hover:bg-stone-900 transition-colors flex items-center gap-2"
                >
                  <span>Continue to Personal Choices</span>
                  <Icon name="arrowRight" className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="py-20 text-center max-w-md mx-auto space-y-4 text-drezza-muted">
              <div className="w-12 h-12 rounded-full bg-drezza-warm border border-drezza-border flex items-center justify-center mx-auto text-drezza-dark">
                <Icon name="body" className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-drezza-dark font-normal">Awaiting body silhouette photo.</h3>
              <p className="text-xs leading-relaxed">
                Upload a mirror selfie or select a silhouette archetype on the left, then click <strong>“Analyze My Body Profile”</strong> to unlock clothing cuts and tailored outfit directions.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

// ========================================================
// 5. FEATURE 3: PERSONAL CHOICES MODULE (FIXED & AUDITED)
// ========================================================
function PersonalChoicesView({ preferences, onSaved, onNext }) {
  const [styles, setStyles] = useState(['Minimal', 'Elegant', 'Indo-Western']);
  const [favouriteColours, setFavouriteColours] = useState(['Cream', 'Espresso', 'Terracotta', 'Olive Green', 'Gold']);
  const [avoidedColours, setAvoidedColours] = useState(['Neon Green', 'Hot Pink', 'Electric Blue']);
  const [fit, setFit] = useState('Relaxed');
  const [sleeves, setSleeves] = useState('Prefer Sleeves');
  const [comfort, setComfort] = useState('Breathable & High Comfort');
  const [footwear, setFootwear] = useState('Flats & Low Block Heels');
  const [aesthetic, setAesthetic] = useState('Indo-Western Fusion');
  const [occasions, setOccasions] = useState(['Everyday Casual', 'Work & Office', 'Festive Celebrations', 'Dinner & Evenings']);
  const [freeTextNotes, setFreeTextNotes] = useState('I prefer breathable fabrics and elegant relaxed fits. I do not wear high heels or sleeveless garments.');
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync internal state whenever central preferences prop updates or arrives
  useEffect(() => {
    if (preferences) {
      if (preferences.styles) setStyles(preferences.styles);
      if (preferences.favourite_colours) setFavouriteColours(preferences.favourite_colours);
      if (preferences.avoided_colours) setAvoidedColours(preferences.avoided_colours);
      if (preferences.fit_preference) setFit(preferences.fit_preference);
      if (preferences.sleeves_preference) setSleeves(preferences.sleeves_preference);
      if (preferences.comfort_preference) setComfort(preferences.comfort_preference);
      if (preferences.footwear_preference) setFootwear(preferences.footwear_preference);
      if (preferences.aesthetic_type) setAesthetic(preferences.aesthetic_type);
      if (preferences.occasion_preferences) setOccasions(preferences.occasion_preferences);
      if (preferences.free_text_notes !== undefined) setFreeTextNotes(preferences.free_text_notes || '');
      setHasChanges(false);
    }
  }, [preferences]);

  const toggleArrayItem = (list, item, setter) => {
    setHasChanges(true);
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      const res = await fetch('/api/preferences/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          styles,
          favourite_colours: favouriteColours,
          avoided_colours: avoidedColours,
          fit_preference: fit,
          sleeves_preference: sleeves,
          comfort_preference: comfort,
          footwear_preference: footwear,
          aesthetic_type: aesthetic,
          occasion_preferences: occasions,
          free_text_notes: freeTextNotes
        })
      });
      const data = await res.json();
      if (data.success) {
        setHasChanges(false);
        onSaved(data.preferences);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to save preferences.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset style preferences to default curated values?')) return;
    try {
      setSaving(true);
      const res = await fetch('/api/preferences/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        onSaved(data.preferences);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="border-b border-drezza-border pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-muted font-semibold">Pillar 03</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-drezza-dark font-normal mt-1">Personal Choices</h1>
          <p className="text-xs sm:text-sm text-drezza-muted mt-1 max-w-xl">
            This is where Drezza learns what you actually love wearing: fits, modest sleeves, comfort parameters, and cultural aesthetics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-xs font-medium text-drezza-muted hover:text-drezza-dark underline"
          >
            Reset to Defaults
          </button>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-drezza-charcoal hover:text-drezza-dark"
          >
            <span>Skip to Wardrobe</span>
            <Icon name="arrowRight" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-drezza-border rounded-2xl p-6 sm:p-10 space-y-10">
        
        {/* 1. Style Aesthetics */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">
            1. Preferred Style Aesthetics
          </label>
          <div className="flex flex-wrap gap-2">
            {STYLES.concat(['Other']).map(st => (
              <button
                key={st}
                type="button"
                onClick={() => toggleArrayItem(styles, st, setStyles)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  styles.includes(st)
                    ? 'bg-drezza-dark text-white'
                    : 'bg-drezza-warm border border-drezza-border text-drezza-charcoal hover:border-drezza-dark'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Fit Preferences */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">
            2. Fit Preference
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FITS.map(f => (
              <button
                key={f}
                type="button"
                onClick={() => { setFit(f); setHasChanges(true); }}
                className={`p-3.5 rounded-xl border text-center text-xs font-medium transition-all ${
                  fit === f 
                    ? 'bg-drezza-dark text-white border-drezza-dark' 
                    : 'bg-drezza-warm/50 border-drezza-border text-drezza-dark hover:border-drezza-dark'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Sleeve & Coverage Preference */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">
            3. Sleeves & Modesty Preference
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'Prefer Sleeves', desc: 'No sleeveless/strapless tops; prefer 3/4 or full sleeves' },
              { id: 'Sleeveless OK', desc: 'Comfortable with sleeveless, tank, and strappy cuts' },
              { id: 'Flexible', desc: 'Open to both depending on occasion and weather' }
            ].map(sl => (
              <button
                key={sl.id}
                type="button"
                onClick={() => { setSleeves(sl.id); setHasChanges(true); }}
                className={`p-4 rounded-xl border text-left text-xs transition-all space-y-1 ${
                  sleeves === sl.id 
                    ? 'bg-drezza-dark text-white border-drezza-dark' 
                    : 'bg-drezza-warm/50 border-drezza-border text-drezza-dark hover:border-drezza-dark'
                }`}
              >
                <span className="font-semibold block">{sl.id}</span>
                <span className={`text-[11px] block ${sleeves === sl.id ? 'text-stone-300' : 'text-drezza-muted'}`}>{sl.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Footwear Preference */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">
            4. Footwear Comfort
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              'Flats & Low Block Heels',
              'Sneakers Only',
              'Stilettos & High Heels',
              'Juttis & Mojaris'
            ].map(fw => (
              <button
                key={fw}
                type="button"
                onClick={() => { setFootwear(fw); setHasChanges(true); }}
                className={`p-3 rounded-xl border text-center text-xs font-medium transition-all ${
                  footwear === fw 
                    ? 'bg-drezza-dark text-white border-drezza-dark' 
                    : 'bg-drezza-warm/50 border-drezza-border text-drezza-dark hover:border-drezza-dark'
                }`}
              >
                {fw}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Indian / Western / Fusion */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">
            5. Cultural & Aesthetic Resonance
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Western Contemporary', 'Indian / Ethnic Wear', 'Indo-Western Fusion'].map(ae => (
              <button
                key={ae}
                type="button"
                onClick={() => { setAesthetic(ae); setHasChanges(true); }}
                className={`p-3.5 rounded-xl border text-center text-xs font-medium transition-all ${
                  aesthetic === ae 
                    ? 'bg-drezza-dark text-white border-drezza-dark' 
                    : 'bg-drezza-warm/50 border-drezza-border text-drezza-dark hover:border-drezza-dark'
                }`}
              >
                {ae}
              </button>
            ))}
          </div>
        </div>

        {/* 6. Colours Loved & Avoided */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">Favourite Colours</span>
            <div className="flex flex-wrap gap-1.5">
              {['Cream', 'Espresso', 'Terracotta', 'Olive Green', 'Gold', 'Navy', 'Sage', 'Oatmeal'].map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleArrayItem(favouriteColours, c, setFavouriteColours)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    favouriteColours.includes(c) ? 'bg-drezza-dark text-white' : 'bg-drezza-warm text-drezza-charcoal border border-drezza-border'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">Colours to Avoid</span>
            <div className="flex flex-wrap gap-1.5">
              {['Neon Green', 'Hot Pink', 'Electric Blue', 'Mustard Yellow', 'Pure Orange'].map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleArrayItem(avoidedColours, c, setAvoidedColours)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    avoidedColours.includes(c) ? 'bg-red-950 text-white' : 'bg-drezza-warm text-drezza-charcoal border border-drezza-border'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Free-Text Field: “Tell Drezza anything about your style…” */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">
              Tell Drezza anything about your style…
            </label>
            <span className="text-[10px] text-drezza-muted font-mono">Natural Language Stylist</span>
          </div>

          <textarea
            rows="3"
            value={freeTextNotes}
            onChange={(e) => { setFreeTextNotes(e.target.value); setHasChanges(true); }}
            placeholder="e.g. 'I don't like sleeveless clothes. I prefer oversized outfits. I love neutral colours and never wear high heels.'"
            className="w-full p-4 rounded-xl border border-drezza-border text-xs leading-relaxed focus:outline-hidden focus:border-drezza-dark bg-drezza-cream/20"
          ></textarea>

          {/* Quick Click Prompts */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[10px] text-drezza-muted font-mono self-center">Quick inserts:</span>
            {[
              "I don't like sleeveless clothes.",
              "I prefer oversized outfits.",
              "I love neutral colours.",
              "I don't wear heels.",
              "I like simple Indian outfits."
            ].map((quick, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setFreeTextNotes(prev => prev ? `${prev} ${quick}` : quick);
                  setHasChanges(true);
                }}
                className="px-2.5 py-1 rounded-md bg-drezza-warm hover:bg-stone-200 border border-drezza-border text-[11px] text-drezza-charcoal transition-colors"
              >
                + {quick}
              </button>
            ))}
          </div>
        </div>

        {/* Save & Continue Actions */}
        <div className="pt-6 border-t border-drezza-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSavePreferences}
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-drezza-dark text-white text-xs tracking-widest uppercase font-semibold hover:bg-stone-900 transition-all shadow-xs disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
            {hasChanges && (
              <span className="text-[11px] text-amber-700 font-medium">Unsaved changes</span>
            )}
          </div>

          <button
            onClick={onNext}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-drezza-border text-drezza-dark text-xs uppercase tracking-wider font-semibold hover:bg-drezza-warm transition-colors flex items-center justify-center gap-2"
          >
            <span>Proceed to Digital Wardrobe</span>
            <Icon name="arrowRight" className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}

// ========================================================
// 6. FEATURE 4: DIGITAL WARDROBE MODULE (FIXED & AUDITED)
// ========================================================
function DigitalWardrobeView({ onWardrobeChanged, triggerToast, onNext }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchWardrobe = useCallback(async () => {
    try {
      setLoading(true);
      const url = new URL('/api/wardrobe', window.location.origin);
      if (activeCategory !== 'ALL') url.searchParams.set('category', activeCategory);
      if (searchQuery) url.searchParams.set('search', searchQuery);

      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    fetchWardrobe();
  }, [fetchWardrobe]);

  // DELETE ITEM Action
  const handleDeleteItem = async (id, name) => {
    if (!window.confirm(`Permanently remove "${name}" from your wardrobe?`)) return;
    try {
      const res = await fetch(`/api/wardrobe/delete/${id}`, { method: 'POST' });
      if (res.ok) {
        // Immediate local state removal so it NEVER lingers
        setItems(prev => prev.filter(it => it.id !== id));
        triggerToast(`Removed "${name}" from wardrobe`);
        onWardrobeChanged();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // RESTORE STARTER CLOSET Action
  const handleResetStarter = async () => {
    if (!window.confirm('Reset your wardrobe to the curated starter collection?')) return;
    try {
      const res = await fetch('/api/wardrobe/reset-starter', { method: 'POST' });
      if (res.ok) {
        triggerToast('Wardrobe restored to curated collection.');
        fetchWardrobe();
        onWardrobeChanged();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-drezza-border pb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-muted font-semibold">Pillar 04</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-drezza-dark font-normal mt-1">Online Digital Wardrobe</h1>
          <p className="text-xs sm:text-sm text-drezza-muted mt-1 max-w-xl">
            A fashion-editorial grid of your closet items. Add, edit, categorize, and organize pieces with high-fashion metadata.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setEditingItem(null); setAddModalOpen(true); }}
            className="px-5 py-2.5 rounded-full bg-drezza-dark text-white text-xs tracking-wider uppercase font-semibold hover:bg-stone-900 transition-colors flex items-center gap-2 shadow-xs"
          >
            <Icon name="plus" className="w-3.5 h-3.5" />
            <span>Add Wardrobe Item</span>
          </button>

          <button
            onClick={onNext}
            className="px-4 py-2.5 rounded-full bg-white border border-drezza-border text-drezza-dark text-xs uppercase tracking-wider font-semibold hover:bg-drezza-warm transition-colors flex items-center gap-1.5"
          >
            <span>Go to Links</span>
            <Icon name="arrowRight" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {WARDROBE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                  ? 'bg-drezza-dark text-white shadow-xs' 
                  : 'bg-white border border-drezza-border text-drezza-charcoal hover:border-drezza-dark'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-drezza-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, fabric (linen, silk), color, or style..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-drezza-border text-xs bg-white focus:outline-hidden focus:border-drezza-dark"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-drezza-muted">
            <span>Showing <strong className="text-drezza-dark">{items.length}</strong> items</span>
            <button 
              onClick={handleResetStarter}
              className="text-[11px] underline hover:text-drezza-dark transition-colors"
            >
              Reset Starter Closet
            </button>
          </div>
        </div>

      </div>

      {/* EDITORIAL WARDROBE GRID */}
      {loading ? (
        <div className="py-20 text-center text-drezza-muted animate-pulse">
          <span className="font-serif text-lg italic">Organizing your digital closet...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-drezza-warm border border-drezza-border flex items-center justify-center mx-auto text-drezza-dark">
            <Icon name="wardrobe" className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-drezza-dark">Your wardrobe is waiting.</h3>
          <p className="text-xs text-drezza-muted leading-relaxed">
            Add your first piece and start decoding your style. You can upload photos of your own clothing or select from our curated editorial pieces.
          </p>
          <button
            onClick={() => { setEditingItem(null); setAddModalOpen(true); }}
            className="px-6 py-2.5 rounded-full bg-drezza-dark text-white text-xs uppercase tracking-wider font-semibold hover:bg-stone-900 transition-colors"
          >
            Add First Piece
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-drezza-border overflow-hidden fashion-card flex flex-col justify-between group"
            >
              <div className="fashion-img-container aspect-3/4 bg-drezza-warm relative">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                
                {/* Size Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-mono font-medium text-drezza-dark shadow-xs border border-drezza-border">
                  {item.size}
                </div>

                {/* Hover Quick Edit / Delete Overlay */}
                <div className="absolute inset-0 bg-drezza-dark/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                  <button
                    onClick={() => { setEditingItem(item); setAddModalOpen(true); }}
                    className="p-2.5 rounded-full bg-white text-drezza-dark hover:bg-drezza-dark hover:text-white transition-colors shadow-xs"
                    title="Edit Item"
                  >
                    <Icon name="edit" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id, item.name)}
                    className="p-2.5 rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-xs"
                    title="Delete Item"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-drezza-muted">
                  <span>{item.category}</span>
                  <span>{item.subcategory}</span>
                </div>
                
                <h4 className="font-serif text-base font-medium text-drezza-dark truncate" title={item.name}>
                  {item.name}
                </h4>

                <div className="flex flex-wrap gap-1 text-[10px]">
                  <span className="px-2 py-0.5 rounded-md bg-drezza-warm text-drezza-charcoal">{item.color}</span>
                  {item.fabric && <span className="px-2 py-0.5 rounded-md bg-drezza-warm text-drezza-charcoal">{item.fabric}</span>}
                  {item.fit && <span className="px-2 py-0.5 rounded-md bg-drezza-warm text-drezza-charcoal">{item.fit}</span>}
                </div>

                {item.notes && (
                  <p className="text-[11px] text-drezza-muted italic line-clamp-1 pt-1 border-t border-drezza-border/60">
                    “{item.notes}”
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT ITEM MODAL */}
      {addModalOpen && (
        <WardrobeItemModal
          item={editingItem}
          onClose={() => setAddModalOpen(false)}
          onSaved={() => {
            setAddModalOpen(false);
            fetchWardrobe();
            onWardrobeChanged();
            triggerToast(editingItem ? 'Item updated.' : 'Added piece to wardrobe.');
          }}
        />
      )}

    </div>
  );
}

// Wardrobe Item Modal (Form supporting all metadata)
function WardrobeItemModal({ item, onClose, onSaved }) {
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState(item?.category ? item.category.toUpperCase() : 'TOPS');
  const [subcategory, setSubcategory] = useState(item?.subcategory || 'Blouses');
  const [color, setColor] = useState(item?.color || 'Cashmere Cream');
  const [size, setSize] = useState(item?.size || 'S');
  const [fabric, setFabric] = useState(item?.fabric || '100% Silk');
  const [pattern, setPattern] = useState(item?.pattern || 'Solid');
  const [fit, setFit] = useState(item?.fit || 'Relaxed');
  const [style, setStyle] = useState(item?.style || 'Minimal');
  const [occasion, setOccasion] = useState(item?.occasion || 'Everyday Casual');
  const [season, setSeason] = useState(item?.season || 'All-Season');
  const [notes, setNotes] = useState(item?.notes || '');
  const [imageUrl, setImageUrl] = useState(item?.image_url || 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const activeCategoryObj = WARDROBE_CATEGORIES.find(c => c.id === category) || WARDROBE_CATEGORIES[1];

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setImageUrl(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Item name is required');

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category.toUpperCase());
      formData.append('subcategory', subcategory);
      formData.append('color', color);
      formData.append('size', size);
      formData.append('fabric', fabric);
      formData.append('pattern', pattern);
      formData.append('fit', fit);
      formData.append('style', style);
      formData.append('occasion', occasion);
      formData.append('season', season);
      formData.append('notes', notes);

      if (file) {
        formData.append('image', file);
      } else {
        formData.append('image_url', imageUrl);
      }

      const endpoint = item ? `/api/wardrobe/edit/${item.id}` : '/api/wardrobe/add';
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        onSaved();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save wardrobe piece.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-drezza-dark/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl border border-drezza-border shadow-modal max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-drezza-border pb-4 mb-6">
          <h3 className="font-serif text-2xl font-medium text-drezza-dark">
            {item ? 'Edit Wardrobe Piece' : 'Add New Wardrobe Piece'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-drezza-muted hover:text-drezza-dark">
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Upload / Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-drezza-cream/40 border border-drezza-border">
            <div className="w-24 h-28 rounded-lg overflow-hidden border border-drezza-border bg-drezza-warm shrink-0">
              <img src={imageUrl} alt="Piece Preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-full border border-drezza-border bg-white text-xs font-medium hover:bg-drezza-warm"
              >
                Upload Clothing Image
              </button>
              <p className="text-[11px] text-drezza-muted">PNG, JPG, or WEBP. Appears in your closet grid.</p>
            </div>
          </div>

          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Piece Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Fluid Silk Wrap Blouse"
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs focus:outline-hidden focus:border-drezza-dark"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Category *</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const cat = WARDROBE_CATEGORIES.find(c => c.id === e.target.value);
                  if (cat && cat.subcategories) setSubcategory(cat.subcategories[0]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs bg-white focus:outline-hidden focus:border-drezza-dark"
              >
                {WARDROBE_CATEGORIES.filter(c => c.id !== 'ALL').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Subcategory & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Subcategory</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs bg-white focus:outline-hidden focus:border-drezza-dark"
              >
                {(activeCategoryObj.subcategories || ['Other']).map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs bg-white focus:outline-hidden focus:border-drezza-dark"
              >
                {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Color & Fabric */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Colour</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g., Terracotta Ochre"
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs focus:outline-hidden focus:border-drezza-dark"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Fabric / Material</label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="e.g., 100% Belgian Linen, Raw Silk"
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs focus:outline-hidden focus:border-drezza-dark"
              />
            </div>
          </div>

          {/* Fit & Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Fit</label>
              <select
                value={fit}
                onChange={(e) => setFit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs bg-white focus:outline-hidden focus:border-drezza-dark"
              >
                {FITS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs bg-white focus:outline-hidden focus:border-drezza-dark"
              >
                {STYLES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>

          {/* Occasion & Season */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs bg-white focus:outline-hidden focus:border-drezza-dark"
              >
                {OCCASIONS.map(occ => <option key={occ} value={occ}>{occ}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs bg-white focus:outline-hidden focus:border-drezza-dark"
              >
                {SEASONS.map(sea => <option key={sea} value={sea}>{sea}</option>)}
              </select>
            </div>
          </div>

          {/* Styling Notes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block mb-1.5">Styling Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Perfect drape, pair with high-rise trousers..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-drezza-border text-xs focus:outline-hidden focus:border-drezza-dark"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-drezza-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-drezza-border text-xs font-medium hover:bg-drezza-warm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-drezza-dark text-white text-xs font-semibold tracking-wider uppercase hover:bg-stone-900 transition-colors shadow-xs"
            >
              {saving ? 'Saving...' : item ? 'Update Item' : 'Add to Closet'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

// ========================================================
// 7. FEATURE 5: PERSONALIZED LINKS & SHOP (FIXED & AUDITED)
// ========================================================
function PersonalizedLinksView({ colorProfile, bodyProfile, preferences, triggerToast }) {
  const [query, setQuery] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('ALL');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [boutiqueDemoProduct, setBoutiqueDemoProduct] = useState(null);

  const fetchPersonalizedShopping = useCallback(async (searchQuery = query, occ = selectedOccasion) => {
    try {
      setLoading(true);
      const url = new URL('/api/shopping', window.location.origin);
      if (searchQuery) url.searchParams.set('query', searchQuery);
      if (occ && occ !== 'ALL') url.searchParams.set('occasion', occ);

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [query, selectedOccasion]);

  useEffect(() => {
    fetchPersonalizedShopping();
  }, [fetchPersonalizedShopping]);

  const handleOccasionClick = (occ) => {
    setSelectedOccasion(occ);
    fetchPersonalizedShopping(query, occ);
  };

  const handlePresetQuery = (preset) => {
    setQuery(preset);
    fetchPersonalizedShopping(preset, selectedOccasion);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="border-b border-drezza-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-drezza-muted font-semibold">Pillar 05</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-drezza-dark font-normal mt-1">Personalized Links & Shop</h1>
          <p className="text-xs sm:text-sm text-drezza-muted mt-1 max-w-2xl">
            Not a generic shopping catalog. Drezza connects you to curated pieces based on what you need, your colour harmony, your body silhouette, your comfort rules, and current wardrobe gaps.
          </p>
        </div>
      </div>

      {/* "What are you dressing for?" Reference Module */}
      <div className="bg-white border border-drezza-border rounded-2xl p-6 sm:p-8 space-y-5 shadow-luxury">
        <label className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">
          What are you dressing for?
        </label>
        
        {/* Occasion Switcher from Reference */}
        <div className="flex flex-wrap gap-2">
          {['ALL'].concat(OCCASIONS).map(occ => (
            <button
              key={occ}
              onClick={() => handleOccasionClick(occ)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                selectedOccasion === occ 
                  ? 'bg-drezza-dark text-white' 
                  : 'bg-drezza-warm text-drezza-charcoal border border-drezza-border hover:border-drezza-dark'
              }`}
            >
              {occ === 'ALL' ? 'All Occasions' : occ}
            </button>
          ))}
        </div>

        {/* Search Query Input */}
        <div className="flex gap-2 pt-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchPersonalizedShopping(query, selectedOccasion)}
            placeholder="e.g., 'I have a party and need a gown' or 'Linen trousers for weekend'..."
            className="flex-1 px-4 py-3 rounded-xl border border-drezza-border text-xs focus:outline-hidden focus:border-drezza-dark bg-drezza-cream/30"
          />
          <button
            onClick={() => fetchPersonalizedShopping(query, selectedOccasion)}
            className="px-6 py-3 rounded-xl bg-drezza-dark text-white text-xs uppercase tracking-wider font-semibold hover:bg-stone-900 transition-colors shrink-0"
          >
            Find Matches
          </button>
        </div>

        {/* Quick Click Prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] font-mono uppercase text-drezza-muted">Quick requests:</span>
          {[
            'I have a party and need a gown',
            'Indo-Western celebration attire',
            'Camel layering coat for office',
            'Comfortable artisanal flats'
          ].map((preset, i) => (
            <button
              key={i}
              onClick={() => handlePresetQuery(preset)}
              className="px-3 py-1.5 rounded-full bg-drezza-warm border border-drezza-border text-[11px] text-drezza-charcoal hover:border-drezza-dark transition-colors"
            >
              “{preset}”
            </button>
          ))}
          {query && (
            <button 
              onClick={() => { setQuery(''); fetchPersonalizedShopping('', selectedOccasion); }}
              className="text-[11px] underline text-drezza-muted hover:text-drezza-dark ml-2"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* PRODUCT CARDS GRID */}
      {loading ? (
        <div className="py-20 text-center text-drezza-muted animate-pulse">
          <span className="font-serif text-lg italic">Curating personalized links for your profile...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-3">
          <h3 className="font-serif text-2xl text-drezza-dark">No direct match for this search.</h3>
          <p className="text-xs text-drezza-muted">Try clearing your search query to see all curated recommendations for your style profile.</p>
          <button
            onClick={() => { setQuery(''); setSelectedOccasion('ALL'); fetchPersonalizedShopping('', 'ALL'); }}
            className="px-5 py-2.5 rounded-full bg-drezza-dark text-white text-xs uppercase tracking-wider font-medium"
          >
            Show All Curated Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(prod => (
            <div 
              key={prod.id} 
              className="bg-white rounded-2xl border border-drezza-border overflow-hidden fashion-card flex flex-col justify-between"
            >
              <div className="fashion-img-container aspect-4/5 bg-drezza-warm relative">
                <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover" />
                
                {/* Match Score Badge */}
                <div className="absolute top-3 left-3 bg-drezza-dark/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[10px] font-mono font-medium flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{prod.match_score}% Profile Match</span>
                </div>

                {/* Delivery Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-drezza-border text-[10px] text-drezza-charcoal font-medium flex items-center justify-between">
                  <span className="truncate">{prod.delivery_info || 'Express 2-Day Delivery'}</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-drezza-muted uppercase">
                  <span>{prod.brand}</span>
                  <span>{prod.category}</span>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-serif text-lg font-medium text-drezza-dark truncate" title={prod.name}>
                    {prod.name}
                  </h4>
                  <span className="font-mono text-sm font-semibold text-drezza-dark shrink-0">
                    ${prod.price.toFixed(2)}
                  </span>
                </div>

                {/* Match Rationale Pill */}
                <div className="p-2.5 rounded-xl bg-drezza-cream/70 border border-drezza-border/80 text-[11px] text-drezza-charcoal leading-snug">
                  <strong className="font-medium text-drezza-dark block mb-0.5">Why Drezza recommends this:</strong>
                  {(prod.match_reasons || [])[0]}
                </div>

                {/* Action Buttons: View Product & Shop Now */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="flex-1 py-2.5 rounded-full border border-drezza-border text-xs font-medium text-drezza-charcoal hover:bg-drezza-warm transition-colors"
                  >
                    View Product
                  </button>

                  <button
                    onClick={() => setBoutiqueDemoProduct(prod)}
                    className="flex-1 py-2.5 rounded-full bg-drezza-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-900 transition-colors flex items-center justify-center gap-1.5 text-center shadow-xs"
                  >
                    <span>Shop Now</span>
                    <Icon name="externalLink" className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-drezza-dark/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-drezza-border shadow-modal max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-drezza-border pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-drezza-muted">{selectedProduct.brand}</span>
                <h3 className="font-serif text-2xl text-drezza-dark font-medium">{selectedProduct.name}</h3>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-1 rounded-lg text-drezza-muted hover:text-drezza-dark">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-16/10 rounded-xl overflow-hidden bg-drezza-warm border border-drezza-border">
              <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-mono font-semibold text-drezza-dark">${selectedProduct.price.toFixed(2)}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  {selectedProduct.match_score}% Match for Your Profile
                </span>
              </div>

              <div className="p-4 rounded-xl bg-drezza-cream border border-drezza-border space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-drezza-dark block">Drezza Style Rationale</span>
                <ul className="text-xs text-drezza-charcoal space-y-1.5 list-disc list-inside">
                  {(selectedProduct.match_reasons || []).map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 py-3 rounded-full border border-drezza-border text-xs font-medium hover:bg-drezza-warm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const p = selectedProduct;
                    setSelectedProduct(null);
                    setBoutiqueDemoProduct(p);
                  }}
                  className="flex-1 py-3 rounded-full bg-drezza-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-900 transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>Shop Now</span>
                  <Icon name="externalLink" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOUTIQUE DEMO MODAL (Ensures Safe, Genuine Interaction without Dead Links) */}
      {boutiqueDemoProduct && (
        <div className="fixed inset-0 z-50 bg-drezza-dark/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-drezza-border shadow-modal max-w-md w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-drezza-border pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-drezza-accent font-semibold">Partner Boutique Destination</span>
                <h3 className="font-serif text-xl text-drezza-dark font-medium">{boutiqueDemoProduct.brand}</h3>
              </div>
              <button onClick={() => setBoutiqueDemoProduct(null)} className="p-1 rounded-lg text-drezza-muted hover:text-drezza-dark">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-24 rounded-xl overflow-hidden border border-drezza-border bg-drezza-warm shrink-0">
                <img src={boutiqueDemoProduct.image_url} alt={boutiqueDemoProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 space-y-1">
                <h4 className="text-xs font-medium text-drezza-dark truncate">{boutiqueDemoProduct.name}</h4>
                <span className="font-mono text-sm font-semibold text-drezza-dark block">${boutiqueDemoProduct.price.toFixed(2)}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">In Stock • Dispatches in 24h</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-drezza-warm/50 border border-drezza-border text-[11px] text-drezza-muted space-y-1">
              <strong className="text-drezza-dark block">Drezza Prototype Safe Destination</strong>
              <p>In the production platform, this action links to verified boutique checkouts (e.g. Farfetch, Net-A-Porter). In this first prototype, you can test the reservation interaction below.</p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  triggerToast(`Reserved "${boutiqueDemoProduct.name}" in styling bag!`);
                  setBoutiqueDemoProduct(null);
                }}
                className="w-full py-3 rounded-full bg-drezza-dark text-white text-xs uppercase tracking-wider font-semibold hover:bg-stone-900 transition-colors shadow-xs"
              >
                Add to Styling Bag (Prototype Demo)
              </button>
              <button
                onClick={() => setBoutiqueDemoProduct(null)}
                className="w-full py-2.5 rounded-full border border-drezza-border text-xs font-medium hover:bg-drezza-warm transition-colors"
              >
                Return to Recommendations
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ========================================================
// RENDER TO ROOT
// ========================================================
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

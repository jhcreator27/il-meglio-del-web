import React, { useState } from 'react';
import { Search, Menu, X, Bookmark, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenSubmit: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenSaved,
  onOpenSubmit,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'virali', label: 'VIRALI' },
    { id: 'news', label: 'NEWS' },
    { id: 'video', label: 'VIDEO' },
    { id: 'sicilia', label: 'SICILIA' },
    { id: 'sport', label: 'SPORT' },
    { id: 'cultura', label: 'CULTURA' },
    { id: 'spettacolo', label: 'SPETTACOLO' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    if (id === 'home' || id === 'virali' || id === 'news' || id === 'video' || id === 'sicilia') {
      const el = document.getElementById(id === 'home' ? 'hero' : id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-45 w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo (Official Logo Asset) */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFD400] shadow-lg group-hover:scale-105 transition-transform shrink-0 bg-black">
            <img
              src="/src/assets/images/official_brand_logo_1791019645640.jpg"
              alt="Il Meglio del Web Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-syne font-black text-base sm:text-lg tracking-tight text-white group-hover:text-[#FFD400] transition-colors leading-none">
              IL MEGLIO <span className="text-[#FFD400]">DEL WEB</span>
            </span>
            <span className="text-[9px] tracking-widest text-[#A3A3A3] uppercase mt-1">
              Sicilia Digital Magazine
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-xs uppercase tracking-wider font-syne font-bold transition-colors relative py-2 ${
                activeTab === link.id ? 'text-[#FFD400]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD400]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-full bg-[#141414] hover:bg-[#222222] border border-[#262626] flex items-center justify-center text-white transition-colors"
            title="Cerca"
          >
            <Search className="w-4 h-4 text-[#FFD400]" />
          </button>

          {/* Saved Items Trigger */}
          <button
            onClick={onOpenSaved}
            className="relative w-10 h-10 rounded-full bg-[#141414] hover:bg-[#222222] border border-[#262626] hidden sm:flex items-center justify-center text-white transition-colors"
            title="Contenuti Salvati"
          >
            <Bookmark className="w-4 h-4 text-[#FFD400]" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C62828] text-white text-[9px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Submit CTA */}
          <button
            onClick={onOpenSubmit}
            className="hidden md:flex items-center gap-2 bg-[#FFD400] hover:bg-[#ffc200] text-[#050505] font-syne font-bold text-xs uppercase px-4 py-2.5 rounded-full transition-all shadow-md shadow-[#FFD400]/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Segnala Virale</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-[#222222] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-xs uppercase tracking-wider font-syne font-bold py-2.5 px-3 rounded-lg bg-[#141414] ${
                  activeTab === link.id ? 'text-[#FFD400] border border-[#FFD400]/30' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSaved(); }}
              className="w-full py-3 bg-[#1A1A1A] text-white font-syne font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 border border-[#333333]"
            >
              <Bookmark className="w-4 h-4 text-[#FFD400]" />
              <span>Contenuti Salvati ({savedCount})</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSubmit(); }}
              className="w-full py-3 bg-[#FFD400] text-[#050505] font-syne font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Segnala un Contenuto Virale</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

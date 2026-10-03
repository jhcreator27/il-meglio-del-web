import React from 'react';
import { Instagram, Youtube, Facebook, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030303] text-white border-t border-[#1F1F1F] pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#FFD400] shrink-0 bg-black">
                <img
                  src="/src/assets/images/official_brand_logo_1791019645640.jpg"
                  alt="Il Meglio del Web Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-syne font-extrabold text-xl tracking-wider text-white">
                IL MEGLIO <span className="text-[#FFD400]">DEL WEB</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm">
              “Il meglio del web siciliano, tutto in un unico posto.”
            </p>
            <p className="text-xs text-neutral-500 max-w-sm">
              La piattaforma editoriale e social che raccoglie, seleziona e racconta le storie, i video e le notizie più virali della Sicilia.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#141414] hover:bg-[#C62828] border border-[#262626] flex items-center justify-center text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#141414] hover:bg-black border border-[#262626] flex items-center justify-center text-white hover:text-[#FFD400] transition-colors">
                <span className="font-bold text-xs font-syne">TK</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#141414] hover:bg-blue-900 border border-[#262626] flex items-center justify-center text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#141414] hover:bg-red-900 border border-[#262626] flex items-center justify-center text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* CONTENUTI */}
          <div className="space-y-4">
            <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-[#FFD400]">
              CONTENUTI
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => { setActiveTab('virali'); document.getElementById('virali')?.scrollIntoView({behavior:'smooth'}); }} className="hover:text-white transition-colors">Virali</button></li>
              <li><button onClick={() => { setActiveTab('news'); document.getElementById('news')?.scrollIntoView({behavior:'smooth'}); }} className="hover:text-white transition-colors">News</button></li>
              <li><button onClick={() => { setActiveTab('video'); document.getElementById('video')?.scrollIntoView({behavior:'smooth'}); }} className="hover:text-white transition-colors">Video</button></li>
              <li><button onClick={() => { setActiveTab('sicilia'); document.getElementById('sicilia')?.scrollIntoView({behavior:'smooth'}); }} className="hover:text-white transition-colors">Cultura</button></li>
            </ul>
          </div>

          {/* SICILIA */}
          <div className="space-y-4">
            <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-[#FFD400]">
              SICILIA
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-neutral-400">
              <li><span>Palermo</span></li>
              <li><span>Catania</span></li>
              <li><span>Messina</span></li>
              <li><span>Siracusa</span></li>
              <li><span>Ragusa</span></li>
              <li><span>Trapani</span></li>
              <li><span>Agrigento</span></li>
              <li><span>Enna</span></li>
              <li><span>Caltanissetta</span></li>
            </ul>
          </div>

          {/* INFO */}
          <div className="space-y-4">
            <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-[#FFD400]">
              INFO
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#about" onClick={(e) => {e.preventDefault(); alert("Il Meglio del Web è il media hub digitale di riferimento per la Sicilia.");}} className="hover:text-white transition-colors">Chi siamo</a></li>
              <li><a href="#contacts" onClick={(e) => {e.preventDefault(); alert("Contatta la redazione: redazione@ilmegliodelweb.it");}} className="hover:text-white transition-colors">Contatti</a></li>
              <li><a href="#privacy" onClick={(e) => {e.preventDefault(); alert("Informativa sulla privacy conforme al GDPR.");}} className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#191919] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 IL MEGLIO DEL WEB · Tutti i diritti riservati. Fatto con orgoglio in Sicilia.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[#141414] hover:bg-[#222222] text-white rounded-full transition-colors"
          >
            <span>Torna su</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FFD400]" />
          </button>
        </div>

      </div>
    </footer>
  );
};

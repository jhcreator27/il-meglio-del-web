import React from 'react';
import { Sparkles, ArrowDown, Flame, Compass } from 'lucide-react';

interface HeroProps {
  onDiscover: () => void;
  onOpenSubmit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscover, onOpenSubmit }) => {
  return (
    <section id="hero" className="relative bg-[#050505] text-white pt-12 pb-20 overflow-hidden border-b border-[#222222]">
      {/* Decorative background grid and color glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C62828]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#333333] px-4 py-1.5 rounded-full text-xs font-syne font-bold uppercase tracking-wider text-[#FFD400] shadow-md">
            <Flame className="w-4 h-4 text-[#C62828]" />
            <span>I CONTENUTI PIÙ VIRALI DELLA SICILIA</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6">
            IL MEGLIO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD400] via-[#FFEA79] to-[#C62828]">
              DEL WEB
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#C0C0C0] font-normal max-w-2xl mx-auto mb-4">
            “Il meglio del web siciliano, tutto in un unico posto.”
          </p>
          <p className="text-sm text-[#888888] max-w-xl mx-auto">
            Le storie, i video, i meme e le notizie che fanno parlare la Sicilia da Palermo a Catania, passando per ogni borgo e piazza digitale.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onDiscover}
            className="w-full sm:w-auto px-8 py-4 bg-[#FFD400] hover:bg-[#ffc200] text-[#050505] font-syne font-extrabold text-sm uppercase tracking-wider rounded-full transition-all shadow-lg shadow-[#FFD400]/20 flex items-center justify-center gap-3 transform hover:-translate-y-1"
          >
            <Compass className="w-4 h-4" />
            <span>SCOPRI I CONTENUTI</span>
          </button>
          <button
            onClick={onOpenSubmit}
            className="w-full sm:w-auto px-8 py-4 bg-[#171717] hover:bg-[#222222] border border-[#333333] hover:border-[#FFD400] text-white font-syne font-bold text-sm uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-[#FFD400]" />
            <span>INVIA UNA SEGNALAZIONE</span>
          </button>
        </div>

        {/* Large Editorial Visual Composition */}
        <div className="relative rounded-3xl overflow-hidden border border-[#262626] bg-[#111111] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          
          <img
            src="/src/assets/images/hero_sicilia_magazine_1791018828683.jpg"
            alt="Il Meglio del Web Sicilia"
            referrerPolicy="no-referrer"
            className="w-full h-[380px] sm:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-25 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-xs text-[#FFD400] font-bold uppercase tracking-widest mb-2">
                <span>PRIMO PIANO</span>
                <span>·</span>
                <span>PALERMO & CATANIA</span>
              </div>
              <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white leading-tight mb-2">
                Il fermento digitale della nuova Sicilia creativa e social-first
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">
                Dalle riprese nei mercati storici alle community TikTok che raccontano tradizioni e modernità con uno sguardo unico.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shrink-0">
              <div className="text-center">
                <span className="block font-syne font-extrabold text-xl text-[#FFD400]">1.2M+</span>
                <span className="text-[10px] text-neutral-400 uppercase">Visualizzazioni</span>
              </div>
              <div className="w-[1px] h-8 bg-neutral-700" />
              <div className="text-center">
                <span className="block font-syne font-extrabold text-xl text-[#C62828]">45K</span>
                <span className="text-[10px] text-neutral-400 uppercase">Condivisioni</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

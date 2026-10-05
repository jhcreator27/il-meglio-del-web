import React from 'react';
import { Compass, Shield, Heart } from 'lucide-react';
import { PollWidget } from './PollWidget';

export const SiciliaSection: React.FC = () => {
  return (
    <section id="sicilia" className="py-24 bg-[#050505] relative overflow-hidden border-b border-[#1F1F1F]">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FFD400]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C62828]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Text Column */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] px-3.5 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider text-[#FFD400] mb-4">
              <Compass className="w-4 h-4 text-[#C62828]" />
              <span>IDENTITÀ & TERRITORIO</span>
            </div>
            
            <h2 className="font-syne font-black text-4xl sm:text-6xl text-white tracking-tight leading-none mb-6">
              LA SICILIA, <br />
              <span className="text-[#FFD400]">RACCONTATA DA NOI.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
              Un mosaico millenario di culture, arte, colori e voci che oggi vive e si rinnova attraverso il web, i social media e le nuove generazioni di creator digitali.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#111111] p-5 rounded-2xl border border-[#222222]">
                <div className="w-10 h-10 rounded-xl bg-[#FFD400]/10 flex items-center justify-center text-[#FFD400] mb-3 font-syne font-bold text-lg">
                  01
                </div>
                <h3 className="font-syne font-bold text-white text-base mb-1">Cultura & Tradizioni</h3>
                <p className="text-xs text-neutral-400">
                  Dalla pittura dei carretti ai pupi, dai miti ellenici alle feste patronali raccontate in diretta digitale.
                </p>
              </div>

              <div className="bg-[#111111] p-5 rounded-2xl border border-[#222222]">
                <div className="w-10 h-10 rounded-xl bg-[#C62828]/10 flex items-center justify-center text-[#C62828] mb-3 font-syne font-bold text-lg">
                  02
                </div>
                <h3 className="font-syne font-bold text-white text-base mb-1">Street Culture & Web</h3>
                <p className="text-xs text-neutral-400">
                  Creator, comici, chef e storyteller che portano la lingua e l'ironia siciliana sui feed di tutto il mondo.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-syne font-bold uppercase tracking-wider text-neutral-300">
              <span className="flex items-center gap-1.5 text-[#FFD400]">
                <Shield className="w-4 h-4" /> 9 Province
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-[#C62828]">
                <Heart className="w-4 h-4" /> Orgoglio Mediterraneo
              </span>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#222222] bg-[#111111] shadow-2xl aspect-[4/3]">
              <img
                src="/src/assets/images/sicilia_traditions_banner_1791018886658.jpg"
                alt="Sicilia Tradizioni"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/75 backdrop-blur-md rounded-2xl border border-white/10">
                <span className="text-[#FFD400] text-xs font-syne font-bold uppercase tracking-widest block mb-1">
                  PATRIMONIO VISIVO
                </span>
                <p className="text-white font-syne font-bold text-lg">
                  L'arte popolare siciliana incontra il linguaggio dei media digitali contemporanei.
                </p>
              </div>
            </div>

            {/* Poll Widget Added Here */}
            <PollWidget />
          </div>

        </div>

      </div>
    </section>
  );
};

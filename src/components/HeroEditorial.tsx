import React from 'react';
import { ContentItem } from '../types';
import { Flame, ArrowRight, Eye, Bookmark, Share2 } from 'lucide-react';

interface HeroEditorialProps {
  heroItem: ContentItem;
  secondaryItems: ContentItem[];
  onSelectContent: (item: ContentItem) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  savedIds: string[];
  onOpenShare: (item: ContentItem, e: React.MouseEvent) => void;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  heroItem,
  secondaryItems,
  onSelectContent,
  onToggleSave,
  savedIds,
  onOpenShare
}) => {
  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <section id="hero" className="py-12 bg-[#050505] border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header Title */}
        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] px-3.5 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider text-[#FFD400] mb-4">
            <Flame className="w-3.5 h-3.5 text-[#C62828]" />
            <span>IL MAGAZINE DIGITALE SICILIANO</span>
          </div>
          <h1 className="font-syne font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white mb-3">
            IL MEGLIO <span className="text-[#FFD400]">DEL WEB</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            Le storie, i video e le notizie che fanno parlare la Sicilia, curate in tempo reale dai feed e dalle piazze digitali.
          </p>
        </div>

        {/* Magazine Grid Layout: Hero Main + 2 Secondary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Hero Story (Takes 2 cols on desktop) */}
          <div
            onClick={() => onSelectContent(heroItem)}
            className="lg:col-span-2 group bg-[#111111] rounded-3xl overflow-hidden border border-[#222222] hover:border-[#FFD400]/40 transition-all duration-300 flex flex-col cursor-pointer shadow-xl relative"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
              <img
                src={heroItem.image}
                alt={heroItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#C62828] text-white text-[10px] font-syne font-black uppercase px-3 py-1 rounded-full">
                  🔥 TRENDING
                </span>
                <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-syne font-bold uppercase px-3 py-1 rounded-full border border-white/10">
                  {heroItem.province}
                </span>
              </div>

              {/* Action Buttons Top Right */}
              <div className="absolute top-4 right-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => onToggleSave(heroItem.id, e)}
                  className={`w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center transition-colors ${
                    isSaved(heroItem.id) ? 'text-[#FFD400] bg-black' : 'text-white hover:text-[#FFD400]'
                  }`}
                  title="Salva"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved(heroItem.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={(e) => onOpenShare(heroItem, e)}
                  className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:text-[#FFD400] transition-colors"
                  title="Condividi"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom details on image */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-neutral-300">
                <span className="flex items-center gap-1 font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                  <Eye className="w-3.5 h-3.5 text-[#FFD400]" /> {heroItem.viewsFormatted} visualizzazioni
                </span>
                <span className="bg-[#FFD400] text-black font-syne font-extrabold text-[10px] px-2.5 py-1 rounded">
                  {heroItem.timestamp}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
              <div>
                <span className="text-xs text-[#FFD400] font-syne font-bold uppercase tracking-wider block mb-2">
                  {heroItem.category} · {heroItem.author}
                </span>
                <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white group-hover:text-[#FFD400] transition-colors leading-tight mb-3">
                  {heroItem.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed mb-6">
                  {heroItem.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
                <span className="text-xs font-syne font-bold text-[#FFD400] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  SCOPRI LA STORIA <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-[11px] text-neutral-500">
                  Fonte: {heroItem.originalSource?.name || 'Redazione'}
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Stories Column (Takes 1 col) */}
          <div className="flex flex-col gap-6">
            {secondaryItems.slice(0, 2).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectContent(item)}
                className="group bg-[#111111] rounded-2xl overflow-hidden border border-[#222222] hover:border-[#FFD400]/40 transition-all duration-300 flex flex-col cursor-pointer p-5 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="bg-[#1A1A1A] text-[#FFD400] text-[10px] font-syne font-bold uppercase px-2.5 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => onToggleSave(item.id, e)}
                      className={`text-xs ${isSaved(item.id) ? 'text-[#FFD400]' : 'text-neutral-400 hover:text-white'}`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved(item.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => onOpenShare(item, e)}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-syne font-bold text-base text-white group-hover:text-[#FFD400] transition-colors leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mb-4">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-3 border-t border-[#1C1C1C]">
                  <span>{item.province} · {item.timestamp}</span>
                  <span className="text-[#FFD400] font-medium flex items-center gap-1">
                    Leggi <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

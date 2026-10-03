import React from 'react';
import { ContentItem } from '../types';
import { Newspaper, Calendar, ArrowRight, Bookmark, Share2 } from 'lucide-react';

interface NewsGridProps {
  items: ContentItem[];
  onSelectContent: (item: ContentItem) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  savedIds: string[];
  onOpenShare: (item: ContentItem, e: React.MouseEvent) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({
  items,
  onSelectContent,
  onToggleSave,
  savedIds,
  onOpenShare
}) => {
  const isSaved = (id: string) => savedIds.includes(id);

  if (items.length === 0) {
    return (
      <section id="news" className="py-20 bg-[#050505] border-b border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-400 text-sm">Nessuna notizia trovata con i filtri selezionati.</p>
        </div>
      </section>
    );
  }

  const largeItem = items[0];
  const smallItems = items.slice(1, 5);

  return (
    <section id="news" className="py-20 bg-[#050505] border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FFD400] text-xs font-syne font-bold uppercase tracking-widest mb-2">
              <Newspaper className="w-4 h-4 text-[#FFD400]" />
              <span>CRONACA E TERRITORIO</span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl text-white tracking-tight">
              ULTIME DALLA SICILIA
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md">
            Informazione in tempo reale, reportage, cultura e storie dalle 9 province siciliane.
          </p>
        </div>

        {/* Layout: 1 Large Article + 4 Small Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Large Article */}
          <div
            onClick={() => onSelectContent(largeItem)}
            className="lg:col-span-2 group bg-[#111111] rounded-3xl overflow-hidden border border-[#222222] hover:border-[#FFD400]/40 transition-all duration-300 flex flex-col cursor-pointer shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
              <img
                src={largeItem.image}
                alt={largeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#FFD400] text-black text-[10px] font-syne font-black uppercase px-3 py-1 rounded">
                  {largeItem.category}
                </span>
                <span className="bg-[#C62828] text-white text-[10px] font-syne font-black uppercase px-3 py-1 rounded">
                  NUOVO
                </span>
                <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-syne font-bold uppercase px-3 py-1 rounded border border-white/10">
                  {largeItem.province}
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => onToggleSave(largeItem.id, e)}
                  className={`w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center transition-colors ${
                    isSaved(largeItem.id) ? 'text-[#FFD400]' : 'text-white hover:text-[#FFD400]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved(largeItem.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={(e) => onOpenShare(largeItem, e)}
                  className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:text-[#FFD400] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-4 left-6 text-xs text-neutral-300 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#FFD400]" /> {largeItem.date} ({largeItem.timestamp})
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-syne font-extrabold text-2xl text-white group-hover:text-[#FFD400] transition-colors leading-snug mb-3">
                  {largeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-6">
                  {largeItem.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between">
                <span className="text-xs text-neutral-400">Di {largeItem.author}</span>
                <span className="text-xs font-syne font-bold text-[#FFD400] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Leggi articolo <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* 4 Small Articles Column */}
          <div className="flex flex-col gap-4">
            {smallItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectContent(item)}
                className="group bg-[#111111] rounded-2xl overflow-hidden border border-[#222222] hover:border-[#FFD400]/40 transition-all duration-300 flex items-center gap-4 p-4 cursor-pointer shadow-md"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-neutral-900 shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {item.badge === 'NUOVO' && (
                    <span className="absolute top-1 left-1 bg-[#C62828] text-white text-[8px] font-syne font-bold px-1.5 py-0.5 rounded">
                      NUOVO
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-[#FFD400] font-syne font-bold uppercase">
                        {item.province}
                      </span>
                      <span className="text-[10px] text-neutral-500">· {item.timestamp}</span>
                    </div>
                    <h4 className="font-syne font-bold text-sm text-white group-hover:text-[#FFD400] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#1C1C1C]" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[11px] text-neutral-400">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => onToggleSave(item.id, e)}
                        className={`text-xs ${isSaved(item.id) ? 'text-[#FFD400]' : 'text-neutral-500 hover:text-white'}`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved(item.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => onOpenShare(item, e)}
                        className="text-xs text-neutral-500 hover:text-white"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

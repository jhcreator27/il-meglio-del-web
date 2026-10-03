import React from 'react';
import { ContentItem } from '../types';
import { Flame, Eye, ArrowRight, Bookmark, Share2 } from 'lucide-react';

interface TrendingOraProps {
  items: ContentItem[];
  onSelectContent: (item: ContentItem) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  savedIds: string[];
  onOpenShare: (item: ContentItem, e: React.MouseEvent) => void;
}

export const TrendingOra: React.FC<TrendingOraProps> = ({
  items,
  onSelectContent,
  onToggleSave,
  savedIds,
  onOpenShare
}) => {
  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <section id="virali" className="py-16 bg-[#0A0A0A] border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FFD400] text-xs font-syne font-bold uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 text-[#C62828]" />
              <span>CLASSIFICA VIRALE</span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl text-white tracking-tight">
              🔥 TRENDING ORA
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md">
            I contenuti più visualizzati e condivisi in Sicilia nelle ultime ore, classificati in tempo reale.
          </p>
        </div>

        {/* Numbered Grid (01 to 05) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 5).map((item, idx) => {
            const indexNumber = `0${idx + 1}`;
            return (
              <div
                key={item.id}
                onClick={() => onSelectContent(item)}
                className="group bg-[#111111] rounded-2xl overflow-hidden border border-[#222222] hover:border-[#FFD400]/40 transition-all duration-300 flex flex-col cursor-pointer p-5 relative shadow-lg"
              >
                {/* Top Index & Views */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-syne font-black text-3xl text-[#FFD400]/40 group-hover:text-[#FFD400] transition-colors">
                    {indexNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#1A1A1A] text-neutral-300 text-[11px] font-syne font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#262626]">
                      <Eye className="w-3.5 h-3.5 text-[#FFD400]" /> {item.viewsFormatted} visualizzazioni
                    </span>
                  </div>
                </div>

                {/* Thumbnail Preview */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#C62828] text-white text-[9px] font-syne font-black uppercase px-2.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <h3 className="font-syne font-bold text-lg text-white group-hover:text-[#FFD400] transition-colors leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mb-6">
                  {item.excerpt}
                </p>

                {/* Footer actions */}
                <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between mt-auto">
                  <span className="text-xs text-neutral-500">{item.province} · {item.timestamp}</span>
                  
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => onToggleSave(item.id, e)}
                      className={`w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-colors ${
                        isSaved(item.id) ? 'text-[#FFD400]' : 'text-neutral-400 hover:text-white'
                      }`}
                      title="Salva"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved(item.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => onOpenShare(item, e)}
                      className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-[#262626] flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                      title="Condividi"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

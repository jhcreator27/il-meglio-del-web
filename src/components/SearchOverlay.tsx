import React, { useState } from 'react';
import { ContentItem } from '../types';
import { Search, X, ArrowRight, Eye } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: ContentItem[];
  onSelectContent: (item: ContentItem) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  items,
  onSelectContent
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = items.filter(item => 
    query.trim() === '' || 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    item.province.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Search Header Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFD400] text-black flex items-center justify-center font-syne font-black">
            MW
          </div>
          <span className="font-syne font-bold text-lg text-white">RICERCA GLOBALE</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-[#333333] flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input Box */}
      <div className="max-w-4xl mx-auto w-full mb-10">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#FFD400]" />
          <input
            type="text"
            placeholder="Cerca una storia, una città o un argomento…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-[#141414] border-2 border-[#333333] focus:border-[#FFD400] rounded-2xl py-5 pl-16 pr-6 text-lg sm:text-xl text-white placeholder-neutral-500 focus:outline-none shadow-2xl transition-all"
          />
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-4xl mx-auto w-full space-y-4 pb-12">
        <p className="text-xs uppercase font-syne font-bold text-neutral-400">
          Risultati trovati ({results.length})
        </p>

        {results.length === 0 ? (
          <div className="text-center py-16 bg-[#111111] rounded-2xl border border-[#222222]">
            <p className="text-neutral-400 text-sm">Nessun contenuto trovato per "{query}". Prova con un'altra parola chiave.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => { onSelectContent(item); onClose(); }}
                className="group bg-[#111111] hover:bg-[#171717] border border-[#222222] hover:border-[#FFD400]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-all shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#FFD400] text-black text-[9px] font-syne font-black uppercase px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        {item.province} · {item.timestamp}
                      </span>
                    </div>
                    <h3 className="font-syne font-bold text-base text-white group-hover:text-[#FFD400] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#FFD400]" /> {item.viewsFormatted}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] group-hover:bg-[#FFD400] group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

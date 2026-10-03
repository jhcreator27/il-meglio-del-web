import React from 'react';
import { ContentItem } from '../types';
import { Bookmark, X, ArrowRight, Trash2 } from 'lucide-react';

interface SavedPageProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: ContentItem[];
  onSelectContent: (item: ContentItem) => void;
  onRemoveSave: (id: string) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({
  isOpen,
  onClose,
  savedItems,
  onSelectContent,
  onRemoveSave
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-3">
          <Bookmark className="w-6 h-6 text-[#FFD400]" />
          <span className="font-syne font-black text-xl text-white">CONTENUTI SALVATI ({savedItems.length})</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-[#333333] flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content List */}
      <div className="max-w-4xl mx-auto w-full space-y-4 pb-12">
        {savedItems.length === 0 ? (
          <div className="text-center py-20 bg-[#111111] rounded-3xl border border-[#222222]">
            <Bookmark className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="font-syne font-bold text-lg text-white mb-2">Nessun contenuto salvato</h3>
            <p className="text-neutral-400 text-sm max-w-sm mx-auto">
              Clicca sull'icona del segnalibro (♡ SALVA) su qualsiasi articolo o video per ritrovarlo qui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {savedItems.map((item) => (
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

                <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onRemoveSave(item.id)}
                    className="p-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#C62828] text-neutral-400 hover:text-white transition-colors"
                    title="Rimuovi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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

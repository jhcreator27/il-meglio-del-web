import React, { useState } from 'react';
import { ContentItem } from '../types';
import { X, Calendar, Eye, Share2, Bookmark, ExternalLink, ArrowRight, MessageSquare, Send, Heart } from 'lucide-react';

interface ArticleModalProps {
  item: ContentItem | null;
  onClose: () => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  savedIds: string[];
  onOpenShare: (item: ContentItem, e: React.MouseEvent) => void;
  allItems: ContentItem[];
  onSelectContent: (item: ContentItem) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  item,
  onClose,
  onToggleSave,
  savedIds,
  onOpenShare,
  allItems,
  onSelectContent
}) => {
  if (!item) return null;

  const isSaved = savedIds.includes(item.id);
  const [likes, setLikes] = useState(184);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([
    "Articolo spettacolare, la Sicilia offre sempre spunti unici!",
    "Segnalazione fantastica, condiviso subito su WhatsApp."
  ]);
  const [newComment, setNewComment] = useState('');

  const relatedItems = allItems.filter(i => i.id !== item.id).slice(0, 4);

  const handleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1);
      setLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([newComment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-[#222222] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Sticky Top Bar */}
        <div className="sticky top-0 bg-[#111111]/95 backdrop-blur-md px-6 py-4 border-b border-[#222222] flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="bg-[#FFD400] text-black font-syne font-black text-[10px] uppercase px-2.5 py-1 rounded">
              {item.category}
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              {item.province}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleSave(item.id, e)}
              className={`w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-colors ${
                isSaved ? 'text-[#FFD400]' : 'text-neutral-400 hover:text-white'
              }`}
              title="Salva"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => onOpenShare(item, e)}
              className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-[#333333] flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              title="Condividi"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-[#333333] flex items-center justify-center text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          <h1 className="font-syne font-black text-3xl sm:text-5xl text-white leading-tight">
            {item.title}
          </h1>

          {/* Author, Date & Source Attribution */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#1F1F1F] text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD400] text-black font-syne font-bold flex items-center justify-center text-sm">
                {item.author.charAt(0)}
              </div>
              <div>
                <span className="text-white font-semibold block">{item.author}</span>
                <span>Redazione Il Meglio del Web</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#FFD400]" /> {item.date} ({item.timestamp})</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-[#FFD400]" /> {item.viewsFormatted}</span>
            </div>
          </div>

          {/* Original Source Banner if republished */}
          {item.originalSource && (
            <div className="bg-[#171717] border border-[#262626] p-4 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <span className="font-semibold text-[#FFD400]">Fonte originale:</span>
                <span>{item.originalSource.name}</span>
              </div>
              <a
                href={item.originalSource.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#FFD400] font-syne font-bold flex items-center gap-1 hover:underline"
              >
                <span>Visita fonte</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-neutral-900 border border-[#222222]">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Text */}
          <div className="text-neutral-200 text-base sm:text-lg leading-relaxed space-y-6">
            <p className="font-semibold text-white">
              {item.excerpt}
            </p>
            <p>
              {item.content}
            </p>
            <p>
              La Sicilia si conferma un incubatore straordinario di cultura digitale, tradizioni e viralità. La redazione continuerà a monitorare ogni aggiornamento in tempo reale dalle piazze e dai social network.
            </p>
          </div>

          {/* Like & Share Action bar */}
          <div className="flex items-center justify-between pt-6 border-t border-[#1F1F1F]">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-syne font-bold transition-all ${
                liked ? 'bg-[#C62828] text-white' : 'bg-[#171717] text-neutral-300 hover:bg-[#222222]'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current text-white' : ''}`} />
              <span>{likes} Mi piace</span>
            </button>

            <button
              onClick={(e) => onOpenShare(item, e)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#222222] text-white text-xs font-syne font-bold transition-all"
            >
              <Share2 className="w-4 h-4 text-[#FFD400]" />
              <span>Condividi Storia</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="pt-8 border-t border-[#1F1F1F] space-y-6">
            <h3 className="font-syne font-bold text-lg text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#FFD400]" /> Commenti ({comments.length})
            </h3>

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Scrivi un commento..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-grow bg-[#171717] border border-[#262626] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD400]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#FFD400] text-black font-syne font-bold text-xs uppercase rounded-xl flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Invia
              </button>
            </form>

            <div className="space-y-3">
              {comments.map((comm, idx) => (
                <div key={idx} className="bg-[#171717] p-4 rounded-xl border border-[#262626]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-syne font-bold text-[#FFD400]">Utente Verificato</span>
                    <span className="text-[10px] text-neutral-500">Adesso</span>
                  </div>
                  <p className="text-xs text-neutral-300">{comm}</p>
                </div>
              ))}
            </div>
          </div>

          {/* POTREBBE INTERESSARTI ANCHE (4 related contents) */}
          <div className="pt-12 border-t border-[#1F1F1F]">
            <h3 className="font-syne font-black text-xl text-white mb-6">
              POTREBBE INTERESSARTI ANCHE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedItems.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectContent(rel)}
                  className="group bg-[#171717] rounded-2xl overflow-hidden border border-[#262626] hover:border-[#FFD400]/40 p-4 cursor-pointer flex flex-col justify-between shadow"
                >
                  <div>
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-neutral-900">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] text-[#FFD400] font-syne font-bold uppercase block mb-1">
                      {rel.province}
                    </span>
                    <h4 className="font-syne font-bold text-sm text-white group-hover:text-[#FFD400] transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#222222] flex items-center justify-between text-[11px] text-neutral-400">
                    <span>{rel.timestamp}</span>
                    <span className="text-[#FFD400] flex items-center gap-1">Leggi <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ContentItem } from '../types';
import { X, Copy, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  item: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(item.title + ' - ' + shareUrl)}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(item.title)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#222222] rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-white font-syne font-bold text-base">
            <Share2 className="w-5 h-5 text-[#FFD400]" />
            <span>CONDIVIDI CONTENUTO</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] hover:bg-[#333333] flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-400 mb-6 line-clamp-2">
          {item.title}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleWhatsApp}
            className="py-3 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 text-emerald-300 font-syne font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors"
          >
            WhatsApp
          </button>
          <button
            onClick={handleTelegram}
            className="py-3 px-4 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-800/50 text-sky-300 font-syne font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors"
          >
            Telegram
          </button>
          <button
            onClick={handleFacebook}
            className="py-3 px-4 rounded-xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/50 text-blue-300 font-syne font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors"
          >
            Facebook
          </button>
          <button
            onClick={() => alert("Apri l'app Instagram per condividere la storia.")}
            className="py-3 px-4 rounded-xl bg-pink-950/40 hover:bg-pink-900/50 border border-pink-800/50 text-pink-300 font-syne font-bold text-xs uppercase flex items-center justify-center gap-2 transition-colors"
          >
            Instagram
          </button>
        </div>

        {/* Copy Link */}
        <div className="flex items-center gap-2 bg-[#171717] border border-[#262626] rounded-xl p-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent text-xs text-neutral-300 px-2 w-full focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#FFD400] text-black font-syne font-bold text-xs uppercase rounded-lg flex items-center gap-1 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiato' : 'Copia'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

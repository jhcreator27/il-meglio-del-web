import React from 'react';
import { X, Calendar, Clock, User, Eye, Share2, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenShare?: (post: BlogPost) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose, onOpenShare }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111111] border border-[#262626] rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-6 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-[#1A1A1A] hover:bg-[#262626] text-neutral-300 hover:text-white p-2.5 rounded-full transition-colors z-10"
          aria-label="Chiudi articolo"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
          <span className="bg-[#FFD400] text-black font-syne font-black px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
            {post.category}
          </span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>{post.date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>{post.readTime} di lettura</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>{post.views} visualizzazioni</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-syne font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Author info */}
        <div className="flex items-center justify-between border-y border-[#1F1F1F] py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD400]/20 text-[#FFD400] flex items-center justify-center font-bold font-syne">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="font-syne font-bold text-sm text-white block">{post.author}</span>
              <span className="text-[10px] text-neutral-400">Redazione Editoriale · Il Meglio del Web</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden h-72 sm:h-96 bg-black border border-[#222]">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
          {post.content}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[#1F1F1F] flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1C1C] hover:bg-[#262626] text-white text-xs font-syne font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna agli articoli</span>
          </button>
        </div>

      </div>
    </div>
  );
};

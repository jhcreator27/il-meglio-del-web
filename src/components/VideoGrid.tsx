import React from 'react';
import { ContentItem } from '../types';
import { Play, Eye, Video, Bookmark, Share2 } from 'lucide-react';

interface VideoGridProps {
  items: ContentItem[];
  onSelectContent: (item: ContentItem) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  savedIds: string[];
  onOpenShare: (item: ContentItem, e: React.MouseEvent) => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  items,
  onSelectContent,
  onToggleSave,
  savedIds,
  onOpenShare
}) => {
  const isSaved = (id: string) => savedIds.includes(id);
  const videoItems = items.filter(i => i.category === 'VIDEO' || i.platform === 'TikTok' || i.platform === 'Instagram');

  return (
    <section id="video" className="py-20 bg-[#0A0A0A] border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FFD400] text-xs font-syne font-bold uppercase tracking-widest mb-2">
              <Video className="w-4 h-4 text-[#C62828]" />
              <span>REELS, TIKTOK & SHORTS</span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl text-white tracking-tight">
              🎥 VIDEO VIRALI
            </h2>
          </div>
          <button
            onClick={() => alert("Tutti i video virali della settimana sono caricati nel feed principale.")}
            className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase text-[#FFD400] hover:underline"
          >
            <span>VEDI TUTTI I VIDEO</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Video Cards Grid (4 columns on desktop, scrollable on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectContent(item)}
              className="group bg-[#111111] rounded-2xl overflow-hidden border border-[#222222] hover:border-[#FFD400]/50 transition-all duration-300 flex flex-col cursor-pointer shadow-xl relative"
            >
              {/* Vertical Thumbnail */}
              <div className="relative aspect-[9/16] overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Platform Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#C62828] text-white text-[10px] font-syne font-black uppercase px-3 py-1 rounded-full shadow">
                    {item.platform || 'VIDEO'}
                  </span>
                </div>

                {/* Duration */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-syne font-bold px-2 py-1 rounded border border-white/10">
                    {item.duration || '01:00'}
                  </span>
                </div>

                {/* Top Right Save & Share */}
                <div className="absolute top-14 right-4 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => onToggleSave(item.id, e)}
                    className={`w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center transition-colors ${
                      isSaved(item.id) ? 'text-[#FFD400]' : 'text-white hover:text-[#FFD400]'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved(item.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => onOpenShare(item, e)}
                    className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:text-[#FFD400] transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#FFD400] text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Views & Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1 font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    <Eye className="w-3.5 h-3.5 text-[#FFD400]" /> {item.viewsFormatted}
                  </span>
                  <span className="text-[10px] font-syne font-bold uppercase text-[#FFD400]">
                    {item.province}
                  </span>
                </div>
              </div>

              {/* Title info */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <h3 className="font-syne font-bold text-sm sm:text-base text-white group-hover:text-[#FFD400] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

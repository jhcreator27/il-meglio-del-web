import React from 'react';
import { Home, Flame, Video, Search, Bookmark } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenSaved,
  savedCount
}) => {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'virali') {
      document.getElementById('virali')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'video') {
      document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#1F1F1F] px-2 py-2 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => handleTabClick('home')}
        className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-syne font-bold uppercase transition-colors ${
          activeTab === 'home' ? 'text-[#FFD400]' : 'text-neutral-400'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => handleTabClick('virali')}
        className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-syne font-bold uppercase transition-colors ${
          activeTab === 'virali' ? 'text-[#FFD400]' : 'text-neutral-400'
        }`}
      >
        <Flame className="w-5 h-5" />
        <span>Virali</span>
      </button>

      <button
        onClick={() => handleTabClick('video')}
        className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-syne font-bold uppercase transition-colors ${
          activeTab === 'video' ? 'text-[#FFD400]' : 'text-neutral-400'
        }`}
      >
        <Video className="w-5 h-5" />
        <span>Video</span>
      </button>

      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-syne font-bold uppercase text-neutral-400 hover:text-white transition-colors"
      >
        <Search className="w-5 h-5 text-[#FFD400]" />
        <span>Cerca</span>
      </button>

      <button
        onClick={onOpenSaved}
        className="relative flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-syne font-bold uppercase text-neutral-400 hover:text-white transition-colors"
      >
        <Bookmark className="w-5 h-5" />
        <span>Salvati</span>
        {savedCount > 0 && (
          <span className="absolute top-0 right-3 w-4 h-4 rounded-full bg-[#C62828] text-white text-[9px] font-bold flex items-center justify-center">
            {savedCount}
          </span>
        )}
      </button>
    </div>
  );
};

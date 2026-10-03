import React from 'react';
import { CATEGORIES_LIST } from '../data/mockData';
import { Category, TimeFilter, FeedTab } from '../types';
import { SlidersHorizontal, Clock, Sparkles } from 'lucide-react';

interface FeedFilterProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  selectedTime: TimeFilter;
  onSelectTime: (time: TimeFilter) => void;
  feedTab: FeedTab;
  onSelectFeedTab: (tab: FeedTab) => void;
}

export const FeedFilter: React.FC<FeedFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedTime,
  onSelectTime,
  feedTab,
  onSelectFeedTab
}) => {
  const feedTabs: FeedTab[] = ['ULTIME', 'VIRALI', 'PER TE'];
  const timeFilters: TimeFilter[] = ['OGGI', 'ULTIME 24H', 'ULTIMA SETTIMANA'];

  return (
    <div className="bg-[#050505] border-b border-[#1F1F1F] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top row: Feed Tabs (Ultime / Virali / Per te) & Time filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Feed Tabs */}
          <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-xl border border-[#222222]">
            {feedTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onSelectFeedTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-syne font-bold uppercase transition-all ${
                  feedTab === tab
                    ? 'bg-[#FFD400] text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab === 'PER TE' && <Sparkles className="w-3 h-3 inline mr-1 text-[#C62828]" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-xs text-neutral-400 font-medium flex items-center gap-1 shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#FFD400]" /> Periodo:
            </span>
            {timeFilters.map((time) => (
              <button
                key={time}
                onClick={() => onSelectTime(time)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-syne font-bold uppercase transition-all shrink-0 ${
                  selectedTime === time
                    ? 'bg-[#C62828] text-white'
                    : 'bg-[#141414] text-neutral-400 hover:text-white border border-[#222222]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

        </div>

        {/* Categories Bar */}
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs text-neutral-400 font-syne font-bold uppercase mr-2 flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFD400]" /> Filtra:
            </span>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-syne font-bold uppercase transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-black shadow-md'
                    : 'bg-[#141414] text-neutral-300 hover:bg-[#222222] border border-[#222222]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

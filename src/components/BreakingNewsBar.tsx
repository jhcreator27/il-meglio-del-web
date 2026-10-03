import React from 'react';
import { Flame } from 'lucide-react';
import { BREAKING_NEWS } from '../data/mockData';

export const BreakingNewsBar: React.FC = () => {
  return (
    <div className="bg-[#C62828] text-white overflow-hidden py-2.5 px-4 flex items-center shadow-inner relative z-40">
      <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded text-xs font-syne font-bold uppercase shrink-0 mr-4 z-10">
        <Flame className="w-3.5 h-3.5 text-[#FFD400] animate-bounce" />
        <span>BREAKING SICILIA</span>
      </div>
      <div className="overflow-hidden whitespace-nowrap w-full">
        <div className="animate-marquee inline-flex gap-12 text-xs font-medium tracking-wide">
          {BREAKING_NEWS.concat(BREAKING_NEWS).map((news, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
              <span>{news}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

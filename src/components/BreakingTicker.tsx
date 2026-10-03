import React from 'react';
import { BREAKING_NEWS } from '../data/mockData';

export const BreakingTicker: React.FC = () => {
  return (
    <div className="bg-[#C62828] text-white overflow-hidden py-2 px-4 flex items-center shadow-inner relative z-35">
      <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded text-[11px] font-syne font-black uppercase tracking-wider shrink-0 mr-4 z-10 shadow">
        <span className="w-2 h-2 rounded-full bg-[#FFD400] animate-ping" />
        <span>🔴 ULTIME NOTIZIE</span>
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

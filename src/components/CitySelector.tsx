import React from 'react';
import { PROVINCES_LIST } from '../data/mockData';
import { MapPin } from 'lucide-react';
import { Province } from '../types';

interface CitySelectorProps {
  selectedProvince: Province;
  onSelectProvince: (province: Province) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  selectedProvince,
  onSelectProvince
}) => {
  return (
    <div className="bg-[#0A0A0A] border-b border-[#1F1F1F] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#FFD400]" />
            <h3 className="font-syne font-extrabold text-sm uppercase tracking-wider text-white">
              📍 DALLA TUA SICILIA
            </h3>
          </div>
          <p className="text-xs text-neutral-400">
            Seleziona una città o provincia per filtrare in tempo reale i contenuti del territorio.
          </p>
        </div>

        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {PROVINCES_LIST.map((province) => (
              <button
                key={province}
                onClick={() => onSelectProvince(province)}
                className={`px-4 py-2 rounded-full text-xs font-syne font-bold transition-all ${
                  selectedProvince === province
                    ? 'bg-[#FFD400] text-[#050505] shadow-lg shadow-[#FFD400]/20'
                    : 'bg-[#141414] text-neutral-300 hover:bg-[#222222] border border-[#262626]'
                }`}
              >
                {province}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

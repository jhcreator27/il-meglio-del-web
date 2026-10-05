import React, { useState } from 'react';
import { BarChart2, CheckCircle2 } from 'lucide-react';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export const PollWidget: React.FC = () => {
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    return localStorage.getItem('mw_user_voted') === 'true';
  });

  const [options, setOptions] = useState<PollOption[]>([
    { id: 'opt-1', text: 'Palermo & Provincia', votes: 1420 },
    { id: 'opt-2', text: 'Catania & Etna Valley', votes: 1280 },
    { id: 'opt-3', text: 'Messina & Stretto', votes: 850 },
    { id: 'opt-4', text: 'Siracusa & Barocco', votes: 910 },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (id: string) => {
    if (hasVoted) return;
    setOptions(prev => prev.map(opt => opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt));
    setHasVoted(true);
    setSelectedId(id);
    localStorage.setItem('mw_user_voted', 'true');
  };

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD400]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#FFD400]/10 text-[#FFD400] flex items-center justify-center border border-[#FFD400]/30">
          <BarChart2 className="w-4 h-4" />
        </div>
        <div>
          <span className="font-syne font-black text-xs uppercase tracking-wider text-[#FFD400] block">SONDAGGIO DEL GIORNO</span>
          <h4 className="font-syne font-bold text-sm text-white">Quale territorio siciliano traina di più l'innovazione web?</h4>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {options.map((opt) => {
          const percentage = Math.round((opt.votes / totalVotes) * 100);
          const isSelected = selectedId === opt.id;

          return (
            <button
              key={opt.id}
              disabled={hasVoted}
              onClick={() => handleVote(opt.id)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all relative overflow-hidden ${
                isSelected 
                  ? 'border-[#FFD400] bg-[#FFD400]/10' 
                  : 'border-[#262626] bg-[#171717] hover:border-neutral-500'
              }`}
            >
              {hasVoted && (
                <div 
                  className="absolute inset-y-0 left-0 bg-[#FFD400]/15 transition-all duration-500 z-0" 
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className={`font-bold ${isSelected ? 'text-[#FFD400]' : 'text-white'}`}>
                  {opt.text}
                </span>
                {hasVoted && (
                  <span className="font-mono font-bold text-[#FFD400]">
                    {percentage}% ({opt.votes})
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {hasVoted && (
        <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>Grazie per aver votato! Il sondaggio è aggiornato in tempo reale.</span>
        </div>
      )}
    </div>
  );
};

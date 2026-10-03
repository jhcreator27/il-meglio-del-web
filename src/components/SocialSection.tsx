import React from 'react';
import { Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';

export const SocialSection: React.FC = () => {
  const socials = [
    {
      name: 'INSTAGRAM',
      handle: '@ilmegliodelweb.sicilia',
      followers: '185K Follower',
      borderHover: 'hover:border-[#C62828]',
      icon: <Instagram className="w-6 h-6" />,
      url: 'https://instagram.com'
    },
    {
      name: 'TIKTOK',
      handle: '@ilmegliodelweb',
      followers: '320K Follower',
      borderHover: 'hover:border-[#FFD400]',
      icon: <span className="font-syne font-black text-lg">TK</span>,
      url: 'https://tiktok.com'
    },
    {
      name: 'FACEBOOK',
      handle: 'Il Meglio Del Web Sicilia',
      followers: '210K Fan',
      borderHover: 'hover:border-blue-500',
      icon: <Facebook className="w-6 h-6" />,
      url: 'https://facebook.com'
    },
    {
      name: 'YOUTUBE',
      handle: 'Il Meglio Del Web TV',
      followers: '95K Iscritti',
      borderHover: 'hover:border-red-500',
      icon: <Youtube className="w-6 h-6" />,
      url: 'https://youtube.com'
    }
  ];

  return (
    <section className="py-20 bg-[#0A0A0A] border-b border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-2xl mx-auto mb-12">
          <span className="text-[#FFD400] text-xs font-syne font-bold uppercase tracking-widest block mb-2">
            COMMUNITY & SOCIAL
          </span>
          <h2 className="font-syne font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            CI VEDIAMO SUI SOCIAL
          </h2>
          <p className="text-neutral-400 text-sm">
            Il meglio del web siciliano continua sui social. Unisciti alla nostra community per non perdere neanche un contenuto virale.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noreferrer"
              className={`group bg-[#111111] border border-[#222222] ${soc.borderHover} p-6 rounded-2xl flex flex-col items-center justify-between transition-all duration-300 shadow-lg transform hover:-translate-y-1.5`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#171717] border border-[#262626] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {soc.icon}
              </div>
              <div className="text-center mb-6">
                <h3 className="font-syne font-extrabold text-lg text-white mb-1">
                  {soc.name}
                </h3>
                <span className="text-xs text-[#FFD400] font-medium block mb-1">
                  {soc.handle}
                </span>
                <span className="text-[11px] text-neutral-400">
                  {soc.followers}
                </span>
              </div>
              <div className="w-full py-2.5 bg-[#171717] group-hover:bg-[#FFD400] group-hover:text-black text-white text-xs font-syne font-bold uppercase rounded-xl transition-colors flex items-center justify-center gap-1">
                <span>Segui</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

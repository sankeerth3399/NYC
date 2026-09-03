import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface SectionLink {
  id: string;
  label: string;
  num: string;
}

const sections: SectionLink[] = [
  { id: 'lineup', num: '01', label: 'Line-Up' },
  { id: 'build', num: '02', label: 'Build' },
  { id: 'box', num: '03', label: 'In The Box' },
  { id: 'sear', num: '04', label: 'The Sear' },
  { id: 'cut', num: '05', label: 'The Cut' },
  { id: 'story', num: '06', label: 'Story' },
];

export const CinematicHUDNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('lineup');
  const [timecode, setTimecode] = useState('00:04:18:22');

  useEffect(() => {
    // Generate authentic running timecode HUD like in reference video
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${ms}`);
    }, 80);

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#070707]/90 backdrop-blur-xl border-b border-white/10 text-white select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-12 flex items-center justify-between font-hud text-[11px] tracking-widest uppercase">
        
        {/* Left: Timecode & Tech Specs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-500 font-bold hidden sm:inline">REC</span>
            <span className="text-gray-400 font-mono text-[10px] sm:text-xs">{timecode}</span>
          </div>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="text-gray-400 hidden lg:inline text-[10px]">
            MEKO // 1510 SUNSET AVE
          </span>
        </div>

        {/* Center: Reference Video Section Segment Navigation */}
        <div className="hidden md:flex items-center gap-1 sm:gap-4 overflow-x-auto scrollbar-none py-1">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  isActive
                    ? 'text-white bg-red-600/20 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={isActive ? 'text-red-400 font-bold' : 'text-gray-500'}>
                  {sec.num}.
                </span>
                <span className="font-bold text-[10px] tracking-wider">{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all text-[10px] font-bold"
          >
            <WhatsAppIcon className="w-3 h-3" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <a
            href={`tel:${businessData.phoneRaw}`}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white transition-all text-[10px] font-black shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">(315) 864-3000</span>
            <span className="sm:hidden">CALL</span>
          </a>
        </div>

      </div>
    </nav>
  );
};

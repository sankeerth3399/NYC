import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Utensils } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export const QuickCallBar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#07190F]/95 backdrop-blur-lg border-t border-emerald-900/80 p-2.5 sm:hidden shadow-2xl">
      <div className="flex items-center gap-2">
        <a
          href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] text-black font-black text-xs shadow-md active:scale-95 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4 text-black" />
          <span>WhatsApp</span>
        </a>

        <a
          href={`tel:${businessData.phoneRaw}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-deli-amber-500 to-amber-600 text-black font-extrabold text-xs shadow-md active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call (315) 864-3000</span>
        </a>

        {location.pathname !== '/menu' && (
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#0F2D1C] text-emerald-300 font-bold text-xs border border-emerald-600/40 active:scale-95 transition-transform"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Menu</span>
          </Link>
        )}
      </div>
    </div>
  );
};

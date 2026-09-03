import React, { useState } from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

const pickupSlots = [
  'NOW (15 MIN)', '12:00 PM', '12:30 PM', '1:00 PM',
  '1:30 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
];

export const ReservePickupHUD: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState('NOW (15 MIN)');

  const whatsappOrderUrl = `${businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}?text=${encodeURIComponent(`Hi Meko Deli, I would like to order pickup for: ${selectedSlot} at 1510 Sunset Ave.`)}`;

  return (
    <section id="contact-hud" className="py-24 md:py-36 bg-[#040404] relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Terminal HUD Container (Exact matching Frame 00:14) */}
        <div className="rounded-[2.5rem] bg-[#0A0A0A] border-2 border-red-500/40 p-8 sm:p-12 shadow-[0_0_50px_rgba(239,68,68,0.2)] font-hud space-y-8">
          
          {/* Top Brand Banner */}
          <div className="text-center space-y-2 border-b border-white/10 pb-6">
            <div className="flex items-center justify-center gap-2 text-xs text-red-500 font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>ORDER FOR PICKUP // FAST FLAT-TOP</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase">
              MEKO DELI
            </h2>
            <p className="text-xs text-gray-400">
              Open Daily 07:00 – 22:00 • Walk-ins welcome • Call / WhatsApp orders fast pickup
            </p>
          </div>

          {/* Time Slot Picker (Frame 00:14) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-400" />
                SELECT PICKUP TIME
              </span>
              <span className="text-white font-bold">{selectedSlot}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {pickupSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold font-hud transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.6)] border border-red-400'
                        : 'bg-[#141414] text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Order Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all hover:scale-102 active:scale-98"
            >
              <WhatsAppIcon className="w-5 h-5 text-black" />
              <span>SEND WHATSAPP ORDER</span>
            </a>

            <a
              href={`tel:${businessData.phoneRaw}`}
              className="py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-black text-sm flex items-center justify-center gap-2.5 border border-white/20 transition-all hover:scale-102 active:scale-98"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>CALL: (315) 864-3000</span>
            </a>
          </div>

          {/* Bottom HUD specs */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5 gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>1510 SUNSET AVE, UTICA, NY 13502</span>
            </div>
            <span>CORNER OF SUNSET AVE &amp; SQUARE ST</span>
          </div>

        </div>

      </div>
    </section>
  );
};

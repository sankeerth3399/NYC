import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, MessageSquare, QrCode, Sparkles } from 'lucide-react';
import { businessData } from '../data/business';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(businessData.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendViaWhatsApp = () => {
    const whatsappNumber = businessData.whatsappRaw || '13158643000';
    let text = `Hello Meko Deli!`;
    if (formData.name.trim()) text += ` My name is ${formData.name.trim()}.`;
    if (formData.phone.trim()) text += ` (Phone: ${formData.phone.trim()})`;
    if (formData.message.trim()) {
      text += `\n\nInquiry/Order details:\n${formData.message.trim()}`;
    } else {
      text += ` I would like to place an order / have an inquiry.`;
    }
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const quickChatPrompts = [
    {
      label: '🥪 Order Deli / Pickup',
      text: 'Hi Meko Deli! I would like to place a deli sandwich order for pickup.',
    },
    {
      label: '🍗 Fresh Chicken & Wings',
      text: 'Hi Meko Deli! I am inquiring about fresh chicken cuts and wings availability.',
    },
    {
      label: '🥗 Catering & Platters',
      text: 'Hi Meko Deli! I would like details and pricing on catering and party platters.',
    },
    {
      label: '❓ General Question',
      text: 'Hi Meko Deli! I have a question about store hours and items.',
    },
  ];

  return (
    <main className="min-h-screen pb-28 bg-[#08170F] relative overflow-hidden">
      {/* Header Banner */}
      <section className="pt-16 pb-16 bg-gradient-to-b from-[#0B2A1A] via-[#0E3521] to-[#08170F] border-b border-emerald-900/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-deli-amber-400 uppercase tracking-widest"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Us &amp; Get in Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight"
          >
            Contact &amp; Visit Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-emerald-200 uppercase font-bold tracking-wider max-w-xl mx-auto"
          >
            Meko Deli &amp; Grocery • 1510 Sunset Ave, Utica, NY 13502
          </motion.p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Business Info & Direct CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Info Card */}
            <div className="p-8 rounded-3xl bg-[#0D2619] border border-emerald-500/30 shadow-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-display font-black text-white">
                  Meko Deli &amp; Grocery
                </h3>
                <p className="text-sm text-emerald-300 font-semibold mt-1">
                  Sandwiches, Groceries &amp; More
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 pt-4 border-t border-emerald-900/60">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-deli-amber-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase text-gray-400">Street Address</span>
                  <p className="text-lg font-bold text-white leading-tight">
                    1510 Sunset Ave
                  </p>
                  <p className="text-sm text-gray-300">
                    Utica, NY 13502
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 mt-1 cursor-pointer"
                  >
                    <span>{copied ? '✓ Copied to clipboard!' : 'Copy Address'}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Messaging */}
              <div className="flex items-start gap-4 pt-4 border-t border-emerald-900/60">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-[#25D366]/40 flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/10">
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400">WhatsApp Chat</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[10px] font-bold text-[#25D366]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                      Quick Reply
                    </span>
                  </div>
                  <a
                    href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-mono font-black text-[#25D366] hover:underline block"
                  >
                    {businessData.whatsapp || '+1 (315) 864-3000'}
                  </a>
                  <p className="text-xs text-gray-400">
                    Chat with us directly for fast orders, questions &amp; inquiries
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 pt-4 border-t border-emerald-900/60">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase text-gray-400">Call Directly</span>
                  <a
                    href={`tel:${businessData.phoneRaw}`}
                    className="text-2xl font-mono font-black text-deli-amber-400 hover:underline block"
                  >
                    (315) 864-3000
                  </a>
                  <p className="text-xs text-gray-400">
                    Call ahead to place your sandwich or meal order
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-emerald-900/60">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase text-gray-400">Store Hours</span>
                  <p className="text-base font-bold text-white">
                    Mon – Sun: 7:00 AM – 10:00 PM
                  </p>
                  <p className="text-xs text-emerald-400">
                    Open 7 Days a week for your convenience
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-emerald-900/60 space-y-3">
                {/* Primary WhatsApp Chat CTA */}
                <a
                  href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent('Hi Meko Deli, I would like to get in touch!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-base shadow-xl shadow-[#25D366]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-black" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Call button */}
                <a
                  href={`tel:${businessData.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-deli-amber-500 to-amber-600 text-black font-black text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now: (315) 864-3000</span>
                </a>

                {/* Driving Directions */}
                <a
                  href={businessData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#081A10] hover:bg-[#122E1F] text-white font-bold text-sm border border-emerald-500/40 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* Utica Community WhatsApp QR & Quick Connect Card */}
            <a
              href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent('Hello Meko Deli!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-3xl bg-[#091D12] border border-emerald-900/80 hover:border-[#25D366]/60 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white p-2 shrink-0 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform relative">
                  <QrCode className="w-full h-full text-black" />
                  <div className="absolute -bottom-1 -right-1 bg-[#25D366] rounded-full p-1 shadow border border-white">
                    <WhatsAppIcon className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors">
                      Scan or Tap to Chat on WhatsApp
                    </h4>
                  </div>
                  <p className="text-xs text-gray-300">
                    Instantly message Meko Deli for order pickups, menu inquiries, and daily specials.
                  </p>
                </div>
              </div>
            </a>

          </motion.div>

          {/* Right Column: Contact Form & Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Contact Form */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0D2619] border border-emerald-500/30 shadow-2xl space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-deli-amber-400 uppercase tracking-widest mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send a Message</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                  Have a Question or Special Request?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Fill out the form below or start an instant chat on WhatsApp for faster response.
                </p>
              </div>

              {/* Quick WhatsApp Topics */}
              <div className="space-y-2 pt-2 pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#25D366]" />
                  Instant WhatsApp Starters (1-Tap):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {quickChatPrompts.map((prompt, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent(prompt.text)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#081B11] border border-emerald-800/60 hover:border-[#25D366]/60 hover:bg-[#0B2417] text-gray-200 hover:text-white text-xs font-medium transition-all group"
                    >
                      <span>{prompt.label}</span>
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366] opacity-70 group-hover:opacity-100 shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center justify-center py-1">
                <div className="border-t border-emerald-900/80 w-full" />
                <span className="bg-[#0D2619] px-3 text-[11px] font-bold uppercase text-emerald-400/90 shrink-0">
                  Custom WhatsApp Inquiry
                </span>
                <div className="border-t border-emerald-900/80 w-full" />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendViaWhatsApp();
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-300 tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#081910] border border-emerald-500/30 focus:border-[#25D366] text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-gray-300 tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(315) 000-0000"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#081910] border border-emerald-500/30 focus:border-[#25D366] text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-300 tracking-wider">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#081910] border border-emerald-500/30 focus:border-[#25D366] text-white text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-300 tracking-wider">
                    Your Message or Order Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your sandwich order, fresh chicken cuts request, catering inquiry, or question..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#081910] border border-emerald-500/30 focus:border-[#25D366] text-white text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Single Primary WhatsApp Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-base shadow-xl shadow-[#25D366]/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-black" />
                    <span>Send Message via WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl h-80 relative bg-[#091D12]">
              <iframe
                src={businessData.googleMapsEmbedUrl}
                title="Meko Deli Google Map Location"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
};

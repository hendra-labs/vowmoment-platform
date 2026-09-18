import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Heart } from 'lucide-react';

interface StickyBottomCTAProps {
  onOpenCreateModal: () => void;
  onOpenAssistant: () => void;
}

export const StickyBottomCTA: React.FC<StickyBottomCTAProps> = ({
  onOpenCreateModal,
  onOpenAssistant,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Buttons in bottom-right corner */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* VowBot AI Floating Chat Bubble */}
        <button
          onClick={onOpenAssistant}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-900 text-amber-200 hover:bg-stone-800 shadow-xl border border-stone-700 hover:scale-105 transition-all cursor-pointer"
          title="Tanya VowBot AI"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-bold font-sans hidden sm:inline">Tanya VowBot AI</span>
        </button>

        {/* Floating WhatsApp Quick Consultation */}
        <a
          href="https://wa.me/6281234567890?text=Halo%20Vowmoment!%20Saya%20tertarik%20konsultasi%20undangan%20pernikahan%20digital."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:scale-105 transition-all cursor-pointer"
          title="Konsultasi WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp Konsultasi</span>
        </a>
      </div>

      {/* Sticky Bottom Bar on mobile/tablet when scrolled down */}
      {isVisible && (
        <div className="fixed bottom-0 inset-x-0 z-30 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 py-3 px-4 shadow-2xl flex items-center justify-between animate-fade-in sm:hidden">
          <div className="flex items-center gap-2 text-left">
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
            <div className="leading-tight">
              <span className="text-xs font-bold text-white block">Vowmoment.id</span>
              <span className="text-[10px] text-amber-200">5 Menit Jadi • Gratis Uji Coba</span>
            </div>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <span>Buat Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
};

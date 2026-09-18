import React from 'react';
import { Heart, MessageCircle, Instagram, Globe, Sparkles, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAssistant: () => void;
  onOpenCreateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAssistant, onOpenCreateModal }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-sm">
                <Heart className="w-5 h-5 fill-stone-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Vowmoment <span className="text-amber-300 text-xs px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/80 font-sans font-medium">.id</span>
                </span>
                <span className="text-[11px] text-stone-400 tracking-wider uppercase">Indonesia</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              <em>"Abadikan Hari Bahagiamu dengan Undangan Digital Paling Elegan, Canggih, dan Tanpa Batas."</em>
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Platform undangan pernikahan digital nomor 1 di Indonesia dengan teknologi Smart Guest Customization, Live RSVP, dan Amplop Digital QRIS terintegrasi.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                title="Instagram Vowmoment"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 flex items-center justify-center text-emerald-300 hover:text-emerald-200 transition-colors"
                title="WhatsApp CS"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenAssistant}
                className="px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-xs font-medium text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>VowBot AI</span>
              </button>
            </div>
          </div>

          {/* Col 2: Fitur */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Fitur Utama
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#features" className="hover:text-amber-300 transition-colors">Smart Guest Link</a></li>
              <li><a href="#features" className="hover:text-amber-300 transition-colors">Real-time RSVP & Wishes</a></li>
              <li><a href="#features" className="hover:text-amber-300 transition-colors">Amplop Digital & QRIS</a></li>
              <li><a href="#features" className="hover:text-amber-300 transition-colors">WhatsApp Blast Formatter</a></li>
              <li><a href="#features" className="hover:text-amber-300 transition-colors">Live Music & Background</a></li>
            </ul>
          </div>

          {/* Col 3: Tema */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Kategori Tema
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#themes" className="hover:text-amber-300 transition-colors">Modern Minimalist</a></li>
              <li><a href="#themes" className="hover:text-amber-300 transition-colors">Rustic Earth</a></li>
              <li><a href="#themes" className="hover:text-amber-300 transition-colors">Luxury Royal Gold</a></li>
              <li><a href="#themes" className="hover:text-amber-300 transition-colors">Animated Motion</a></li>
              <li><a href="#themes" className="hover:text-amber-300 transition-colors">Custom Monogram</a></li>
            </ul>
          </div>

          {/* Col 4: Bantuan & Legal */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Bantuan & Layanan
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#faq" className="hover:text-amber-300 transition-colors">Tanya Jawab (FAQ)</a></li>
              <li><a href="#pricing" className="hover:text-amber-300 transition-colors">Paket & Harga</a></li>
              <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">Hubungi Customer Care</a></li>
              <li><span className="text-stone-500">Syarat & Ketentuan</span></li>
              <li><span className="text-stone-500">Kebijakan Privasi</span></li>
            </ul>
          </div>

        </div>

        {/* Accepted Payment Methods Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Mendukung Pembayaran Aman di Indonesia:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-stone-300">
            <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700">QRIS</span>
            <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700">BCA</span>
            <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700">MANDIRI</span>
            <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700">BNI</span>
            <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700">BRI</span>
            <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700">GOPAY</span>
            <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700">OVO</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-stone-500 pt-4 border-t border-stone-800/50">
          <p>© 2026 Vowmoment Indonesia (vowmoment.id). Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="mt-1 text-[11px] text-stone-600">
            Designed for Indonesian millennial & Gen Z weddings with love & elegance.
          </p>
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Heart, Sparkles, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCreateModal, onOpenAssistant }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-50/90 border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-5 h-5 fill-amber-200/40 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-stone-900 flex items-center gap-1.5">
                Vowmoment <span className="text-amber-700 text-xs px-2 py-0.5 rounded-full bg-amber-100 font-sans font-medium">.id</span>
              </span>
              <span className="text-[11px] text-stone-500 tracking-wider uppercase font-medium">Indonesia</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-stone-600 hover:text-stone-950 transition-colors">
              Keunggulan
            </a>
            <a href="#themes" className="text-sm font-medium text-stone-600 hover:text-stone-950 transition-colors">
              Katalog Tema
            </a>
            <a href="#social-proof" className="text-sm font-medium text-stone-600 hover:text-stone-950 transition-colors">
              Kisah Pasangan
            </a>
            <a href="#pricing" className="text-sm font-medium text-stone-600 hover:text-stone-950 transition-colors">
              Paket & Harga
            </a>
            <a href="#faq" className="text-sm font-medium text-stone-600 hover:text-stone-950 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAssistant}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-full border border-stone-200 transition-colors shadow-xs"
              title="Konsultasi AI VowBot"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Tanya VowBot AI</span>
            </button>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Vowmoment%20Indonesia!%20Saya%20tertarik%20membuat%20undangan%20pernikahan%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp CS</span>
            </a>

            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <span>Buat Undangan Gratis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCreateModal}
              className="px-3 py-1.5 text-xs font-bold text-stone-900 bg-amber-400 rounded-full"
            >
              Buat Cepat
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2.5">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              Keunggulan Utama
            </a>
            <a
              href="#themes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              Katalog Tema Undangan
            </a>
            <a
              href="#social-proof"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              Kisah Pasangan & Testimoni
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              Paket & Harga
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              Tanya Jawab (FAQ)
            </a>
          </nav>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 rounded-xl border border-stone-200"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Konsultasi VowBot AI</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCreateModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-stone-900 bg-amber-400 rounded-xl shadow-sm"
            >
              <span>Mulai Buat Undangan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

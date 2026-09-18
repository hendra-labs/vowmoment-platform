import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Check, 
  Eye, 
  Palette, 
  Music, 
  SlidersHorizontal 
} from 'lucide-react';
import { ThemeItem, ThemeCategory } from '../types';
import { THEMES_DATA } from '../data/weddingContent';

interface ThemeCatalogProps {
  currentTheme: ThemeItem;
  onSelectTheme: (theme: ThemeItem) => void;
  onOpenFullDemo: (theme: ThemeItem) => void;
  onOpenCreateModal: (theme?: ThemeItem) => void;
}

const CATEGORIES: { label: string; value: ThemeCategory }[] = [
  { label: 'Semua Kategori', value: 'All' },
  { label: 'Modern Minimalist', value: 'Modern Minimalist' },
  { label: 'Rustic Earth', value: 'Rustic Earth' },
  { label: 'Luxury Royal Gold', value: 'Luxury Royal Gold' },
  { label: 'Animated Motion', value: 'Animated Motion' },
];

export const ThemeCatalog: React.FC<ThemeCatalogProps> = ({
  currentTheme,
  onSelectTheme,
  onOpenFullDemo,
  onOpenCreateModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>('All');

  const filteredThemes = selectedCategory === 'All'
    ? THEMES_DATA
    : THEMES_DATA.filter((t) => t.category === selectedCategory);

  return (
    <section id="themes" className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-amber-700" />
            <span>Koleksi Eksklusif 2026</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Katalog Tema Undangan Berkelas
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Didesain oleh desainer profesional dengan komposisi tipografi editorial, warna abadi, dan animasi interaktif yang memikat para tamu Anda.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-stone-900 text-amber-200 shadow-sm scale-105'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Aesthetic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredThemes.map((theme) => {
            const isSelected = currentTheme.id === theme.id;

            return (
              <div
                key={theme.id}
                className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-400/40 shadow-xl'
                    : 'border-stone-200/90 hover:border-stone-300 hover:shadow-lg'
                }`}
              >
                {/* Thumbnail Image with badges */}
                <div className="relative h-72 overflow-hidden bg-stone-100">
                  <img
                    src={theme.previewImage}
                    alt={theme.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-stone-900 shadow-xs">
                      {theme.category}
                    </span>
                    {theme.badge && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-stone-950 shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {theme.badge}
                      </span>
                    )}
                  </div>

                  {/* Palette dots preview in thumbnail */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 p-1.5 rounded-full bg-black/40 backdrop-blur-md">
                    {theme.palette.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-white/50"
                        style={{ backgroundColor: color }}
                        title={`Color: ${color}`}
                      />
                    ))}
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                      <span>Aktif di Mockup HP</span>
                    </div>
                  )}
                </div>

                {/* Theme Details Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-bold text-stone-900">
                        {theme.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-stone-500">
                        <Music className="w-3 h-3 text-amber-600" />
                        <span>Background Music</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectTheme(theme);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Coba Demo</span>
                    </button>

                    <button
                      onClick={() => onOpenFullDemo(theme)}
                      className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs transition-colors cursor-pointer"
                      title="Buka Pratinjau Layar Penuh"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner on Catalog */}
        <div className="bg-stone-900 text-amber-100 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-white">
              Punya Konsep atau Desain Khusus Sendiri?
            </h3>
            <p className="text-sm text-stone-300 max-w-xl">
              Paket VIP Vowmoment memungkinkan Anda meminta kustomisasi warna khusus, custom monogram inisial, hingga custom domain (misal: <em>namakamu.com</em>).
            </p>
          </div>
          <button
            onClick={() => onOpenCreateModal()}
            className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs whitespace-nowrap shadow-md cursor-pointer transition-all active:scale-95"
          >
            Mulai Desain Undangan
          </button>
        </div>

      </div>
    </section>
  );
};

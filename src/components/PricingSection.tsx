import React from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  Zap, 
  Crown 
} from 'lucide-react';
import { PRICING_PACKAGES } from '../data/weddingContent';
import { PricingPackage } from '../types';

interface PricingSectionProps {
  onOpenCreateModal: (packageName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenCreateModal }) => {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Harga Jujur & Transparan</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Pilihan Paket Terbaik untuk Hari Spesialmu
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Tanpa biaya bulanan, tanpa biaya tersembunyi. Bayar sekali untuk keindahan selamanya.
          </p>
        </div>

        {/* 3 Packages Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.isFeatured
                    ? 'bg-stone-900 text-white shadow-2xl ring-2 ring-amber-400 -translate-y-2 lg:-translate-y-3'
                    : 'bg-white text-stone-900 border border-stone-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${
                      pkg.isFeatured 
                        ? 'bg-amber-400 text-stone-950 ring-2 ring-stone-900' 
                        : 'bg-stone-100 border border-stone-300 text-stone-700'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Card Header & Price */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-display text-2xl font-bold ${pkg.isFeatured ? 'text-white' : 'text-stone-900'}`}>
                      {pkg.name}
                    </h3>
                    {pkg.id === 'vip' && <Crown className="w-6 h-6 text-amber-400" />}
                  </div>

                  <p className={`text-xs leading-relaxed min-h-[36px] ${pkg.isFeatured ? 'text-stone-300' : 'text-stone-500'}`}>
                    {pkg.tagline}
                  </p>

                  <div className="pt-2 pb-4 border-b border-stone-200/20">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${pkg.isFeatured ? 'text-amber-300' : 'text-stone-900'}`}>
                        {formatIDR(pkg.price)}
                      </span>
                      <span className={`text-xs line-through ${pkg.isFeatured ? 'text-stone-400' : 'text-stone-400'}`}>
                        {formatIDR(pkg.originalPrice)}
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-1 ${pkg.isFeatured ? 'text-stone-400' : 'text-stone-500'}`}>
                      Pembayaran 1x (Tanpa langganan)
                    </span>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-3 pt-2 text-xs">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        {feat.included ? (
                          <div className={`mt-0.5 rounded-full p-0.5 ${pkg.isFeatured ? 'bg-amber-400/20 text-amber-300' : 'bg-emerald-100 text-emerald-800'}`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className={`mt-0.5 rounded-full p-0.5 ${pkg.isFeatured ? 'text-stone-600' : 'text-stone-300'}`}>
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className={`leading-snug ${
                          !feat.included
                            ? 'text-stone-400 line-through'
                            : feat.highlight
                            ? pkg.isFeatured ? 'font-bold text-amber-200' : 'font-bold text-stone-900'
                            : pkg.isFeatured ? 'text-stone-200' : 'text-stone-600'
                        }`}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-8 space-y-3">
                  <button
                    onClick={() => onOpenCreateModal(pkg.name)}
                    className={`w-full py-3.5 px-5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-95 ${
                      pkg.isFeatured
                        ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg'
                        : 'bg-stone-900 hover:bg-stone-800 text-white'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/6281234567890?text=${encodeURIComponent(pkg.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2 px-4 rounded-full text-[11px] font-semibold text-center flex items-center justify-center gap-1.5 transition-colors ${
                      pkg.isFeatured
                        ? 'text-emerald-300 hover:bg-white/10'
                        : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Tanya Paket ini di WhatsApp</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-600 text-xs shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-stone-900 block text-sm">Garansi Kepuasan & Uptime 99.9%</span>
              <span>Revisi data tidak terbatas tanpa biaya tambahan sampai hari pernikahan Anda.</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-stone-400">Metode Pembayaran:</span>
            <span className="font-semibold text-stone-800">QRIS • Transfer Semua Bank • E-Wallet</span>
          </div>
        </div>

      </div>
    </section>
  );
};

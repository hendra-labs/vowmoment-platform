import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Users, 
  Play, 
  Smartphone,
  Star
} from 'lucide-react';
import { ThemeItem, InvitationData } from '../types';
import { MobilePhoneMockup } from './MobilePhoneMockup';

interface HeroSectionProps {
  currentTheme: ThemeItem;
  invitationData: InvitationData;
  onUpdateGuestName: (name: string) => void;
  onOpenCreateModal: () => void;
  onOpenFullDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  invitationData,
  onUpdateGuestName,
  onOpenCreateModal,
  onOpenFullDemo,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      
      {/* Subtle Luxury Gradient Mesh Background */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-amber-100/50 via-stone-100/30 to-transparent pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 left-0 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copywriting, Metrics, & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/70 text-amber-900 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-amber-600 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Standar Baru Undangan Digital Pernikahan 2026</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
                Abadikan Hari Bahagiamu dengan{' '}
                <span className="relative inline-block text-amber-800">
                  Undangan Digital
                  <span className="absolute bottom-1 inset-x-0 h-2 bg-amber-200/60 -z-10 rounded" />
                </span>{' '}
                Paling Elegan & Canggih.
              </h1>
              
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Dirancang khusus untuk calon pengantin milenial & Gen Z di Indonesia. 
                Selesai dalam <strong className="text-stone-900 font-semibold">5 menit</strong>, sebar 1 link ke ribuan tamu dengan sapaan nama otomatis di WhatsApp, live RSVP, & amplop digital QRIS tanpa potongan.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenCreateModal}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
              >
                <span>Buat Undangan Gratis Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#themes"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-stone-100 text-stone-800 font-semibold text-sm border border-stone-300 shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-stone-700 text-stone-700" />
                <span>Lihat Koleksi Tema</span>
              </a>
            </div>

            {/* Interactive Live Name Customization Input on Hero */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-stone-200 shadow-xs max-w-lg mx-auto lg:mx-0 space-y-2 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Coba Fitur Smart Guest: Ketik Nama Tamu</span>
                </span>
                <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono">Live Sync</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={invitationData.guestName}
                  onChange={(e) => onUpdateGuestName(e.target.value)}
                  placeholder="Contoh: Dinda & Suami"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 bg-stone-50/80 text-stone-900"
                />
                <button
                  type="button"
                  onClick={() => onUpdateGuestName('Bpk. Raditya & Partner')}
                  className="px-3 py-2 text-xs font-medium rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors whitespace-nowrap"
                >
                  Acak Nama
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                👉 Lihat layar HP di sebelah kanan, nama tamu di undangan otomatis terupdate seketika!
              </p>
            </div>

            {/* Social Trust Metrics Bar */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10 text-stone-600">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900">4.9 / 5.0</div>
                  <div className="text-[10px] text-stone-500">3.200+ Ulasan Pengantin</div>
                </div>
              </div>

              <div className="h-8 w-px bg-stone-200 hidden sm:block" />

              <div className="text-left">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  <span>15.000+ Pasangan</span>
                </div>
                <div className="text-[10px] text-stone-500">Telah Mempercayakan Vowmoment</div>
              </div>

              <div className="h-8 w-px bg-stone-200 hidden sm:block" />

              <div className="text-left">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>⚡ 5 Menit Jadi</span>
                </div>
                <div className="text-[10px] text-stone-500">Tanpa Instal Aplikasi Apapun</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Mobile-Native Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="text-center mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 bg-white/90 px-3 py-1 rounded-full border border-stone-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Simulasi Interaktif: Coba scroll & sentuh layar HP di bawah</span>
              </span>
            </div>

            <MobilePhoneMockup
              currentTheme={currentTheme}
              invitationData={invitationData}
              onUpdateGuestName={onUpdateGuestName}
              onOpenFullDemo={onOpenFullDemo}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

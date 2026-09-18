import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle, 
  ShieldCheck, 
  Heart, 
  Play, 
  Users, 
  Sparkles,
  Award
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/weddingContent';
import { Testimonial } from '../types';

export const SocialProofSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial>(TESTIMONIALS_DATA[0]);
  const [isPlayingVideoModal, setIsPlayingVideoModal] = useState<Testimonial | null>(null);

  return (
    <section id="social-proof" className="py-20 lg:py-28 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header & Metrics Bar */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Bukti Nyata & Lencana Kepercayaan</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Telah Digunakan oleh 15.000+ Pasangan Bahagia
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Dari intimate wedding di pegunungan hingga pesta megah di ballroom hotel bintang lima, pasangan di seluruh penjuru Indonesia memilih Vowmoment.
          </p>
        </div>

        {/* 4 Pillars Stats Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-stone-50 rounded-3xl p-6 text-center border border-stone-200/80 space-y-1">
            <span className="block font-display text-3xl sm:text-4xl font-bold text-amber-700">
              15.000+
            </span>
            <span className="text-xs font-bold text-stone-900 block">Pasangan Bahagia</span>
            <span className="text-[11px] text-stone-500">Di seluruh Indonesia</span>
          </div>

          <div className="bg-stone-50 rounded-3xl p-6 text-center border border-stone-200/80 space-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="block font-display text-3xl sm:text-4xl font-bold text-stone-900">
              4.9 / 5.0
            </span>
            <span className="text-[11px] text-stone-500">Dari 3.200+ ulasan terverifikasi</span>
          </div>

          <div className="bg-stone-50 rounded-3xl p-6 text-center border border-stone-200/80 space-y-1">
            <span className="block font-display text-3xl sm:text-4xl font-bold text-emerald-700">
              1.2 Juta+
            </span>
            <span className="text-xs font-bold text-stone-900 block">Tamu Membuka Undangan</span>
            <span className="text-[11px] text-stone-500">Dengan rata-rata load &lt; 0.6s</span>
          </div>

          <div className="bg-stone-50 rounded-3xl p-6 text-center border border-stone-200/80 space-y-1">
            <span className="block font-display text-3xl sm:text-4xl font-bold text-blue-700">
              99.9%
            </span>
            <span className="text-xs font-bold text-stone-900 block">Garansi Server Uptime</span>
            <span className="text-[11px] text-stone-500">Anti-down di hari pernikahan</span>
          </div>
        </div>

        {/* Short-form Video & Stories Testimonial Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1 text-left">
              <h3 className="font-display text-2xl font-bold text-stone-900">
                Cerita dari Pengantin Baru
              </h3>
              <p className="text-xs text-stone-500">
                Pengalaman nyata sebar undangan digital tanpa ribet dan kesan tamu yang terpukau.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Semua Ulasan Terverifikasi</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-stone-50 rounded-3xl overflow-hidden border border-stone-200 hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between shadow-2xs group"
              >
                {/* Visual Reel Card */}
                <div className="relative h-48 overflow-hidden bg-stone-200">
                  <img
                    src={item.avatar}
                    alt={item.couple}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/30 to-transparent" />

                  {/* Play Video Pill */}
                  <button
                    onClick={() => setIsPlayingVideoModal(item)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-stone-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-stone-900 ml-0.5" />
                    </div>
                  </button>

                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Video Testimoni</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                    <p className="font-display font-bold text-sm">{item.couple}</p>
                    <p className="text-[10px] opacity-85">{item.location} • {item.date}</p>
                  </div>
                </div>

                {/* Quote Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-600 italic leading-relaxed">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200/80 text-[10px] text-stone-500 flex items-center justify-between">
                    <span>Tema: <strong>{item.themeUsed}</strong></span>
                    <span className="font-semibold text-stone-800">{item.shortStory}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Video Testimonial Modal Simulation */}
        {isPlayingVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 text-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-700">
              <div className="relative h-80 bg-stone-800">
                <img
                  src={isPlayingVideoModal.avatar}
                  alt={isPlayingVideoModal.couple}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center animate-bounce">
                    <Heart className="w-7 h-7 fill-stone-950" />
                  </div>
                  <h4 className="font-display text-xl font-bold">
                    Kisah Bahagia {isPlayingVideoModal.couple}
                  </h4>
                  <p className="text-xs text-stone-300 max-w-xs">
                    "Terima kasih Vowmoment Indonesia sudah bikin momen sebar undangan jadi sangat berkesan dan dipuji semua tamu!"
                  </p>
                </div>
              </div>
              <div className="p-4 bg-stone-950 flex justify-end">
                <button
                  onClick={() => setIsPlayingVideoModal(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Tutup Video
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

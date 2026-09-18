import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Heart, 
  Calendar, 
  MapPin, 
  Users,
  Copy,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeItem, InvitationData } from '../types';
import { THEMES_DATA } from '../data/weddingContent';

interface CreateInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitationData: InvitationData;
  onSaveInvitation: (data: Partial<InvitationData>) => void;
  initialPackage?: string;
}

export const CreateInvitationModal: React.FC<CreateInvitationModalProps> = ({
  isOpen,
  onClose,
  invitationData,
  onSaveInvitation,
  initialPackage,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [groomName, setGroomName] = useState(invitationData.groomName);
  const [brideName, setBrideName] = useState(invitationData.brideName);
  const [weddingDate, setWeddingDate] = useState(invitationData.weddingDate);
  const [venueCity, setVenueCity] = useState(invitationData.venueName);
  const [selectedThemeId, setSelectedThemeId] = useState(invitationData.themeId);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1) {
      if (!groomName.trim() || !brideName.trim()) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Save and finish
      onSaveInvitation({
        groomName,
        brideName,
        groomFull: `${groomName} Pratama`,
        brideFull: `${brideName} Azzahra`,
        weddingDate,
        venueName: venueCity,
        themeId: selectedThemeId,
        isOpened: true,
      });

      setIsFinished(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.5 },
      });
    }
  };

  const generatedUrl = `https://vowmoment.id/${groomName.toLowerCase().replace(/\s+/g, '')}-${brideName.toLowerCase().replace(/\s+/g, '')}?to=Nama+Tamu`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-fade-in text-stone-900">
        
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 fill-stone-950" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base">
                Buat Undangan Gratis (5 Menit Jadi)
              </h3>
              <p className="text-[11px] text-stone-400">
                {initialPackage ? `Paket Dipilih: ${initialPackage}` : 'Tanpa Kartu Kredit • Langsung Uji Coba'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Steps */}
        {!isFinished && (
          <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-stone-100 text-xs">
            <div className={`flex items-center gap-1.5 font-semibold ${step >= 1 ? 'text-amber-700' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-400 text-stone-950' : 'bg-stone-200'}`}>1</span>
              <span>Nama Pasangan</span>
            </div>
            <div className="h-0.5 w-6 bg-stone-200" />
            <div className={`flex items-center gap-1.5 font-semibold ${step >= 2 ? 'text-amber-700' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-400 text-stone-950' : 'bg-stone-200'}`}>2</span>
              <span>Tanggal & Lokasi</span>
            </div>
            <div className="h-0.5 w-6 bg-stone-200" />
            <div className={`flex items-center gap-1.5 font-semibold ${step >= 3 ? 'text-amber-700' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-amber-400 text-stone-950' : 'bg-stone-200'}`}>3</span>
              <span>Pilih Tema</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {!isFinished ? (
            <div className="space-y-4">
              
              {/* STEP 1: Mempelai */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-left space-y-1">
                    <h4 className="font-display text-lg font-bold text-stone-900">
                      Siapa Nama Panggilan Anda Berdua?
                    </h4>
                    <p className="text-xs text-stone-500">
                      Nama ini akan tampil sebagai judul utama di sampul dan link undangan.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Mempelai Pria
                      </label>
                      <input
                        type="text"
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        placeholder="Contoh: Arya"
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 bg-stone-50 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Mempelai Wanita
                      </label>
                      <input
                        type="text"
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        placeholder="Contoh: Clarissa"
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 bg-stone-50 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Contoh Link: <strong>vowmoment.id/{groomName.toLowerCase() || 'arya'}-{brideName.toLowerCase() || 'clarissa'}</strong></span>
                  </div>
                </div>
              )}

              {/* STEP 2: Tanggal & Lokasi */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="space-y-1">
                    <h4 className="font-display text-lg font-bold text-stone-900">
                      Kapan Hari Bahagia Dilaksanakan?
                    </h4>
                    <p className="text-xs text-stone-500">
                      Jadwal ini akan otomatis memicu fitur Live Countdown & Save to Calendar.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Tanggal Acara Pernikahan
                      </label>
                      <input
                        type="text"
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        placeholder="Sabtu, 24 Oktober 2026"
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 bg-stone-50 text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Tempat / Venue Acara
                      </label>
                      <input
                        type="text"
                        value={venueCity}
                        onChange={(e) => setVenueCity(e.target.value)}
                        placeholder="The Glass House Ballroom, Jakarta Selatan"
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 bg-stone-50 text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Pilih Tema */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="space-y-1">
                    <h4 className="font-display text-lg font-bold text-stone-900">
                      Pilih Gaya Desain Tema Anda
                    </h4>
                    <p className="text-xs text-stone-500">
                      Anda dapat mengganti tema kapan saja setelah undangan selesai dibuat.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {THEMES_DATA.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedThemeId(t.id)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          selectedThemeId === t.id
                            ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-stone-900">{t.name}</span>
                          {selectedThemeId === t.id && <Check className="w-3.5 h-3.5 text-amber-700" />}
                        </div>
                        <span className="text-[10px] text-stone-500 mt-1">{t.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((step - 1) as any)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Kembali
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
                >
                  <span>{step === 3 ? 'Selesaikan & Buat Undangan' : 'Lanjut'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            /* FINISHED STATE */
            <div className="text-center space-y-4 py-3 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-display text-2xl font-bold text-stone-900">
                  Undangan Berhasil Dibuat! 🎉
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Undangan pernikahan digital atas nama <strong>{groomName} & {brideName}</strong> sudah aktif di simulator mockup HP.
                </p>
              </div>

              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-xs text-left space-y-2">
                <span className="font-semibold text-stone-700 block">Tautan Undangan Siap Sebar:</span>
                <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-stone-200 font-mono text-[11px] text-stone-800">
                  <span className="truncate">{generatedUrl}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedUrl);
                      alert('Link undangan berhasil disalin!');
                    }}
                    className="ml-2 px-2.5 py-1 bg-stone-900 text-white rounded text-[10px] flex items-center gap-1 shrink-0"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-colors"
                >
                  Lihat Hasil di Layar HP
                </button>

                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Vowmoment!%20Saya%20sudah%20membuat%20draf%20undangan%20atas%20nama%20${groomName}%20%26%20${brideName}.%20Mohon%20bantuan%20aktivasi%20paketnya%20ya.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 text-xs font-semibold text-emerald-800 hover:underline"
                >
                  Aktivasi Paket Tanpa Watermark via WhatsApp →
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

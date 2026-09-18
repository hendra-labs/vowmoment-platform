import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Heart, 
  MapPin, 
  Calendar, 
  Share2, 
  QrCode, 
  Copy, 
  Check, 
  Send, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeItem, InvitationData } from '../types';
import { romanticAudio } from '../utils/audioPlayer';

interface FullScreenDemoModalProps {
  theme: ThemeItem | null;
  onClose: () => void;
  invitationData: InvitationData;
  onOpenCreateModal: () => void;
}

export const FullScreenDemoModal: React.FC<FullScreenDemoModalProps> = ({
  theme,
  onClose,
  invitationData,
  onOpenCreateModal,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!theme) return null;

  const handleToggleAudio = () => {
    const status = romanticAudio.toggle();
    setIsPlaying(status);
  };

  const handleOpen = () => {
    setIsOpened(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });
    if (!isPlaying) {
      romanticAudio.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      
      {/* Container simulating high-end mobile invitation experience */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-stone-900 rounded-[38px] overflow-hidden shadow-2xl border-4 border-stone-800 text-stone-900 my-4 flex flex-col h-[90vh]">
        
        {/* Top Control Bar */}
        <div className="bg-stone-950/90 text-white px-4 py-2.5 flex items-center justify-between z-30 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-300">{theme.name}</span>
            <span className="text-[10px] text-stone-400 font-mono">Demo Mode</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className="p-1.5 rounded-full bg-stone-800 text-amber-200 hover:bg-stone-700 transition-colors"
              title="Musik"
            >
              {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inner Invitation Viewport */}
        <div className={`flex-1 overflow-y-auto ${theme.bgStyle} relative`}>
          {!isOpened ? (
            /* COVER VIEW */
            <div className="min-h-full flex flex-col items-center justify-between p-6 py-12 text-center">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-stone-700">
                  The Wedding of
                </span>
                <h2 className="font-display text-3xl font-bold text-stone-900">
                  {invitationData.groomName} & {invitationData.brideName}
                </h2>
                <p className="text-xs text-stone-600">{invitationData.weddingDate}</p>
              </div>

              <div className="w-48 h-64 rounded-2xl overflow-hidden shadow-xl border-2 border-white/90">
                <img
                  src={theme.previewImage}
                  alt="Wedding Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full space-y-3 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-stone-200 shadow-sm">
                <p className="text-[11px] text-stone-600">Kepada Yth. Tamu Undangan:</p>
                <p className="text-sm font-bold text-stone-900">{invitationData.guestName}</p>
                <button
                  onClick={handleOpen}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  <Heart className="w-3.5 h-3.5 fill-white/40" />
                  <span>Buka Undangan</span>
                </button>
              </div>
            </div>
          ) : (
            /* OPENED INVITATION SCROLL CONTENT */
            <div className="p-5 space-y-8 text-center pb-24">
              <div className="space-y-2 pt-6">
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold">
                  Om Swastiastu / Assalamu’alaikum Wr. Wb.
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900">
                  {invitationData.groomName} & {invitationData.brideName}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  Dengan penuh rasa syukur dan sukacita, kami mengundang Anda untuk hadir di hari bahagia pernikahan kami.
                </p>
              </div>

              {/* Photo Showcase */}
              <div className="rounded-2xl overflow-hidden shadow-md h-56 border border-white">
                <img
                  src={theme.previewImage}
                  alt="Couple"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Details Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-stone-200/80 space-y-4 text-left shadow-2xs">
                <h4 className="font-display font-bold text-base text-stone-900 text-center">
                  Rangkaian Waktu & Lokasi
                </h4>
                
                <div className="border-l-2 border-amber-500 pl-3 space-y-1">
                  <span className="text-xs font-bold text-stone-900 block">Akad Nikah</span>
                  <span className="text-[11px] text-stone-600 block">Pukul {invitationData.akadTime} WIB</span>
                </div>

                <div className="border-l-2 border-amber-500 pl-3 space-y-1">
                  <span className="text-xs font-bold text-stone-900 block">Resepsi Pernikahan</span>
                  <span className="text-[11px] text-stone-600 block">Pukul {invitationData.receptionTime} WIB</span>
                  <span className="text-[11px] font-semibold text-stone-800 block">{invitationData.venueName}</span>
                  <span className="text-[10px] text-stone-500 block leading-relaxed">{invitationData.venueAddress}</span>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-stone-900 text-white text-xs font-medium rounded-xl flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>

              {/* Cashless Gift Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-stone-200/80 space-y-3 shadow-2xs">
                <h4 className="font-display font-bold text-base text-stone-900">
                  Amplop Digital & Kado Kasih
                </h4>
                <p className="text-[11px] text-stone-500">
                  Terima kasih atas doa dan tanda kasih dari Bapak/Ibu/Saudara/i sekalian.
                </p>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-blue-800 block">BCA: 8200192831</span>
                    <span className="text-[10px] text-stone-500">a.n. Arya Pratama</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('8200192831');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-2.5 py-1 bg-stone-900 text-white rounded text-[10px]"
                  >
                    {copied ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="bg-stone-950 p-4 border-t border-stone-800 flex items-center justify-between gap-3 shrink-0">
          <div className="text-left text-white">
            <span className="text-xs font-bold block">Suka dengan tema ini?</span>
            <span className="text-[10px] text-stone-400">Buat versi milikmu dalam 5 menit</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenCreateModal();
            }}
            className="px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Gunakan Tema Ini</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

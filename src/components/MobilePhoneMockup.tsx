import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  Calendar, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  QrCode, 
  Clock, 
  Users, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeItem, InvitationData } from '../types';
import { romanticAudio } from '../utils/audioPlayer';

interface MobilePhoneMockupProps {
  currentTheme: ThemeItem;
  invitationData: InvitationData;
  onUpdateGuestName: (name: string) => void;
  onOpenFullDemo?: () => void;
}

export const MobilePhoneMockup: React.FC<MobilePhoneMockupProps> = ({
  currentTheme,
  invitationData,
  onUpdateGuestName,
  onOpenFullDemo,
}) => {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(invitationData.isOpened);
  const [activeTab, setActiveTab] = useState<'home' | 'event' | 'rsvp' | 'gift'>('home');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Guest RSVP state inside the phone
  const [guestRsvp, setGuestRsvp] = useState<'yes' | 'maybe' | 'no'>('yes');
  const [guestPax, setGuestPax] = useState('2');
  const [guestWishMessage, setGuestWishMessage] = useState('');
  const [phoneWishes, setPhoneWishes] = useState([
    { name: 'Adityo & Istri', status: 'Hadir', text: 'Selamat ya! Doa terbaik buat kalian berdua ❤️', time: '12m lalu' },
    { name: 'Siti Rahmawati', status: 'Hadir', text: 'Barakallahu lakuma, semoga langgeng sampai maut memisahkan!', time: '1j lalu' },
  ]);

  // Audio handling
  const handleToggleAudio = () => {
    const status = romanticAudio.toggle();
    setIsAudioPlaying(status);
  };

  const handleOpenInvitation = () => {
    setIsEnvelopeOpened(true);
    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FAF9F6', '#E2DCD5', '#C47B59'],
    });
    // Auto-start gentle audio
    if (!isAudioPlaying) {
      romanticAudio.start();
      setIsAudioPlaying(true);
    }
  };

  const handleCopyAccount = (accountNumber: string, bank: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestWishMessage.trim()) return;

    setPhoneWishes([
      {
        name: invitationData.guestName || 'Tamu Terhormat',
        status: guestRsvp === 'yes' ? 'Hadir' : guestRsvp === 'maybe' ? 'Ragu' : 'Berhalangan',
        text: guestWishMessage.trim(),
        time: 'Baru saja',
      },
      ...phoneWishes,
    ]);

    setGuestWishMessage('');
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E2DCD5'],
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      
      {/* Interactive Mockup Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[360px] mx-auto select-none">
        
        {/* Glow ambient background behind the device */}
        <div 
          className="absolute -inset-4 rounded-[48px] blur-2xl opacity-40 transition-colors duration-500 pointer-events-none"
          style={{ backgroundColor: currentTheme.accentColor }}
        />

        {/* Outer Phone Bezel */}
        <div className="relative rounded-[44px] p-3 bg-stone-900 shadow-2xl border-[3px] border-stone-700/60 ring-1 ring-white/20">
          
          {/* Dynamic Island / Notch Area */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-950 rounded-full z-40 flex items-center justify-between px-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative rounded-[36px] overflow-hidden bg-stone-100 h-[640px] flex flex-col text-stone-900 shadow-inner">
            
            {/* Top Status Bar & Audio Toggle */}
            <div className="absolute top-0 inset-x-0 h-12 z-30 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-stone-600 pointer-events-auto">
              <span className="tracking-tighter">09:41</span>
              
              {/* Music Floating Pill */}
              <button
                onClick={handleToggleAudio}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/80 text-amber-200 backdrop-blur-md shadow-xs hover:bg-stone-900 transition-all cursor-pointer"
                title={isAudioPlaying ? 'Matikan Musik' : 'Putar Musik Romantis'}
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-3 h-3 text-amber-300 animate-pulse" />
                    <span className="text-[10px] tracking-wide font-mono">PLAYING</span>
                    <span className="flex gap-0.5 items-end h-2.5 ml-0.5">
                      <span className="w-0.5 h-full bg-amber-300 animate-bounce" />
                      <span className="w-0.5 h-1.5 bg-amber-300 animate-bounce delay-75" />
                      <span className="w-0.5 h-2 bg-amber-300 animate-bounce delay-150" />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3 h-3 text-stone-400" />
                    <span className="text-[10px] text-stone-300">Musik</span>
                  </>
                )}
              </button>
            </div>

            {/* SCREEN VIEWPORT */}
            {!isEnvelopeOpened ? (
              
              /* ENVELOPE / COVER SCREEN */
              <div 
                className={`relative h-full flex flex-col items-center justify-between p-6 pt-16 text-center ${currentTheme.bgStyle} transition-all duration-700 overflow-hidden`}
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 30%, ${currentTheme.palette[1]}33 0%, transparent 70%)`
                }}
              >
                {/* Decorative Floral or Frame Header */}
                <div className="space-y-2 mt-4 animate-fade-in">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-[11px] font-medium tracking-widest uppercase bg-white/60 backdrop-blur-xs shadow-2xs">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>The Wedding Celebration</span>
                  </div>
                  <h3 className="font-display text-3xl font-serif tracking-tight mt-1 text-stone-900">
                    {invitationData.groomName} & {invitationData.brideName}
                  </h3>
                  <p className="text-xs text-stone-600 tracking-wider">
                    {invitationData.weddingDate}
                  </p>
                </div>

                {/* Pre-wedding Cover Photo / Artistic Monogram */}
                <div className="relative w-44 h-56 rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 group">
                  <img
                    src={currentTheme.previewImage}
                    alt="Cover Pasangan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-3">
                    <span className="text-white text-[11px] font-serif italic tracking-wide">
                      #AryaClarissaForever
                    </span>
                  </div>
                </div>

                {/* Personalized Guest Badge */}
                <div className="w-full space-y-3 bg-white/85 backdrop-blur-md rounded-2xl p-4 border border-stone-200/80 shadow-xs">
                  <div className="text-[11px] text-stone-600 font-medium tracking-wide">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </div>
                  <div className="text-sm font-bold text-stone-900 tracking-tight flex items-center justify-center gap-1.5">
                    <span>{invitationData.guestName || 'Tamu Spesial'}</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                  </div>
                  <div className="text-[10px] text-stone-500 leading-relaxed">
                    Mohon maaf bila ada kesalahan penulisan nama & gelar
                  </div>

                  {/* Wax Seal Open Button */}
                  <button
                    onClick={handleOpenInvitation}
                    className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-white shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  >
                    <Heart className="w-3.5 h-3.5 fill-white/40" />
                    <span>Buka Undangan</span>
                  </button>
                </div>

                <div className="text-[10px] text-stone-600 font-medium tracking-wide pb-1">
                  vowmoment.id • Sentuh untuk Membuka
                </div>
              </div>

            ) : (

              /* INNER INVITATION BODY (SCROLLABLE) */
              <div className="relative h-full flex flex-col justify-between overflow-hidden bg-stone-50">
                
                {/* Scrollable Main Area */}
                <div className="flex-1 overflow-y-auto px-4 pt-14 pb-20 space-y-5 scroll-smooth text-left text-xs text-stone-700">
                  
                  {/* TAB: HOME */}
                  {activeTab === 'home' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Romantic Header Banner */}
                      <div className="text-center space-y-1.5 py-2">
                        <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold">
                          Undangan Pernikahan
                        </span>
                        <h4 className="font-display text-2xl font-bold text-stone-900">
                          {invitationData.groomName} & {invitationData.brideName}
                        </h4>
                        <p className="text-[11px] text-stone-500 italic">
                          "Dua hati, satu janji, selamanya dalam cinta."
                        </p>
                      </div>

                      {/* Photo banner */}
                      <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 border border-stone-200">
                        <img 
                          src={currentTheme.previewImage} 
                          alt="Bride and groom" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-3">
                          <div className="text-white text-left">
                            <p className="text-[11px] font-semibold">{invitationData.weddingDate}</p>
                            <p className="text-[10px] opacity-90">{invitationData.venueName}</p>
                          </div>
                        </div>
                      </div>

                      {/* Live Countdown Simulation */}
                      <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs text-center space-y-2">
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-stone-500">
                          Menghitung Hari Bahagia
                        </span>
                        <div className="grid grid-cols-4 gap-2 text-stone-900">
                          <div className="bg-stone-100 rounded-xl py-1.5">
                            <span className="block text-base font-bold text-stone-900">42</span>
                            <span className="text-[9px] text-stone-500">Hari</span>
                          </div>
                          <div className="bg-stone-100 rounded-xl py-1.5">
                            <span className="block text-base font-bold text-stone-900">14</span>
                            <span className="text-[9px] text-stone-500">Jam</span>
                          </div>
                          <div className="bg-stone-100 rounded-xl py-1.5">
                            <span className="block text-base font-bold text-stone-900">35</span>
                            <span className="text-[9px] text-stone-500">Menit</span>
                          </div>
                          <div className="bg-stone-100 rounded-xl py-1.5">
                            <span className="block text-base font-bold text-amber-700 animate-pulse">20</span>
                            <span className="text-[9px] text-stone-500">Detik</span>
                          </div>
                        </div>
                      </div>

                      {/* Bride & Groom Profile Card */}
                      <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 space-y-3">
                        <div className="text-center font-display font-medium text-stone-900 text-sm">
                          Mempelai Pengantin
                        </div>
                        <div className="space-y-2 text-center">
                          <div>
                            <span className="font-bold text-stone-900 text-xs">{invitationData.groomFull}</span>
                            <p className="text-[10px] text-stone-500">Putra pertama dari Bpk. Bambang & Ibu Ratna</p>
                          </div>
                          <div className="text-stone-400 font-serif italic text-xs">&</div>
                          <div>
                            <span className="font-bold text-stone-900 text-xs">{invitationData.brideFull}</span>
                            <p className="text-[10px] text-stone-500">Putri kedua dari Bpk. Hendra & Ibu Yuliana</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: EVENT */}
                  {activeTab === 'event' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-center space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold">
                          Waktu & Tempat
                        </span>
                        <h4 className="font-display text-lg font-bold text-stone-900">
                          Rangkaian Acara
                        </h4>
                      </div>

                      {/* Akad Card */}
                      <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 space-y-2">
                        <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Akad Nikah</span>
                        </div>
                        <p className="text-[11px] text-stone-600">Pukul {invitationData.akadTime} WIB</p>
                        <p className="text-[10px] text-stone-500">Khusus keluarga & kerabat dekat</p>
                      </div>

                      {/* Resepsi Card */}
                      <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 space-y-2">
                        <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                          <Users className="w-3.5 h-3.5 text-amber-600" />
                          <span>Resepsi Pernikahan</span>
                        </div>
                        <p className="text-[11px] text-stone-600">Pukul {invitationData.receptionTime} WIB</p>
                        <p className="text-[11px] font-medium text-stone-800">{invitationData.venueName}</p>
                        <p className="text-[10px] text-stone-500 leading-relaxed">{invitationData.venueAddress}</p>
                        
                        <div className="pt-2 flex gap-2">
                          <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1.5 px-2.5 rounded-xl bg-stone-900 text-white text-[10px] font-medium flex items-center justify-center gap-1.5"
                          >
                            <MapPin className="w-3 h-3 text-amber-300" />
                            <span>Buka Google Maps</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: RSVP & WISHES */}
                  {activeTab === 'rsvp' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-center space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold">
                          Buku Tamu Digital
                        </span>
                        <h4 className="font-display text-lg font-bold text-stone-900">
                          Konfirmasi Kehadiran (RSVP)
                        </h4>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSendWish} className="bg-white p-3.5 rounded-2xl border border-stone-200/80 space-y-2.5">
                        <div>
                          <label className="block text-[10px] font-medium text-stone-600 mb-1">
                            Nama Anda
                          </label>
                          <input
                            type="text"
                            value={invitationData.guestName}
                            onChange={(e) => onUpdateGuestName(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-500 bg-stone-50"
                            placeholder="Nama tamu..."
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-medium text-stone-600 mb-1">
                            Konfirmasi Kehadiran
                          </label>
                          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                            <button
                              type="button"
                              onClick={() => setGuestRsvp('yes')}
                              className={`py-1.5 rounded-lg border font-medium ${
                                guestRsvp === 'yes'
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                                  : 'border-stone-200 text-stone-600'
                              }`}
                            >
                              ✓ Hadir
                            </button>
                            <button
                              type="button"
                              onClick={() => setGuestRsvp('maybe')}
                              className={`py-1.5 rounded-lg border font-medium ${
                                guestRsvp === 'maybe'
                                  ? 'bg-amber-50 border-amber-500 text-amber-800'
                                  : 'border-stone-200 text-stone-600'
                              }`}
                            >
                              ? Ragu
                            </button>
                            <button
                              type="button"
                              onClick={() => setGuestRsvp('no')}
                              className={`py-1.5 rounded-lg border font-medium ${
                                guestRsvp === 'no'
                                  ? 'bg-rose-50 border-rose-500 text-rose-800'
                                  : 'border-stone-200 text-stone-600'
                              }`}
                            >
                              ✕ Absen
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-medium text-stone-600 mb-1">
                            Ucapan & Doa Restu
                          </label>
                          <textarea
                            value={guestWishMessage}
                            onChange={(e) => setGuestWishMessage(e.target.value)}
                            rows={2}
                            placeholder="Tuliskan ucapan bahagia..."
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-amber-500 bg-stone-50 resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Send className="w-3 h-3" />
                          <span>Kirim Ucapan</span>
                        </button>
                      </form>

                      {/* Live Wish Stream */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                          Ucapan Terbaru ({phoneWishes.length})
                        </span>
                        {phoneWishes.map((w, i) => (
                          <div key={i} className="bg-white p-2.5 rounded-xl border border-stone-200/70 text-[11px] space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-stone-900">{w.name}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">{w.status}</span>
                            </div>
                            <p className="text-stone-600 text-[10px]">{w.text}</p>
                            <span className="text-[9px] text-stone-400 block text-right">{w.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB: GIFT / AMPLOP DIGITAL */}
                  {activeTab === 'gift' && (
                    <div className="space-y-4 animate-fade-in text-center">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold">
                          Tanda Kasih
                        </span>
                        <h4 className="font-display text-lg font-bold text-stone-900">
                          Amplop Digital (Cashless Gift)
                        </h4>
                        <p className="text-[10px] text-stone-500">
                          Doa restu Anda merupakan karunia terindah bagi kami. Jika hendak memberi tanda kasih, dapat disalurkan melalui:
                        </p>
                      </div>

                      {/* QRIS Card */}
                      <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 space-y-2.5 flex flex-col items-center">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                          <QrCode className="w-4 h-4 text-amber-600" />
                          <span>QRIS Standar Indonesia</span>
                        </div>
                        <div className="w-32 h-32 bg-stone-100 p-2 rounded-xl border border-stone-300 flex items-center justify-center">
                          {/* Simulated SVG QR code */}
                          <div className="w-full h-full border-2 border-stone-800 p-1 flex flex-col justify-between">
                            <div className="flex justify-between">
                              <div className="w-6 h-6 border-2 border-stone-800 bg-stone-800" />
                              <div className="w-6 h-6 border-2 border-stone-800 bg-stone-800" />
                            </div>
                            <div className="text-[8px] font-mono font-bold text-stone-900 text-center">
                              VOWMOMENT PAY
                            </div>
                            <div className="flex justify-between items-end">
                              <div className="w-6 h-6 border-2 border-stone-800 bg-stone-800" />
                              <div className="w-4 h-4 bg-stone-800" />
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-stone-500">Scan via BCA, GoPay, OVO, ShopeePay, Mandiri Livin</span>
                      </div>

                      {/* Bank Transfer Card */}
                      <div className="bg-white p-3 rounded-2xl border border-stone-200/80 space-y-2 text-left">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-blue-700">Bank Central Asia (BCA)</span>
                          <span className="text-[10px] text-stone-400">a.n. Arya Pratama</span>
                        </div>
                        <div className="flex items-center justify-between bg-stone-50 p-2 rounded-xl border border-stone-200">
                          <span className="font-mono font-bold text-stone-900 text-xs tracking-wider">8200192831</span>
                          <button
                            onClick={() => handleCopyAccount('8200192831', 'BCA')}
                            className="px-2.5 py-1 bg-stone-900 text-white rounded-lg text-[10px] flex items-center gap-1 hover:bg-stone-800 cursor-pointer"
                          >
                            {copiedBank === 'BCA' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Tersalin!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Salin</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Navigation Tab Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-around z-20 shadow-md">
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                      activeTab === 'home' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${activeTab === 'home' ? 'fill-amber-600/30' : ''}`} />
                    <span>Beranda</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('event')}
                    className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                      activeTab === 'event' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Acara</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('rsvp')}
                    className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                      activeTab === 'rsvp' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>RSVP</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('gift')}
                    className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                      activeTab === 'gift' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Amplop</span>
                  </button>
                </div>

              </div>
            )}

            {/* Home Indicator Bar at the bottom of the device screen */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-900/30 rounded-full z-30 pointer-events-none" />

          </div>
        </div>

      </div>

      {/* Quick Controls Under The Phone */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <button
          onClick={() => setIsEnvelopeOpened(!isEnvelopeOpened)}
          className="px-3.5 py-1.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
        >
          <span>{isEnvelopeOpened ? '🔄 Ulang Sampul' : '✨ Buka Undangan'}</span>
        </button>

        {onOpenFullDemo && (
          <button
            onClick={onOpenFullDemo}
            className="px-3.5 py-1.5 rounded-full bg-stone-900 text-amber-200 hover:bg-stone-800 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Lihat Full Layar</span>
          </button>
        )}
      </div>

    </div>
  );
};

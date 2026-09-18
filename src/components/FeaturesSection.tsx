import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  QrCode, 
  Eye, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Send,
  Smartphone,
  ShieldCheck,
  CreditCard,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FeaturesSectionProps {
  onSelectThemeById: (id: string) => void;
  onOpenCreateModal: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onSelectThemeById,
  onOpenCreateModal,
}) => {
  // 1. Smart Guest Customization interactive state
  const [testGuestName, setTestGuestName] = useState('Budi Santoso & Partner');
  const [guestTone, setGuestTone] = useState<'formal' | 'santai' | 'english'>('formal');
  const [copiedLink, setCopiedLink] = useState(false);

  // 2. Real-time RSVP interactive state
  const [rsvpYesCount, setRsvpYesCount] = useState(218);
  const [hasVoted, setHasVoted] = useState(false);

  // 3. Cashless Gift interactive state
  const [giftCopied, setGiftCopied] = useState(false);

  // Compute WhatsApp blast text
  const generateWhatsAppMessage = () => {
    const encodedName = encodeURIComponent(testGuestName);
    const link = `https://vowmoment.id/arya-clarissa?to=${encodedName}`;

    if (guestTone === 'formal') {
      return `Kepada Yth. Bapak/Ibu/Saudara/i ${testGuestName},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri resepsi pernikahan kami.\n\nDetail Acara & Undangan:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nSalam hangat,\nArya & Clarissa`;
    } else if (guestTone === 'santai') {
      return `Hai ${testGuestName}! ✨\n\nAlhamdulillah, finally we're tying the knot! Kami mengundang kamu untuk hadir merayakan hari bahagia kami.\n\nBuka undangannya di sini ya:\n${link}\n\nSampai ketemu di hari H! ❤️\nArya & Clarissa`;
    } else {
      return `Dear ${testGuestName},\n\nWe warmly invite you to share in our joy as we celebrate our wedding day.\n\nPlease find the invitation details here:\n${link}\n\nWarm regards,\nArya & Clarissa`;
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
    });
  };

  const handleTestRsvp = () => {
    if (!hasVoted) {
      setRsvpYesCount((prev) => prev + 1);
      setHasVoted(true);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10B981', '#34D399', '#D4AF37'],
      });
    }
  };

  const handleCopyGift = () => {
    navigator.clipboard.writeText('8200192831');
    setGiftCopied(true);
    setTimeout(() => setGiftCopied(false), 2000);
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Fitur Paling Unggul di Kelasnya</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Teknologi Modern untuk Momen Sekali Seumur Hidup
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Tidak sekadar gambar digital statis. Vowmoment menghadirkan ekosistem undangan interaktif yang memudahkan pengantin dan memanjakan seluruh tamu undangan.
          </p>
        </div>

        {/* 4 Powerful Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Feature 1: Smart Guest Customization */}
          <div className="bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-amber-400/60 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900">
                1. Smart Guest Customization
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Kirim satu link ke ribuan tamu dengan sapaan nama otomatis (<span className="text-amber-800 font-semibold italic">"Dear [Nama Tamu]"</span>). Tidak perlu membuat ratusan halaman terpisah secara manual.
              </p>
            </div>

            {/* Interactive Widget */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-3 text-xs">
              <div className="flex items-center justify-between font-semibold text-stone-700">
                <span>Simulasi Generator Teks WhatsApp:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setGuestTone('formal')}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${guestTone === 'formal' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'}`}
                  >
                    Formal
                  </button>
                  <button
                    onClick={() => setGuestTone('santai')}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${guestTone === 'santai' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'}`}
                  >
                    Santai
                  </button>
                  <button
                    onClick={() => setGuestTone('english')}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${guestTone === 'english' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'}`}
                  >
                    English
                  </button>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={testGuestName}
                  onChange={(e) => setTestGuestName(e.target.value)}
                  placeholder="Ketik nama tamu di sini..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 font-mono text-[11px] text-emerald-950 whitespace-pre-line leading-relaxed max-h-32 overflow-y-auto">
                {generateWhatsAppMessage()}
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Format WhatsApp Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Format Pesan WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feature 2: Real-time RSVP & Wishes */}
          <div className="bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-amber-400/60 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900">
                2. Real-time RSVP & Wishes
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Buku tamu digital interaktif dengan sistem konfirmasi hadir instan dan kolom ucapan doa restu. Pantau jumlah porsi catering secara akurat tanpa menebak-nebak.
              </p>
            </div>

            {/* Interactive Widget */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Live Dashboard RSVP Acara:</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                  ● Terhubung Real-Time
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-xl">
                  <span className="block text-xl font-bold text-emerald-800">{rsvpYesCount}</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Konfirmasi Hadir</span>
                </div>
                <div className="bg-amber-50/70 border border-amber-200 p-2.5 rounded-xl">
                  <span className="block text-xl font-bold text-amber-800">24</span>
                  <span className="text-[10px] text-amber-700 font-medium">Masih Ragu</span>
                </div>
                <div className="bg-rose-50/70 border border-rose-200 p-2.5 rounded-xl">
                  <span className="block text-xl font-bold text-rose-800">16</span>
                  <span className="text-[10px] text-rose-700 font-medium">Berhalangan</span>
                </div>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                <div className="text-left">
                  <span className="font-bold text-stone-800 block">Coba Klik Konfirmasi Hadir:</span>
                  <span className="text-[10px] text-stone-500">Uji coba simulasi live sync RSVP tamu</span>
                </div>
                <button
                  onClick={handleTestRsvp}
                  disabled={hasVoted}
                  className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                    hasVoted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  {hasVoted ? '✓ Terkonfirmasi Hadir (+1)' : '+ Coba Klik Hadir'}
                </button>
              </div>

              <p className="text-[10px] text-stone-500 italic">
                Data RSVP dapat di-export langsung ke Excel kapan saja untuk dibagikan ke wedding organizer & catering.
              </p>
            </div>
          </div>

          {/* Feature 3: Integrated Cashless Gift (Amplop Digital) */}
          <div className="bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-amber-400/60 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900">
                3. Integrated Cashless Gift (Amplop Digital)
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Memudahkan tamu yang tidak bisa hadir fisik untuk mengirim kado kasih. Aman, terintegrasi QRIS resmi, dan transfer bank otomatis langsung ke rekening Anda sendiri.
              </p>
            </div>

            {/* Interactive Widget */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Simulasi Pembayaran Cashless:</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                  0% Potongan Biaya
                </span>
              </div>

              <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div className="w-10 h-10 rounded-lg bg-stone-900 text-amber-300 flex items-center justify-center">
                  <QrCode className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-bold text-stone-900 block">Dukungan QRIS Nasional</span>
                  <span className="text-[10px] text-stone-500">Scan via BCA Mobile, Mandiri Livin, GoPay, OVO, ShopeePay</span>
                </div>
              </div>

              <div className="bg-blue-50/60 border border-blue-200 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-blue-900 block">Bank Central Asia (BCA)</span>
                  <span className="font-mono text-xs text-blue-950 font-bold">8200192831</span>
                  <span className="block text-[9px] text-blue-700">a.n. Arya Pratama</span>
                </div>
                <button
                  onClick={handleCopyGift}
                  className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  {giftCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{giftCopied ? 'Tersalin' : 'Salin Rekening'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feature 4: Live Preview Mode */}
          <div className="bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-amber-400/60 transition-colors">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900">
                4. Live Preview Mode
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Pratinjau tema secara instan tanpa harus melewati registrasi rumit atau pembayaran terlebih dahulu. Coba ganti tema favoritmu di bawah ini:
              </p>
            </div>

            {/* Interactive Widget */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-3 text-xs">
              <span className="font-bold text-stone-800 block">Coba Switch Tema Seketika:</span>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onSelectThemeById('modern-editorial');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-stone-900 block group-hover:text-amber-800">
                    Ivory Elegance
                  </span>
                  <span className="text-[10px] text-stone-500">Modern Minimalist</span>
                </button>

                <button
                  onClick={() => {
                    onSelectThemeById('rustic-terracotta');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-stone-900 block group-hover:text-amber-800">
                    Bohemian Botanica
                  </span>
                  <span className="text-[10px] text-stone-500">Rustic Earth</span>
                </button>

                <button
                  onClick={() => {
                    onSelectThemeById('royal-monogram');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-stone-900 block group-hover:text-amber-800">
                    Emerald Royale
                  </span>
                  <span className="text-[10px] text-stone-500">Luxury Royal Gold</span>
                </button>

                <button
                  onClick={() => {
                    onSelectThemeById('motion-sakura');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-stone-900 block group-hover:text-amber-800">
                    Celestial Petals
                  </span>
                  <span className="text-[10px] text-stone-500">Animated Motion</span>
                </button>
              </div>

              <button
                onClick={onOpenCreateModal}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Buat Undangan Gratis Sekarang</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

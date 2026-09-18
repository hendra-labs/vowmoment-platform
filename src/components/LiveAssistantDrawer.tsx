import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Heart, 
  Bot, 
  User, 
  Loader2, 
  RotateCcw,
  MessageCircle
} from 'lucide-react';
import { ChatMessage } from '../types';

interface LiveAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectThemeById?: (themeId: string) => void;
  onOpenCreateModal?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'bot',
    text: 'Halo Kak! Selamat ya atas rencana pernikahannya 💍✨\n\nSaya **VowBot AI**, Wedding Stylist & Konsultan Virtual dari Vowmoment Indonesia. Saya siap membantu Kakak memilih tema undangan terbaik, merekomendasikan paket harga, atau merangkai teks undangan WhatsApp yang berkelas.\n\nAda yang bisa saya bantu hari ini?',
    timestamp: 'Baru saja',
    suggestions: [
      'Bantu pilih tema pernikahan',
      'Paket mana yang paling cocok?',
      'Buatkan kata-kata mutiara undangan',
      'Format sebar WhatsApp untuk keluarga',
    ],
  },
];

export const LiveAssistantDrawer: React.FC<LiveAssistantDrawerProps> = ({
  isOpen,
  onClose,
  onSelectThemeById,
  onOpenCreateModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: 'Baru saja',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await res.json();
      const botReply = data.reply || 'Selamat atas persiapan pernikahannya! Vowmoment siap membantu mewujudkan undangan terbaik Anda.';

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: botReply,
        timestamp: 'Baru saja',
        suggestions: [
          'Jelaskan tentang Paket Pro',
          'Cara kerja sapaan nama tamu di WhatsApp',
          'Rekomendasi tema outdoor rustic',
        ],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: 'bot_err_' + Date.now(),
        sender: 'bot',
        text: 'Maaf Kak, terjadi sedikit kendala koneksi. Namun Kakak tetap bisa langsung berkonsultasi via WhatsApp bersama tim wedding specialist kami ya!',
        timestamp: 'Baru saja',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-sm">VowBot AI Assistant</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-stone-400">Wedding Stylist & Konsultan Vowmoment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            title="Tutup Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[85%]">
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-400 text-stone-950 font-medium rounded-tr-xs'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-2xs rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
              </div>

              {/* Suggestions chips */}
              {m.suggestions && m.suggestions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 pl-8">
                  {m.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(sug)}
                      className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-100/70 border border-stone-200 text-stone-700 hover:text-stone-900 text-[11px] font-medium transition-colors cursor-pointer text-left"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-stone-400 text-xs pl-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              <span>VowBot sedang merangkai saran pernikahan...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Tanyakan tema, paket harga, atau kata mutiara..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 text-xs bg-stone-50 text-stone-900"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading}
              className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-stone-500 px-1">
            <span>Didukung Gemini AI Wedding Intelligence</span>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Hubungi CS WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

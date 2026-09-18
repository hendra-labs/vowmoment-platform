import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import { FAQ_DATA } from '../data/weddingContent';

interface FAQSectionProps {
  onOpenAssistant: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenAssistant }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-t border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Pertanyaan Populer</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Semua jawaban atas pertanyaan calon pengantin seputar proses, masa aktif, keamanan, dan fitur Vowmoment.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-400/80 bg-amber-50/20 shadow-xs'
                    : 'border-stone-200/80 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-stone-900 text-base sm:text-lg">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white border border-stone-200 text-stone-600 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-amber-100 border-amber-300 text-amber-800' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Consultation Callout */}
        <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 text-center space-y-4 border border-stone-200">
          <h4 className="font-display text-xl font-bold text-stone-900">
            Masih Punya Pertanyaan Lain?
          </h4>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Tim konsultan Vowmoment dan asisten cerdas VowBot AI siap menjawab pertanyaanmu kapan saja.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAssistant}
              className="px-5 py-2.5 rounded-full bg-stone-900 text-amber-200 hover:bg-stone-800 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tanya VowBot AI 24/7</span>
            </button>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Vowmoment!%20Saya%20ingin%20tanya-tanya%20seputar%20undangan%20pernikahan%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Customer Care</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

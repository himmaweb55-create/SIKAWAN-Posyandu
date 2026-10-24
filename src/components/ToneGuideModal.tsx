import React from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Tone } from '../types';

interface ToneGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTone: (tone: Tone) => void;
}

export const ToneGuideModal: React.FC<ToneGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectTone,
}) => {
  if (!isOpen) return null;

  const TONES = [
    {
      id: 'professional' as Tone,
      name: 'Professional',
      description: 'Authoritative, thoughtful, and data-backed. Designed for executives, founders, and B2B leaders seeking credibility.',
      hookExample: '"Most companies optimize for velocity before product-market fit. Here are 3 operating principles we learned the hard way:"',
      bestFor: 'LinkedIn thought leadership, company updates, case study breakdowns.',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'witty' as Tone,
      name: 'Witty',
      description: 'Conversational, self-aware, slightly irreverent, and humorous. Connects on human relatability.',
      hookExample: '"Nobody told me that 80% of running a startup is just agreeing on what to name Google Docs."',
      bestFor: 'Twitter/X hot takes, behind-the-scenes Instagram stories, high-engagement viral commentary.',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'urgent' as Tone,
      name: 'Urgent',
      description: 'High-stakes, time-sensitive, provocative, and direct. Demands attention and triggers action.',
      hookExample: '"If you are still doing X manually in 2026, you are burning 15 hours every week. Stop today:"',
      bestFor: 'Limited-time product drops, crucial industry shifts, deadline reminders.',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              Tone of Voice Playbook
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Choosing the right tone instructs Gemini to modulate cadence, vocabulary, and psychological framing across all three platforms simultaneously.
        </p>

        <div className="mt-4 space-y-3.5">
          {TONES.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-slate-200 p-4 transition-all hover:border-slate-300 hover:bg-slate-50/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{t.name}</span>
                  <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${t.badgeColor}`}>
                    Core Preset
                  </span>
                </div>
                <button
                  onClick={() => {
                    onSelectTone(t.id);
                    onClose();
                  }}
                  className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Use This Tone
                </button>
              </div>

              <p className="mt-1 text-xs text-slate-600">{t.description}</p>

              <div className="mt-2.5 rounded-lg bg-slate-100/80 p-2.5 text-xs text-slate-700 font-sans italic">
                {t.hookExample}
              </div>

              <div className="mt-2 text-[11px] text-slate-400">
                <span className="font-medium text-slate-600">Best for: </span>
                {t.bestFor}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

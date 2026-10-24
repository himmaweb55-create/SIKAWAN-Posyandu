import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Sliders,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Check,
  Zap,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { AspectRatio, ImageSize, Tone } from '../types';

interface IdeaComposerProps {
  onGenerate: (params: {
    idea: string;
    tone: Tone;
    targetAudience: string;
    callToAction: string;
    textModel: string;
    imageModel: string;
    imageSize: ImageSize;
    generateImagesDirectly: boolean;
  }) => void;
  isLoading: boolean;
  activeTone: Tone;
  setActiveTone: (tone: Tone) => void;
}

const SAMPLE_IDEAS = [
  {
    label: '🚀 Product Launch',
    idea: 'Announcing OmniPost 2.0: An AI-native cross-platform studio that synchronizes long-form LinkedIn essays, viral 280-char tweets, and high-aesthetic Instagram visuals in one click.',
    tone: 'professional' as Tone,
  },
  {
    label: '💡 Founder Lesson',
    idea: 'The hardest lesson after burning $80k on paid ads before realizing that 1 genuine educational breakdown gets 10x more enterprise inbound leads than generic sponsored posts.',
    tone: 'witty' as Tone,
  },
  {
    label: '⏰ Urgent Industry Shift',
    idea: 'Search engine traffic is down 42% for brands that rely on generic SEO articles. If your content strategy is not multi-platform and visual-first, you are practically invisible.',
    tone: 'urgent' as Tone,
  },
  {
    label: '🌿 Sustainable Brand Drop',
    idea: 'Introducing our zero-carbon compostable packaging initiative. Every purchase from this capsule collection plants 3 mangrove trees in protected coastal wetlands.',
    tone: 'professional' as Tone,
  },
];

export const IdeaComposer: React.FC<IdeaComposerProps> = ({
  onGenerate,
  isLoading,
  activeTone,
  setActiveTone,
}) => {
  const [ideaText, setIdeaText] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customToneInput, setCustomToneInput] = useState('');
  const [isCustomTone, setIsCustomTone] = useState(false);

  // Gemini model controls
  const [textModel, setTextModel] = useState<'gemini-3.8-flash' | 'gemini-4-argon' | 'gemini-3.1-flash-lite'>('gemini-3.8-flash');
  const [imageModel, setImageModel] = useState<'gemini-3-pro-image-preview' | 'gemini-nano-banana-2.1'>('gemini-3-pro-image-preview');
  const [imageSize, setImageSize] = useState<ImageSize>('2K');
  const [autoGenImages, setAutoGenImages] = useState(true);

  const handleSelectSample = (sample: typeof SAMPLE_IDEAS[0]) => {
    setIdeaText(sample.idea);
    setActiveTone(sample.tone);
    setIsCustomTone(false);
  };

  const handleToneChange = (tone: Tone) => {
    setIsCustomTone(false);
    setActiveTone(tone);
  };

  const handleApplyCustomTone = () => {
    if (customToneInput.trim()) {
      setIsCustomTone(true);
      setActiveTone(customToneInput.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaText.trim() || isLoading) return;

    onGenerate({
      idea: ideaText.trim(),
      tone: isCustomTone ? customToneInput.trim() : activeTone,
      targetAudience: targetAudience.trim(),
      callToAction: callToAction.trim(),
      textModel,
      imageModel,
      imageSize,
      generateImagesDirectly: autoGenImages,
    });
  };

  return (
    <section className="w-full rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs sm:p-7">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Simultaneous Cross-Platform Generator
          </h1>
          <p className="text-xs text-slate-500 sm:text-sm">
            Transform a single thought into native LinkedIn thought-leadership, punchy X tweets, and visual Instagram captions with tailored aspect-ratio imagery.
          </p>
        </div>
        <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
          <span>LinkedIn · Twitter · Instagram</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Idea Input */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="idea-input" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Your Core Idea, Announcement, or Perspective
            </label>
            <span className="text-xs font-mono tabular-nums text-slate-400">
              {ideaText.length} characters
            </span>
          </div>

          <textarea
            id="idea-input"
            rows={4}
            value={ideaText}
            onChange={(e) => setIdeaText(e.target.value)}
            placeholder="e.g. We spent 6 months rebuilding our onboarding flow from scratch. Retention jumped 40% when we eliminated the password screen on day 1..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/15 transition-all"
            required
          />

          {/* Inspiration Quick Starters */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Inspiration:</span>
            {SAMPLE_IDEAS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-900 transition-colors cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desired Tone Selection (Requested: Professional, Witty, Urgent) */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Desired Tone of Voice
            </label>
            <span className="text-xs text-slate-400">
              Shapes vocabulary, sentence rhythm, and emotional resonance
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {/* Tone: Professional */}
            <button
              type="button"
              onClick={() => handleToneChange('professional')}
              className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                activeTone === 'professional' && !isCustomTone
                  ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-semibold text-sm text-slate-900">Professional</span>
                {activeTone === 'professional' && !isCustomTone && (
                  <Check className="h-4 w-4 text-emerald-700" />
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Authoritative, executive, data-backed insights with nuanced corporate polish.
              </p>
            </button>

            {/* Tone: Witty */}
            <button
              type="button"
              onClick={() => handleToneChange('witty')}
              className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                activeTone === 'witty' && !isCustomTone
                  ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-semibold text-sm text-slate-900">Witty</span>
                {activeTone === 'witty' && !isCustomTone && (
                  <Check className="h-4 w-4 text-emerald-700" />
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Clever, conversational, self-aware, and meme-literate with unexpected punchlines.
              </p>
            </button>

            {/* Tone: Urgent */}
            <button
              type="button"
              onClick={() => handleToneChange('urgent')}
              className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                activeTone === 'urgent' && !isCustomTone
                  ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-semibold text-sm text-slate-900">Urgent</span>
                {activeTone === 'urgent' && !isCustomTone && (
                  <Check className="h-4 w-4 text-emerald-700" />
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                High-stakes, deadline-driven, direct call to action, and provocative curiosity.
              </p>
            </button>
          </div>

          {/* Custom tone field */}
          <div className="mt-2.5 flex items-center gap-2">
            <input
              type="text"
              placeholder="Or enter custom tone (e.g., Candid storytelling, Philosophical, Sarcastic)..."
              value={customToneInput}
              onChange={(e) => setCustomToneInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyCustomTone();
                }
              }}
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyCustomTone}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                isCustomTone
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Apply Custom
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Parameters */}
        <div className="border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Advanced Settings & AI Engine Studio</span>
            {showAdvanced ? (
              <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>

          {showAdvanced && (
            <div className="mt-3.5 grid grid-cols-1 gap-4 rounded-xl bg-slate-50/80 p-4 sm:grid-cols-2">
              {/* Target Audience */}
              <div>
                <label className="text-xs font-semibold text-slate-700">Target Audience Focus</label>
                <input
                  type="text"
                  placeholder="e.g. Seed-stage tech founders, Marketing directors, Gen Z shoppers"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Call to Action Intent */}
              <div>
                <label className="text-xs font-semibold text-slate-700">Desired Call to Action</label>
                <input
                  type="text"
                  placeholder="e.g. Comment your experience, Visit link in bio, DM for beta access"
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              {/* Gemini Text Intelligence Model */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Gemini Text Model</label>
                  <span className="text-[11px] text-slate-400 font-mono">Multimodal Reasoning</span>
                </div>
                <div className="mt-1 grid grid-cols-3 gap-1 rounded-lg border border-slate-200 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setTextModel('gemini-3.8-flash')}
                    className={`rounded px-2 py-1.5 text-[11px] font-medium transition-colors ${
                      textModel === 'gemini-3.8-flash'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3.8 Flash (General)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextModel('gemini-4-argon')}
                    className={`rounded px-2 py-1.5 text-[11px] font-medium transition-colors ${
                      textModel === 'gemini-4-argon'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    4 Argon (Complex)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextModel('gemini-3.1-flash-lite')}
                    className={`rounded px-2 py-1.5 text-[11px] font-medium transition-colors ${
                      textModel === 'gemini-3.1-flash-lite'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3.1 Lite (Fast)
                  </button>
                </div>
              </div>

              {/* Gemini Image Model & Size Affordance */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Image Quality & Studio Resolution
                  </label>
                  <span className="text-[11px] text-emerald-700 font-mono">Aspect Ratio Presets</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex flex-1 rounded-lg border border-slate-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setImageModel('gemini-3-pro-image-preview')}
                      className={`flex-1 rounded px-2 py-1.5 text-[11px] font-medium transition-colors ${
                        imageModel === 'gemini-3-pro-image-preview'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Gemini 3 Pro Image (Studio)
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageModel('gemini-nano-banana-2.1')}
                      className={`flex-1 rounded px-2 py-1.5 text-[11px] font-medium transition-colors ${
                        imageModel === 'gemini-nano-banana-2.1'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Nano Banana 2.1 (Fast)
                    </button>
                  </div>

                  {/* Resolution Size (1K, 2K, 4K) */}
                  <div className="flex rounded-lg border border-slate-200 bg-white p-1">
                    {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setImageSize(size)}
                        className={`rounded px-2.5 py-1.5 text-[11px] font-mono font-semibold transition-colors ${
                          imageSize === size
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Auto-render visual for each platform:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoGenImages}
                      onChange={(e) => setAutoGenImages(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">Optimal Aspect Ratios:</span>
            <span className="font-mono text-[11px] text-slate-600">LinkedIn (4:3) · X (16:9) · IG (3:4)</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !ideaText.trim()}
            className="group flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-sm text-white shadow-sm hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Simultaneously Generating 3 Posts & Visuals...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                <span>Generate for LinkedIn, X & Instagram</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

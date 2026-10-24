import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  RotateCw,
  Sparkles,
  Edit3,
  Sliders,
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  BadgeCheck,
  ListOrdered,
  FileText
} from 'lucide-react';
import { AspectRatio, ImageSize, TwitterPost } from '../types';

interface PlatformCardTwitterProps {
  post: TwitterPost;
  onUpdatePost: (updated: Partial<TwitterPost>) => void;
  onRegenerateImage: (aspectRatio: AspectRatio, imageSize: ImageSize, prompt: string) => void;
  onRefineText: (action: 'shorter' | 'punchier' | 'expand' | 'emojis' | 'hook' | 'custom', customInstruction?: string) => void;
  isRefiningText?: boolean;
}

const ASPECT_RATIO_OPTIONS: AspectRatio[] = ['16:9', '1:1', '4:3', '3:4', '3:2', '2:3', '9:16', '21:9'];
const IMAGE_SIZE_OPTIONS: ImageSize[] = ['1K', '2K', '4K'];
const MAX_TWITTER_CHARS = 280;

export const PlatformCardTwitter: React.FC<PlatformCardTwitterProps> = ({
  post,
  onUpdatePost,
  onRegenerateImage,
  onRefineText,
  isRefiningText,
}) => {
  const [viewMode, setViewMode] = useState<'single' | 'thread'>('single');
  const [isEditing, setIsEditing] = useState(false);
  const [editedSingleTweet, setEditedSingleTweet] = useState(post.singleTweet);
  const [copied, setCopied] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(
    (post.suggestedAspectRatio as AspectRatio) || '16:9'
  );
  const [selectedSize, setSelectedSize] = useState<ImageSize>('2K');
  const [customImagePrompt, setCustomImagePrompt] = useState(post.imagePrompt);
  const [showImageControls, setShowImageControls] = useState(false);
  const [customRefineInput, setCustomRefineInput] = useState('');
  const [showRefineBar, setShowRefineBar] = useState(false);

  React.useEffect(() => {
    setEditedSingleTweet(post.singleTweet);
  }, [post.singleTweet]);

  React.useEffect(() => {
    setCustomImagePrompt(post.imagePrompt);
  }, [post.imagePrompt]);

  const charCount = editedSingleTweet.length;
  const isOverLimit = charCount > MAX_TWITTER_CHARS;
  const charPercentage = Math.min(100, (charCount / MAX_TWITTER_CHARS) * 100);

  const handleCopy = () => {
    if (viewMode === 'single') {
      const hashtagsStr = post.hashtags && post.hashtags.length > 0 ? '\n\n' + post.hashtags.join(' ') : '';
      navigator.clipboard.writeText(editedSingleTweet.trim() + hashtagsStr);
    } else {
      const threadText = post.thread.map((t, i) => `${t}`).join('\n\n---\n\n');
      navigator.clipboard.writeText(threadText);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdatePost({
      singleTweet: editedSingleTweet,
      charCount: editedSingleTweet.length,
    });
    setIsEditing(false);
  };

  const handleDownload = () => {
    if (!post.imageUrl) return;
    const a = document.createElement('a');
    a.href = post.imageUrl;
    a.download = `twitter-visual-${selectedRatio.replace(':', 'x')}-${selectedSize}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <article className="flex flex-col h-full rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      {/* Platform Header Ribbon */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-900/5 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white font-bold text-xs">
            𝕏
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              Twitter / X · Short & Punchy
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <span>Optimal: 16:9 Banner</span>
              <span>·</span>
              <span className={`tabular-nums font-semibold ${isOverLimit ? 'text-red-600' : 'text-slate-600'}`}>
                {charCount}/{MAX_TWITTER_CHARS}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Thread vs Single Toggle */}
          <div className="flex rounded-md border border-slate-200 bg-white p-0.5 text-xs font-medium">
            <button
              onClick={() => setViewMode('single')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                viewMode === 'single'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="h-3 w-3" />
              <span>Tweet</span>
            </button>
            <button
              onClick={() => setViewMode('thread')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                viewMode === 'thread'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="h-3 w-3" />
              <span>Thread ({post.thread?.length || 3})</span>
            </button>
          </div>

          <button
            onClick={() => setShowRefineBar(!showRefineBar)}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-white hover:text-emerald-700 transition-colors cursor-pointer"
            title="Refine with Gemini Intelligence"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Refine</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>{viewMode === 'single' ? 'Copy Tweet' : 'Copy Thread'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Gemini Quick Refinement Bar */}
      {showRefineBar && (
        <div className="border-b border-emerald-100 bg-emerald-50/50 p-3 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
              Gemini Copy Doctor (Twitter / X)
            </span>
            {isRefiningText && (
              <span className="text-[11px] text-emerald-700 font-mono animate-pulse">
                Optimizing tweet length & hook...
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <button
              onClick={() => onRefineText('punchier')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              🔥 Max Virality & Energy
            </button>
            <button
              onClick={() => onRefineText('shorter')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              📏 Trim to &lt;240 Chars
            </button>
            <button
              onClick={() => onRefineText('hook')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              🎯 3 Contrarian Opening Hooks
            </button>
            <button
              onClick={() => onRefineText('emojis')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              ⚡ Punchy Visual Bullets
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Custom refinement (e.g. Make it more sarcastic, rephrase as question)..."
              value={customRefineInput}
              onChange={(e) => setCustomRefineInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customRefineInput.trim()) {
                  onRefineText('custom', customRefineInput.trim());
                  setCustomRefineInput('');
                }
              }}
              className="flex-1 rounded-md border border-emerald-200 bg-white px-2.5 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
            />
            <button
              onClick={() => {
                if (customRefineInput.trim()) {
                  onRefineText('custom', customRefineInput.trim());
                  setCustomRefineInput('');
                }
              }}
              disabled={isRefiningText || !customRefineInput.trim()}
              className="rounded-md bg-emerald-700 text-white px-3 py-1 text-xs font-semibold hover:bg-emerald-800 disabled:opacity-50 cursor-pointer"
            >
              Refine
            </button>
          </div>
        </div>
      )}

      {/* Twitter Content Body */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {/* Author Simulation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
              𝕏
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs text-slate-900">Your Brand / Name</span>
                <BadgeCheck className="h-4 w-4 fill-sky-500 text-white" />
              </div>
              <span className="text-[11px] text-slate-500">@handle · 2m</span>
            </div>
          </div>

          {/* 280 Character Meter Ring */}
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <svg className="h-6 w-6 transform -rotate-90">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-slate-200"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray={56.5}
                  strokeDashoffset={56.5 - (56.5 * charPercentage) / 100}
                  className={`${isOverLimit ? 'text-red-500' : charPercentage > 85 ? 'text-amber-500' : 'text-sky-500'}`}
                />
              </svg>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* View Mode: Single Tweet vs Thread */}
        {viewMode === 'single' ? (
          isEditing ? (
            <div className="space-y-2">
              <textarea
                rows={5}
                value={editedSingleTweet}
                onChange={(e) => setEditedSingleTweet(e.target.value)}
                className="w-full rounded-xl border border-sky-500 bg-white p-3 text-xs leading-relaxed text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 font-sans"
              />
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-mono tabular-nums ${isOverLimit ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  {charCount} / {MAX_TWITTER_CHARS} chars {isOverLimit && `(${charCount - MAX_TWITTER_CHARS} over limit)`}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg px-3 py-1 text-xs text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-black"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-slate-900 whitespace-pre-line font-normal">
                {editedSingleTweet}
              </p>
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 text-xs text-sky-600 font-medium">
                  {post.hashtags.map((tag, idx) => (
                    <span key={idx} className="hover:underline cursor-pointer">
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        ) : (
          /* Thread Mode */
          <div className="space-y-3 border-l-2 border-slate-200 pl-3">
            {post.thread && post.thread.length > 0 ? (
              post.thread.map((tweetItem, idx) => (
                <div key={idx} className="relative group p-2.5 rounded-lg bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                    <span>Tweet {idx + 1} of {post.thread.length}</span>
                    <span className="tabular-nums">{tweetItem.length} chars</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                    {tweetItem}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No thread version generated.</p>
            )}
          </div>
        )}

        {/* Visual Asset Container (Tailored Optimal 16:9 Landscape Banner) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <span>Tailored X Media Card</span>
              <span className="font-mono text-[10px] text-slate-400 font-normal">
                ({selectedRatio} · {selectedSize})
              </span>
            </div>
            <button
              onClick={() => setShowImageControls(!showImageControls)}
              className="flex items-center gap-1 text-[11px] text-emerald-800 hover:underline cursor-pointer"
            >
              <Sliders className="h-3 w-3" />
              <span>Studio Controls</span>
            </button>
          </div>

          {/* Image Settings Tray */}
          {showImageControls && (
            <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Aspect Ratio (8 Formats Supported)
                </label>
                <div className="flex flex-wrap gap-1">
                  {ASPECT_RATIO_OPTIONS.map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setSelectedRatio(ratio)}
                      className={`rounded px-2 py-1 font-mono text-[11px] transition-colors cursor-pointer ${
                        selectedRatio === ratio
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {ratio} {ratio === '16:9' ? '★' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Studio Resolution
                </label>
                <div className="flex gap-1.5">
                  {IMAGE_SIZE_OPTIONS.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`rounded px-2.5 py-1 font-mono text-[11px] transition-colors cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Gemini Image Prompt
                </label>
                <textarea
                  rows={2}
                  value={customImagePrompt}
                  onChange={(e) => setCustomImagePrompt(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onRegenerateImage(selectedRatio, selectedSize, customImagePrompt)}
                  disabled={post.isGeneratingImage}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 font-semibold text-xs text-white hover:bg-black disabled:opacity-50 cursor-pointer"
                >
                  <RotateCw className={`h-3.5 w-3.5 ${post.isGeneratingImage ? 'animate-spin' : ''}`} />
                  <span>Regenerate Image</span>
                </button>
              </div>
            </div>
          )}

          {/* Visual Display */}
          <div className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-slate-900 shadow-2xs">
            {post.isGeneratingImage ? (
              <div className="flex flex-col items-center justify-center p-12 text-white/90 min-h-[200px]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
                <p className="mt-3 text-xs font-medium text-sky-300">
                  Rendering {selectedSize} cinematic card via Gemini 3 Pro...
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Ratio: {selectedRatio}</p>
              </div>
            ) : post.imageUrl ? (
              <div className="group relative">
                <img
                  src={post.imageUrl}
                  alt="Twitter Visual"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover max-h-[300px]"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 rounded-lg bg-white/95 text-slate-900 px-3 py-1.5 text-xs font-semibold shadow-md hover:bg-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PNG</span>
                  </button>
                  <button
                    onClick={() => onRegenerateImage(selectedRatio, selectedSize, customImagePrompt)}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-900 text-white px-3 py-1.5 text-xs font-semibold shadow-md hover:bg-black"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white min-h-[160px]">
                <p className="text-xs text-slate-300 max-w-xs mb-3 italic">
                  "{post.imagePrompt.slice(0, 110)}..."
                </p>
                <button
                  type="button"
                  onClick={() => onRegenerateImage(selectedRatio, selectedSize, customImagePrompt)}
                  className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 transition-colors shadow-sm cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generate Image ({selectedRatio})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Twitter Engagement Bar */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-2.5">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <button className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="tabular-nums">64</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
            <Repeat2 className="h-4 w-4" />
            <span className="tabular-nums">28</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-rose-600 transition-colors">
            <Heart className="h-4 w-4" />
            <span className="tabular-nums">392</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
            <Bookmark className="h-4 w-4" />
            <span className="tabular-nums">81</span>
          </button>
          <button className="hover:text-slate-700 transition-colors">
            <Share className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

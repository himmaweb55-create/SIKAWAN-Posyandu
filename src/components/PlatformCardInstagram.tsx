import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  RotateCw,
  Sparkles,
  Edit3,
  Sliders,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Hash,
  Layers,
  MoreHorizontal
} from 'lucide-react';
import { AspectRatio, ImageSize, InstagramPost } from '../types';

interface PlatformCardInstagramProps {
  post: InstagramPost;
  onUpdatePost: (updated: Partial<InstagramPost>) => void;
  onRegenerateImage: (aspectRatio: AspectRatio, imageSize: ImageSize, prompt: string) => void;
  onRefineText: (action: 'shorter' | 'punchier' | 'expand' | 'emojis' | 'hook' | 'custom', customInstruction?: string) => void;
  isRefiningText?: boolean;
}

const ASPECT_RATIO_OPTIONS: AspectRatio[] = ['3:4', '1:1', '4:3', '9:16', '16:9', '3:2', '2:3', '21:9'];
const IMAGE_SIZE_OPTIONS: ImageSize[] = ['1K', '2K', '4K'];

export const PlatformCardInstagram: React.FC<PlatformCardInstagramProps> = ({
  post,
  onUpdatePost,
  onRegenerateImage,
  onRefineText,
  isRefiningText,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(
    (post.suggestedAspectRatio as AspectRatio) || '3:4'
  );
  const [selectedSize, setSelectedSize] = useState<ImageSize>('2K');
  const [customImagePrompt, setCustomImagePrompt] = useState(post.imagePrompt);
  const [showImageControls, setShowImageControls] = useState(false);
  const [showHashtagsTab, setShowHashtagsTab] = useState(false);
  const [customRefineInput, setCustomRefineInput] = useState('');
  const [showRefineBar, setShowRefineBar] = useState(false);

  React.useEffect(() => {
    setEditedCaption(post.caption);
  }, [post.caption]);

  React.useEffect(() => {
    setCustomImagePrompt(post.imagePrompt);
  }, [post.imagePrompt]);

  const handleCopyAll = () => {
    const formattedTags = post.hashtags && post.hashtags.length > 0 ? '\n\n.\n.\n.\n' + post.hashtags.join(' ') : '';
    const fullPost = `${editedCaption}\n\n${post.callToAction || ''}${formattedTags}`;
    navigator.clipboard.writeText(fullPost.trim());
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleCopyTagsOnly = () => {
    if (!post.hashtags) return;
    navigator.clipboard.writeText(post.hashtags.join(' '));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdatePost({ caption: editedCaption });
    setIsEditing(false);
  };

  const handleDownload = () => {
    if (!post.imageUrl) return;
    const a = document.createElement('a');
    a.href = post.imageUrl;
    a.download = `instagram-visual-${selectedRatio.replace(':', 'x')}-${selectedSize}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <article className="flex flex-col h-full rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      {/* Platform Header Ribbon */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-pink-500/5 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-linear-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs">
            IG
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              Instagram · Visual-First
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <span>Optimal: 3:4 Vertical</span>
              <span>·</span>
              <span className="tabular-nums">{post.hashtags?.length || 0} Hashtags</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowRefineBar(!showRefineBar)}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-white hover:text-emerald-700 transition-colors cursor-pointer"
            title="Refine with Gemini Intelligence"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Refine</span>
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-md p-1.5 text-slate-500 hover:bg-white hover:text-slate-800 transition-colors cursor-pointer"
            title="Edit Caption"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {copiedCaption ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>Copy Post</span>
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
              Gemini Copy Doctor (Instagram)
            </span>
            {isRefiningText && (
              <span className="text-[11px] text-emerald-700 font-mono animate-pulse">
                Refining Instagram caption...
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <button
              onClick={() => onRefineText('punchier')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              ✨ High-Aesthetic Polish
            </button>
            <button
              onClick={() => onRefineText('hook')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              🎣 2-Line First Hook
            </button>
            <button
              onClick={() => onRefineText('emojis')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              📸 Editorial Spacing & Symbols
            </button>
            <button
              onClick={() => onRefineText('shorter')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              ✂️ Quick Carousel Caption
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Custom refinement (e.g. Add 5 viral hashtags, Make it more personal)..."
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

      {/* Instagram Content Body */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {/* Author Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full p-[2px] bg-linear-to-tr from-amber-500 via-rose-500 to-purple-600">
              <div className="h-full w-full rounded-full bg-white p-[2px]">
                <div className="h-full w-full rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  IG
                </div>
              </div>
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 block leading-tight">yourbrand.studio</span>
              <span className="text-[10px] text-slate-400">Creative Production</span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Visual Asset First (Instagram core) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <span>Tailored Instagram Visual</span>
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
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {ratio} {ratio === '3:4' ? '★' : ''}
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
                          ? 'bg-rose-600 text-white font-bold'
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
                  className="w-full rounded-md border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onRegenerateImage(selectedRatio, selectedSize, customImagePrompt)}
                  disabled={post.isGeneratingImage}
                  className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 font-semibold text-xs text-white hover:bg-rose-700 disabled:opacity-50 cursor-pointer"
                >
                  <RotateCw className={`h-3.5 w-3.5 ${post.isGeneratingImage ? 'animate-spin' : ''}`} />
                  <span>Regenerate Image</span>
                </button>
              </div>
            </div>
          )}

          {/* Visual Canvas */}
          <div className="relative overflow-hidden rounded-xl border border-slate-200/90 bg-slate-900 shadow-2xs">
            {post.isGeneratingImage ? (
              <div className="flex flex-col items-center justify-center p-12 text-white/90 min-h-[260px]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-400 border-t-transparent" />
                <p className="mt-3 text-xs font-medium text-rose-300">
                  Rendering {selectedSize} vertical portrait via Gemini 3 Pro...
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Ratio: {selectedRatio}</p>
              </div>
            ) : post.imageUrl ? (
              <div className="group relative">
                <img
                  src={post.imageUrl}
                  alt="Instagram Visual"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover max-h-[380px]"
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
                    className="flex items-center gap-1.5 rounded-lg bg-rose-600 text-white px-3 py-1.5 text-xs font-semibold shadow-md hover:bg-rose-700"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white min-h-[200px]">
                <p className="text-xs text-slate-300 max-w-xs mb-3 italic">
                  "{post.imagePrompt.slice(0, 110)}..."
                </p>
                <button
                  type="button"
                  onClick={() => onRegenerateImage(selectedRatio, selectedSize, customImagePrompt)}
                  className="flex items-center gap-1.5 rounded-lg bg-linear-to-r from-rose-500 to-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generate Image ({selectedRatio})</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Engagement Interaction Row */}
        <div className="flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className="hover:opacity-75 transition-transform active:scale-125"
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button className="hover:opacity-75">
              <MessageCircle className="h-5 w-5" />
            </button>
            <button className="hover:opacity-75">
              <Send className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="hover:opacity-75"
          >
            <Bookmark className={`h-5 w-5 ${saved ? 'fill-slate-900 text-slate-900' : ''}`} />
          </button>
        </div>

        {/* Caption & Hashtags Container */}
        <div className="space-y-2">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                rows={6}
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                className="w-full rounded-xl border border-rose-500 bg-white p-3 text-xs leading-relaxed text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 font-sans"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg px-3 py-1 text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  Save Caption
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs leading-relaxed text-slate-800 space-y-1.5">
              <p>
                <span className="font-bold mr-1.5 text-slate-900">yourbrand.studio</span>
                <span className={!isExpanded ? 'line-clamp-3' : ''}>
                  {editedCaption}
                </span>
              </p>

              {editedCaption.length > 180 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
                >
                  {isExpanded ? 'less' : 'more'}
                </button>
              )}

              {post.callToAction && (
                <p className="font-medium text-slate-900 pt-1 text-[11px]">
                  👉 {post.callToAction}
                </p>
              )}
            </div>
          )}

          {/* Carousel Slide Ideas (if present) */}
          {post.carouselIdeas && post.carouselIdeas.length > 0 && (
            <div className="rounded-lg border border-slate-200/70 bg-slate-50/70 p-2.5 text-[11px]">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                <Layers className="h-3 w-3 text-rose-500" />
                <span>Carousel Slide Breakdown</span>
              </div>
              <ul className="space-y-0.5 text-slate-600 pl-4 list-disc">
                {post.carouselIdeas.map((idea, i) => (
                  <li key={i}>{idea}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Curated Hashtags Drawer */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1">
              <button
                onClick={() => setShowHashtagsTab(!showHashtagsTab)}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <Hash className="h-3 w-3 text-purple-600" />
                <span>Curated Hashtags ({post.hashtags?.length || 0})</span>
              </button>
              <button
                onClick={handleCopyTagsOnly}
                className="text-[11px] text-purple-600 hover:underline font-medium cursor-pointer"
              >
                {copiedTags ? 'Tags Copied!' : 'Copy Tags Only'}
              </button>
            </div>

            {showHashtagsTab && post.hashtags && post.hashtags.length > 0 && (
              <div className="rounded-lg border border-purple-100 bg-purple-50/50 p-2.5 flex flex-wrap gap-1 text-[11px] text-purple-700">
                {post.hashtags.map((tag, idx) => (
                  <span key={idx} className="bg-white border border-purple-200/60 rounded px-1.5 py-0.5">
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timestamp footer */}
      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-2 text-[10px] text-slate-400 uppercase tracking-wider font-mono">
        Instagram Feed Post · 14 minutes ago
      </div>
    </article>
  );
};

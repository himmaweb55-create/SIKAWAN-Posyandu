import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  RotateCw,
  Sparkles,
  Edit3,
  Sliders,
  Share2,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  MoreHorizontal,
  Globe,
  Maximize2
} from 'lucide-react';
import { AspectRatio, ImageSize, LinkedInPost } from '../types';

interface PlatformCardLinkedInProps {
  post: LinkedInPost;
  onUpdatePost: (updated: Partial<LinkedInPost>) => void;
  onRegenerateImage: (aspectRatio: AspectRatio, imageSize: ImageSize, prompt: string) => void;
  onRefineText: (action: 'shorter' | 'punchier' | 'expand' | 'emojis' | 'hook' | 'custom', customInstruction?: string) => void;
  isRefiningText?: boolean;
}

const ASPECT_RATIO_OPTIONS: AspectRatio[] = ['4:3', '1:1', '16:9', '3:4', '3:2', '2:3', '9:16', '21:9'];
const IMAGE_SIZE_OPTIONS: ImageSize[] = ['1K', '2K', '4K'];

export const PlatformCardLinkedIn: React.FC<PlatformCardLinkedInProps> = ({
  post,
  onUpdatePost,
  onRegenerateImage,
  onRefineText,
  isRefiningText,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>(
    (post.suggestedAspectRatio as AspectRatio) || '4:3'
  );
  const [selectedSize, setSelectedSize] = useState<ImageSize>('2K');
  const [customImagePrompt, setCustomImagePrompt] = useState(post.imagePrompt);
  const [showImageControls, setShowImageControls] = useState(false);
  const [customRefineInput, setCustomRefineInput] = useState('');
  const [showRefineBar, setShowRefineBar] = useState(false);

  // Sync editedContent when post updates from Gemini refinement
  React.useEffect(() => {
    setEditedContent(post.content);
  }, [post.content]);

  React.useEffect(() => {
    setCustomImagePrompt(post.imagePrompt);
  }, [post.imagePrompt]);

  const handleCopy = () => {
    const fullText = `${post.headline}\n\n${editedContent}\n\n${post.callToAction}\n\n${post.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdatePost({ content: editedContent });
    setIsEditing(false);
  };

  const handleDownload = () => {
    if (!post.imageUrl) return;
    const a = document.createElement('a');
    a.href = post.imageUrl;
    a.download = `linkedin-visual-${selectedRatio.replace(':', 'x')}-${selectedSize}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const fullDisplayLength = (post.headline?.length || 0) + editedContent.length + (post.callToAction?.length || 0);

  return (
    <article className="flex flex-col h-full rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      {/* Platform Header Ribbon */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-[#0077B5]/5 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0077B5] text-white font-bold text-xs">
            in
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
              LinkedIn · Long-Form Post
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <span>Optimal: 4:3 Ratio</span>
              <span>·</span>
              <span className="tabular-nums">{fullDisplayLength} chars</span>
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
            title="Edit Draft"
          >
            <Edit3 className="h-4 w-4" />
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
              Gemini Copy Doctor (LinkedIn)
            </span>
            {isRefiningText && (
              <span className="text-[11px] text-emerald-700 font-mono animate-pulse">
                Refining post with Gemini...
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <button
              onClick={() => onRefineText('punchier')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              ⚡ Make Punchier
            </button>
            <button
              onClick={() => onRefineText('shorter')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              ✂️ Shorten 30%
            </button>
            <button
              onClick={() => onRefineText('expand')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              📚 Add Examples & Takeaways
            </button>
            <button
              onClick={() => onRefineText('hook')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              🎣 3 Viral Hook Alternatives
            </button>
            <button
              onClick={() => onRefineText('emojis')}
              disabled={isRefiningText}
              className="rounded-md bg-white border border-emerald-200 px-2 py-1 text-slate-700 hover:bg-emerald-100/60 transition-colors cursor-pointer"
            >
              ✨ Executive Emojis
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Or enter custom instruction (e.g. Translate to Bahasa, Add personal anecdote)..."
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

      {/* LinkedIn Post Content Body */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {/* Author Metadata Simulation */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              YO
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">Your Identity</span>
                <span className="text-[11px] text-slate-400">· 1st</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Builder & Industry Strategist | Scaling Products & Teams
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <span>Just now</span>
                <span>·</span>
                <Globe className="h-3 w-3" />
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Text Content */}
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              rows={8}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full rounded-xl border border-emerald-600 bg-white p-3 text-xs leading-relaxed text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-sans"
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
                className="rounded-lg bg-emerald-700 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                Save Edits
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs leading-relaxed text-slate-800">
            {post.headline && (
              <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                {post.headline}
              </h3>
            )}

            <div className={`whitespace-pre-line ${!isExpanded ? 'line-clamp-6' : ''}`}>
              {editedContent}
            </div>

            {editedContent.length > 280 && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-semibold text-slate-500 hover:text-emerald-700 cursor-pointer"
              >
                {isExpanded ? 'show less' : '...see more'}
              </button>
            )}

            {post.callToAction && (
              <p className="font-medium text-emerald-950 pt-1 border-t border-slate-100">
                {post.callToAction}
              </p>
            )}

            {post.hashtags && post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1 text-emerald-800 font-medium">
                {post.hashtags.map((tag, idx) => (
                  <span key={idx} className="hover:underline cursor-pointer">
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Visual Asset Container (Tailored Optimal 4:3 Ratio) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <span>Tailored LinkedIn Visual Asset</span>
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
                          ? 'bg-emerald-700 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {ratio} {ratio === '4:3' ? '★' : ''}
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
                          ? 'bg-emerald-700 text-white font-bold'
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
                  className="w-full rounded-md border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onRegenerateImage(selectedRatio, selectedSize, customImagePrompt)}
                  disabled={post.isGeneratingImage}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 font-semibold text-xs text-white hover:bg-emerald-800 disabled:opacity-50 cursor-pointer"
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
              <div className="flex flex-col items-center justify-center p-12 text-white/90 min-h-[220px]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
                <p className="mt-3 text-xs font-medium text-emerald-300">
                  Rendering {selectedSize} visual via Gemini 3 Pro...
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Ratio: {selectedRatio}</p>
              </div>
            ) : post.imageUrl ? (
              <div className="group relative">
                <img
                  src={post.imageUrl}
                  alt="LinkedIn Visual"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover max-h-[360px]"
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
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-700 text-white px-3 py-1.5 text-xs font-semibold shadow-md hover:bg-emerald-800"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white min-h-[180px]">
                <p className="text-xs text-slate-300 max-w-xs mb-3 italic">
                  "{post.imagePrompt.slice(0, 110)}..."
                </p>
                <button
                  type="button"
                  onClick={() => onRegenerateImage(selectedRatio, selectedSize, customImagePrompt)}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generate Image ({selectedRatio})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LinkedIn Post Engagement Simulation Bar */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2.5">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-mono">
          <div className="flex items-center gap-1">
            <span className="flex -space-x-1">
              <span className="inline-block h-4 w-4 rounded-full bg-blue-500 text-white text-[8px] flex items-center justify-center font-bold">👍</span>
              <span className="inline-block h-4 w-4 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center font-bold">❤️</span>
              <span className="inline-block h-4 w-4 rounded-full bg-emerald-500 text-white text-[8px] flex items-center justify-center font-bold">👏</span>
            </span>
            <span className="tabular-nums">142 reactions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="tabular-nums">28 comments</span>
            <span>·</span>
            <span className="tabular-nums">14 reposts</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 border-t border-slate-200/60 pt-2 text-center text-xs font-medium text-slate-600">
          <button className="flex items-center justify-center gap-1.5 py-1 rounded hover:bg-slate-100 transition-colors">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>Like</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-1 rounded hover:bg-slate-100 transition-colors">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-1 rounded hover:bg-slate-100 transition-colors">
            <Repeat2 className="h-3.5 w-3.5" />
            <span>Repost</span>
          </button>
          <button className="flex items-center justify-center gap-1.5 py-1 rounded hover:bg-slate-100 transition-colors">
            <Send className="h-3.5 w-3.5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </article>
  );
};

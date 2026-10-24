import React, { useState } from 'react';
import { Copy, Check, Bookmark, Download, Sparkles, Clock, Layers } from 'lucide-react';
import { CampaignData } from '../types';

interface BatchActionBarProps {
  campaign: CampaignData;
  onSave: () => void;
  isSaved: boolean;
  onRegenerateAllImages: () => void;
  isRegeneratingImages: boolean;
}

export const BatchActionBar: React.FC<BatchActionBarProps> = ({
  campaign,
  onSave,
  isSaved,
  onRegenerateAllImages,
  isRegeneratingImages,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = () => {
    const fullMarkdown = `
# Cross-Platform Campaign: ${campaign.title}
Generated via OmniPost Studio · Tone: ${campaign.tone}

## 1. LinkedIn (Long-Form)
**Headline:** ${campaign.linkedin.headline}
${campaign.linkedin.content}

**Call to Action:** ${campaign.linkedin.callToAction}
**Hashtags:** ${campaign.linkedin.hashtags.join(' ')}
**Visual Ratio:** ${campaign.linkedin.suggestedAspectRatio || '4:3'}
**Visual Prompt:** ${campaign.linkedin.imagePrompt}

---

## 2. Twitter / X (Short & Punchy)
${campaign.twitter.singleTweet}

**Hashtags:** ${campaign.twitter.hashtags.join(' ')}
**Thread Breakdown:**
${campaign.twitter.thread.map((t, i) => `${i + 1}. ${t}`).join('\n\n')}
**Visual Ratio:** ${campaign.twitter.suggestedAspectRatio || '16:9'}
**Visual Prompt:** ${campaign.twitter.imagePrompt}

---

## 3. Instagram (Visual-First)
${campaign.instagram.caption}

**Call to Action:** ${campaign.instagram.callToAction}
**Curated Hashtags:**
${campaign.instagram.hashtags.join(' ')}
**Carousel Breakdown:**
${campaign.instagram.carouselIdeas.map((c, i) => `Slide ${i + 1}: ${c}`).join('\n')}
**Visual Ratio:** ${campaign.instagram.suggestedAspectRatio || '3:4'}
**Visual Prompt:** ${campaign.instagram.imagePrompt}
`.trim();

    navigator.clipboard.writeText(fullMarkdown);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadAllImages = () => {
    const imagesToDownload = [
      { url: campaign.linkedin.imageUrl, name: 'linkedin-visual.png' },
      { url: campaign.twitter.imageUrl, name: 'twitter-visual.png' },
      { url: campaign.instagram.imageUrl, name: 'instagram-visual.png' },
    ].filter((item) => Boolean(item.url));

    if (imagesToDownload.length === 0) {
      alert('No images have been generated yet. Click "Generate Image" on any card or "Render All Images".');
      return;
    }

    imagesToDownload.forEach((item, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = item.url!;
        link.download = item.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 300);
    });
  };

  return (
    <aside className="sticky bottom-4 z-30 mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Summary angle & posting times */}
        <div className="flex items-center gap-3">
          <div className="hidden h-9 w-9 rounded-lg bg-emerald-100 text-emerald-800 sm:flex items-center justify-center font-bold text-xs">
            3x
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">Campaign Synchronized</span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono uppercase text-slate-700">
                Tone: {campaign.tone}
              </span>
            </div>
            {campaign.overallStrategy?.recommendedPostingTimes && (
              <p className="text-[11px] text-slate-500 font-mono">
                Best slots: in {campaign.overallStrategy.recommendedPostingTimes.linkedin} · 𝕏 {campaign.overallStrategy.recommendedPostingTimes.twitter} · IG {campaign.overallStrategy.recommendedPostingTimes.instagram}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onRegenerateAllImages}
            disabled={isRegeneratingImages}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Sparkles className={`h-3.5 w-3.5 text-emerald-700 ${isRegeneratingImages ? 'animate-spin' : ''}`} />
            <span>{isRegeneratingImages ? 'Rendering All...' : 'Render All 3 Visuals'}</span>
          </button>

          <button
            onClick={handleDownloadAllImages}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Download Visuals</span>
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Saved to Library</span>
              </>
            ) : (
              <>
                <Bookmark className="h-3.5 w-3.5 text-slate-500" />
                <span>Save Campaign</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span>All 3 Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-white" />
                <span>Copy All 3 Posts (MD)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

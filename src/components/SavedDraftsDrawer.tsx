import React from 'react';
import { X, Trash2, ArrowUpRight, Copy, Check, Clock } from 'lucide-react';
import { CampaignData } from '../types';

interface SavedDraftsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: CampaignData[];
  onSelectCampaign: (campaign: CampaignData) => void;
  onDeleteCampaign: (id: string) => void;
}

export const SavedDraftsDrawer: React.FC<SavedDraftsDrawerProps> = ({
  isOpen,
  onClose,
  campaigns,
  onSelectCampaign,
  onDeleteCampaign,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopySummary = (campaign: CampaignData) => {
    const markdown = `
# Campaign: ${campaign.title}
Tone: ${campaign.tone} | Date: ${new Date(campaign.createdAt).toLocaleDateString()}

## LinkedIn
${campaign.linkedin.headline}
${campaign.linkedin.content}
${campaign.linkedin.callToAction}
${campaign.linkedin.hashtags.join(' ')}

---

## Twitter / X
${campaign.twitter.singleTweet}
${campaign.twitter.hashtags.join(' ')}

---

## Instagram
${campaign.instagram.caption}
${campaign.instagram.hashtags.join(' ')}
`;
    navigator.clipboard.writeText(markdown.trim());
    setCopiedId(campaign.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Saved Campaigns</h3>
            <p className="text-xs text-slate-400 font-mono">
              {campaigns.length} drafts stored in local session
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {campaigns.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Clock className="h-10 w-10 mx-auto text-slate-300 mb-2 stroke-[1.5]" />
              <p className="text-sm font-medium text-slate-600">No saved drafts yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Generate a multi-platform post and click "Save to Library" to keep copies ready here.
              </p>
            </div>
          ) : (
            campaigns.map((camp) => (
              <div
                key={camp.id}
                className="group rounded-xl border border-slate-200 p-4 transition-all hover:border-slate-300 hover:bg-slate-50/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">
                    {camp.title}
                  </h4>
                  <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono uppercase text-slate-600">
                    {camp.tone}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {camp.idea}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-400">
                  <span>{new Date(camp.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopySummary(camp)}
                      className="rounded p-1 hover:bg-slate-200 text-slate-600 cursor-pointer"
                      title="Copy all 3 platforms (Markdown)"
                    >
                      {copiedId === camp.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onDeleteCampaign(camp.id)}
                      className="rounded p-1 hover:bg-rose-50 text-rose-500 cursor-pointer"
                      title="Delete draft"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectCampaign(camp);
                        onClose();
                      }}
                      className="flex items-center gap-0.5 rounded-md bg-emerald-700 px-2 py-0.5 font-semibold text-white hover:bg-emerald-800 cursor-pointer"
                    >
                      <span>Load</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IdeaComposer } from './components/IdeaComposer';
import { PlatformCardLinkedIn } from './components/PlatformCardLinkedIn';
import { PlatformCardTwitter } from './components/PlatformCardTwitter';
import { PlatformCardInstagram } from './components/PlatformCardInstagram';
import { BatchActionBar } from './components/BatchActionBar';
import { SavedDraftsDrawer } from './components/SavedDraftsDrawer';
import { ToneGuideModal } from './components/ToneGuideModal';
import { PlatformSpecsModal } from './components/PlatformSpecsModal';
import {
  AspectRatio,
  CampaignData,
  ImageSize,
  Platform,
  Tone,
} from './types';
import {
  generateSocialContent,
  generatePlatformSpecificImage,
  refinePostText,
  getSavedCampaigns,
  saveCampaignToStorage,
  deleteCampaignFromStorage,
} from './utils/api';
import {
  Sparkles,
  LayoutGrid,
  Columns3,
  Layers,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function App() {
  const [activeTone, setActiveTone] = useState<Tone>('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegeneratingAllImages, setIsRegeneratingAllImages] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<CampaignData | null>(null);
  const [activeView, setActiveView] = useState<'all' | 'linkedin' | 'twitter' | 'instagram'>('all');
  const [refiningPlatform, setRefiningPlatform] = useState<Platform | null>(null);

  // Modals & Drawers
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);
  const [isToneGuideOpen, setIsToneGuideOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [savedCampaigns, setSavedCampaigns] = useState<CampaignData[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setSavedCampaigns(getSavedCampaigns());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Main generation handler: simultaneous 3 platforms + tailored visuals
  const handleGenerate = async (params: {
    idea: string;
    tone: Tone;
    targetAudience: string;
    callToAction: string;
    textModel: string;
    imageModel: string;
    imageSize: ImageSize;
    generateImagesDirectly: boolean;
  }) => {
    setIsLoading(true);
    setIsSaved(false);

    try {
      showToast('Generating 3 tailored drafts across platforms with Gemini...');
      const campaign = await generateSocialContent({
        idea: params.idea,
        tone: params.tone,
        targetAudience: params.targetAudience,
        callToAction: params.callToAction,
        modelChoice: params.textModel,
      });

      setCurrentCampaign(campaign);

      // Auto-generate tailored images simultaneously if enabled
      if (params.generateImagesDirectly) {
        showToast('Now rendering tailored optimal aspect-ratio images for all 3 platforms...');

        // Mark generating states
        setCurrentCampaign((prev) =>
          prev
            ? {
                ...prev,
                linkedin: { ...prev.linkedin, isGeneratingImage: true },
                twitter: { ...prev.twitter, isGeneratingImage: true },
                instagram: { ...prev.instagram, isGeneratingImage: true },
              }
            : null
        );

        // Generate LinkedIn image (Optimal: 4:3)
        const linkedinPromise = generatePlatformSpecificImage({
          platform: 'linkedin',
          prompt: campaign.linkedin.imagePrompt,
          aspectRatio: (campaign.linkedin.suggestedAspectRatio as AspectRatio) || '4:3',
          imageSize: params.imageSize,
          model: params.imageModel,
        })
          .then((res) => {
            setCurrentCampaign((prev) =>
              prev
                ? {
                    ...prev,
                    linkedin: {
                      ...prev.linkedin,
                      imageUrl: res.imageUrl,
                      isGeneratingImage: false,
                    },
                  }
                : null
            );
          })
          .catch((err) => {
            console.warn('LinkedIn image generation error:', err);
            setCurrentCampaign((prev) =>
              prev
                ? {
                    ...prev,
                    linkedin: { ...prev.linkedin, isGeneratingImage: false },
                  }
                : null
            );
          });

        // Generate Twitter image (Optimal: 16:9)
        const twitterPromise = generatePlatformSpecificImage({
          platform: 'twitter',
          prompt: campaign.twitter.imagePrompt,
          aspectRatio: (campaign.twitter.suggestedAspectRatio as AspectRatio) || '16:9',
          imageSize: params.imageSize,
          model: params.imageModel,
        })
          .then((res) => {
            setCurrentCampaign((prev) =>
              prev
                ? {
                    ...prev,
                    twitter: {
                      ...prev.twitter,
                      imageUrl: res.imageUrl,
                      isGeneratingImage: false,
                    },
                  }
                : null
            );
          })
          .catch((err) => {
            console.warn('Twitter image generation error:', err);
            setCurrentCampaign((prev) =>
              prev
                ? {
                    ...prev,
                    twitter: { ...prev.twitter, isGeneratingImage: false },
                  }
                : null
            );
          });

        // Generate Instagram image (Optimal: 3:4)
        const instagramPromise = generatePlatformSpecificImage({
          platform: 'instagram',
          prompt: campaign.instagram.imagePrompt,
          aspectRatio: (campaign.instagram.suggestedAspectRatio as AspectRatio) || '3:4',
          imageSize: params.imageSize,
          model: params.imageModel,
        })
          .then((res) => {
            setCurrentCampaign((prev) =>
              prev
                ? {
                    ...prev,
                    instagram: {
                      ...prev.instagram,
                      imageUrl: res.imageUrl,
                      isGeneratingImage: false,
                    },
                  }
                : null
            );
          })
          .catch((err) => {
            console.warn('Instagram image generation error:', err);
            setCurrentCampaign((prev) =>
              prev
                ? {
                    ...prev,
                    instagram: { ...prev.instagram, isGeneratingImage: false },
                  }
                : null
            );
          });

        await Promise.allSettled([linkedinPromise, twitterPromise, instagramPromise]);
        showToast('All 3 platforms and visual assets generated!');
      } else {
        showToast('Posts drafted! Click "Generate Image" on any card to create visuals.');
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Image regeneration per individual platform
  const handleRegeneratePlatformImage = async (
    platform: Platform,
    aspectRatio: AspectRatio,
    imageSize: ImageSize,
    prompt: string
  ) => {
    if (!currentCampaign) return;

    setCurrentCampaign((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [platform]: {
          ...prev[platform],
          isGeneratingImage: true,
        },
      };
    });

    try {
      showToast(`Rendering ${platform} image (${aspectRatio} · ${imageSize})...`);
      const res = await generatePlatformSpecificImage({
        platform,
        prompt,
        aspectRatio,
        imageSize,
      });

      setCurrentCampaign((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [platform]: {
            ...prev[platform],
            imageUrl: res.imageUrl,
            suggestedAspectRatio: res.aspectRatio,
            isGeneratingImage: false,
          },
        };
      });
      showToast(`${platform.toUpperCase()} visual rendered successfully!`);
    } catch (err: any) {
      showToast(`Image generation failed: ${err.message}`);
      setCurrentCampaign((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [platform]: {
            ...prev[platform],
            isGeneratingImage: false,
          },
        };
      });
    }
  };

  // Batch regenerate all 3 images
  const handleRegenerateAllImages = async () => {
    if (!currentCampaign) return;
    setIsRegeneratingAllImages(true);
    showToast('Rendering visuals for LinkedIn (4:3), Twitter (16:9), and Instagram (3:4)...');

    const p1 = handleRegeneratePlatformImage(
      'linkedin',
      (currentCampaign.linkedin.suggestedAspectRatio as AspectRatio) || '4:3',
      '2K',
      currentCampaign.linkedin.imagePrompt
    );
    const p2 = handleRegeneratePlatformImage(
      'twitter',
      (currentCampaign.twitter.suggestedAspectRatio as AspectRatio) || '16:9',
      '2K',
      currentCampaign.twitter.imagePrompt
    );
    const p3 = handleRegeneratePlatformImage(
      'instagram',
      (currentCampaign.instagram.suggestedAspectRatio as AspectRatio) || '3:4',
      '2K',
      currentCampaign.instagram.imagePrompt
    );

    await Promise.allSettled([p1, p2, p3]);
    setIsRegeneratingAllImages(false);
  };

  // Text refinement with Gemini intelligence
  const handleRefinePost = async (
    platform: Platform,
    action: 'shorter' | 'punchier' | 'expand' | 'emojis' | 'hook' | 'custom',
    customInstruction?: string
  ) => {
    if (!currentCampaign) return;
    setRefiningPlatform(platform);

    let originalText = '';
    if (platform === 'linkedin') originalText = currentCampaign.linkedin.content;
    else if (platform === 'twitter') originalText = currentCampaign.twitter.singleTweet;
    else if (platform === 'instagram') originalText = currentCampaign.instagram.caption;

    try {
      const refined = await refinePostText({
        platform,
        text: originalText,
        action,
        customInstruction,
        tone: currentCampaign.tone,
      });

      setCurrentCampaign((prev) => {
        if (!prev) return null;
        if (platform === 'linkedin') {
          return {
            ...prev,
            linkedin: { ...prev.linkedin, content: refined },
          };
        } else if (platform === 'twitter') {
          return {
            ...prev,
            twitter: {
              ...prev.twitter,
              singleTweet: refined,
              charCount: refined.length,
            },
          };
        } else {
          return {
            ...prev,
            instagram: { ...prev.instagram, caption: refined },
          };
        }
      });
      showToast(`Refined with Gemini (${action})!`);
    } catch (err: any) {
      showToast(`Refinement error: ${err.message}`);
    } finally {
      setRefiningPlatform(null);
    }
  };

  const handleSaveCampaign = () => {
    if (!currentCampaign) return;
    saveCampaignToStorage(currentCampaign);
    setSavedCampaigns(getSavedCampaigns());
    setIsSaved(true);
    showToast('Saved to your local campaign library!');
  };

  const handleDeleteCampaign = (id: string) => {
    deleteCampaignFromStorage(id);
    setSavedCampaigns(getSavedCampaigns());
    showToast('Draft removed.');
  };

  const handleSelectSavedCampaign = (campaign: CampaignData) => {
    setCurrentCampaign(campaign);
    setActiveTone(campaign.tone);
    setIsSaved(true);
    showToast(`Loaded "${campaign.title}" into workspace.`);
  };

  const handleReset = () => {
    setCurrentCampaign(null);
    setIsSaved(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Top Bar Contract (3 Zones) */}
      <Header
        onOpenDrafts={() => setIsDraftsOpen(true)}
        onOpenToneGuide={() => setIsToneGuideOpen(true)}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onReset={handleReset}
        savedCount={savedCampaigns.length}
      />

      {/* Main Workspace Canvas */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Toast alert notification */}
        {toastMessage && (
          <div className="fixed top-16 right-6 z-50 rounded-xl bg-slate-900 text-white px-4 py-2.5 text-xs font-medium shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Input & Tone Composer */}
        <IdeaComposer
          onGenerate={handleGenerate}
          isLoading={isLoading}
          activeTone={activeTone}
          setActiveTone={setActiveTone}
        />

        {/* Simultaneous 3-Platform Output Studio */}
        {currentCampaign && (
          <section className="space-y-4 pt-2">
            {/* View Mode & Strategic Angle Bar */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Simultaneous Multi-Platform Feeds</span>
                  <span className="text-xs font-normal text-slate-500 font-mono">
                    (Tailored Copy & Platform-Optimal Visual Ratios)
                  </span>
                </h2>
                {currentCampaign.overallStrategy?.angle && (
                  <p className="text-xs text-slate-600 mt-0.5">
                    <span className="font-semibold text-slate-800">Core Angle:</span>{' '}
                    {currentCampaign.overallStrategy.angle}
                  </p>
                )}
              </div>

              {/* View Switcher Tabs (Buttons/Segmented Controls) */}
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveView('all')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    activeView === 'all'
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Columns3 className="h-3.5 w-3.5" />
                  <span>3-Platform View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('linkedin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    activeView === 'linkedin'
                      ? 'bg-[#0077B5] text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>LinkedIn Only</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('twitter')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    activeView === 'twitter'
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>𝕏 Twitter Only</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('instagram')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    activeView === 'instagram'
                      ? 'bg-rose-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Instagram Only</span>
                </button>
              </div>
            </div>

            {/* Grid Container */}
            <div
              className={`grid gap-6 ${
                activeView === 'all'
                  ? 'grid-cols-1 lg:grid-cols-3'
                  : 'grid-cols-1 max-w-2xl mx-auto'
              }`}
            >
              {/* LinkedIn Platform Card */}
              {(activeView === 'all' || activeView === 'linkedin') && (
                <div className="h-full">
                  <PlatformCardLinkedIn
                    post={currentCampaign.linkedin}
                    onUpdatePost={(updated) =>
                      setCurrentCampaign((prev) =>
                        prev ? { ...prev, linkedin: { ...prev.linkedin, ...updated } } : null
                      )
                    }
                    onRegenerateImage={(ratio, size, prompt) =>
                      handleRegeneratePlatformImage('linkedin', ratio, size, prompt)
                    }
                    onRefineText={(action, customInstruction) =>
                      handleRefinePost('linkedin', action, customInstruction)
                    }
                    isRefiningText={refiningPlatform === 'linkedin'}
                  />
                </div>
              )}

              {/* Twitter / X Platform Card */}
              {(activeView === 'all' || activeView === 'twitter') && (
                <div className="h-full">
                  <PlatformCardTwitter
                    post={currentCampaign.twitter}
                    onUpdatePost={(updated) =>
                      setCurrentCampaign((prev) =>
                        prev ? { ...prev, twitter: { ...prev.twitter, ...updated } } : null
                      )
                    }
                    onRegenerateImage={(ratio, size, prompt) =>
                      handleRegeneratePlatformImage('twitter', ratio, size, prompt)
                    }
                    onRefineText={(action, customInstruction) =>
                      handleRefinePost('twitter', action, customInstruction)
                    }
                    isRefiningText={refiningPlatform === 'twitter'}
                  />
                </div>
              )}

              {/* Instagram Platform Card */}
              {(activeView === 'all' || activeView === 'instagram') && (
                <div className="h-full">
                  <PlatformCardInstagram
                    post={currentCampaign.instagram}
                    onUpdatePost={(updated) =>
                      setCurrentCampaign((prev) =>
                        prev ? { ...prev, instagram: { ...prev.instagram, ...updated } } : null
                      )
                    }
                    onRegenerateImage={(ratio, size, prompt) =>
                      handleRegeneratePlatformImage('instagram', ratio, size, prompt)
                    }
                    onRefineText={(action, customInstruction) =>
                      handleRefinePost('instagram', action, customInstruction)
                    }
                    isRefiningText={refiningPlatform === 'instagram'}
                  />
                </div>
              )}
            </div>

            {/* Bottom Batch Actions Toolbar */}
            <BatchActionBar
              campaign={currentCampaign}
              onSave={handleSaveCampaign}
              isSaved={isSaved}
              onRegenerateAllImages={handleRegenerateAllImages}
              isRegeneratingImages={isRegeneratingAllImages}
            />
          </section>
        )}

        {/* Empty state when no campaign is generated */}
        {!currentCampaign && !isLoading && (
          <section className="rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-white/40">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-3">
              <Sparkles className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              Ready to generate simultaneously across 3 platforms
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              Type your raw thought or pick one of the sample inspirations above. Select your desired tone (professional, witty, urgent) and launch.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-xs text-slate-900 block">LinkedIn Tailoring</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Long-form narrative, executive hook, numbered takeaways, and 4:3 optimal editorial visual.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-xs text-slate-900 block">Twitter / X Tailoring</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Strict &le;280 char punchy tweet + 3-part thread breakdown and 16:9 cinematic feed graphic.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-xs text-slate-900 block">Instagram Tailoring</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Visual-first 3:4 portrait aesthetic, 2-line first hook, and 10-15 targeted hashtags.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modals & Drawers */}
      <SavedDraftsDrawer
        isOpen={isDraftsOpen}
        onClose={() => setIsDraftsOpen(false)}
        campaigns={savedCampaigns}
        onSelectCampaign={handleSelectSavedCampaign}
        onDeleteCampaign={handleDeleteCampaign}
      />

      <ToneGuideModal
        isOpen={isToneGuideOpen}
        onClose={() => setIsToneGuideOpen(false)}
        onSelectTone={(tone) => setActiveTone(tone)}
      />

      <PlatformSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </div>
  );
}

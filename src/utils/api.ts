import { AspectRatio, CampaignData, ImageSize, Platform, Tone } from '../types';

export async function generateSocialContent(params: {
  idea: string;
  tone: Tone;
  targetAudience?: string;
  callToAction?: string;
  modelChoice?: string;
}): Promise<CampaignData> {
  const response = await fetch('/api/generate-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const resJson = await response.json();
  if (!response.ok || !resJson.success) {
    throw new Error(resJson.error || 'Failed to generate content. Please verify your connection.');
  }

  const raw = resJson.data;
  const campaign: CampaignData = {
    id: 'camp_' + Date.now().toString(36),
    title: raw.linkedin?.headline || params.idea.slice(0, 45) + '...',
    idea: params.idea,
    tone: params.tone,
    targetAudience: params.targetAudience || 'General audience',
    callToAction: params.callToAction || '',
    createdAt: new Date().toISOString(),
    linkedin: {
      headline: raw.linkedin?.headline || 'Professional Perspective',
      hook: raw.linkedin?.hook || '',
      content: raw.linkedin?.content || '',
      callToAction: raw.linkedin?.callToAction || '',
      hashtags: raw.linkedin?.hashtags || [],
      imagePrompt: raw.linkedin?.imagePrompt || '',
      suggestedAspectRatio: raw.linkedin?.suggestedAspectRatio || '4:3',
    },
    twitter: {
      singleTweet: raw.twitter?.singleTweet || '',
      thread: raw.twitter?.thread || [],
      hashtags: raw.twitter?.hashtags || [],
      charCount: raw.twitter?.charCount || (raw.twitter?.singleTweet?.length || 0),
      imagePrompt: raw.twitter?.imagePrompt || '',
      suggestedAspectRatio: raw.twitter?.suggestedAspectRatio || '16:9',
    },
    instagram: {
      caption: raw.instagram?.caption || '',
      hookFirstLine: raw.instagram?.hookFirstLine || '',
      callToAction: raw.instagram?.callToAction || '',
      hashtags: raw.instagram?.hashtags || [],
      carouselIdeas: raw.instagram?.carouselIdeas || [],
      imagePrompt: raw.instagram?.imagePrompt || '',
      suggestedAspectRatio: raw.instagram?.suggestedAspectRatio || '3:4',
    },
    overallStrategy: raw.overallStrategy,
  };

  return campaign;
}

export async function generatePlatformSpecificImage(params: {
  platform: Platform;
  prompt: string;
  aspectRatio: AspectRatio;
  imageSize: ImageSize;
  model?: string;
}): Promise<{ imageUrl: string; modelUsed: string; aspectRatio: string; imageSize: string }> {
  const response = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const resJson = await response.json();
  if (!response.ok || !resJson.success) {
    throw new Error(resJson.error || 'Failed to generate image.');
  }

  return {
    imageUrl: resJson.imageUrl,
    modelUsed: resJson.modelUsed,
    aspectRatio: resJson.aspectRatio,
    imageSize: resJson.imageSize,
  };
}

export async function refinePostText(params: {
  text: string;
  action: 'shorter' | 'punchier' | 'expand' | 'emojis' | 'hook' | 'custom';
  platform: Platform;
  tone?: string;
  customInstruction?: string;
}): Promise<string> {
  const response = await fetch('/api/refine-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const resJson = await response.json();
  if (!response.ok || !resJson.success) {
    throw new Error(resJson.error || 'Failed to refine text.');
  }

  return resJson.refinedText;
}

// Storage helpers
const STORAGE_KEY = 'omnipost_saved_campaigns';

export function getSavedCampaigns(): CampaignData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load campaigns from storage', err);
    return [];
  }
}

export function saveCampaignToStorage(campaign: CampaignData): void {
  try {
    const existing = getSavedCampaigns();
    const updated = [campaign, ...existing.filter((c) => c.id !== campaign.id)].slice(0, 30);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save campaign to storage', err);
  }
}

export function deleteCampaignFromStorage(id: string): void {
  try {
    const existing = getSavedCampaigns();
    const updated = existing.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete campaign from storage', err);
  }
}

export function downloadBase64Image(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export type Platform = 'linkedin' | 'twitter' | 'instagram';

export type Tone = 'professional' | 'witty' | 'urgent' | 'storytelling' | 'educational' | 'contrarian' | string;

export type ImageSize = '1K' | '2K' | '4K';

export type AspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';

export interface LinkedInPost {
  headline: string;
  hook: string;
  content: string;
  callToAction: string;
  hashtags: string[];
  imagePrompt: string;
  suggestedAspectRatio?: string;
  imageUrl?: string;
  isGeneratingImage?: boolean;
}

export interface TwitterPost {
  singleTweet: string;
  thread: string[];
  hashtags: string[];
  charCount: number;
  imagePrompt: string;
  suggestedAspectRatio?: string;
  imageUrl?: string;
  isGeneratingImage?: boolean;
}

export interface InstagramPost {
  caption: string;
  hookFirstLine: string;
  callToAction: string;
  hashtags: string[];
  carouselIdeas: string[];
  imagePrompt: string;
  suggestedAspectRatio?: string;
  imageUrl?: string;
  isGeneratingImage?: boolean;
}

export interface CampaignData {
  id: string;
  title: string;
  idea: string;
  tone: Tone;
  targetAudience: string;
  callToAction: string;
  createdAt: string;
  linkedin: LinkedInPost;
  twitter: TwitterPost;
  instagram: InstagramPost;
  overallStrategy?: {
    angle: string;
    recommendedPostingTimes: {
      linkedin: string;
      twitter: string;
      instagram: string;
    };
  };
}

export interface ImageGenerationRequest {
  platform: Platform;
  prompt: string;
  aspectRatio: AspectRatio;
  imageSize: ImageSize;
  model?: string;
}

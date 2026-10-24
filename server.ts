import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is not set. Gemini features will return an error.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Simultaneous multi-platform content generation
  app.post('/api/generate-content', async (req: Request, res: Response) => {
    try {
      const {
        idea,
        tone = 'professional',
        targetAudience = 'Professionals, tech enthusiasts, and early adopters',
        callToAction = '',
        modelChoice = 'gemini-3.8-flash',
      } = req.body;

      if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
        return res.status(400).json({ error: 'Please provide an idea to generate content.' });
      }

      const ai = getAIClient();
      const validTextModel = ['gemini-4-argon', 'gemini-3.8-flash', 'gemini-3.1-flash-lite'].includes(modelChoice)
        ? modelChoice
        : 'gemini-3.8-flash';

      const prompt = `
You are an elite cross-platform social media growth strategist and copywriter.
Generate simultaneously 3 distinct, platform-native drafted posts based on the following idea and parameters:

Idea: "${idea.trim()}"
Desired Tone: "${tone}" (options: professional, witty, urgent, or custom)
Target Audience: "${targetAudience}"
Optional Call to Action: "${callToAction || 'Engage audience naturally'}"

Requirements for each platform:
1. LinkedIn (Long-Form, Thought-Leadership, Authoritative):
   - Hook headline that breaks standard corporate patterns and stops the scroll.
   - Long-form narrative body (250-450 words) with structured whitespace, strategic bullet points/numbered takeaways.
   - Professional discussion prompt question at the bottom.
   - 3-5 high-relevance professional hashtags.
   - A descriptive image prompt tailored for LinkedIn (aspect ratio 4:3 or 1:1, crisp modern editorial/infographic or high-end office/architecture aesthetic).

2. Twitter / X (Short, Punchy, Virality-Engineered):
   - Single Tweet: Strictly max 280 characters, high-impact one-liner or punchy takeaway with 1-2 sharp hashtags.
   - Thread Version: A tight 3-tweet thread breakdown (Tweet 1: Hook, Tweet 2: High-density value, Tweet 3: Summary & CTA).
   - 1-2 punchy hashtags.
   - A descriptive image prompt tailored for Twitter/X (aspect ratio 16:9 or 1:1, high-contrast, graphic, bold composition).

3. Instagram (Visual-First, High-Engagement, Community):
   - Strong first 2-line hook before the "...more" fold.
   - Engaging caption breakdown (150-250 words) with conversational rhythm, line spacing, and optional carousel slide guidance.
   - Friendly community CTA (e.g. "Save for later", "Share to your story", "Drop your thoughts below").
   - 10-15 targeted hashtags separated into broad and niche tags.
   - A descriptive image prompt tailored for Instagram (aspect ratio 3:4 or 1:1 or 9:16, rich artistic lighting, editorial depth, aesthetic color palette).
`;

      const response = await ai.models.generateContent({
        model: validTextModel,
        contents: prompt,
        config: {
          systemInstruction:
            'You are an expert social media strategist. Produce output strictly conforming to the requested JSON schema. Write with authentic voice, avoid generic corporate buzzwords or AI cliches, and tailor the exact cadence to each platform.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              linkedin: {
                type: Type.OBJECT,
                properties: {
                  headline: { type: Type.STRING },
                  hook: { type: Type.STRING },
                  content: { type: Type.STRING },
                  callToAction: { type: Type.STRING },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  imagePrompt: { type: Type.STRING },
                  suggestedAspectRatio: { type: Type.STRING },
                },
                required: ['headline', 'hook', 'content', 'callToAction', 'hashtags', 'imagePrompt'],
              },
              twitter: {
                type: Type.OBJECT,
                properties: {
                  singleTweet: { type: Type.STRING },
                  thread: { type: Type.ARRAY, items: { type: Type.STRING } },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  charCount: { type: Type.NUMBER },
                  imagePrompt: { type: Type.STRING },
                  suggestedAspectRatio: { type: Type.STRING },
                },
                required: ['singleTweet', 'thread', 'hashtags', 'charCount', 'imagePrompt'],
              },
              instagram: {
                type: Type.OBJECT,
                properties: {
                  caption: { type: Type.STRING },
                  hookFirstLine: { type: Type.STRING },
                  callToAction: { type: Type.STRING },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  carouselIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
                  imagePrompt: { type: Type.STRING },
                  suggestedAspectRatio: { type: Type.STRING },
                },
                required: ['caption', 'hookFirstLine', 'callToAction', 'hashtags', 'carouselIdeas', 'imagePrompt'],
              },
              overallStrategy: {
                type: Type.OBJECT,
                properties: {
                  angle: { type: Type.STRING },
                  recommendedPostingTimes: {
                    type: Type.OBJECT,
                    properties: {
                      linkedin: { type: Type.STRING },
                      twitter: { type: Type.STRING },
                      instagram: { type: Type.STRING },
                    },
                    required: ['linkedin', 'twitter', 'instagram'],
                  },
                },
                required: ['angle', 'recommendedPostingTimes'],
              },
            },
            required: ['linkedin', 'twitter', 'instagram', 'overallStrategy'],
          },
        },
      });

      const responseText = response.text || '{}';
      let parsedData;
      try {
        parsedData = JSON.parse(responseText);
      } catch (jsonErr) {
        console.error('Failed to parse JSON response:', responseText, jsonErr);
        return res.status(500).json({ error: 'Failed to parse generated social posts. Please try again.' });
      }

      res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error('Error generating social media content:', err);
      res.status(500).json({
        error: err.message || 'An unexpected error occurred during content generation.',
      });
    }
  });

  // Single or batch platform image generation
  app.post('/api/generate-image', async (req: Request, res: Response) => {
    try {
      const {
        prompt,
        platform = 'linkedin',
        aspectRatio = '1:1',
        imageSize = '1K',
        model = 'gemini-3-pro-image-preview',
      } = req.body;

      if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
        return res.status(400).json({ error: 'Please provide an image prompt.' });
      }

      const validAspectRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];
      const targetAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

      const validSizes = ['1K', '2K', '4K'];
      const targetSize = validSizes.includes(imageSize) ? imageSize : '1K';

      // Pick models in priority order: user requested model -> gemini-nano-banana-2.1 -> gemini-3.1-flash-lite-image
      const modelCandidates = [
        model || 'gemini-3-pro-image-preview',
        'gemini-nano-banana-2.1',
        'gemini-3.1-flash-lite-image',
      ];

      const ai = getAIClient();
      let generatedImageUrl: string | null = null;
      let lastErrorMessage = '';
      let successfulModel = '';

      for (const candidateModel of modelCandidates) {
        try {
          const config: any = {
            imageConfig: {
              aspectRatio: targetAspectRatio,
            },
          };

          // imageSize is supported on gemini-3-pro-image / gemini-3-pro-image-preview and gemini-nano-banana-2.1
          if (candidateModel !== 'gemini-3.1-flash-lite-image') {
            config.imageConfig.imageSize = targetSize;
          }

          const response = await ai.models.generateContent({
            model: candidateModel,
            contents: {
              parts: [{ text: prompt.trim() }],
            },
            config,
          });

          for (const candidate of response.candidates || []) {
            for (const part of candidate.content?.parts || []) {
              if (part.inlineData?.data) {
                const mime = part.inlineData.mimeType || 'image/png';
                generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
                successfulModel = candidateModel;
                break;
              }
            }
            if (generatedImageUrl) break;
          }

          if (generatedImageUrl) {
            break;
          }
        } catch (modelErr: any) {
          lastErrorMessage = modelErr?.message || String(modelErr);
          console.warn(`Model ${candidateModel} failed:`, lastErrorMessage);
          // Continue to next candidate fallback
        }
      }

      if (!generatedImageUrl) {
        return res.status(500).json({
          error: `Could not generate image. ${lastErrorMessage || 'No image data returned.'}`,
        });
      }

      res.json({
        success: true,
        imageUrl: generatedImageUrl,
        modelUsed: successfulModel,
        aspectRatio: targetAspectRatio,
        imageSize: targetSize,
        platform,
      });
    } catch (err: any) {
      console.error('Error generating image:', err);
      res.status(500).json({
        error: err.message || 'An unexpected error occurred during image generation.',
      });
    }
  });

  // Content refinement with Gemini intelligence
  app.post('/api/refine-content', async (req: Request, res: Response) => {
    try {
      const { text, action, platform, customInstruction, tone } = req.body;

      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text content is required for refinement.' });
      }

      const ai = getAIClient();

      let actionPrompt = '';
      switch (action) {
        case 'punchier':
          actionPrompt = 'Make this text significantly punchier, sharper, and more energetic. Remove fluff, sharpen the hook, and strengthen word choice.';
          break;
        case 'shorter':
          actionPrompt = 'Shorten this post by approximately 35-50% while retaining the core insight, emotional impact, and call to action.';
          break;
        case 'expand':
          actionPrompt = 'Expand this post with concrete examples, practical takeaways, and structured nuances to deepen the value for the reader.';
          break;
        case 'emojis':
          actionPrompt = 'Incorporate tasteful, modern emojis as subtle structural bullet points and visual anchors without looking spammy.';
          break;
        case 'hook':
          actionPrompt = 'Rewrite the opening 2 lines (hook) to be irresistible, scroll-stopping, and curiosity-inducing. Provide 3 alternate hook choices, then the full post with the best hook.';
          break;
        case 'custom':
        default:
          actionPrompt = customInstruction || 'Refine and polish this social media post for maximum engagement.';
          break;
      }

      const prompt = `
Platform: ${platform || 'Social Media'}
Desired Tone: ${tone || 'Current tone'}
Original Text:
"""
${text}
"""

Task:
${actionPrompt}

Respond in clean plain text with the refined post ready to be copied and posted. If multiple hooks were requested, present them clearly.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      res.json({
        success: true,
        refinedText: response.text || text,
      });
    } catch (err: any) {
      console.error('Error refining content:', err);
      res.status(500).json({
        error: err.message || 'Error refining content.',
      });
    }
  });

  // Setup Vite dev server or static files in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      console.warn('Production build "dist" folder not found. Serving via Vite fallback.');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 OmniPost Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

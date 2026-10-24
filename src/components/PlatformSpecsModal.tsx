import React from 'react';
import { X, Check, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

interface PlatformSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlatformSpecsModal: React.FC<PlatformSpecsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              Platform Aspect Ratio & Media Specifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          OmniPost Studio dynamically controls Gemini image aspect ratios and resolutions to match optimal feed real-estate per platform.
        </p>

        {/* Platform Comparison Matrix */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* LinkedIn Spec Card */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-5 w-5 rounded bg-[#0077B5] text-white flex items-center justify-center font-bold text-[10px]">in</span>
              <span className="font-bold text-sm text-slate-900">LinkedIn Feed</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><strong className="text-slate-800">Primary Ratio:</strong> 4:3 Landscape or 1:1</li>
              <li><strong className="text-slate-800">Alternative:</strong> 16:9 Banner</li>
              <li><strong className="text-slate-800">Ideal Copy:</strong> 250 - 450 words</li>
              <li><strong className="text-slate-800">Hashtags:</strong> 3 - 5 professional</li>
              <li><strong className="text-slate-800">Visual Aesthetic:</strong> Executive editorial, clean architectural lines, diagrams.</li>
            </ul>
          </div>

          {/* Twitter / X Spec Card */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-5 w-5 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">𝕏</span>
              <span className="font-bold text-sm text-slate-900">Twitter / X</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><strong className="text-slate-800">Primary Ratio:</strong> 16:9 Cinematic</li>
              <li><strong className="text-slate-800">Alternative:</strong> 1:1 Square</li>
              <li><strong className="text-slate-800">Ideal Copy:</strong> &le; 280 chars (or 3-part thread)</li>
              <li><strong className="text-slate-800">Hashtags:</strong> 1 - 2 targeted</li>
              <li><strong className="text-slate-800">Visual Aesthetic:</strong> High contrast, graphic pop, bold typography or memeable assets.</li>
            </ul>
          </div>

          {/* Instagram Spec Card */}
          <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-5 w-5 rounded bg-linear-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-[10px]">IG</span>
              <span className="font-bold text-sm text-slate-900">Instagram</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li><strong className="text-slate-800">Primary Ratio:</strong> 3:4 Vertical Portrait</li>
              <li><strong className="text-slate-800">Alternative:</strong> 1:1 or 9:16 (Story)</li>
              <li><strong className="text-slate-800">Ideal Copy:</strong> 150 - 250 words</li>
              <li><strong className="text-slate-800">Hashtags:</strong> 10 - 15 curated tags</li>
              <li><strong className="text-slate-800">Visual Aesthetic:</strong> Rich lighting, shallow depth of field, vibrant colors.</li>
            </ul>
          </div>
        </div>

        {/* Supported Aspect Ratios & Resolutions */}
        <div className="mt-5 rounded-xl border border-slate-200 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Supported Aspect Ratios & Engine Resolutions
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-100 font-mono text-center">
              <span className="font-bold text-slate-900 block">1:1</span>
              <span className="text-[10px] text-slate-500">Square Universal</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-100 font-mono text-center">
              <span className="font-bold text-slate-900 block">3:4 & 2:3</span>
              <span className="text-[10px] text-slate-500">Portrait Feed & Posters</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-100 font-mono text-center">
              <span className="font-bold text-slate-900 block">4:3 & 3:2</span>
              <span className="text-[10px] text-slate-500">Classic Editorial</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-100 font-mono text-center">
              <span className="font-bold text-slate-900 block">16:9 & 21:9</span>
              <span className="text-[10px] text-slate-500">Widescreen Cinematic</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
            <span><strong>Quality Resolutions:</strong> 1K (Standard Web), 2K (Retina Crisp), 4K (Studio Master)</span>
            <span className="font-mono text-emerald-800 font-semibold">gemini-3-pro-image-preview</span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

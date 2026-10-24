import React from 'react';
import { Bookmark, Sparkles, SlidersHorizontal, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenDrafts: () => void;
  onOpenToneGuide: () => void;
  onOpenSpecs: () => void;
  onReset: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrafts,
  onOpenToneGuide,
  onOpenSpecs,
  onReset,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={onReset}
          className="group flex items-center gap-2 text-left transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            OmniPost Studio
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={onReset}
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Studio Workspace
          </button>
          <button
            onClick={onOpenToneGuide}
            className="flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-slate-400" />
            <span>Tone Playbook</span>
          </button>
          <button
            onClick={onOpenSpecs}
            className="flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <span>Platform Ratios & Specs</span>
          </button>
          <button
            onClick={onOpenDrafts}
            className="flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Bookmark className="h-4 w-4 text-slate-400" />
            <span>Saved Drafts</span>
            {savedCount > 0 && (
              <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.2 text-[11px] font-semibold text-emerald-800 font-mono">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onReset}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            New Campaign
          </button>
        </div>
      </div>
    </header>
  );
};

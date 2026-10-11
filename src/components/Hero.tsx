import React, { useState } from 'react';
import {
  ArrowDown,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Award,
  Sparkles,
  MapPin,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code2,
  Heart,
  Palette,
  Leaf,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface HeroProps {
  onOpenDossier: () => void;
  onOpenResume: () => void;
  isDark?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDossier,
  onOpenResume,
  isDark = true,
}) => {
  const [activeCardTab, setActiveCardTab] = useState<'hr' | 'highlights' | 'github' | 'dna' | 'hobbies'>('hr');

  return (
    <section
      id="hero"
      className={`relative pt-10 pb-16 md:pt-16 md:pb-24 border-b overflow-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#080c14] border-slate-800/80 text-white'
          : 'bg-gradient-to-b from-slate-50 via-white to-slate-100 border-slate-200 text-slate-900'
      }`}
    >
      {/* Radiant ambient glow spheres */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[130px] pointer-events-none -translate-y-1/2 max-w-full ${
          isDark ? 'bg-emerald-500/15' : 'bg-emerald-500/10'
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute top-1/3 right-4 sm:right-10 w-[240px] sm:w-[450px] h-[240px] sm:h-[450px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none max-w-full ${
          isDark ? 'bg-cyan-500/12' : 'bg-cyan-500/8'
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-[linear-gradient(to_right,#33415518_1px,transparent_1px),linear-gradient(to_bottom,#33415518_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]'
            : 'bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]'
        }`}
      />

      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Charismatic Headline & Magnetic Bio */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-5">
            
            {/* Status Pill: High-Contrast & Pulsing */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium backdrop-blur-md border ${
                  isDark
                    ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200'
                    : 'bg-white border-emerald-500/40 text-slate-800 shadow-sm'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-500 font-bold">Open for Internships & Projects</span>
                <span className={isDark ? 'text-slate-500' : 'text-slate-300'}>·</span>
                <span className="flex items-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3 text-cyan-500" />
                  Kolkata, India
                </span>
              </div>

              {/* Hackathon Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
                  isDark
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                    : 'bg-amber-50 border-amber-400 text-amber-800 shadow-sm'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Internal SIH '24 Finalist</span>
              </div>
            </div>

            {/* Display Headline: Bold, High-Contrast & Magnetic */}
            <h1
              className={`text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] [text-wrap:balance] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Building user-first apps &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                creative digital experiences
              </span>
              .
            </h1>

            {/* Punchy, Bite-Sized Bio - Instant Hook */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-xl font-normal ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              Hey, I'm <strong className={isDark ? 'text-white font-bold' : 'text-slate-950 font-bold'}>Rajanya Dey</strong> — Full Stack MERN Developer and 3rd Year CSE student at Meghnad Saha Institute of Technology, Kolkata. Active in{' '}
              <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>GDGC MSIT</span> &{' '}
              <span className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>Hackerspace MSIT</span>.
            </p>

            {/* Visual Pill Highlights */}
            <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
              <span
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-semibold ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700/80 text-emerald-300'
                    : 'bg-white border-slate-300 text-emerald-800 shadow-xs'
                }`}
              >
                <Code2 className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                MERN Stack Specialist
              </span>
              <span
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-semibold ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700/80 text-cyan-300'
                    : 'bg-white border-slate-300 text-cyan-800 shadow-xs'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                AI Fundamentals
              </span>
              <span
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-semibold ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700/80 text-purple-300'
                    : 'bg-white border-slate-300 text-purple-800 shadow-xs'
                }`}
              >
                <Palette className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                UI/UX (Figma & Canva)
              </span>
            </div>

            {/* Action Buttons: High-Contrast & High-Impact */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className="px-5 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl hover:from-emerald-300 hover:to-teal-200 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] inline-flex items-center gap-2 cursor-pointer font-sans"
              >
                <span>Explore Featured Work</span>
                <ArrowDown className="w-4 h-4 text-slate-950" />
              </a>

              <a
                href="https://github.com/Rajanya-dey"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-3 text-sm font-semibold rounded-xl border transition-all inline-flex items-center gap-2 ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700 text-white hover:bg-slate-800 hover:border-emerald-500/50'
                    : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-emerald-500 shadow-xs'
                }`}
              >
                <Github className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-3 text-sm font-semibold rounded-xl border transition-all inline-flex items-center gap-2 ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700 text-white hover:bg-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-cyan-500 shadow-xs'
                }`}
              >
                <Linkedin className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <button
                onClick={onOpenResume}
                className={`px-4 py-3 text-sm font-semibold rounded-xl border transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-white border-slate-300 text-slate-800 hover:text-slate-950 shadow-xs'
                }`}
              >
                <span>Resume [R]</span>
              </button>

              <button
                onClick={onOpenDossier}
                className={`px-3 py-2 text-xs font-mono transition-colors inline-flex items-center gap-1 cursor-pointer font-bold ${
                  isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'
                }`}
                title="Open ShadowFox Architecture Dossier"
              >
                <Terminal className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                <span>Dossier [D]</span>
              </button>
            </div>

            {/* High-Contrast Proof Metrics Strip */}
            <div
              className={`pt-6 border-t grid grid-cols-2 sm:grid-cols-4 gap-3 ${
                isDark ? 'border-slate-800/80' : 'border-slate-200'
              }`}
            >
              <div
                className={`p-3 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800/80'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className={`text-xl sm:text-2xl font-extrabold font-mono tabular-nums ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  Finalist
                </div>
                <div className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Internal SIH '24
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800/80'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className={`text-2xl font-extrabold font-mono tabular-nums ${
                  isDark ? 'text-cyan-400' : 'text-cyan-700'
                }`}>
                  3 Tracks
                </div>
                <div className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Internship Programs
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800/80'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className={`text-2xl font-extrabold font-mono tabular-nums ${
                  isDark ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  2 Groups
                </div>
                <div className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  GDGC & Hackerspace
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800/80'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className={`text-2xl font-extrabold font-mono tabular-nums ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  4 Langs
                </div>
                <div className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Multilingual Fluency
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Developer Profile Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <div
              className={`w-full max-w-sm sm:max-w-md lg:max-w-md xl:max-w-lg rounded-2xl border p-4 shadow-2xl relative group transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-b from-slate-900/95 to-slate-950/95 border-slate-700/80 hover:border-emerald-500/60'
                  : 'bg-white border-slate-200 shadow-xl hover:border-emerald-500/50'
              }`}
            >
              {/* Glowing animated halo */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/25 via-cyan-500/20 to-purple-500/25 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500 -z-10" />

              {/* Developer Portrait Image with high-contrast framing */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-950 border border-slate-700/60 shadow-inner">
                <img
                  src={DEVELOPER_PROFILE.avatarUrl}
                  alt={DEVELOPER_PROFILE.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Overlay Name & Title Badge */}
                <div className="absolute bottom-3 left-3 right-3 text-xs bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-700/90 flex items-center justify-between shadow-xl">
                  <div>
                    <span className="font-extrabold text-white block text-sm tracking-tight">
                      {DEVELOPER_PROFILE.name}
                    </span>
                    <span className="text-emerald-400 text-xs font-mono font-medium block">
                      Full Stack MERN Developer · MSIT Kolkata
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available</span>
                  </div>
                </div>
              </div>

              {/* Interactive Card Tabs: "Wanted to know about him" feature */}
              <div className="mt-4 space-y-3">
                <div className={`flex items-center gap-1 p-1 rounded-lg border text-[11px] font-mono overflow-x-auto scrollbar-none sm:justify-between ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button
                    onClick={() => setActiveCardTab('hr')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer font-bold whitespace-nowrap shrink-0 ${
                      activeCardTab === 'hr'
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    👔 HR Glance
                  </button>
                  <button
                    onClick={() => setActiveCardTab('highlights')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer font-bold whitespace-nowrap shrink-0 ${
                      activeCardTab === 'highlights'
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ⚡ Wins
                  </button>
                  <button
                    onClick={() => setActiveCardTab('github')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer font-bold whitespace-nowrap shrink-0 ${
                      activeCardTab === 'github'
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🐙 GitHub
                  </button>
                  <button
                    onClick={() => setActiveCardTab('dna')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer font-bold whitespace-nowrap shrink-0 ${
                      activeCardTab === 'dna'
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🛠️ Tech
                  </button>
                  <button
                    onClick={() => setActiveCardTab('hobbies')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer font-bold whitespace-nowrap shrink-0 ${
                      activeCardTab === 'hobbies'
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🎨 Vibe
                  </button>
                </div>

                {/* Tab 0: HR Glance (Instant recruiter scannable summary) */}
                {activeCardTab === 'hr' && (
                  <div className="space-y-2 text-xs">
                    <div className={`p-2.5 rounded-lg border space-y-1.5 ${
                      isDark ? 'bg-slate-950/70 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className={`font-bold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          Fast Candidate Summary
                        </span>
                        <span className={`px-1.5 py-0.2 rounded border text-[10px] font-bold ${
                          isDark ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        }`}>
                          Available Now
                        </span>
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <p className="flex items-center gap-1.5">
                          <span className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>✓</span>
                          <span><strong>Target Roles:</strong> Full Stack Web Dev / SDE Intern</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>✓</span>
                          <span><strong>Academics:</strong> 3rd Year B.Tech CSE · MSIT Kolkata</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span className={isDark ? 'text-amber-400' : 'text-amber-700'}>★</span>
                          <span><strong>SIH '24:</strong> Internal SIH Finalist</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span className={isDark ? 'text-cyan-400' : 'text-cyan-700'}>✓</span>
                          <span><strong>Internships:</strong> Infyntrek Systèmes & InnoByte</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 1: Wins & Highlights */}
                {activeCardTab === 'highlights' && (
                  <div className="space-y-2 text-xs">
                    <div className={`flex items-start gap-2 p-2 rounded-lg border ${
                      isDark ? 'bg-slate-950/50 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <Award className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                      <div>
                        <strong className={`block font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Internal SIH 2024 Finalist</strong>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Smart India Hackathon · AyurvedicPlants platform</span>
                      </div>
                    </div>
                    <div className={`flex items-start gap-2 p-2 rounded-lg border ${
                      isDark ? 'bg-slate-950/50 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <div>
                        <strong className={`block font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Infyntrek Systèmes Intern</strong>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Built production MERN stack REST APIs</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: GitHub Spotlight */}
                {activeCardTab === 'github' && (
                  <div className={`space-y-2 text-xs p-2.5 rounded-lg border ${
                    isDark ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>@Rajanya-dey</span>
                      <a
                        href="https://github.com/Rajanya-dey"
                        target="_blank"
                        rel="noreferrer"
                        className={`text-[11px] font-mono hover:underline flex items-center gap-1 font-semibold ${
                          isDark ? 'text-cyan-400' : 'text-cyan-700'
                        }`}
                      >
                        <span>Visit Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Repositories in React, Node.js, Python, C, and responsive web design.
                    </p>
                    <div className={`flex items-center gap-2 pt-1 font-mono text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span> JavaScript
                      <span className="h-2 w-2 rounded-full bg-cyan-500"></span> React
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Node.js
                    </div>
                  </div>
                )}

                {/* Tab 3: Tech DNA */}
                {activeCardTab === 'dna' && (
                  <div className={`flex flex-wrap gap-1.5 p-2 rounded-lg border text-[11px] font-mono ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                    }`}>
                      React.js
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                    }`}>
                      Node.js
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                    }`}>
                      MongoDB
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300' : 'bg-cyan-50 border-cyan-300 text-cyan-800 font-semibold'
                    }`}>
                      Express.js
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark ? 'bg-purple-950/80 border-purple-500/40 text-purple-300' : 'bg-purple-50 border-purple-300 text-purple-800 font-semibold'
                    }`}>
                      Tailwind CSS
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark ? 'bg-purple-950/80 border-purple-500/40 text-purple-300' : 'bg-purple-50 border-purple-300 text-purple-800 font-semibold'
                    }`}>
                      Figma
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark ? 'bg-amber-950/80 border-amber-500/40 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
                    }`}>
                      Python
                    </span>
                  </div>
                )}

                {/* Tab 4: Vibe & Personality */}
                {activeCardTab === 'hobbies' && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`p-2 rounded-lg border flex items-center gap-2 ${
                      isDark ? 'bg-slate-950/50 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <Palette className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span>Digital Painting</span>
                    </div>
                    <div className={`p-2 rounded-lg border flex items-center gap-2 ${
                      isDark ? 'bg-slate-950/50 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <Leaf className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span>Gardening</span>
                    </div>
                    <div className={`col-span-2 p-2 rounded-lg border flex items-center gap-2 ${
                      isDark ? 'bg-slate-950/50 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                      <span>Crafting Innovative Websites</span>
                    </div>
                  </div>
                )}

                {/* Bottom Fast Contact Link Row */}
                <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                  isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/Rajanya-dey"
                      target="_blank"
                      rel="noreferrer"
                      className={`transition-colors ${
                        isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                      }`}
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={DEVELOPER_PROFILE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className={`transition-colors ${
                        isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-cyan-700'
                      }`}
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="mailto:rajanyadey833@gmail.com"
                      className={`transition-colors ${
                        isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-700'
                      }`}
                      title="Email Rajanya"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href="tel:+919836897019"
                      className={`transition-colors ${
                        isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-cyan-700'
                      }`}
                      title="Call Rajanya"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                  <button
                    onClick={onOpenResume}
                    className={`font-semibold font-mono text-[11px] flex items-center gap-1 cursor-pointer ${
                      isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'
                    }`}
                  >
                    <span>Full CV</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

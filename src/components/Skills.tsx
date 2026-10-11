import React, { useState } from 'react';
import { Code, Check, Terminal, Copy, Cpu, Database, Cloud, Shield, Layout, Sparkles, Award } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Skill, SkillCategory } from '../types';

interface SkillsProps {
  isDark?: boolean;
}

interface ExpertiseInfo {
  level: string;
  tierLabel: string;
  badgeClass: string;
  progressGradient: string;
  glowShadow: string;
  pulseColor: string;
}

const getExpertiseInfo = (proficiency: number, isDark: boolean): ExpertiseInfo => {
  if (proficiency >= 90) {
    return {
      level: 'Expert',
      tierLabel: 'Mastery · Production Ready',
      badgeClass: isDark
        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
        : 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs',
      progressGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
      glowShadow: 'shadow-[0_0_12px_rgba(16,185,129,0.6)]',
      pulseColor: 'bg-emerald-400',
    };
  }
  if (proficiency >= 85) {
    return {
      level: 'Advanced',
      tierLabel: 'Advanced · High Competency',
      badgeClass: isDark
        ? 'bg-teal-500/15 text-teal-300 border-teal-500/40 shadow-[0_0_10px_rgba(20,184,166,0.25)]'
        : 'bg-teal-100 text-teal-800 border-teal-300 shadow-xs',
      progressGradient: 'from-teal-500 via-emerald-400 to-cyan-400',
      glowShadow: 'shadow-[0_0_12px_rgba(20,184,166,0.6)]',
      pulseColor: 'bg-teal-400',
    };
  }
  if (proficiency >= 75) {
    return {
      level: 'Proficient',
      tierLabel: 'Proficient · Practical Delivery',
      badgeClass: isDark
        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
        : 'bg-cyan-100 text-cyan-800 border-cyan-300 shadow-xs',
      progressGradient: 'from-cyan-500 via-teal-400 to-emerald-400',
      glowShadow: 'shadow-[0_0_12px_rgba(6,182,212,0.6)]',
      pulseColor: 'bg-cyan-400',
    };
  }
  return {
    level: 'Intermediate',
    tierLabel: 'Intermediate · Working Knowledge',
    badgeClass: isDark
      ? 'bg-blue-500/15 text-blue-300 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.25)]'
      : 'bg-blue-100 text-blue-800 border-blue-300 shadow-xs',
    progressGradient: 'from-blue-500 via-cyan-400 to-teal-400',
    glowShadow: 'shadow-[0_0_12px_rgba(59,130,246,0.6)]',
    pulseColor: 'bg-blue-400',
  };
};

export const Skills: React.FC<SkillsProps> = ({ isDark = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS_DATA[0]);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const selectedExp = getExpertiseInfo(selectedSkill.proficiency, isDark);

  const categories: { id: SkillCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Tech', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'frontend', label: 'Frontend & UI', icon: <Layout className="w-3.5 h-3.5" /> },
    { id: 'backend', label: 'Backend & APIs', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'database', label: 'Databases', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'cloud', label: 'AI & Data Tools', icon: <Cloud className="w-3.5 h-3.5" /> },
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedSkill.codeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section
      id="skills"
      className={`py-16 md:py-24 border-b transition-colors duration-300 relative ${
        isDark ? 'bg-[#080c14] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 space-y-2">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
            isDark ? 'text-emerald-400' : 'text-emerald-700'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
            <span>Developer Toolchain</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight [text-wrap:balance] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Technical Stack & Production Patterns.
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            Click any technology below to test real production snippets and see how I use it in live applications.
          </p>
        </div>

        {/* Category Filters & Interactive Skill Tag Bar */}
        <div className="space-y-4 mb-8">
          <div
            className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border max-w-full overflow-x-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200 shadow-xs'
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-white hover:shadow-xs'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Skill Tags Cloud: Individual skill tags with glowing aura, mini proficiency bar & scale transition */}
          <div
            className={`p-3 rounded-xl border flex flex-wrap items-center gap-2 text-xs font-mono transition-colors ${
              isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className={`text-[11px] font-bold flex items-center gap-1.5 pr-2 mr-1 border-r shrink-0 ${
              isDark ? 'text-emerald-400 border-slate-800' : 'text-emerald-700 border-slate-300'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 animate-pulse ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
              <span>Stack Expertise:</span>
            </span>
            {SKILLS_DATA.map((skill) => {
              const isSelected = selectedSkill.name === skill.name;
              const exp = getExpertiseInfo(skill.proficiency, isDark);
              return (
                <button
                  key={skill.name}
                  onClick={() => {
                    setSelectedSkill(skill);
                    if (selectedCategory !== 'all' && skill.category !== selectedCategory) {
                      setSelectedCategory('all');
                    }
                  }}
                  className={`group relative inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                    isSelected
                      ? isDark
                        ? 'border-emerald-400 bg-emerald-950/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] ring-1 ring-emerald-400/50'
                        : 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold shadow-xs ring-1 ring-emerald-400'
                      : isDark
                      ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/70 hover:bg-slate-900 hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]'
                      : 'border-slate-300 bg-white text-slate-700 hover:text-emerald-800 hover:border-emerald-500 hover:shadow-xs'
                  }`}
                  title={`${skill.name}: ${skill.proficiency}% Proficiency (${exp.level} Level)`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? isDark ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-emerald-600'
                        : `${exp.pulseColor} group-hover:scale-125`
                    }`}
                  />
                  <span>{skill.name}</span>

                  {/* Visual Mini Progress Bar Indicator */}
                  <div className="flex items-center gap-1.5 pl-1 border-l border-slate-700/40">
                    <div
                      role="progressbar"
                      aria-label={`${skill.name} proficiency indicator`}
                      aria-valuenow={skill.proficiency}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className={`w-9 sm:w-11 h-1.5 rounded-full overflow-hidden ${
                        isDark ? 'bg-slate-800/90' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${exp.progressGradient} transition-all duration-300`}
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-mono tabular-nums font-bold ${
                      isDark ? 'text-emerald-400' : 'text-emerald-700'
                    }`}>
                      {skill.proficiency}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Grid: Skills List & Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Skill Matrix Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.name === skill.name;
              const exp = getExpertiseInfo(skill.proficiency, isDark);
              return (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`text-left p-4 rounded-xl border relative cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.025] hover:-translate-y-0.5 ${
                    isSelected
                      ? isDark
                        ? 'border-emerald-400 bg-slate-900 shadow-[0_0_25px_rgba(16,185,129,0.35)] ring-1 ring-emerald-400'
                        : 'border-emerald-500 bg-emerald-50/60 shadow-md ring-1 ring-emerald-400'
                      : isDark
                      ? 'border-slate-800 bg-slate-900/60 hover:border-emerald-500/60 hover:bg-slate-900/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  {/* Card Header: Skill Name, Expertise Badge & Percentage */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span
                      className={`font-bold text-sm tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${exp.badgeClass}`}>
                        {exp.level}
                      </span>
                      <span className={`text-xs font-mono tabular-nums font-bold ${
                        isDark ? 'text-emerald-400' : 'text-emerald-700'
                      }`}>
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>

                  {/* Metadata: Category & Years */}
                  <div className={`text-xs flex items-center gap-2 mb-2.5 font-mono ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <span className="capitalize">{skill.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{skill.experience} Experience</span>
                  </div>

                  {/* Visual Proficiency Indicator: Multi-stop glowing progress bar with milestone notches */}
                  <div className="space-y-1.5 mb-3">
                    <div
                      role="progressbar"
                      aria-label={`${skill.name} expertise level`}
                      aria-valuenow={skill.proficiency}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className={`relative w-full h-2 rounded-full overflow-hidden ${
                        isDark ? 'bg-slate-800/90' : 'bg-slate-200'
                      }`}
                    >
                      {/* 25%, 50%, 75% Milestone dividers */}
                      <span className="absolute inset-y-0 left-1/4 w-[1px] bg-slate-950/30 z-10 pointer-events-none" />
                      <span className="absolute inset-y-0 left-2/4 w-[1px] bg-slate-950/30 z-10 pointer-events-none" />
                      <span className="absolute inset-y-0 left-3/4 w-[1px] bg-slate-950/30 z-10 pointer-events-none" />

                      {/* Active fill */}
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${exp.progressGradient} relative transition-all duration-500 ease-out ${exp.glowShadow}`}
                        style={{ width: `${skill.proficiency}%` }}
                      >
                        {/* Leading edge light point */}
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#ffffff]" />
                      </div>
                    </div>

                    {/* Expertise Tier Description */}
                    <div className={`flex items-center justify-between text-[11px] font-mono ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      <span className="flex items-center gap-1.5 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${exp.pulseColor} ${isDark ? 'shadow-[0_0_6px_currentColor]' : ''}`} />
                        <span className="truncate">{exp.tierLabel}</span>
                      </span>
                      <span className="text-[10px] opacity-75 shrink-0 pl-1 font-semibold">
                        {skill.proficiency >= 90 ? 'Master' : skill.proficiency >= 85 ? 'Adv' : 'Pro'}
                      </span>
                    </div>
                  </div>

                  {/* Individual Skill Sub-Tags with Glowing Hover & Scale Transition */}
                  {skill.tags && skill.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-800/60">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono transition-all duration-200 ease-out transform hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(16,185,129,0.4)] cursor-default ${
                            isDark
                              ? 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/70'
                              : 'bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-400 shadow-xs'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Code & Architecture Inspector */}
          <div className="lg:col-span-5 sticky top-24">
            <div
              className={`rounded-2xl border p-6 space-y-4 shadow-2xl backdrop-blur-md transition-all duration-300 ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-700/80 text-white'
                      : 'bg-white border-slate-200 text-slate-900 shadow-xl'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between pb-3 border-b ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Code className="w-4 h-4 text-emerald-400" />
                      <span>Pattern: {selectedSkill.name}</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-all duration-200 transform hover:scale-105 active:scale-95 inline-flex items-center gap-1.5 cursor-pointer ${
                        isDark
                          ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:border-emerald-500/50 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                          : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:border-emerald-400'
                      }`}
                      title="Copy code snippet"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-mono text-[11px] font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-mono text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Visual Proficiency Indicator & Expertise Level in Inspector */}
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark ? 'bg-slate-950/70 border-slate-800/90' : 'bg-slate-50 border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono font-bold uppercase tracking-wider text-[11px] text-emerald-400">
                          Expertise Level
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${selectedExp.badgeClass}`}>
                          {selectedExp.level}
                        </span>
                        <span className="font-mono font-bold text-xs tabular-nums text-emerald-400">
                          {selectedSkill.proficiency}%
                        </span>
                      </div>
                    </div>

                    {/* Inspector Progress Bar with glowing gradient */}
                    <div
                      role="progressbar"
                      aria-label={`${selectedSkill.name} proficiency indicator`}
                      aria-valuenow={selectedSkill.proficiency}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className={`relative w-full h-2 rounded-full overflow-hidden ${
                        isDark ? 'bg-slate-800' : 'bg-slate-200'
                      } mb-2`}
                    >
                      <span className="absolute inset-y-0 left-1/4 w-[1px] bg-slate-950/30 z-10 pointer-events-none" />
                      <span className="absolute inset-y-0 left-2/4 w-[1px] bg-slate-950/30 z-10 pointer-events-none" />
                      <span className="absolute inset-y-0 left-3/4 w-[1px] bg-slate-950/30 z-10 pointer-events-none" />
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${selectedExp.progressGradient} relative transition-all duration-500 ease-out ${selectedExp.glowShadow}`}
                        style={{ width: `${selectedSkill.proficiency}%` }}
                      >
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#ffffff]" />
                      </div>
                    </div>

                    <div className={`flex items-center justify-between text-[11px] font-mono ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${selectedExp.pulseColor}`} />
                        <span>{selectedExp.tierLabel}</span>
                      </span>
                      <span>{selectedSkill.experience}</span>
                    </div>
                  </div>

                  {/* Contextual description - crisp & concise */}
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      Practical Application
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                      {selectedSkill.context}
                    </p>
                  </div>

              {/* Active Skill's Core Competency Tags with Glowing Animation & Scale Transition */}
              {selectedSkill.tags && selectedSkill.tags.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold flex items-center justify-between">
                    <span>Competency Tags</span>
                    <span className="text-[10px] text-slate-400 font-normal">Hover to animate</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-all duration-200 ease-out transform hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(16,185,129,0.45)] cursor-pointer ${
                          isDark
                            ? 'bg-slate-950/90 border-slate-700/80 text-emerald-300 hover:border-emerald-400 hover:text-white'
                            : 'bg-slate-50 border-slate-300 text-emerald-700 hover:border-emerald-500 hover:text-emerald-900 shadow-xs'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Snippet Box */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner">
                <div className="text-[10px] text-slate-500 pb-2 border-b border-slate-800 mb-2 flex items-center justify-between">
                  <span>// snippet.ts</span>
                  <span className="text-emerald-400">TypeScript / JS</span>
                </div>
                <pre className="leading-relaxed whitespace-pre-wrap">{selectedSkill.codeSnippet}</pre>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

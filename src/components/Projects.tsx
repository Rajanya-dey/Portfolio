import React, { useState } from 'react';
import {
  ExternalLink,
  ArrowRight,
  Layers,
  Sparkles,
  Filter,
  Code,
  Cpu,
  Shield,
  Globe,
  Award,
  Github,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsProps {
  isDark?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ isDark = true }) => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // Category filter tabs with domain icons
  const filters: { id: ProjectCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Projects', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'fullstack', label: 'Full Stack', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'frontend', label: 'Frontend', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'backend', label: 'Backend APIs', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'security', label: 'Security & Auth', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  const getCategoryCount = (category: ProjectCategory) => {
    if (category === 'all') return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => p.category === category).length;
  };

  const filteredProjects =
    selectedFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedFilter);

  const getCategoryColor = (category: Project['category']) => {
    if (isDark) {
      switch (category) {
        case 'frontend':
          return 'text-sky-300 bg-sky-950/90 border-sky-500/60 shadow-sm';
        case 'backend':
          return 'text-amber-300 bg-amber-950/90 border-amber-500/60 shadow-sm';
        case 'fullstack':
          return 'text-emerald-300 bg-emerald-950/90 border-emerald-500/60 shadow-sm';
        case 'security':
          return 'text-purple-300 bg-purple-950/90 border-purple-500/60 shadow-sm';
        default:
          return 'text-slate-300 bg-slate-900 border-slate-700';
      }
    } else {
      switch (category) {
        case 'frontend':
          return 'text-sky-800 bg-white/95 border-sky-300 shadow-sm font-bold';
        case 'backend':
          return 'text-amber-800 bg-white/95 border-amber-300 shadow-sm font-bold';
        case 'fullstack':
          return 'text-emerald-800 bg-white/95 border-emerald-300 shadow-sm font-bold';
        case 'security':
          return 'text-purple-800 bg-white/95 border-purple-300 shadow-sm font-bold';
        default:
          return 'text-slate-800 bg-white border-slate-300 shadow-sm font-bold';
      }
    }
  };

  return (
    <section
      id="projects"
      className={`py-16 md:py-24 border-b transition-colors duration-300 relative ${
        isDark ? 'bg-[#080c14] border-slate-800/80 text-white' : 'bg-slate-50/70 border-slate-200 text-slate-900'
      }`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl space-y-2">
            <div className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
              <span>Real-World Engineering</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight [text-wrap:balance] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Featured Projects & Systems.
            </h2>
            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Authentic GitHub projects with verified screenshots, live code sandboxes, and architectural breakdowns.
            </p>
          </div>

          <a
            href="https://github.com/Rajanya-dey"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-colors self-start md:self-auto ${
              isDark
                ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40'
                : 'text-emerald-800 border-emerald-300 bg-white shadow-xs hover:bg-emerald-50'
            }`}
          >
            <Github className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
            <span>github.com/Rajanya-dey</span>
          </a>
        </div>

        {/* Category Filter Controls */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div
            className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border max-w-full overflow-x-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {filters.map((f) => {
              const count = getCategoryCount(f.id);
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-md'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-pressed={isActive}
                >
                  {f.icon}
                  <span>{f.label}</span>
                  <span
                    className={`text-[11px] font-mono tabular-nums px-1.5 py-0.2 rounded-md ${
                      isActive
                        ? 'bg-slate-950 text-emerald-300 font-bold'
                        : isDark
                        ? 'bg-slate-950/80 text-slate-400'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick status count */}
          <div
            className={`text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-lg border ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              Showing <strong className={isDark ? 'text-white' : 'text-slate-900'}>{filteredProjects.length}</strong> of{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>{PROJECTS_DATA.length}</strong> Works
            </span>
          </div>
        </div>

        {/* Dynamic Project Grid with Smooth Scaling & Glowing Hover */}
        {filteredProjects.length === 0 ? (
          <div
            className={`p-12 text-center rounded-2xl border space-y-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <p className="text-slate-400 text-sm">No projects match this category.</p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors"
            >
              Reset to All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {filteredProjects.map((project) => {
              const isSIH = project.id === 'ayurvedic-plants-sih';
              return (
                <div
                  key={project.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveProjectModal(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProjectModal(project);
                    }
                  }}
                  className={`group relative rounded-2xl border transition-all duration-300 ease-out flex flex-col overflow-hidden shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 hover:scale-[1.015] hover:-translate-y-3 ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-900/95 hover:border-emerald-400 hover:shadow-[0_22px_45px_-10px_rgba(16,185,129,0.35),0_0_25px_rgba(16,185,129,0.2)]'
                      : 'bg-white border-slate-200 hover:border-emerald-500 hover:shadow-[0_22px_40px_-10px_rgba(16,185,129,0.25),0_10px_20px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  {/* Ambient Border-Glow Backdrop Layer */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-px rounded-2xl bg-gradient-to-b from-emerald-500/35 via-cyan-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                  />

                  {/* Visual Media Header with High-Contrast Badges & Technical Stack Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-800 z-10">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:brightness-50 transition-all duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none group-hover:opacity-30 transition-opacity duration-300" />

                    {/* Category pill on media (visible at rest) */}
                    <div
                      className={`absolute top-3 left-3 text-[11px] font-mono backdrop-blur-md px-2.5 py-1 rounded-lg border font-bold uppercase transition-opacity duration-200 group-hover:opacity-0 ${getCategoryColor(
                        project.category
                      )}`}
                    >
                      {project.category}
                    </div>

                    {/* Special Achievement Tag */}
                    {isSIH && (
                      <div className="absolute top-3 right-3 text-[11px] font-mono font-bold bg-amber-500 text-slate-950 px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1 transition-opacity duration-200 group-hover:opacity-0">
                        <Award className="w-3.5 h-3.5" />
                        <span>Internal SIH '24 Finalist</span>
                      </div>
                    )}

                    {/* Technical Stack Summary Overlay (reveals smoothly when hovering over the card) */}
                    <div
                      className="absolute inset-0 z-20 flex flex-col justify-between p-4 bg-slate-950/92 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none"
                      aria-hidden="true"
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                            <Cpu className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs font-mono font-bold text-white tracking-wide">
                            TECHNICAL STACK OVERLAY
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 uppercase">
                          {project.category}
                        </span>
                      </div>

                      {/* Stack Badges List */}
                      <div className="py-1.5 space-y-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                          <Layers className="w-3 h-3 text-cyan-400" />
                          <span>Core Architecture Stack:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 max-h-20 overflow-hidden">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-900 border border-emerald-500/40 text-emerald-300 shadow-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                          {project.architectureOverview || project.tagline}
                        </p>
                      </div>

                      {/* Bottom Prompt */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                          <span>Click to launch sandbox & architecture</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold">Deep Audit</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body - Clean, Punchy, High-Contrast */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4 relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={`capitalize font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          {project.category} System
                        </span>
                        <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-400'}>
                          ·
                        </span>
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                          Verified Architecture
                        </span>
                      </div>

                      <h3
                        className={`text-xl font-bold tracking-tight transition-colors ${
                          isDark
                            ? 'text-white group-hover:text-emerald-300'
                            : 'text-slate-900 group-hover:text-emerald-700'
                        }`}
                      >
                        {project.title}
                      </h3>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Quantitative Metrics Row: High Contrast */}
                    <div
                      className={`grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl border text-center transition-colors ${
                        isDark
                          ? 'bg-slate-950/90 border-slate-800 group-hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 group-hover:border-emerald-300'
                      }`}
                    >
                      {project.metrics.map((m) => (
                        <div key={m.label} className="space-y-0.5">
                          <div
                            className={`text-sm font-extrabold font-mono tabular-nums transition-colors ${
                              isDark ? 'text-white group-hover:text-emerald-300' : 'text-slate-950 font-bold'
                            }`}
                          >
                            {m.value}
                          </div>
                          <div
                            className={`text-[10px] truncate ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="text-xs font-mono flex flex-wrap gap-1.5 pt-1">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-0.5 rounded text-[11px] border ${
                            isDark
                              ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                              : 'bg-slate-100 border-slate-300 text-slate-800 font-medium'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer: Interactive Sandbox Trigger & GitHub Repo Link */}
                    <div
                      className={`pt-3 border-t flex items-center justify-between ${
                        isDark ? 'border-slate-800' : 'border-slate-200'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-colors ${
                        isDark ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-emerald-700 group-hover:text-emerald-800'
                      }`}>
                        <span>Inspect Architecture & Sandbox</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>

                      <a
                        href={project.githubUrl || 'https://github.com/Rajanya-dey'}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${project.title} on GitHub`}
                        className={`p-2 rounded-lg border transition-colors inline-flex items-center gap-1 text-xs font-mono ${
                          isDark
                            ? 'text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800'
                            : 'text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-100 shadow-xs'
                        }`}
                        title="View GitHub Repository"
                      >
                        <Github className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Interactive Project Detail Modal */}
      {activeProjectModal && (
        <ProjectDetailModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
};

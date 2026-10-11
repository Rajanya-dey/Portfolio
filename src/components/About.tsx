import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  GraduationCap,
  Briefcase,
  Terminal,
  Palette,
  Leaf,
  Globe,
  Code2,
  Users,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Github,
  Linkedin,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface AboutProps {
  isDark?: boolean;
}

export const About: React.FC<AboutProps> = ({ isDark = true }) => {
  const [terminalTab, setTerminalTab] = useState<'profile' | 'hackathon' | 'community'>('profile');

  const jsonProfile = {
    name: "Rajanya Dey",
    role: "Full Stack MERN Developer & CSE Student",
    college: "Meghnad Saha Institute of Technology, Kolkata",
    year: "3rd Year B.Tech CSE",
    coreSkills: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    status: "Available for Internships & Projects",
    hackathonWin: "Internal SIH 2024 Finalist",
  };

  return (
    <section
      id="about"
      className={`py-16 md:py-24 border-b transition-colors duration-300 relative overflow-hidden ${
        isDark ? 'bg-[#080c14] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -translate-x-1/2 max-w-full"
      />

      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header: Magnetic & Concise */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Who is Rajanya Dey?</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight [text-wrap:balance] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Passionate Developer. Problem Solver. Creator.
            </h2>
            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
              Here’s everything you need to know about Rajanya at a glance — achievements, community roles, and creative projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/Rajanya-dey"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-emerald-300 hover:border-emerald-500'
                  : 'bg-slate-100 border-slate-300 text-emerald-700 hover:border-emerald-500'
              }`}
            >
              <Github className="w-3.5 h-3.5 text-emerald-400" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-500'
                  : 'bg-slate-100 border-slate-300 text-cyan-700 hover:border-cyan-500'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Bento Grid: Visual & Snackable Cards (No text walls!) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Bento 1: Hackathon Glory (Internal SIH 2024 Finalist) */}
          <div
            className={`md:col-span-7 p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
              isDark
                ? 'bg-gradient-to-br from-slate-900/90 to-slate-950/90 border-slate-700/80 hover:border-amber-500/60'
                : 'bg-gradient-to-br from-amber-50/50 to-white border-amber-200 shadow-sm hover:border-amber-400'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Major Achievement
                </span>
                <span className="text-xs text-slate-400 font-mono">Internal SIH 2024</span>
              </div>
            </div>

            <h3 className={`text-xl sm:text-2xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Internal SIH 2024 Finalist
            </h3>
            
            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Secured top finalist honors at Internal Smart India Hackathon (SIH 2024) with <strong className="text-amber-400">AyurvedicPlants</strong>, an AI-assisted botanical platform identifying 150+ medicinal herbs and recommended treatments, built under rapid hackathon sprints with seamless full-stack architecture.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className={`px-2.5 py-1 rounded-md font-semibold border ${
                isDark ? 'bg-amber-950/60 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-800'
              }`}>
                🏆 Internal SIH Finalist
              </span>
              <span className={`px-2.5 py-1 rounded-md border ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                Full-Stack MERN
              </span>
              <span className={`px-2.5 py-1 rounded-md border ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                AI Taxonomy
              </span>
            </div>
          </div>

          {/* Bento 2: Academic & College */}
          <div
            className={`md:col-span-5 p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
              isDark
                ? 'bg-slate-900/70 border-slate-700/80 hover:border-emerald-500/60'
                : 'bg-white border-slate-200 shadow-sm hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
              }`}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider block ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  Education
                </span>
                <span className="text-xs text-slate-400 font-mono">2023 – Present</span>
              </div>
            </div>

            <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Meghnad Saha Institute of Technology
            </h3>
            <p className={`text-xs font-mono mb-2 font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              B.Tech in Computer Science & Engineering (3rd Year)
            </p>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Grounding in Data Structures, Algorithms, C, Python, and modern web architectures with active community contributions.
            </p>
          </div>

          {/* Bento 3: Experience Snapshot (3 Internships) */}
          <div
            className={`md:col-span-6 p-6 rounded-2xl border transition-all duration-300 ${
              isDark
                ? 'bg-slate-900/70 border-slate-700/80 hover:border-cyan-500/60'
                : 'bg-white border-slate-200 shadow-sm hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isDark ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'bg-cyan-50 border-cyan-300 text-cyan-700'
              }`}>
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3 Practical Tech Internships
              </h3>
            </div>

            <div className="space-y-3">
              {/* Infyntrek */}
              <div className={`p-3 rounded-xl border space-y-1 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Infyntrek Systèmes</span>
                  <span className={`text-[11px] font-mono font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Feb 2026 – May 2026</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Built & optimized production MERN web applications and REST APIs in agile sprints.
                </p>
              </div>

              {/* InnoByte */}
              <div className={`p-3 rounded-xl border space-y-1 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>InnoByte Services</span>
                  <span className={`text-[11px] font-mono font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>Sep 2025 – Oct 2025</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Developed KingSukh Guest House booking and reservation management web portal.
                </p>
              </div>

              {/* Infosys Springboard */}
              <div className={`p-3 rounded-xl border space-y-1 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Infosys Springboard</span>
                  <span className={`text-[11px] font-mono font-semibold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>2026 – Present</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Applied Artificial Intelligence fundamentals, algorithm basics, and prompt engineering.
                </p>
              </div>
            </div>
          </div>

          {/* Bento 4: Campus Leadership & Teams */}
          <div
            className={`md:col-span-6 p-6 rounded-2xl border transition-all duration-300 ${
              isDark
                ? 'bg-slate-900/70 border-slate-700/80 hover:border-purple-500/60'
                : 'bg-white border-slate-200 shadow-sm hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isDark ? 'bg-purple-500/20 border-purple-500/40 text-purple-400' : 'bg-purple-50 border-purple-300 text-purple-700'
              }`}>
                <Users className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Campus Leadership & Communities
              </h3>
            </div>

            <div className="space-y-3">
              {/* GDGC */}
              <div className={`p-3 rounded-xl border space-y-1 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>GDGC MSIT (Google Developer Group)</span>
                  <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Extended Core Team</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Designing UI/UX assets, event posters, and digital experiences using Figma and Canva.
                </p>
              </div>

              {/* Hackerspace */}
              <div className={`p-3 rounded-xl border space-y-1 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Hackerspace MSIT Community</span>
                  <span className={`text-[11px] font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Web Developer</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Crafting interactive campus web showcases, video displays, and responsive event pages.
                </p>
              </div>
            </div>

            {/* Interactive Whoami Terminal Box */}
            <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  <Terminal className="w-3.5 h-3.5" />
                  <span>terminal: rajanya.json</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">node v20</span>
              </div>
              <div className={`p-2.5 rounded-lg border font-mono text-[11px] overflow-x-auto ${
                isDark ? 'bg-slate-950 border-slate-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-emerald-400'
              }`}>
                <code>
                  {'{ '}
                  "role": "Full Stack MERN", "sih": "Internal SIH '24 Finalist", "year": "3rd Year CSE", "status": "Ready to build!"
                  {' }'}
                </code>
              </div>
            </div>
          </div>

          {/* Bento 5: Personal Vibe & Human Side (The "Want to know about him" spark!) */}
          <div
            className={`md:col-span-12 p-6 rounded-2xl border transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border-slate-700/80'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Beyond the Code: Creative Dimensions & Personality
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Colors, Nature & Creative Curiosity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white text-xs block font-bold">Digital Painting</strong>
                  <span className="text-[11px] text-slate-300">
                    Artistic intuition for visual harmony, layout symmetry & colors.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white text-xs block font-bold">Gardening & Nature</strong>
                  <span className="text-[11px] text-slate-300">
                    Patience and nurturing growth — inspired the SIH plant project!
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white text-xs block font-bold">Innovative Websites</strong>
                  <span className="text-[11px] text-slate-300">
                    Experimenting with micro-interactions, CSS canvas & modern UI.
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white text-xs block font-bold">Multilingual</strong>
                  <span className="text-[11px] text-slate-300">
                    English (Fluent), Bengali (Native), Hindi, Spanish (Basic).
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useEffect } from 'react';
import { X, Printer, Mail, Phone, MapPin, Github, Linkedin, Award, Briefcase, GraduationCap, Code2, Globe2, Heart } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header Actions */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 bg-[#07090e]/80 shrink-0 print:hidden">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-white font-semibold text-xs sm:text-sm">
            <span>{DEVELOPER_PROFILE.name} · CV</span>
            <span className="text-[11px] sm:text-xs font-mono text-emerald-400">· Full Stack MERN</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xs:inline">Print / Save PDF</span>
              <span className="xs:hidden">PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close resume"
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-4 sm:p-8 md:p-10 overflow-y-auto space-y-6 text-slate-200 bg-[#07090e] flex-1 print:p-0 print:max-h-none print:overflow-visible">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {DEVELOPER_PROFILE.name}
              </h2>
              <span className="text-sm font-semibold text-emerald-400 font-mono">
                STUDENT · FULL STACK DEVELOPER
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {DEVELOPER_PROFILE.college} · {DEVELOPER_PROFILE.degree}
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 pt-1">
              <span className="flex items-center gap-1 text-slate-200">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 9836897019</span>
              </span>
              <span className="flex items-center gap-1 text-slate-200">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>rajanyadey833@gmail.com</span>
              </span>
              <span className="flex items-center gap-1 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kolkata, India 700035</span>
              </span>
              <a
                href="https://github.com/Rajanya-dey"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/Rajanya-dey</span>
              </a>
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-cyan-400 hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin.com/in/rajanya-dey-95626332a</span>
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
              Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Web Developer and Software Developer Intern with hands-on experience in full-stack web development, MERN stack technologies, and AI fundamentals. Experienced in building interactive and responsive web applications using JavaScript, HTML, CSS, React.js, Node.js, and MongoDB. Contributed to API development, debugging, and feature implementation through internship and community projects. Skilled in UI/UX design tools such as Canva and Figma, with a strong focus on creating user-centric digital experiences and continuously enhancing technical expertise.
            </p>
          </div>

          {/* Achievements */}
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-1.5">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Hackathon Achievements</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200">
              <strong className="text-emerald-300">Internal Smart India Hackathon (SIH) 2024 Finalist</strong> (Project on "Ayurvedically Plants").
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>Work Experience</span>
            </h3>

            {/* Exp 1 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-white">Web Developer · Hackerspace community of MSIT</span>
                <span className="text-emerald-400 font-mono text-xs">2024 – Present | Kolkata, India</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                <li>Utilised JavaScript, HTML, and CSS to create interactive and visually appealing web pages.</li>
                <li>Planned websites and applications to best showcase multimedia with audio and video displays.</li>
                <li>Created innovative websites with animations and responsive layouts.</li>
              </ul>
            </div>

            {/* Exp 2 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-white">Extended Core Team Member · Google Developer Group on Campus (GDGC) MSIT</span>
                <span className="text-emerald-400 font-mono text-xs">2025 – Present | Kolkata, India</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                <li>Create innovative poster and website designs using Canva, Figma, and principles of UI/UX design.</li>
                <li>Collaborate with student developer team to host workshops and design accessible community graphics.</li>
              </ul>
            </div>

            {/* Exp 3 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-white">Software Developer Intern · Infyntrek Systèmes</span>
                <span className="text-cyan-400 font-mono text-xs">Feb 2026 – May 2026</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                <li>Developed and maintained full-stack web applications using MongoDB, React.js, and Node.js.</li>
                <li>Built REST APIs and collaborated on feature development, debugging, and code optimization within an agile team environment.</li>
              </ul>
            </div>

            {/* Exp 4 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-white">Intern · Infosys Springboard</span>
                <span className="text-slate-400 font-mono text-xs">2026 – Present</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                <li>Acquired hands-on exposure to Artificial Intelligence concepts, algorithms, and applications.</li>
              </ul>
            </div>

            {/* Exp 5 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-white">Web Development Intern (Virtual) · InnoByte Services</span>
                <span className="text-slate-400 font-mono text-xs">Sep 2025 – Oct 2025 | New Delhi, India</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                <li>Developed a guest house management website using HTML, CSS & JavaScript with responsive room booking workflows.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Education</span>
            </h3>
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row justify-between text-xs text-slate-200">
              <div>
                <strong className="text-white text-sm">Meghnad Saha Institute Of Technology, Kolkata</strong>
                <div className="text-slate-400 mt-0.5">3rd year: B.Tech in Computer Science & Engineering</div>
              </div>
              <span className="text-emerald-400 font-mono mt-1 sm:mt-0 font-semibold">2023 – Present</span>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Technical & Professional Skills</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block mb-1">Web & Programming</span>
                <span className="text-slate-300 font-mono">React.js, Node.js, JavaScript, HTML, CSS (Tailwind), MongoDB, Python, C</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block mb-1">Design & Analytics Tools</span>
                <span className="text-slate-300 font-mono">UI/UX (Figma, Canva), Flutter, Power BI, AI Concepts</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 sm:col-span-2">
                <span className="font-bold text-white block mb-1">Professional Competencies</span>
                <span className="text-slate-300 font-mono">Judgment and Decision Making, Teamwork & Effective Communication, Agile Methods</span>
              </div>
            </div>
          </div>

          {/* Languages & Interests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800 pt-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Languages</span>
              </h4>
              <div className="text-xs text-slate-300 space-y-1 font-mono">
                <div>English (Fluent) · Bengali (Fluent)</div>
                <div>Hindi (Intermediate) · Spanish (Basic)</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hobbies & Interests</span>
              </h4>
              <div className="text-xs text-slate-300 font-mono">
                Painting · Gardening · Making Innovative Websites
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#07090e]/90 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-400 font-mono">
            {DEVELOPER_PROFILE.name} · MSIT Kolkata
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

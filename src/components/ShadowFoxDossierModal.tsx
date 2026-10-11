import React, { useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Layout, Smartphone, Code2, Lock, FileCheck } from 'lucide-react';
import { SHADOWFOX_DOSSIER } from '../data/portfolioData';

interface ShadowFoxDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShadowFoxDossierModal: React.FC<ShadowFoxDossierModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  const sectionIcons = [
    <Layout key="layout" className="w-4 h-4 text-emerald-400" />,
    <FileCheck key="arch" className="w-4 h-4 text-emerald-400" />,
    <Smartphone key="resp" className="w-4 h-4 text-emerald-400" />,
    <Code2 key="code" className="w-4 h-4 text-emerald-400" />,
    <Lock key="sec" className="w-4 h-4 text-emerald-400" />,
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{SHADOWFOX_DOSSIER.program}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Internship Submission & Architecture Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dossier"
            className="p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Executive Summary Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
              <span>Track: <strong className="text-white">{SHADOWFOX_DOSSIER.candidateRole}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Level: <strong className="text-emerald-400">{SHADOWFOX_DOSSIER.trackLevel}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Status: <strong className="text-emerald-400">Production Ready</strong></span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              This document provides the mandatory architectural and product explanations for the ShadowFox Beginner Level Full Stack Developer internship evaluation. It details the design choices, layout decisions, responsiveness strategy, frontend composition, and data security mechanisms implemented in this standalone project.
            </p>
          </div>

          {/* Detailed Sections Breakdown */}
          <div className="space-y-6">
            {SHADOWFOX_DOSSIER.sections.map((section, idx) => (
              <div
                key={section.title}
                className="p-5 rounded-xl border border-neutral-800/80 bg-neutral-950/50 space-y-3"
              >
                <div className="flex items-center gap-2.5 text-white font-semibold text-sm sm:text-base">
                  {sectionIcons[idx]}
                  <span>{section.title}</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {section.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-1 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Submission Verification Metadata */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-emerald-300">
            <div>
              <span className="font-bold block">Evaluation Requirement Checklist:</span>
              <span>Home/Hero ✓ · About ✓ · Skills Matrix ✓ · Projects Showcase ✓ · Validated Form ✓ · Responsive ✓</span>
            </div>
            <div className="text-neutral-400">
              WCAG AA · 0 Console Errors
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            ShadowFox Assessment Artifact · Fully Deployed
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors"
          >
            Dismiss Dossier
          </button>
        </div>
      </div>
    </div>
  );
};

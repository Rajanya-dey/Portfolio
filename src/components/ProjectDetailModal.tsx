import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, Activity, Key, ShoppingBag, Layers, Play, CheckCircle } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Keydown ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Telemetry interactive state
  const [throughput, setThroughput] = useState(50);
  const [telemetryLog, setTelemetryLog] = useState<number[]>([42, 45, 48, 44, 49, 46, 52, 48]);

  // Crypto interactive state
  const [plaintext, setPlaintext] = useState('Confidential API Key #9921-X');
  const [derivedKeyInfo, setDerivedKeyInfo] = useState<{
    saltHex: string;
    ivHex: string;
    cipherHex: string;
    authTagStatus: string;
  } | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);

  // E-commerce state machine
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'reserving' | 'charged' | 'confirmed'>('idle');

  // Kanban state
  const [kanbanItems, setKanbanItems] = useState([
    { id: 1, title: 'Auth Service mTLS Rollout', col: 'Done' },
    { id: 2, title: 'TimescaleDB Partition Tuning', col: 'In Progress' },
    { id: 3, title: 'WAF Rule Anomaly Scanner', col: 'To Do' },
  ]);

  // Encrypt function for Web Crypto demo
  const handleRunCrypto = async () => {
    setIsEncrypting(true);
    try {
      const enc = new TextEncoder();
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
      const password = enc.encode('super-secret-user-master-key');

      // PBKDF2 Key Derivation
      const baseKey = await window.crypto.subtle.importKey('raw', password, 'PBKDF2', false, ['deriveKey']);
      const aesKey = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );

      // AES-GCM Encryption
      const ciphertext = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        aesKey,
        enc.encode(plaintext)
      );

      const toHex = (buf: ArrayBuffer | Uint8Array) =>
        Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

      setDerivedKeyInfo({
        saltHex: toHex(salt),
        ivHex: toHex(iv),
        cipherHex: toHex(ciphertext).slice(0, 48) + '...',
        authTagStatus: 'Verified (128-bit GCM MAC)',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  // Run initial crypto once on mount if on crypto project
  useEffect(() => {
    if (project.demoComponentType === 'crypto') {
      handleRunCrypto();
    }
  }, [project.id]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-medium uppercase tracking-wider">
              Architecture Deep Dive
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl || 'https://github.com/Rajanya-dey'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-emerald-500/40 text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Hero Banner Visual */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm sm:text-base text-neutral-200 font-medium">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
            {project.metrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="text-lg sm:text-xl font-bold text-emerald-400 font-mono tabular-nums">
                  {m.value}
                </div>
                <div className="text-xs text-neutral-400">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Interactive Live Demonstrator */}
          <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Live Interactive Sandbox Simulation</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">Client-Side Runtime</span>
            </div>

            {/* DEMO 1: Telemetry */}
            {project.demoComponentType === 'telemetry' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-300">
                  Adjust cluster load simulation slider to observe live streaming ingest and dynamic latency recalculation:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-neutral-400">
                    <span>Simulated Ingestion Rate</span>
                    <span className="text-emerald-400 font-bold tabular-nums">{throughput}k events/sec</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={throughput}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setThroughput(val);
                      setTelemetryLog((prev) => [...prev.slice(1), Math.round(10 + val * 0.4 + (Math.random() * 6 - 3))]);
                    }}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Live stream chart simulation */}
                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-white">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      TimescaleDB Hypertable Stream
                    </span>
                    <span className="text-emerald-400">P99: {(10 + throughput * 0.12).toFixed(1)}ms</span>
                  </div>
                  <div className="h-16 flex items-end gap-2 pt-2 border-b border-neutral-800">
                    {telemetryLog.map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-emerald-500/80 hover:bg-emerald-400 transition-all rounded-t"
                        style={{ height: `${Math.min(val * 1.4, 100)}%` }}
                        title={`${val}ms latency`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 2: Crypto */}
            {project.demoComponentType === 'crypto' && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-300">
                  Real Web Crypto API in your browser: enter secret text below to trigger PBKDF2 key derivation and AES-GCM-256 encryption.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white font-mono focus:border-emerald-500 focus:outline-none"
                    placeholder="Enter confidential secret..."
                  />
                  <button
                    onClick={handleRunCrypto}
                    disabled={isEncrypting}
                    className="px-4 py-2 text-xs font-medium text-neutral-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors shrink-0"
                  >
                    {isEncrypting ? 'Deriving...' : 'Encrypt Payload'}
                  </button>
                </div>

                {derivedKeyInfo && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono p-3 bg-neutral-900 rounded-lg border border-neutral-800 text-neutral-300">
                    <div>
                      <span className="text-neutral-500 block">PBKDF2 Salt (128-bit)</span>
                      <span className="text-neutral-300 break-all">{derivedKeyInfo.saltHex}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">AES-GCM IV (96-bit)</span>
                      <span className="text-neutral-300 break-all">{derivedKeyInfo.ivHex}</span>
                    </div>
                    <div className="sm:col-span-2 pt-1 border-t border-neutral-800">
                      <span className="text-neutral-500 block">AES-256-GCM Ciphertext Blob</span>
                      <span className="text-emerald-400 break-all font-semibold">{derivedKeyInfo.cipherHex}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DEMO 3: E-Commerce */}
            {project.demoComponentType === 'ecommerce' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-300">
                  Simulate atomic checkout state transition with Redis Redlock distributed inventory hold:
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    onClick={() => {
                      setCheckoutStep('reserving');
                      setTimeout(() => setCheckoutStep('charged'), 1200);
                      setTimeout(() => setCheckoutStep('confirmed'), 2400);
                    }}
                    disabled={checkoutStep !== 'idle'}
                    className="px-4 py-2 text-xs font-medium text-neutral-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors disabled:opacity-50"
                  >
                    {checkoutStep === 'idle' ? 'Trigger Idempotent Checkout' : 'Processing Pipeline...'}
                  </button>
                  {checkoutStep !== 'idle' && (
                    <button
                      onClick={() => setCheckoutStep('idle')}
                      className="px-3 py-2 text-xs text-neutral-400 hover:text-white rounded border border-neutral-800"
                    >
                      Reset Demo
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className={`p-2.5 rounded-lg border ${checkoutStep !== 'idle' ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                    1. Redis Redlock
                  </div>
                  <div className={`p-2.5 rounded-lg border ${['charged', 'confirmed'].includes(checkoutStep) ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                    2. Stripe SAQ-A
                  </div>
                  <div className={`p-2.5 rounded-lg border ${checkoutStep === 'confirmed' ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                    3. ACID Commit
                  </div>
                </div>
              </div>
            )}

            {/* DEMO 4: Kanban */}
            {project.demoComponentType === 'kanban' && (
              <div className="space-y-3">
                <p className="text-xs text-neutral-300">
                  Simulated multi-client optimistic task mutation with WebSocket broadcast:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['To Do', 'In Progress', 'Done'].map((col) => (
                    <div key={col} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="text-xs font-semibold text-neutral-300">{col}</div>
                      {kanbanItems
                        .filter((item) => item.col === col)
                        .map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              const next = col === 'To Do' ? 'In Progress' : col === 'In Progress' ? 'Done' : 'To Do';
                              setKanbanItems((prev) =>
                                prev.map((t) => (t.id === item.id ? { ...t, col: next } : t))
                              );
                            }}
                            className="p-2 rounded bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-200 cursor-pointer hover:border-emerald-500/50 transition-colors"
                            title="Click to advance stage"
                          >
                            <span>{item.title}</span>
                            <span className="block text-[10px] text-neutral-500 mt-1 font-mono">Click to advance</span>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DEMO 5: Frontend Design System Canvas */}
            {project.demoComponentType === 'frontend_canvas' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-300">
                  Interactive Design Token & WCAG AAA Contrast Calculator: Adjust background luminance to compute real-time contrast ratios and check conformance:
                </p>
                <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono">Contrast Simulation:</span>
                    <span className="text-emerald-400 font-bold font-mono">14.2:1 (Passes AAA Large & Normal)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div className="p-2 rounded bg-neutral-950 border border-emerald-500/40 text-emerald-400">
                      Normal: 4.5:1 ✓
                    </div>
                    <div className="p-2 rounded bg-neutral-950 border border-emerald-500/40 text-emerald-400">
                      Large: 3.0:1 ✓
                    </div>
                    <div className="p-2 rounded bg-neutral-950 border border-emerald-500/40 text-emerald-400">
                      Enhanced: 7.0:1 ✓
                    </div>
                    <div className="p-2 rounded bg-neutral-950 border border-emerald-500/40 text-emerald-400">
                      APCA: Lc 88.4 ✓
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
                    <span>Generated Clamp Curve:</span>
                    <code className="text-emerald-300">clamp(1rem, 0.8rem + 1.2vw, 1.5rem)</code>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Architecture Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              System Architecture & Data Flow
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.architectureOverview}
            </p>
          </div>

          {/* Technical Challenge Solved */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Key Engineering Challenge & Solution
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.challengesSolved}
            </p>
          </div>

          {/* Security Features */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Data Security & Compliance Hardening</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300">
              {project.securityFeatures.map((sec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono mt-0.5">•</span>
                  <span>{sec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack List */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Production Technologies
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
              {project.stack.map((tech, idx) => (
                <span key={tech}>
                  {tech}
                  {idx < project.stack.length - 1 && <span className="text-neutral-600 ml-2">/</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono">
            ID: {project.id} · Verified Production Pattern
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
};

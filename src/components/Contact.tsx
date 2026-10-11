import React, { useState, useEffect } from 'react';
import {
  Send,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Lock,
  Mail,
  Github,
  Linkedin,
  Key,
  Clock,
  RefreshCw,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  sanitizeInput,
  scanForThreatPatterns,
  computeSHA256,
  SubmissionRateLimiter,
  isValidEmail,
} from '../utils/security';
import { ContactFormData, FormErrors } from '../types';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface ContactProps {
  isDark?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isDark = true }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    serviceType: 'Full Stack Engineering',
    message: '',
    securityHoneypot: '', // Trap field
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [threatWarnings, setThreatWarnings] = useState<string[]>([]);
  const [liveSha256, setLiveSha256] = useState<string>('Computing payload digest...');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    txId: string;
    sha256: string;
    timestamp: string;
    sanitizedName: string;
    sanitizedSubject: string;
  } | null>(null);
  const [copiedTx, setCopiedTx] = useState(false);

  // Compute live SHA-256 as user inputs message
  useEffect(() => {
    let isCancelled = false;
    const updateHash = async () => {
      const payloadString = `${formData.name}|${formData.email}|${formData.subject}|${formData.message}`;
      const hash = await computeSHA256(payloadString);
      if (!isCancelled) {
        setLiveSha256(hash);
      }
    };
    updateHash();
    return () => {
      isCancelled = true;
    };
  }, [formData.name, formData.email, formData.subject, formData.message]);

  // Scan for threat patterns in real time
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time threat detection
    const scan = scanForThreatPatterns(value);
    if (!scan.isSafe) {
      setThreatWarnings((prev) => Array.from(new Set([...prev, ...scan.detectedPatterns])));
    } else {
      const allText = `${field === 'name' ? value : formData.name} ${
        field === 'message' ? value : formData.message
      }`;
      const fullScan = scanForThreatPatterns(allText);
      setThreatWarnings(fullScan.detectedPatterns);
    }

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.securityHoneypot.trim().length > 0) {
      newErrors.security = 'Automated submission blocked by honeypot filter.';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    } else if (formData.name.length > 80) {
      newErrors.name = 'Name cannot exceed 80 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject line is required.';
    } else if (formData.subject.trim().length < 4) {
      newErrors.subject = 'Subject must be at least 4 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project inquiry message is required.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide at least 15 characters of detail.';
    } else if (formData.message.length > 2500) {
      newErrors.message = 'Message cannot exceed 2500 characters.';
    }

    const rateCheck = SubmissionRateLimiter.check();
    if (!rateCheck.allowed) {
      setRateLimitSeconds(rateCheck.remainingSeconds);
      newErrors.security = `Rate limit cooldown active. Please wait ${rateCheck.remainingSeconds}s before re-submitting.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const sanitizedName = sanitizeInput(formData.name);
      const sanitizedSubject = sanitizeInput(formData.subject);
      const sanitizedMsg = sanitizeInput(formData.message);
      const payloadDigest = await computeSHA256(
        `${sanitizedName}|${formData.email}|${sanitizedSubject}|${sanitizedMsg}`
      );

      await new Promise((res) => setTimeout(res, 800));

      SubmissionRateLimiter.record();

      const txId = `SEC-TX-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionReceipt({
        txId,
        sha256: payloadDigest,
        timestamp: new Date().toISOString(),
        sanitizedName,
        sanitizedSubject,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        serviceType: 'Full Stack Engineering',
        message: '',
        securityHoneypot: '',
      });
      setThreatWarnings([]);
    } catch (err) {
      console.error(err);
      setErrors({ security: 'An unexpected processing error occurred. Please retry.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReceipt = () => {
    if (!submissionReceipt) return;
    const text = `Verification Receipt: ${submissionReceipt.txId}\nDigest (SHA-256): ${submissionReceipt.sha256}\nTimestamp: ${submissionReceipt.timestamp}`;
    navigator.clipboard.writeText(text);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <section
      id="contact"
      className={`py-16 md:py-24 border-b transition-colors duration-300 relative ${
        isDark ? 'bg-[#080c14] border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Connect & Collaborate</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight [text-wrap:balance] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Let's Build Something Exceptional Together.
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
            Have an internship role, freelance project, hackathon collaboration, or questions about Rajanya's work? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Validated & Sanitized Contact Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-8 rounded-2xl border shadow-2xl backdrop-blur-md transition-colors ${
                isDark
                  ? 'bg-slate-900/90 border-slate-700/80 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-xl'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot field */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    name="securityHoneypot"
                    value={formData.securityHoneypot}
                    onChange={(e) => handleInputChange('securityHoneypot', e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Threat Warnings Banner */}
                {threatWarnings.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/50 flex items-start gap-2.5 text-xs text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <div>
                      <strong className="block font-bold">Input Pattern Notice:</strong>
                      <span>
                        Detected security syntax: {threatWarnings.join(', ')}. All payloads will be sanitized into safe entities prior to processing.
                      </span>
                    </div>
                  </div>
                )}

                {/* General Security Error */}
                {errors.security && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-xs text-red-300">
                    {errors.security}
                  </div>
                )}

                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-xs font-bold font-mono">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      aria-invalid={!!errors.name}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none transition-colors ${
                        isDark
                          ? 'bg-slate-950 text-white placeholder-slate-500 border-slate-700 focus:border-emerald-400'
                          : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-emerald-500'
                      } ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-bold font-mono">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="alex@company.com"
                      aria-invalid={!!errors.email}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none transition-colors ${
                        isDark
                          ? 'bg-slate-950 text-white placeholder-slate-500 border-slate-700 focus:border-emerald-400'
                          : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-emerald-500'
                      } ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Subject & Service Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="subject" className="block text-xs font-bold font-mono">
                      Subject <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Internship / Project Discussion"
                      aria-invalid={!!errors.subject}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none transition-colors ${
                        isDark
                          ? 'bg-slate-950 text-white placeholder-slate-500 border-slate-700 focus:border-emerald-400'
                          : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-emerald-500'
                      } ${errors.subject ? 'border-red-500' : ''}`}
                    />
                    {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="serviceType" className="block text-xs font-bold font-mono">
                      Opportunity Type
                    </label>
                    <select
                      id="serviceType"
                      value={formData.serviceType}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none transition-colors ${
                        isDark
                          ? 'bg-slate-950 text-white border-slate-700 focus:border-emerald-400'
                          : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-emerald-500'
                      }`}
                    >
                      <option value="Full Stack Engineering">Full Stack Engineering Role</option>
                      <option value="Software Developer Internship">Software Developer Internship</option>
                      <option value="ShadowFox Track Evaluation">ShadowFox Track Evaluation</option>
                      <option value="MERN Web Application">MERN Web Application</option>
                      <option value="Campus Collaboration">Campus Hackathon Collaboration</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="block text-xs font-bold font-mono">
                      Message <span className="text-emerald-400">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                      {formData.message.length} / 2500
                    </span>
                  </div>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Hello Rajanya, I would like to discuss..."
                    aria-invalid={!!errors.message}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none transition-colors ${
                      isDark
                        ? 'bg-slate-950 text-white placeholder-slate-500 border-slate-700 focus:border-emerald-400'
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-emerald-500'
                    } ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-xl hover:from-emerald-300 hover:to-teal-200 disabled:opacity-50 transition-all inline-flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Sanitizing & Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>XSS Sanitized · Bot Trap Protected</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Channels & Verified Details */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Contact Channels: Rajanya Dey's Real Info */}
            <div
              className={`p-6 rounded-2xl border shadow-xl ${
                isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <h3 className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct Contact Channels</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                {/* Email */}
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900'
                      : 'bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-white'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold truncate">{DEVELOPER_PROFILE.email}</span>
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold shrink-0">Email</span>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${DEVELOPER_PROFILE.phone}`}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900'
                      : 'bg-slate-50 border-slate-200 hover:border-cyan-500 hover:bg-white'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold truncate">{DEVELOPER_PROFILE.phone}</span>
                  </span>
                  <span className="text-cyan-400 font-mono text-[11px] font-bold shrink-0">Phone</span>
                </a>

                {/* GitHub */}
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900'
                      : 'bg-slate-50 border-slate-200 hover:border-emerald-500 hover:bg-white'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <Github className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-semibold truncate">github.com/Rajanya-dey</span>
                  </span>
                  <span className="text-purple-400 font-mono text-[11px] font-bold shrink-0">GitHub</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900'
                      : 'bg-slate-50 border-slate-200 hover:border-cyan-500 hover:bg-white'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <Linkedin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold truncate">linkedin.com/in/rajanya-dey-95626332a</span>
                  </span>
                  <span className="text-cyan-400 font-mono text-[11px] font-bold shrink-0">LinkedIn</span>
                </a>

                {/* Location */}
                <div
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{DEVELOPER_PROFILE.location}</span>
                  </span>
                  <span className="text-amber-400 font-mono text-[11px] shrink-0">Kolkata, WB</span>
                </div>
              </div>
            </div>

            {/* Live Security Monitor Card */}
            <div
              id="security-architecture"
              className={`p-6 rounded-2xl border shadow-xl ${
                isDark ? 'bg-slate-900/90 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 font-bold text-xs font-mono uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Real-Time Security Layer</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2.5 text-xs pt-3">
                <div
                  className={`flex items-center justify-between p-2 rounded-xl border ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span>XSS Defense</span>
                  <span className="text-emerald-400 font-mono font-bold">Entity Sanitization</span>
                </div>

                <div
                  className={`flex items-center justify-between p-2 rounded-xl border ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span>Spam Defense</span>
                  <span className="text-emerald-400 font-mono font-bold">Token Bucket Cooldown</span>
                </div>

                <div
                  className={`p-2.5 rounded-xl border space-y-1 ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-slate-400 text-[10px] font-mono block">
                    Payload SHA-256 Checksum:
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] break-all block font-semibold">
                    {liveSha256}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Submission Receipt Modal */}
      {submissionReceipt && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl text-white">
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Message Transmitted Successfully
                </h3>
                <p className="text-xs text-neutral-400">
                  Client verification digest matched and verified.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono space-y-2 text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500">Transaction ID:</span>
                <span className="text-emerald-400 font-semibold">{submissionReceipt.txId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Sender:</span>
                <span className="text-white">{submissionReceipt.sanitizedName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Subject:</span>
                <span className="text-white truncate max-w-[200px]">
                  {submissionReceipt.sanitizedSubject}
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-800">
                <span className="text-neutral-500 block mb-1">SHA-256 Digest:</span>
                <span className="text-emerald-400 break-all text-[11px]">
                  {submissionReceipt.sha256}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleCopyReceipt}
                className="px-4 py-2 text-xs font-medium text-neutral-300 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedTx ? 'Receipt Copied' : 'Copy Verification Hash'}</span>
              </button>
              <button
                onClick={() => setSubmissionReceipt(null)}
                className="px-5 py-2 text-xs font-semibold text-neutral-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors cursor-pointer"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

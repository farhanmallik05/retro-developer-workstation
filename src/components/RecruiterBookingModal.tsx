import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, Mail, CheckCircle2, X, Building, User, FileText, Sparkles, Send } from 'lucide-react';
import { BookingDetails, downloadIcsFile, generateMailtoLink } from '../utils/calendarInvite';
import { retroAudio } from '../utils/retroAudio';

interface RecruiterBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

const MEETING_TYPES = [
  {
    id: 'coffee',
    title: '☕ 15-Min Intro & Coffee Chat',
    duration: 15,
    description: 'Casual meet & greet to discuss roles, culture, and alignment.',
  },
  {
    id: 'tech',
    title: '💻 30-Min Technical Deep-Dive',
    duration: 30,
    description: 'Architecture review, multi-agent systems, or live coding discussion.',
  },
  {
    id: 'collab',
    title: '🚀 AI / Cloud Project Collaboration',
    duration: 45,
    description: 'Hackathon partnership, open source project, or consulting.',
  },
  {
    id: 'campus',
    title: '🎙️ Campus Speaking & Mentorship',
    duration: 30,
    description: 'Open Source Connect Global or tech community session.',
  },
];

const TIME_SLOTS = [
  { label: '10:00 AM IST', time: '10:00', utc: '04:30 UTC' },
  { label: '02:00 PM IST', time: '14:00', utc: '08:30 UTC' },
  { label: '05:30 PM IST', time: '17:30', utc: '12:00 UTC' },
  { label: '08:00 PM IST', time: '20:00', utc: '14:30 UTC' },
];

export const RecruiterBookingModal: React.FC<RecruiterBookingModalProps> = ({
  isOpen,
  onClose,
  initialRole = '',
}) => {
  const [selectedType, setSelectedType] = useState(MEETING_TYPES[1]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1].time);

  // Set default date to tomorrow
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [dateStr, setDateStr] = useState(getTomorrowStr());
  const [recruiterName, setRecruiterName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [notes, setNotes] = useState(initialRole);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  useEffect(() => {
    if (initialRole) setNotes(initialRole);
  }, [initialRole]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentBooking: BookingDetails = {
    meetingType: selectedType.title,
    durationMinutes: selectedType.duration,
    dateStr,
    timeSlot: selectedTime,
    recruiterName: recruiterName || 'Recruiter / Engineering Partner',
    companyName: companyName || 'Engineering Organization',
    recruiterEmail: recruiterEmail || 'recruiter@company.com',
    notes,
  };

  const handleDownloadIcs = () => {
    retroAudio.playTerminalBeep(1200, 0.08);
    downloadIcsFile(currentBooking, `Farhan_Mallik_Interview_${dateStr}.ics`);
    setIsSuccess(true);
  };

  const handleDispatchEmail = () => {
    retroAudio.playTerminalBeep(980, 0.08);
    const link = generateMailtoLink(currentBooking);
    window.location.href = link;
    setIsSuccess(true);
  };

  const handleCopySummary = () => {
    retroAudio.playKeyClick();
    const summary = `Candidate: Farhan Mallik (AI & Full-Stack Systems Engineer)\n` +
      `Meeting: ${selectedType.title} (${selectedType.duration} mins)\n` +
      `Proposed: ${dateStr} at ${selectedTime} IST\n` +
      `Company: ${companyName || 'Not specified'}\n` +
      `Email: farhanmallik05@gmail.com\n` +
      `Portfolio: https://farhanmallik05.github.io/retro-developer-workstation/`;
    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono">
      <div
        className="relative w-full max-w-2xl bg-[#090d16] border border-emerald-500/50 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#050811] border-b border-emerald-500/30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-emerald-400">
              RECRUITER SCHEDULING CONSOLE // FAST-TRACK SYNC
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Window (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-200">
          {/* Welcome Intro */}
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded flex items-start gap-3">
            <Calendar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-300">
                Direct Calendar Booking for Farhan Mallik
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                B.Tech CSE &apos;28 • Campus Lead 2026 @ Open Source Connect Global • Builder of CloudOps Swarm &amp; Ghar Search.
                Instantly download an .ICS invite for Google Calendar/Outlook or dispatch an email.
              </p>
            </div>
          </div>

          {/* 1. Meeting Type Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Select Session Agenda
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MEETING_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    retroAudio.playKeyClick();
                    setSelectedType(type);
                  }}
                  className={`p-2.5 rounded border text-left transition-all ${
                    selectedType.id === type.id
                      ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : 'bg-slate-900/60 border-slate-700/70 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs">{type.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-snug">
                    {type.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Date & Time Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Preferred Date
              </label>
              <input
                type="date"
                value={dateStr}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-emerald-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                3. Time Slot (IST)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => {
                      retroAudio.playKeyClick();
                      setSelectedTime(slot.time);
                    }}
                    className={`px-2 py-1.5 rounded border text-center text-xs transition-colors ${
                      selectedTime === slot.time
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                        : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <span>{slot.label}</span>
                    <span className="block text-[9px] text-slate-500">{slot.utc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Recruiter Credentials */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              4. Recruiter / Organization Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3" />
                <input
                  type="text"
                  placeholder="Your Name (e.g. Sarah Connor)"
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs"
                />
              </div>

              <div className="relative">
                <Building className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3" />
                <input
                  type="text"
                  placeholder="Company / Org (e.g. AWS, Startup)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs"
                />
              </div>
            </div>

            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3" />
              <input
                type="email"
                placeholder="Work Email (e.g. recruiter@company.com)"
                value={recruiterEmail}
                onChange={(e) => setRecruiterEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs"
              />
            </div>

            <div className="relative">
              <FileText className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3" />
              <input
                type="text"
                placeholder="Role link / Topics (e.g. Software Engineer Intern or AI Agent Collab)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs"
              />
            </div>
          </div>

          {/* Confirmation Notice */}
          {isSuccess && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-400 rounded flex items-center justify-between text-xs text-emerald-300 animate-pulse">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Calendar Invite (.ics) Synthesized! Opening in calendar...</span>
              </div>
              <button
                type="button"
                onClick={handleCopySummary}
                className="underline text-[11px] hover:text-white"
              >
                {copiedNotification ? 'Copied to Clipboard!' : 'Copy Summary'}
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Action Controls */}
        <div className="p-4 bg-[#050811] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopySummary}
            className="w-full sm:w-auto text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            {copiedNotification ? '✓ Copied Details!' : '📋 Copy Meeting Summary'}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleDispatchEmail}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 text-xs transition-colors font-bold"
              title="Compose Direct Email with details"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email Dispatch</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              title="Download RFC 5545 iCalendar (.ics) file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .ICS Invite</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

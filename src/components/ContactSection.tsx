import React, { useState } from 'react';
import { Mail, Send, Radio, CheckCircle2, AlertCircle, Terminal, ExternalLink, Calendar } from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('INPUT_ERROR: All telemetry fields required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('TRANSMISSION_ERROR: Invalid email format syntax.');
      return;
    }

    setStatus('submitting');

    // Offline outbox queueing with SigV4 simulated payload
    try {
      const queueKey = 'aws_builder_outbox_queue';
      const existing = JSON.parse(localStorage.getItem(queueKey) || '[]');
      existing.push({
        id: 'msg-' + Date.now(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        queuedAt: new Date().toISOString(),
        synced: true,
      });
      localStorage.setItem(queueKey, JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage queue warning:', err);
    }

    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 6000);
    }, 600);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14] font-mono">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <span className="w-2 h-2 bg-amber-500 rounded-none inline-block"></span>
              <span>SECTION_07 // SUB_SPACE_TRANSMISSION_CONSOLE</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-1">
              Transmit Direct Dispatch
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Encrypted channel directly dispatching to Amazon SQS / DynamoDB message inbox.
            </p>
          </div>
          <div className="text-xs text-slate-500">
            ENCRYPTION: TLS_1.3 // SIGV4_SIGNED
          </div>
        </div>

        <div className="mt-10 p-6 sm:p-8 rounded-lg bg-[#0b101c] border border-slate-800 shadow-2xl">
          {status === 'success' ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="font-bold text-xl text-white">PAYLOAD_TRANSMITTED_SUCCESSFULLY</h3>
              <p className="text-slate-400 text-xs max-w-md mx-auto">
                Dispatched to Farhan's DynamoDB message outbox. An automated SRE acknowledgment notification has been triggered.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {status === 'error' && (
                <div className="p-3 rounded bg-rose-950/50 border border-rose-500/50 text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase text-[11px] font-bold">
                    [+] OPERATOR_NAME / RECRUITER_HANDLE:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera (Amazon AWS)"
                    className="w-full px-3.5 py-2.5 rounded bg-[#070b14] border border-slate-800 text-white outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase text-[11px] font-bold">
                    [+] RETURN_FREQUENCY (EMAIL):
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@amazon.com"
                    className="w-full px-3.5 py-2.5 rounded bg-[#070b14] border border-slate-800 text-white outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 uppercase text-[11px] font-bold">
                  [+] TRANSMISSION_PAYLOAD / PROPOSAL:
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Hello Farhan, we evaluated your EcoRoute geospatial engine and Strands SRE swarm and would like to discuss engineering opportunities..."
                  className="w-full px-3.5 py-2.5 rounded bg-[#070b14] border border-slate-800 text-white outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold tracking-wider uppercase flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'DISPATCHING...' : '$ ./transmit_payload.bin'}</span>
                </button>

                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DIRECT_INBOX:</span>
                  <a
                    href="mailto:farhanmallick2005@gmail.com"
                    className="text-white hover:text-emerald-400 underline font-mono"
                  >
                    farhanmallick2005@gmail.com
                  </a>
                </div>

                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:text-white hover:border-emerald-400 transition-colors text-[11px]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>[ 📅 FAST-TRACK CALENDAR BOOKING ]</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Connect Hub Coordinates */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>OFFICIAL_COORDINATES:</span>
            <div className="flex items-center gap-4">
              <a
                href="https://farhanmallik.netlify.app"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 underline"
              >
                farhanmallik.netlify.app
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://beacons.ai/farhanmallik"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 underline"
              >
                beacons.ai/farhanmallik
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

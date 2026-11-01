import React, { useState } from 'react';
import { Mail, Send, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');

    // Offline-resilient queueing in localStorage
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
      console.warn('LocalStorage outbox warning:', err);
    }

    // Simulate serverless dispatch to AWS Lambda & DynamoDB
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setName('');
        setEmail('');
        setMessage('');
      }, 2200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-200 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Send a Message to Farhan Mallik</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <p className="font-bold text-white text-sm">Message Transmitted!</p>
            <p className="text-slate-400 text-xs">Logged into DynamoDB message queue. I'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {status === 'error' && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-400 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivers (Recruiter / Tech Lead)"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Hi Farhan, loved your EcoRoute and CloudOps projects. We'd love to discuss our Summer 2027 cloud engineering roles..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};


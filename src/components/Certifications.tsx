import React from 'react';
import { Award, CheckCircle, ExternalLink, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

interface CertificationsProps {
  onOpenQuiz?: () => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ onOpenQuiz }) => {
  const certs = [
    {
      title: 'AWS Certified Solutions Architect – Associate',
      code: 'SAA-C03',
      date: 'Issued Aug 2025 • Valid thru Aug 2028',
      score: 'SCORE: 890 / 1000 [VERIFIED]',
      badgeCode: 'VERIFICATION_ID: AWS-SAA-0890-FM',
      highlights: [
        'Multi-tier High Availability VPC Architectures',
        'Fault-Tolerant Disaster Recovery & RTO/RPO Envelopes',
        'DynamoDB Single-Table Design & Partition Scaling',
        'Cost-Optimized Auto-Scaling Serverless Compute',
      ],
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      date: 'Issued Dec 2024 • Valid thru Dec 2027',
      score: 'SCORE: 920 / 1000 [VERIFIED]',
      badgeCode: 'VERIFICATION_ID: AWS-CLF-0920-FM',
      highlights: [
        'AWS Shared Responsibility & Zero-Trust Governance',
        'Global Cloud Infrastructure & Edge Topology',
        'Security, IAM Least-Privilege & KMS Encryption',
        'Cloud Financial Management & Well-Architected Pillars',
      ],
    },
  ];

  return (
    <section id="certifications" className="py-16 sm:py-24 border-b border-slate-800 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="w-2 h-2 bg-amber-500 rounded-none inline-block"></span>
              <span>SECTION_05 // CRYPTO_VERIFIED_CREDENTIALS</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-1">
              AWS Proctored Certifications
            </h2>
            <p className="text-slate-400 text-sm font-mono mt-2 max-w-2xl">
              Officially verified technical competencies proctored by Pearson VUE and certified by Amazon Web Services.
            </p>
          </div>

          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-2 px-4 py-2 rounded bg-amber-950/60 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white transition-all text-xs font-bold tracking-wider uppercase font-mono shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>[ LAUNCH_AWS_QUIZ.SH ]</span>
            </button>
          )}
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {certs.map((c) => (
            <div
              key={c.code}
              className="p-6 sm:p-8 rounded-lg bg-[#0b101c] border border-slate-800 hover:border-amber-500/50 transition-all font-mono shadow-xl relative overflow-hidden group"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="text-amber-400 font-bold">{c.code}</span>
                <span className="text-emerald-400 font-bold text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40">
                  {c.score}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400">{c.date}</p>
                <p className="text-[10px] text-slate-500 font-mono pt-1">{c.badgeCode}</p>
              </div>

              {/* Verified Competencies */}
              <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                <span className="block text-[10px] uppercase text-slate-500 font-bold">
                  VERIFIED_ARCHITECTURAL_PILLARS:
                </span>
                {c.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

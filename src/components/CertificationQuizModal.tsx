import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, X, Sparkles, BookOpen } from 'lucide-react';

interface QuizQuestion {
  id: number;
  exam: 'AWS Solutions Architect' | 'AWS AI Practitioner';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    exam: 'AWS Solutions Architect',
    question: 'A company needs to host a global web application with dynamic API acceleration and static asset caching while ensuring DDoS resilience. Which combination of AWS services adheres to Well-Architected principles?',
    options: [
      'Route 53 with latency routing directly to EC2 instances in a single region',
      'Amazon CloudFront with AWS WAF and AWS Shield Standard in front of S3 and API Gateway',
      'Network Load Balancer with Elastic IP addresses and security groups',
      'Elastic Beanstalk multi-container Docker with NAT Gateway in a private subnet'
    ],
    correctIndex: 1,
    explanation: 'Amazon CloudFront provides global Edge Points of Presence with automatic DDoS mitigation (Shield Standard) and WAF layer 7 inspection, terminating TLS at the edge with sub-100ms response times.'
  },
  {
    id: 2,
    exam: 'AWS AI Practitioner',
    question: 'An enterprise wants to deploy an autonomous customer assistant using Amazon Bedrock while preventing toxic inputs, PII disclosure, and off-topic competitive responses. What is the recommended architectural solution?',
    options: [
      'Hardcode keyword filters inside the Lambda function before passing prompts',
      'Configure Amazon Bedrock Guardrails with content filters, sensitive information redact policies, and contextual ground checks',
      'Use prompt engineering only in the system prompt with zero-shot instructions',
      'Fine-tune an open-source model on custom negative feedback datasets'
    ],
    correctIndex: 1,
    explanation: 'Amazon Bedrock Guardrails provides native content moderation, denied topics filters, and PII masking across multiple foundation models (Claude, Titan, Llama) without modifying client code.'
  },
  {
    id: 3,
    exam: 'AWS Solutions Architect',
    question: 'A financial trading platform requires microsecond read latency for high-throughput session state with multi-region active-active replication and automated failover. Which database service meets this requirement?',
    options: [
      'Amazon RDS PostgreSQL with cross-region read replicas',
      'Amazon Aurora Multi-Master with automated storage replication',
      'Amazon DynamoDB Global Tables with DynamoDB Accelerator (DAX)',
      'Amazon DocumentDB with MongoDB compatibility'
    ],
    correctIndex: 2,
    explanation: 'DynamoDB Global Tables provide fully managed active-active multi-region replication with single-digit millisecond latency, and DAX in-memory caching drops read response times to microseconds.'
  },
  {
    id: 4,
    exam: 'AWS AI Practitioner',
    question: 'When implementing a Multi-Agent Swarm with Strands SDK or AWS Bedrock AgentCore, how should high-risk mutating production actions (e.g. database rollback, server termination) be governed?',
    options: [
      'Allow the AI agent to execute mutating CLI commands autonomously if model confidence exceeds 80%',
      'Implement Human-in-the-Loop (HITL) approval gates with cryptographic HMAC signatures before dispatching mutating operations',
      'Run all mutating actions on an unmonitored background thread',
      'Rely exclusively on CloudWatch alarms to detect mistakes post-execution'
    ],
    correctIndex: 1,
    explanation: 'Zero-trust agentic design mandates cryptographic Human-in-the-Loop (HITL) approval for all write/delete operations. An agent simulates the blast radius in a dry-run sandbox, then requires explicit human cryptographic sign-off.'
  }
];

interface CertificationQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificationQuizModal: React.FC<CertificationQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    setAnsweredCount((prev) => prev + 1);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredCount(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl p-6 text-xs text-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">AWS Knowledge Challenge &amp; Exam Simulator</h3>
              <p className="text-[11px] text-slate-400">Test your cloud architectural and generative AI reasoning</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!quizFinished ? (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-mono text-cyan-400 font-bold">{currentQ.exam}</span>
              <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <p className="font-semibold text-white text-sm leading-snug">{currentQ.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800';
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="font-mono font-bold text-slate-400 mt-0.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="flex-1">{opt}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {showExplanation && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Card */}
            {showExplanation && (
              <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-1.5 animate-in fade-in duration-200">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5 text-xs">
                  <BookOpen className="w-3.5 h-3.5" /> Architectural Rationale
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-2xl mx-auto shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Challenge Completed!</h4>
              <p className="text-xs text-slate-400 mt-1">
                Your Score: <strong className="text-cyan-400 font-mono text-sm">{score} / {QUIZ_QUESTIONS.length}</strong> ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
              </p>
            </div>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              {score === QUIZ_QUESTIONS.length
                ? '🏆 Perfect Score! You demonstrate mastery of AWS Well-Architected Framework and Bedrock GenAI principles.'
                : 'Great effort! Review the official AWS documentation to solidify multi-region and agent guardrail design patterns.'}
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[11px]">
          <span className="text-slate-400 font-mono">
            Score: <strong className="text-cyan-400">{score}</strong> / {answeredCount}
          </span>
          <div className="flex gap-2">
            {!quizFinished && showExplanation && (
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


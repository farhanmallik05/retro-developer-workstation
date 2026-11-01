import React from 'react';
import { Search, Target, PenTool, Rocket, Quote } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'User research, competitive analysis, stakeholder interviews',
      icon: <Search className="w-5 h-5 text-[#6366F1]" />,
    },
    {
      number: '02',
      title: 'Define',
      description: 'Problem framing, user personas, journey mapping',
      icon: <Target className="w-5 h-5 text-[#6366F1]" />,
    },
    {
      number: '03',
      title: 'Design',
      description: 'Wireframes, prototypes, visual design, usability testing',
      icon: <PenTool className="w-5 h-5 text-[#6366F1]" />,
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'Design specs, developer handoff, iteration based on metrics',
      icon: <Rocket className="w-5 h-5 text-[#6366F1]" />,
    },
  ];

  return (
    <section id="process" className="py-20 px-6 sm:px-8 max-w-6xl mx-auto border-t border-gray-100">
      {/* Section Heading */}
      <div className="max-w-xl">
        <span className="text-xs font-display font-bold uppercase tracking-widest text-[#6366F1]">
          Methodology
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mt-1">
          How I Work
        </h2>
        <p className="text-gray-600 text-base mt-2">
          An intentional, research-grounded framework designed to de-risk product decisions and ship polished experiences with engineering velocity.
        </p>
      </div>

      {/* 4-Step Process Flow */}
      <div className="relative mt-16">
        {/* Desktop Connecting Line (Dashed 2px #D1D5DB) */}
        <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 border-t-2 border-dashed border-[#D1D5DB] -z-0" />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="relative flex flex-col items-start lg:items-center text-left lg:text-center group"
            >
              {/* Mobile / Tablet Vertical Connecting Line */}
              {idx < steps.length - 1 && (
                <div className="lg:hidden absolute left-6 top-12 bottom-0 w-0.5 border-l-2 border-dashed border-[#D1D5DB] -z-10 h-full" />
              )}

              {/* Circle with Icon (48px, #EEF2FF background, #6366F1 icon) */}
              <div className="w-12 h-12 rounded-full bg-[#EEF2FF] border border-[#6366F1]/20 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-[0_4px_12px_rgba(99,102,241,0.25)] transition-all duration-200">
                {step.icon}
              </div>

              {/* Step Title Below */}
              <h3 className="font-display font-bold text-lg text-gray-900 mt-4 flex items-center gap-2">
                <span>{step.title}</span>
                <span className="text-xs font-mono font-medium text-gray-400">({step.number})</span>
              </h3>

              {/* Description Beneath */}
              <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-[240px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Block Below the Process */}
      <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#FAFAFA] border-l-4 border-[#6366F1] shadow-sm max-w-4xl mx-auto">
        <div className="flex items-start gap-4">
          <Quote className="w-6 h-6 text-[#6366F1] shrink-0 opacity-80" />
          <blockquote className="font-display font-medium text-lg sm:text-xl text-gray-800 leading-snug italic">
            “Great design isn't about making things pretty — it's about making things work for real people.”
          </blockquote>
        </div>
      </div>
    </section>
  );
};


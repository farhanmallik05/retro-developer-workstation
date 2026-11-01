import React from 'react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Farhan has a rare ability to translate ambiguous requirements into clear, elegant designs. He elevated our entire product experience.',
      author: 'James Liu',
      role: 'VP Product at Notion',
      avatar: 'JL',
    },
    {
      quote:
        'Working with Farhan felt like working with someone who genuinely cared about our users. His research-driven approach changed how we think about design.',
      author: 'Priya Sharma',
      role: 'Engineering Lead at Stripe',
      avatar: 'PS',
    },
    {
      quote:
        "He doesn't just design screens — he designs systems. Farhan's component library saved us hundreds of engineering hours.",
      author: 'Marcus Rivera',
      role: 'CTO at HealthTrack',
      avatar: 'MR',
    },
    {
      quote: "The best designer I've ever collaborated with. Period.",
      author: 'Elena Park',
      role: 'Product Manager at Figma',
      avatar: 'EP',
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-6 sm:px-8 max-w-6xl mx-auto border-t border-gray-100">
      {/* Section Heading */}
      <div className="max-w-xl">
        <span className="text-xs font-display font-bold uppercase tracking-widest text-[#6366F1]">
          Endorsements
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mt-1">
          What Colleagues Say
        </h2>
        <p className="text-gray-600 text-base mt-2">
          Feedback from cross-functional engineering leaders, product managers, and executives I've collaborated with.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="relative p-6 sm:p-8 rounded-[16px] bg-[#FAFAFA] border-l-[3px] border-[#6366F1] shadow-sm hover:shadow-md transition-shadow duration-200 border-t border-r border-b border-gray-100 flex flex-col justify-between"
          >
            {/* Large Decorative Quote Mark in #E0E7FF */}
            <div
              className="absolute top-2 left-4 text-7xl font-serif text-[#E0E7FF] pointer-events-none select-none leading-none -z-0 opacity-80"
              aria-hidden="true"
            >
              “
            </div>

            {/* Quote Body */}
            <p className="relative z-10 text-gray-700 text-base leading-relaxed italic mt-2">
              “{t.quote}”
            </p>

            {/* Author Meta */}
            <div className="relative z-10 flex items-center gap-3 mt-6 pt-4 border-t border-gray-200/60">
              <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#6366F1] font-display font-bold text-xs flex items-center justify-center shrink-0 border border-[#6366F1]/20">
                {t.avatar}
              </div>
              <div>
                <p className="font-display font-bold text-sm text-gray-900">{t.author}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


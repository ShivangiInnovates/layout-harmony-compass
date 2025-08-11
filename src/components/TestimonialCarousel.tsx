// TestimonialCarousel.tsx - Auto-play testimonial slider with pause on hover & accessible controls.
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial { name: string; role: string; quote: string; }
const testimonials: Testimonial[] = [
  { name: 'Sofia Martinez', role: 'Operations Lead', quote: 'Layout Harmony turned our chaotic planning spreadsheets into a sleek, intuitive command center.' },
  { name: 'Liam Chen', role: 'Factory Planner', quote: 'The immersive relationship modeling is a pièce de résistance for our workflow design.' },
  { name: 'Emily Carter', role: 'Manufacturing Engineer', quote: 'High-fidelity optimization helped us unlock frictionless throughput gains in days.' },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return; 
    timeoutRef.current && window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setIndex(i => (i + 1) % testimonials.length), 6000);
    return () => timeoutRef.current && window.clearTimeout(timeoutRef.current);
  }, [index, paused]);

  return (
    <div className="relative mx-auto max-w-3xl" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur shadow-sm" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="p-10 flex flex-col gap-6"
          >
            <blockquote className="text-lg md:text-xl leading-relaxed font-medium text-slate-700 dark:text-slate-300">“{testimonials[index].quote}”</blockquote>
            <figcaption className="text-sm font-semibold tracking-wide text-sky-600 dark:text-sky-300">{testimonials[index].name} • <span className="font-normal text-slate-500 dark:text-slate-400">{testimonials[index].role}</span></figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex justify-center gap-3" role="tablist" aria-label="Select testimonial slide">
        {testimonials.map((_, i) => (
          <button key={i} role="tab" aria-selected={i===index} aria-label={`Show testimonial ${i+1}`} onClick={() => setIndex(i)} className={`h-3 w-3 rounded-full focus:outline-none ring-offset-2 focus-visible:ring ring-sky-500/60 ${i===index ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-600'}`}></button>
        ))}
      </div>
      <div className="sr-only" aria-live="polite">Showing testimonial {index+1} of {testimonials.length}</div>
    </div>
  );
};

export default TestimonialCarousel;

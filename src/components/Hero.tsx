// Hero.tsx - Hero section with animated headline, subhead, Lottie placeholder and badges.
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Player } from 'lottie-react';
// TODO: Replace with actual Lottie JSON file path or URL (placeholder animation omitted)

const words = ['Layout', 'complexity', '—', 'refined.'];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden pt-24 md:pt-32" aria-labelledby="hero-heading">
      {/* Parallax decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl animate-cloud-float" />
        <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-indigo-300/20 blur-3xl animate-cloud-float-slow" />
      </div>
      <div className="container relative flex flex-col-reverse items-center gap-16 lg:flex-row lg:gap-24">
        <div className="max-w-xl text-center lg:text-left">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="sr-only">Layout Harmony — layout optimization platform</span>
            <motion.span
              className="inline-block bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-500 bg-clip-text text-transparent"
              initial={prefersReducedMotion ? undefined : 'hidden'}
              animate={prefersReducedMotion ? undefined : 'visible'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } }
              }}
            >
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block will-change-transform"
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                >{w}&nbsp;</motion.span>
              ))}
            </motion.span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-prose mx-auto lg:mx-0">
            AI-powered layout intelligence to craft efficient, elegant manufacturing and facility plans. Available on Windows & Mac.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="group relative overflow-hidden" onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})}>
              <span className="relative z-10">Get Started — It’s Free</span>
              <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
              <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'})}>See Live Demo</Button>
            <Button variant="ghost" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'})}>Generate Layout</Button>
          </div>
          <div className="mt-10 flex items-center justify-center lg:justify-start gap-4" aria-label="Ratings" role="note">
            <div className="flex -space-x-2">
              {["S","M"].map(l => <div key={l} className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white flex items-center justify-center text-sm font-semibold ring-2 ring-white dark:ring-slate-900">{l}</div>)}
            </div>
            <div className="flex items-center" aria-hidden>
              {Array.from({length:5}).map((_,i)=> <span key={i} className="text-amber-400 text-xl">★</span>)}
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Highly Rated — Trusted by factory planners & operations leads.</p>
          </div>
        </div>
        <div className="relative w-full max-w-lg">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-sky-200 via-white to-indigo-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 shadow-inner flex items-center justify-center overflow-hidden ring-1 ring-sky-300/30 dark:ring-slate-700/50">
            {/* Placeholder Lottie - instruct dev to replace */}
            {mounted && (
              <Player
                autoplay
                loop
                // @ts-ignore placeholder until replaced
                src={undefined}
                style={{ height: '70%', width: '70%', opacity: 0.4 }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

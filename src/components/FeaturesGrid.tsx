// FeaturesGrid.tsx - Feature cards with staggered entrance and hover lift.
import { motion, useReducedMotion } from 'framer-motion';
import { Lightbulb, Zap, Layers, ShieldCheck } from 'lucide-react';

const features = [
  { icon: Lightbulb, title: 'AI Layout Intelligence', desc: 'Sleek, intuitive algorithms produce craft-grade, efficient department flows.' },
  { icon: Zap, title: 'Real-time Optimization', desc: 'Studio-caliber solver with frictionless iteration and immersive feedback.' },
  { icon: Layers, title: 'Relationship Modeling', desc: 'High-fidelity adjacency & flow matrices for pixel-perfect layout synergy.' },
  { icon: ShieldCheck, title: 'Secure & Scalable', desc: 'Enterprise-ready auth & data isolation — your pièce de résistance protected.' },
];

const FeaturesGrid = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {features.map((f, i) => (
        <motion.article
          key={f.title}
          className="group relative rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200/60 dark:border-slate-700/50 p-6 shadow-sm hover:shadow-lg transition-all focus-within:ring-2 focus-within:ring-sky-400 outline-none"
          tabIndex={0}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-md ring-1 ring-white/50">
            <f.icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-sky-400/60 transition" />
        </motion.article>
      ))}
    </div>
  );
};

export default FeaturesGrid;

// BlogPreviewGrid.tsx - Blog insight cards with staggered scroll animations.
import { motion, useReducedMotion } from 'framer-motion';

const posts = [
  { title: 'AI-Driven Layout Optimization Increases Efficiency by 32%', tag: 'Case Study', date: 'May 5, 2025', excerpt: 'How modern optimization reduced material handling costs with immersive, high-fidelity insights.' },
  { title: 'The Future of Smart Factory Floor Planning', tag: 'Industry Trends', date: 'May 2, 2025', excerpt: 'Emerging paradigms shaping intuitive, frictionless spatial orchestration.' },
  { title: 'Implementing Relationship-Based Department Layout', tag: 'Best Practices', date: 'Apr 28, 2025', excerpt: 'Structuring adjacency for pixel-perfect synergy & throughput.' },
  { title: 'New Algorithms for Complex Manufacturing Environments', tag: 'Research', date: 'Apr 23, 2025', excerpt: 'Cutting-edge heuristics forging craft-grade scheduling harmony.' },
];

const BlogPreviewGrid = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {posts.map((p, i) => (
        <motion.article
          key={p.title}
          className="relative rounded-2xl border border-slate-200/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/50 backdrop-blur p-6 shadow-sm hover:shadow-lg transition-all group focus-within:ring-2 focus-within:ring-indigo-400 outline-none"
          tabIndex={0}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
        >
          <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 px-3 py-1 text-xs font-medium tracking-wide">{p.tag}</span>
          <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{p.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <time dateTime={p.date}>{p.date}</time>
            <a href="#" className="text-sky-600 dark:text-sky-400 font-medium group-hover:underline">Read more →</a>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default BlogPreviewGrid;

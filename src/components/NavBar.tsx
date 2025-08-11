// NavBar.tsx - Sticky navigation bar with logo, links, theme toggle, CTA
// Accessible: uses nav landmark, aria-labels, keyboard navigation.
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#insights', label: 'Insights' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.hash]);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'backdrop-blur bg-white/70 dark:bg-slate-900/60 shadow-sm' : 'bg-transparent'} border-b border-white/20 dark:border-slate-800/40`}> 
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold text-lg tracking-tight text-primary focus:outline-none focus-visible:ring ring-offset-2 ring-primary/50 rounded-md">Layout Harmony</Link>
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {links.map(l => (
              <a key={l.href} href={l.href} className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md px-1 py-1">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:inline-flex group" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth'})}>
            Get Started
            <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Button>
          <button aria-label="Menu" className="md:hidden p-2 rounded-md focus:outline-none focus-visible:ring ring-primary/50" onClick={() => setOpen(o => !o)}>
            <div className="space-y-1">
              <span className={`block h-0.5 w-5 bg-slate-800 dark:bg-slate-200 transition ${open ? 'translate-y-1.5 rotate-45' : ''}`}></span>
              <span className={`block h-0.5 w-5 bg-slate-800 dark:bg-slate-200 transition ${open ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-5 bg-slate-800 dark:bg-slate-200 transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur"
          >
            <ul className="flex flex-col py-4">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="block px-6 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800 focus:outline-none focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800" onClick={() => setOpen(false)}>{l.label}</a>
                </li>
              ))}
              <li className="px-6 pt-2"><Button variant="outline" size="sm" className="w-full" onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})}>Get Started — It's Free</Button></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;

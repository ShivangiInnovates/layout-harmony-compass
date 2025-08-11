// Footer.tsx - Minimal footer with links & social placeholders.
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 py-12 text-sm">
      <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">Layout Harmony</p>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">Craft-grade, AI-powered layout intelligence delivering frictionless, immersive planning workflows.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-slate-600 dark:text-slate-400">
          <a href="#features" className="hover:text-sky-600">Features</a>
          <a href="#insights" className="hover:text-sky-600">Insights</a>
            <a href="#testimonials" className="hover:text-sky-600">Testimonials</a>
          <a href="#pricing" className="hover:text-sky-600">Pricing</a>
          <Link to="/login" className="hover:text-sky-600">Login</Link>
        </nav>
        <p className="text-slate-500 dark:text-slate-500">© {new Date().getFullYear()} Layout Harmony.</p>
      </div>
    </footer>
  );
};

export default Footer;

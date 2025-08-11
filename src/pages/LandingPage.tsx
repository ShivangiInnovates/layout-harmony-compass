// LandingPage.tsx - Animated marketing landing page for Layout Harmony
// Purpose: Replace old Home page with modern, animated, accessible landing experience.

import { motion, useReducedMotion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import FeaturesGrid from '../components/FeaturesGrid';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import TestimonialCarousel from '../components/TestimonialCarousel';
import PricingCTA from '../components/PricingCTA';
import Footer from '../components/Footer';

const LandingPage = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 text-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <NavBar />
      <main id="main" className="flex-1" aria-label="Layout Harmony marketing content">
        <Hero />
        <motion.section
          id="features"
          aria-labelledby="features-heading"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="container py-24"
        >
          <h2 id="features-heading" className="sr-only">Platform Features</h2>
          <FeaturesGrid />
        </motion.section>
        <motion.section
          id="insights"
          aria-labelledby="insights-heading"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="container py-28 bg-gradient-to-b from-white/40 to-blue-50/60 backdrop-blur-sm rounded-3xl"
        >
          <h2 id="insights-heading" className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12">Latest Layout & Manufacturing Insights</h2>
          <BlogPreviewGrid />
        </motion.section>
        <section id="testimonials" aria-labelledby="testimonials-heading" className="container py-28">
          <h2 id="testimonials-heading" className="sr-only">Testimonials</h2>
          <TestimonialCarousel />
        </section>
        <section id="pricing" aria-labelledby="pricing-heading" className="container py-24">
          <h2 id="pricing-heading" className="sr-only">Pricing & Call To Action</h2>
          <PricingCTA />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

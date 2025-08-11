// PricingCTA.tsx - Simple pricing tiers & CTA.
import { Button } from '@/components/ui/button';

const tiers = [
  { name: 'Starter', price: 'Free', features: ['2 Projects', 'Basic Optimization', 'Community Support'] },
  { name: 'Pro', price: '$29/mo', features: ['Unlimited Projects', 'Advanced Solver', 'Relationship Modeling', 'Priority Support'] },
  { name: 'Enterprise', price: 'Custom', features: ['On-Prem / Private Cloud', 'Dedicated Success', 'SLA & SSO', 'Custom Integrations'] },
];

const PricingCTA = () => {
  return (
    <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white/70 to-sky-50/80 dark:from-slate-900/60 dark:to-slate-800/70 backdrop-blur p-10 shadow-md">
      <h3 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Transparent pricing for every stage</h3>
      <p className="mt-4 text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Start free — upgrade when you need immersive, high-fidelity optimization at scale.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {tiers.map(t => (
          <div key={t.name} className="group relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-lg transition-all">
            <h4 className="text-lg font-semibold tracking-tight">{t.name}</h4>
            <p className="mt-2 text-2xl font-bold">{t.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {t.features.map(f => <li key={f}>• {f}</li>)}
            </ul>
            <Button size="sm" className="mt-6 w-full group-hover:translate-y-[-2px] transition-transform">Select</Button>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button size="lg" className="px-10" onClick={()=>console.log('Navigate to signup')}>Create Free Account</Button>
      </div>
    </div>
  );
};

export default PricingCTA;

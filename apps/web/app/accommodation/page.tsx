import { Building2, CreditCard, FileCheck2 } from 'lucide-react';
import { DEMO_ACCOMMODATION_GUIDES } from '@/lib/demo-data';
import { HousingFeed } from '@/components/accommodation/housing-feed';
import { WgLetterGenerator } from '@/components/accommodation/wg-letter-generator';
import { ScamRadar } from '@/components/accommodation/scam-radar';

const GUIDE_ICONS: Record<string, typeof FileCheck2> = {
  'wg-profile': FileCheck2,
  'schufa-explainer': CreditCard,
  'proof-of-income': Building2,
};

export default function AccommodationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <p className="flex items-center gap-1.5 text-sm text-zinc-500">
          <Building2 className="h-4 w-4 text-orange-400" />
          Housing
        </p>
        <h1 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">Accommodation Guide</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Curated checklists, a letter generator, and safety tips for finding housing in Germany.
        </p>
      </div>

      <div className="mb-6">
        <HousingFeed />
      </div>

      <div id="wg-letter-generator" className="mb-6 scroll-mt-24">
        <WgLetterGenerator />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ScamRadar />

        <div className="space-y-4">
          {DEMO_ACCOMMODATION_GUIDES.map((guide) => {
            const Icon = GUIDE_ICONS[guide.id] ?? FileCheck2;
            return (
              <section
                key={guide.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <h2 className="font-semibold text-zinc-50">{guide.title}</h2>
                </div>
                <p className="mb-3 text-sm text-zinc-500">{guide.summary}</p>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-400">
                  {guide.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

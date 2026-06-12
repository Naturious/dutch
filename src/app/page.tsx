import GameCard from '@/components/GameCard';

export default function Home() {
  const games = [
    {
      title: 'Zinnen Bouwen',
      description: 'Bouw correcte Nederlandse zinnen van losse woorden.',
      emoji: '🧱',
      href: '/zinnen-bouwen',
    },
    {
      title: 'De of Het?',
      description: 'Oefen met het juiste lidwoord bij Nederlandse zelfstandige naamwoorden.',
      emoji: '🎯',
      href: '/de-of-het',
    },
    {
      title: 'Werkwoord Vervoegen',
      description: 'Vervoeg werkwoorden in verschillende tijden en personen.',
      emoji: '📝',
      href: '/werkwoord-vervoegen',
    },
    {
      title: 'Inversie Spel',
      description: 'Oefen de V2-regel: het werkwoord staat altijd op de tweede plaats.',
      emoji: '🔄',
      href: '/inversie',
    },
    {
      title: 'Scheidbare Werkwoorden',
      description: 'Leer hoe scheidbare werkwoorden werken in verschillende tijden.',
      emoji: '✂️',
      href: '/scheidbare-werkwoorden',
    },
    {
      title: 'Voltooid Deelwoord',
      description: 'Oefen het vormen van voltooide deelwoorden (ge-...-t/d).',
      emoji: '✅',
      href: '/voltooid-deelwoord',
    },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800">
          Nederlandse Grammatica Oefenen
        </h1>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
          Kies een oefening en verbeter je Nederlandse grammatica. Elke oefening
          richt zich op een ander aspect van de taal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((game) => (
          <GameCard key={game.href} {...game} />
        ))}
      </div>
    </div>
  );
}

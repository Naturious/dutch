import Link from 'next/link';

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
  href: string;
}

export default function GameCard({ title, description, emoji, href }: GameCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  );
}

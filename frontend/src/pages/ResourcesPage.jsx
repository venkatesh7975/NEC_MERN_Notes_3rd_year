import React from 'react';
import { ExternalLink, BookOpen, Globe } from 'lucide-react';

export default function ResourcesPage() {
  const links = [
    { title: 'MDN Web Docs', desc: 'Authoritative documentation for HTML, CSS, and Web APIs.', url: 'https://developer.mozilla.org/' },
    { title: 'React 19 Official Documentation', desc: 'Component guides and interactive API references.', url: 'https://react.dev/' },
    { title: 'MongoDB University', desc: 'Free courses on NoSQL schema design & aggregations.', url: 'https://learn.mongodb.com/' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Curated Developer Resources</h1>
        <p className="text-slate-400 text-sm">Essential external documentation and tool references.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((res, i) => (
          <a
            key={i}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 space-y-3 group transition-all"
          >
            <div className="flex justify-between items-center text-blue-400">
              <Globe className="w-6 h-6" />
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
            </div>
            <h3 className="font-bold text-white text-base group-hover:text-blue-400">{res.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{res.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

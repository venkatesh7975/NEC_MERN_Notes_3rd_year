import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function InterviewPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const qa = [
    { q: 'How does the JavaScript Event Loop process Asynchronous Tasks?', a: 'JavaScript executes synchronous code in the Call Stack. Asynchronous callbacks are offloaded to Web APIs. Resolved Promises enter the Microtask Queue; timers enter the Task Queue. When the Call Stack clears, microtasks execute first, then tasks.' },
    { q: 'What is Virtual DOM and how does React Reconciliation work?', a: 'Virtual DOM is an in-memory lightweight representation of the real DOM. When state changes, React creates a new Virtual DOM tree, diffs it against the old tree, and updates only changed real DOM nodes.' },
    { q: 'What is the difference between SQL and NoSQL MongoDB?', a: 'SQL relational databases use rigid tables, schemas, foreign keys, and SQL joins. MongoDB NoSQL uses flexible BSON document collections, subdocuments, and scales horizontally easily.' },
    { q: 'Explain JWT Token authentication flow.', a: 'User logs in with credentials. Backend verifies password hash with bcrypt and signs a JWT token containing user ID & role. Client includes token in HTTP Authorization Bearer header for protected request validation.' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Full Stack Interview Preparation</h1>
        <p className="text-slate-400 text-sm">Curated technical interview questions & expert answers.</p>
      </div>

      <div className="space-y-4">
        {qa.map((item, i) => (
          <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full text-left flex items-center justify-between font-bold text-white text-base hover:text-blue-400 transition-colors"
            >
              <span>{i + 1}. {item.q}</span>
              {openIdx === i ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {openIdx === i && (
              <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80 bg-slate-950/50 p-4 rounded-xl">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

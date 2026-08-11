import React from 'react';
import { FileCheck2, CheckCircle2, Clock } from 'lucide-react';

export default function AssignmentsPage() {
  const assignments = [
    { title: 'Semantic Recipe Web Page (HTML5)', category: 'HTML', status: 'Completed', score: '100%' },
    { title: 'Responsive Card Layout (CSS Flexbox)', category: 'CSS', status: 'Completed', score: '95%' },
    { title: 'React 19 Task Manager with LocalStorage', category: 'React', status: 'Pending', score: '-' },
    { title: 'JWT Authentication & RBAC Microservice', category: 'Express', status: 'Pending', score: '-' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Graded Assignments</h1>
        <p className="text-slate-400 text-sm">Practice hands-on tasks to evaluate your comprehension.</p>
      </div>

      <div className="space-y-4">
        {assignments.map((a, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{a.title}</h3>
                <span className="text-xs text-slate-400">Category: {a.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className={a.status === 'Completed' ? 'text-emerald-400 flex items-center gap-1' : 'text-amber-400 flex items-center gap-1'}>
                {a.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {a.status} ({a.score})
              </span>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

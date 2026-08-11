import React, { useState } from 'react';
import { FolderGit2, Code2, ExternalLink, CheckCircle } from 'lucide-react';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const projects = [
    { title: 'Personal Developer Portfolio', category: 'HTML/CSS', difficulty: 'Beginner', desc: 'Build a multi-section responsive personal portfolio with CSS Flexbox & Grid.' },
    { title: 'Interactive LMS Quiz Engine App', category: 'JavaScript', difficulty: 'Intermediate', desc: 'Single-page JavaScript application with countdown timer and LocalStorage high scores.' },
    { title: 'Course Learning Dashboard UI', category: 'React', difficulty: 'Intermediate', desc: 'Full-featured React 19 single-page application with sidebar navigation and markdown reader.' },
    { title: 'Full Stack MERN Learning Management System', category: 'Full Stack', difficulty: 'Advanced', desc: 'Enterprise learning platform with JWT authentication, Monaco code runner, and certificates.' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Hands-On Projects Repository</h1>
        <p className="text-slate-400 text-sm">Real-world projects to build your engineering portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold">{p.category}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 font-semibold text-amber-400">{p.difficulty}</span>
              </div>
              <h3 className="font-bold text-white text-lg">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>

            <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
              <FolderGit2 className="w-4 h-4 text-blue-400" /> View Project Specifications
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

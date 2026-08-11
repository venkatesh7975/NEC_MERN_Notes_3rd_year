import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function CheatSheetsPage() {
  const [activeTab, setActiveTab] = useState('react');

  const sheets = {
    react: `# React 19 Quick Reference
useState: const [val, setVal] = useState(initial);
useEffect: useEffect(() => { /* effect */ return () => {}; }, [deps]);
useContext: const value = useContext(MyContext);`,
    express: `# Express REST API Quick Reference
app.get('/api/courses', (req, res) => res.json(data));
app.post('/api/courses', protect, (req, res) => res.status(201).json(item));`,
    mongodb: `# MongoDB Mongoose Quick Reference
User.find({ role: 'student' }).populate('courses');
User.findByIdAndUpdate(id, { name }, { new: true });`
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Developer Cheat Sheets</h1>
        <p className="text-slate-400 text-sm">One-page quick syntax and shortcut references.</p>
      </div>

      <div className="flex gap-3 border-b border-slate-800 pb-3">
        {['react', 'express', 'mongodb'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${activeTab === t ? 'bg-blue-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <pre className="p-6 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-blue-300 leading-relaxed overflow-x-auto">
        {sheets[activeTab]}
      </pre>
    </div>
  );
}

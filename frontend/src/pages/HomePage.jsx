import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, PlayCircle, Code2, Layers, Cpu, Server, 
  Database, ShieldCheck, CheckCircle2, Award, Users, Star, BookOpen 
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const learningPaths = [
    { title: 'HTML5 & Structure', count: '12 Lessons', color: 'from-orange-500 to-amber-500', icon: Code2 },
    { title: 'CSS3 & Styling', count: '18 Lessons', color: 'from-blue-500 to-cyan-500', icon: Layers },
    { title: 'JavaScript ES6+', count: '24 Lessons', color: 'from-yellow-500 to-orange-400', icon: Cpu },
    { title: 'React 19 Mastery', count: '30 Lessons', color: 'from-cyan-400 to-blue-600', icon: Code2 },
    { title: 'Node & Express', count: '22 Lessons', color: 'from-emerald-500 to-teal-600', icon: Server },
    { title: 'MongoDB & MySQL', count: '16 Lessons', color: 'from-indigo-500 to-purple-600', icon: Database },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Complete MERN Stack Web Development Hub
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Master Full Stack Web Development from <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">HTML to MERN</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Access production-grade course notes, runnable code examples, interactive Monaco code playgrounds, real-world projects, interview QA, and earn verified certificates.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-2xl transition-all shadow-xl shadow-blue-600/25"
            >
              Explore All Courses <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/cheatsheets')}
              className="flex items-center gap-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-2xl border border-slate-700 transition-all"
            >
              <BookOpen className="w-4 h-4" /> View Cheat Sheets
            </button>
          </div>

          <div className="flex items-center gap-8 pt-6 text-xs text-slate-400 justify-center lg:justify-start">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Notes</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Interactive Monaco Runner</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Certificates</div>
          </div>
        </div>

        {/* Hero Preview Card */}
        <div className="w-full lg:w-[480px] p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">R19</div>
              <div>
                <h3 className="font-bold text-sm text-white">React 19 Masterclass</h3>
                <p className="text-xs text-slate-400">Interactive Code Sandbox</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">Active</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-blue-300 border border-slate-800">
            <code>
              const [progress, setProgress] = useState(100);<br/>
              console.log("Full Stack Mastery Ready 🚀");
            </code>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="font-bold text-base text-white">12,500+</div>
              <div className="text-[10px] text-slate-400 uppercase">Students</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="font-bold text-base text-white">13</div>
              <div className="text-[10px] text-slate-400 uppercase">Modules</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="font-bold text-base text-white">4.9 ★</div>
              <div className="text-[10px] text-slate-400 uppercase">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Comprehensive Learning Paths</h2>
          <p className="text-slate-400 text-sm">Step-by-step curriculum organized by core technology</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <div 
                key={idx}
                onClick={() => navigate('/courses')}
                className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all cursor-pointer hover:-translate-y-1 shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-white font-bold mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">{path.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{path.count} • Interactive Lessons & Code</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full Stack Roadmap Section */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Full Stack Roadmap</h2>
          <p className="text-slate-400 text-sm">Your step-by-step pathway from beginner to industry engineer</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          <span className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">1. HTML5 & CSS3</span>
          <span className="text-blue-400 font-bold">➔</span>
          <span className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">2. JS ES6+</span>
          <span className="text-blue-400 font-bold">➔</span>
          <span className="px-4 py-2 rounded-xl bg-blue-600 text-white shadow-md">3. React 19</span>
          <span className="text-blue-400 font-bold">➔</span>
          <span className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">4. Node & Express</span>
          <span className="text-blue-400 font-bold">➔</span>
          <span className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">5. MongoDB</span>
          <span className="text-blue-400 font-bold">➔</span>
          <span className="px-4 py-2 rounded-xl bg-emerald-600 text-white">6. MERN Capstone</span>
        </div>
      </section>
    </div>
  );
}

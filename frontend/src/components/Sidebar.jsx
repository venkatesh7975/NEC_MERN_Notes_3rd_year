import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Code2, FolderGit2, FileCheck2, 
  HelpCircle, Sparkles, Bookmark, Award, Settings, Layers, 
  FileText, ShieldCheck, Database, Server, Cpu
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const mainNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses Catalog', path: '/courses', icon: BookOpen },
  ];

  const courseTopics = [
    { name: 'HTML5', path: '/courses?category=HTML', icon: Code2, color: 'text-orange-400' },
    { name: 'CSS3', path: '/courses?category=CSS', icon: Layers, color: 'text-blue-400' },
    { name: 'JavaScript', path: '/courses?category=JavaScript', icon: Cpu, color: 'text-yellow-400' },
    { name: 'ReactJS', path: '/courses?category=ReactJS', icon: Code2, color: 'text-cyan-400' },
    { name: 'NodeJS', path: '/courses?category=NodeJS', icon: Server, color: 'text-green-400' },
    { name: 'ExpressJS', path: '/courses?category=ExpressJS', icon: Server, color: 'text-gray-300' },
    { name: 'MongoDB', path: '/courses?category=MongoDB', icon: Database, color: 'text-emerald-400' },
    { name: 'MySQL', path: '/courses?category=MySQL', icon: Database, color: 'text-indigo-400' },
  ];

  const repositoryNav = [
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'Assignments', path: '/assignments', icon: FileCheck2 },
    { name: 'Interview Qs', path: '/interview-questions', icon: HelpCircle },
    { name: 'Cheat Sheets', path: '/cheatsheets', icon: Sparkles },
    { name: 'Resources', path: '/resources', icon: FileText },
    { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    { name: 'Certificates', path: '/certificates', icon: Award },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-slate-900 dark:bg-slate-900 light:bg-white 
        border-r border-slate-800 dark:border-slate-800 light:border-slate-200 
        z-50 flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Logo */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
            M
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              MERN LMS
            </h1>
            <p className="text-xs text-slate-400">Web Dev Hub</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Main Links */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main</p>
            {mainNav.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* Topics Submenu */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Learning Topics</p>
            {courseTopics.map(topic => {
              const Icon = topic.icon;
              const isActive = location.search.includes(`category=${topic.name}`);
              return (
                <NavLink
                  key={topic.name}
                  to={topic.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${isActive 
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}
                  `}
                >
                  <Icon className={`w-3.5 h-3.5 ${topic.color}`} />
                  {topic.name}
                </NavLink>
              );
            })}
          </div>

          {/* Educational Repository */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Repository</p>
            {repositoryNav.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 text-xs text-slate-400 flex items-center justify-between">
          <span>v1.0.0 • MERN LMS</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </aside>
    </>
  );
}

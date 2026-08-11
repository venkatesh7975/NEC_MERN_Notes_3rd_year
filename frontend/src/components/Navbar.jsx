import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Sun, Moon, Bell, Menu, User, Shield, LogOut, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onMenuToggle }) {
  const { user, logout, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/80 backdrop-blur-md border-b border-slate-800 dark:border-slate-800 light:border-slate-200 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">
      {/* Mobile Toggle & Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          onClick={onMenuToggle}
          className="p-2 text-slate-400 hover:text-white rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, courses, code, projects..."
            className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          title="Toggle Light/Dark Theme"
          className="p-2.5 text-slate-400 hover:text-white rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Role Quick Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-400 hover:bg-blue-600/20 transition-all"
          >
            <Shield className="w-3.5 h-3.5" />
            Role: <span className="capitalize">{user?.role || 'Student'}</span>
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1">
              <p className="px-2 py-1 text-slate-400 font-semibold uppercase">Switch User Role</p>
              {['student', 'instructor', 'admin'].map(r => (
                <button
                  key={r}
                  onClick={() => { switchRole(r); setShowRoleMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium capitalize transition-colors ${user?.role === r ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  {r} View
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Avatar */}
        {user ? (
          <div className="flex items-center gap-3 pl-2">
            <img 
              src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
              alt={user.name}
              className="w-9 h-9 rounded-xl border border-blue-500/30 object-cover"
            />
            <button
              onClick={logout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

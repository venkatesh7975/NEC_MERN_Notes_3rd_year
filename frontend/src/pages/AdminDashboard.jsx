import React from 'react';
import { ShieldCheck, Users, BookOpen, Activity, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">System Admin Dashboard</h1>
        <p className="text-slate-400 text-sm">Platform administration, revenue analytics, user access control, and logs.</p>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-blue-400 uppercase">Total System Users</span>
          <div className="text-3xl font-extrabold text-white">18,420</div>
          <div className="text-xs text-slate-400">16,200 Students • 40 Instructors</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-emerald-400 uppercase">Active Courses</span>
          <div className="text-3xl font-extrabold text-white">24</div>
          <div className="text-xs text-slate-400">All Modules Published</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-purple-400 uppercase">Platform Uptime</span>
          <div className="text-3xl font-extrabold text-white">99.98%</div>
          <div className="text-xs text-slate-400">Node API Cluster Active</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase">Monthly Platform Volume</span>
          <div className="text-3xl font-extrabold text-white">$68,400</div>
          <div className="text-xs text-emerald-400">+12% vs last month</div>
        </div>
      </div>

      {/* Recent System Activity Log */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Live System Activity Logs</h2>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Stream
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
            <span>[USER AUTH] Student 'student@lms.com' logged in successfully via JWT</span>
            <span className="text-slate-400">Just now</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
            <span>[QUIZ SUBMIT] Student completed JavaScript ES6+ Quiz with 100% score</span>
            <span className="text-slate-400">2 mins ago</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
            <span>[CERTIFICATE GENERATED] Issued MERN LMS verified certificate for HTML5</span>
            <span className="text-slate-400">5 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

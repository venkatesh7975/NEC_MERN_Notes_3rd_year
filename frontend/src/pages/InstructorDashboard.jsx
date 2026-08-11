import React, { useState } from 'react';
import { Plus, Users, BookOpen, DollarSign, Award, CheckCircle, FileText, Video } from 'lucide-react';

export default function InstructorDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const instructorCourses = [
    { title: 'React 19 & Modern UI Architecture', students: 4120, rating: '4.9 ★', revenue: '$14,200' },
    { title: 'Node.js & Express REST API Engineering', students: 2950, rating: '4.8 ★', revenue: '$9,800' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Instructor Studio & Analytics</h1>
          <p className="text-slate-400 text-sm">Create courses, manage lessons, assignments, and view student progress.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Course
        </button>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-blue-400 uppercase">Total Students</span>
          <div className="text-3xl font-extrabold text-white">7,070</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-emerald-400 uppercase">Published Courses</span>
          <div className="text-3xl font-extrabold text-white">2</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-purple-400 uppercase">Average Rating</span>
          <div className="text-3xl font-extrabold text-white">4.85 ★</div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase">Est. Revenue</span>
          <div className="text-3xl font-extrabold text-white">$24,000</div>
        </div>
      </div>

      {/* Courses List Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white">My Authored Courses</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-xs font-semibold uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Course Title</th>
                <th className="px-4 py-3">Enrolled Students</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Revenue</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {instructorCourses.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-white">{c.title}</td>
                  <td className="px-4 py-3">{c.students}</td>
                  <td className="px-4 py-3 text-amber-400 font-bold">{c.rating}</td>
                  <td className="px-4 py-3 text-emerald-400 font-bold">{c.revenue}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-blue-400 font-semibold rounded-lg">Edit Course</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

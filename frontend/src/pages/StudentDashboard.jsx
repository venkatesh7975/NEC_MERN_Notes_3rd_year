import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Award, CheckCircle2, PlayCircle, Clock, Trophy, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const enrolledCourses = [
    { title: 'HTML5 & Modern Web Structure', progress: 100, category: 'HTML', lessons: '2/2 Lessons', completed: true },
    { title: 'CSS3 Flexbox, Grid & Responsive Design', progress: 65, category: 'CSS', lessons: '3/5 Lessons', completed: false },
    { title: 'React 19 & Modern UI Architecture', progress: 40, category: 'ReactJS', lessons: '2/6 Lessons', completed: false },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-amber-300" /> 5 Day Streak! Keep Learning
          </div>
          <h1 className="text-3xl font-extrabold">Welcome back, {user?.name || 'Student'}! 👋</h1>
          <p className="text-blue-100 text-sm max-w-xl">
            You've completed 65% of your Full Stack Learning Path this month. Ready to continue your React 19 lessons?
          </p>
        </div>

        <button
          onClick={() => navigate('/courses')}
          className="px-6 py-3 bg-white text-blue-600 font-bold text-sm rounded-2xl hover:bg-blue-50 transition-all shadow-lg whitespace-nowrap"
        >
          Continue Learning
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-blue-400">
            <span className="text-xs font-semibold uppercase">Enrolled Courses</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white">3</div>
          <div className="text-xs text-slate-400">2 In Progress</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-semibold uppercase">Completed Lessons</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white">14</div>
          <div className="text-xs text-slate-400">+4 this week</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-semibold uppercase">Quiz Score Average</span>
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white">92%</div>
          <div className="text-xs text-slate-400">Passed 4/4 Quizzes</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-semibold uppercase">Certificates Earned</span>
            <Award className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white">1</div>
          <div className="text-xs text-slate-400">HTML5 Web Structure</div>
        </div>
      </div>

      {/* Course Progress Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">My Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enrolledCourses.map((c, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 font-semibold text-blue-400">{c.category}</span>
                  <span>{c.lessons}</span>
                </div>
                <h3 className="font-bold text-white text-base leading-snug">{c.title}</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-blue-400">{c.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${c.progress}%` }}></div>
                </div>
              </div>

              <button
                onClick={() => navigate('/courses')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <PlayCircle className="w-4 h-4 text-blue-400" />
                {c.completed ? 'Review Course' : 'Resume Lesson'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

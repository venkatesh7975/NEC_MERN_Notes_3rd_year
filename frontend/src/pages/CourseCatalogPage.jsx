import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, BookOpen, Star, Clock, Users, ChevronRight, Layers } from 'lucide-react';

export default function CourseCatalogPage() {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = ['All', 'HTML', 'CSS', 'JavaScript', 'ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'MySQL'];

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    let url = '/api/v1/courses';
    const params = [];
    if (selectedCategory && selectedCategory !== 'All') params.push(`category=${selectedCategory}`);
    if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    axios.get(url)
      .then(res => {
        setCourses(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo courses if API backend server isn't running live
        setCourses([
          {
            _id: 'c1',
            title: 'HTML5 & Modern Web Structure',
            slug: 'html5-modern-web-structure',
            category: 'HTML',
            description: 'Master HTML5 semantic elements, forms, accessibility, meta tags, and document architecture.',
            level: 'Beginner',
            duration: '6 Hours',
            rating: 4.9,
            enrolledCount: 1420
          },
          {
            _id: 'c2',
            title: 'CSS3 Flexbox, Grid & Responsive Design',
            slug: 'css3-flexbox-grid-responsive',
            category: 'CSS',
            description: 'Design beautiful, responsive, animated web layouts using CSS Flexbox, Grid, and animations.',
            level: 'Beginner',
            duration: '10 Hours',
            rating: 4.9,
            enrolledCount: 2310
          },
          {
            _id: 'c3',
            title: 'JavaScript ES6+ Deep Dive',
            slug: 'javascript-es6-deep-dive',
            category: 'JavaScript',
            description: 'Master modern JavaScript features: Arrow functions, Promises, Async/Await, Array methods, and DOM.',
            level: 'Intermediate',
            duration: '16 Hours',
            rating: 5.0,
            enrolledCount: 3890
          },
          {
            _id: 'c4',
            title: 'React 19 & Modern UI Architecture',
            slug: 'react-19-modern-ui-architecture',
            category: 'ReactJS',
            description: 'Build fast, interactive single-page applications with React 19, custom hooks, Context API, and Framer Motion.',
            level: 'Intermediate',
            duration: '20 Hours',
            rating: 4.9,
            enrolledCount: 4120
          },
          {
            _id: 'c5',
            title: 'Node.js & Express REST API Engineering',
            slug: 'nodejs-express-rest-api-engineering',
            category: 'NodeJS',
            description: 'Build scalable, secure RESTful microservices with Node.js, Express.js, JWT authentication, and middleware.',
            level: 'Advanced',
            duration: '18 Hours',
            rating: 4.8,
            enrolledCount: 2950
          },
          {
            _id: 'c6',
            title: 'MongoDB NoSQL & Aggregations',
            slug: 'mongodb-nosql-aggregations',
            category: 'MongoDB',
            description: 'Design flexible NoSQL database schemas, write Mongoose models, and craft aggregation pipelines.',
            level: 'Intermediate',
            duration: '12 Hours',
            rating: 4.9,
            enrolledCount: 1870
          }
        ]);
        setLoading(false);
      });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">Interactive Course Catalog</h1>
        <p className="text-slate-400 text-sm">Explore interactive courses with markdown notes, code playgrounds, and quizzes.</p>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter courses..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <div
            key={c._id}
            onClick={() => navigate(`/courses/${c.slug || c._id}`)}
            className="group bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-1 shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold">{c.category}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> {c.rating}
                </span>
              </div>

              <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors leading-snug">{c.title}</h3>
              <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{c.description}</p>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {c.duration}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.enrolledCount} Students</span>
              <span className="text-blue-400 font-bold flex items-center gap-1">Start <ChevronRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

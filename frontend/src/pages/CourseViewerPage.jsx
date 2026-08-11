import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownViewer from '../components/MarkdownViewer';
import MonacoEditorRunner from '../components/MonacoEditorRunner';
import CertificateModal from '../components/CertificateModal';
import { 
  PlayCircle, FileText, Code2, HelpCircle, CheckCircle, 
  MessageSquare, Bookmark, Award, ChevronRight, Send, Star 
} from 'lucide-react';

export default function CourseViewerPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'code' | 'quiz' | 'discussion'
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [comments, setComments] = useState([
    { author: 'Jane Doe', text: 'This React 19 explanation on custom hooks is super clear!', date: '2 hours ago' },
    { author: 'Mark Smith', text: 'Loved the Monaco code runner embedded right in the lesson!', date: '5 hours ago' }
  ]);
  const [newComment, setNewComment] = useState('');

  const course = {
    title: 'React 19 & Modern UI Architecture',
    category: 'ReactJS',
    lessons: [
      {
        title: '1. React 19 Components & JSX Structure',
        description: 'Understand declarative component-driven UI architecture.',
        markdown: '# React 19 Component Fundamentals\n\nReact components are reusable JavaScript functions returning JSX elements.\n\n## Why React 19?\n- Automatic memoization compiler.\n- Actions & optimistic state updates.\n- Seamless server and client component hybrid model.\n\n```jsx\nexport function WelcomeBanner({ name }) {\n  return (\n    <div className="banner">\n      <h1>Welcome back, {name}!</h1>\n    </div>\n  );\n}\n```\n\n### Best Practices\n- Keep components small and modular.\n- Use descriptive prop names.\n- Prefer functional components with hooks.',
        code: `// Try modifying the React component below!\nfunction WelcomeMessage({ name }) {\n  console.log("Rendering component for:", name);\n  return "Hello " + name + ", Welcome to MERN LMS!";\n}\n\nconsole.log(WelcomeMessage({ name: "Alex" }));`
      },
      {
        title: '2. State Management with useState & useEffect',
        description: 'Master reactive component state and side effects.',
        markdown: '# React 19 State & Effects\n\n```jsx\nconst [count, setCount] = useState(0);\n```\n\nManage internal component state reactively.',
        code: `let count = 0;\nfunction increment() {\n  count += 1;\n  console.log("Current Count:", count);\n}\nincrement();\nincrement();`
      }
    ],
    quiz: {
      question: 'Which hook is used to perform side-effects in React functional components?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctIndex: 1
    }
  };

  const currentLesson = course.lessons[currentLessonIndex] || course.lessons[0];

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { author: 'You (Student)', text: newComment, date: 'Just now' }]);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Top Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-1">
            <span>{course.category}</span> • <span>Lesson {currentLessonIndex + 1} of {course.lessons.length}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{course.title}</h1>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
        >
          <Award className="w-4 h-4" /> Claim Certificate
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Lesson Selection Sidebar */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Course Curriculum</h3>
          <div className="space-y-2">
            {course.lessons.map((lesson, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentLessonIndex(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  currentLessonIndex === idx 
                    ? 'bg-blue-600/10 border-blue-500/40 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm leading-snug">{lesson.title}</h4>
                  <PlayCircle className={`w-4 h-4 shrink-0 ${currentLessonIndex === idx ? 'text-blue-400' : 'text-slate-500'}`} />
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{lesson.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Main Viewer Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            {[
              { id: 'notes', label: 'Markdown Notes', icon: FileText },
              { id: 'code', label: 'Monaco Playground', icon: Code2 },
              { id: 'quiz', label: 'Evaluate Quiz', icon: HelpCircle },
              { id: 'discussion', label: 'Discussion & Q&A', icon: MessageSquare },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'notes' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <MarkdownViewer content={currentLesson.markdown} />
            </div>
          )}

          {activeTab === 'code' && (
            <MonacoEditorRunner initialCode={currentLesson.code} language="javascript" />
          )}

          {activeTab === 'quiz' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Lesson Evaluation Quiz</h3>
                <p className="text-slate-400 text-xs">{course.quiz.question}</p>
              </div>

              <div className="space-y-3">
                {course.quiz.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedQuizAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      selectedQuizAnswer === idx 
                        ? 'bg-blue-600/20 border-blue-500 text-white font-bold' 
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={selectedQuizAnswer === null}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                >
                  Submit Answer
                </button>

                {quizSubmitted && (
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Correct! Result recorded.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-bold text-white">Student Discussion Forum</h3>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ask a question or share notes..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-4 pt-2">
                {comments.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-blue-400">{c.author}</span>
                      <span className="text-slate-500">{c.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          studentName="Alex Developer"
          courseTitle={course.title}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}

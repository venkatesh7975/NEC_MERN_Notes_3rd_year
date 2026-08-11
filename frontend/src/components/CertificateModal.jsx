import React, { useRef, useEffect } from 'react';
import { Award, Download, X, CheckCircle } from 'lucide-react';

export default function CertificateModal({ studentName = "Alex Developer", courseTitle = "Full Stack MERN Mastery", onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border Frame
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Header Title
    ctx.fillStyle = '#60a5fa';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MERN LMS PLATFORM CERTIFICATE OF COMPLETION', canvas.width / 2, 80);

    // Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('THIS IS PROUDLY PRESENTED TO', canvas.width / 2, 120);

    // Student Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Inter, sans-serif';
    ctx.fillText(studentName, canvas.width / 2, 180);

    // Completion statement
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText(`For successfully mastering and completing the curriculum:`, canvas.width / 2, 220);

    // Course Title
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px Inter, sans-serif';
    ctx.fillText(courseTitle, canvas.width / 2, 260);

    // Seal Badge
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 330, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#2563eb';
    ctx.fill();
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText('VERIFIED', canvas.width / 2, 335);

    // Footer info
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(`Issued Date: ${new Date().toLocaleDateString()} • Certificate ID: MERN-${Math.floor(100000 + Math.random() * 900000)}`, canvas.width / 2, 400);

  }, [studentName, courseTitle]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${studentName.replace(/\s+/g, '_')}_${courseTitle.replace(/\s+/g, '_')}_Certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-3xl w-full shadow-2xl space-y-4 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
          <CheckCircle className="w-6 h-6" />
          Course Completed! Download Your Certificate
        </div>

        <div className="flex justify-center overflow-x-auto py-2">
          <canvas ref={canvasRef} width={700} height={440} className="rounded-2xl border border-slate-800 shadow-xl max-w-full" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl text-sm font-semibold"
          >
            Close
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30"
          >
            <Download className="w-4 h-4" />
            Download Certificate (PNG)
          </button>
        </div>
      </div>
    </div>
  );
}

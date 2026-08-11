import React, { useState } from 'react';
import CertificateModal from '../components/CertificateModal';
import { Award, Download, CheckCircle } from 'lucide-react';

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certs = [
    { id: '1', title: 'HTML5 & Modern Web Structure', date: 'August 2026', grade: 'A+' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">My Verified Certificates</h1>
        <p className="text-slate-400 text-sm">Download your earned course completion certificates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((c) => (
          <div key={c.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Award className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-white text-lg">{c.title}</h3>
                <p className="text-xs text-slate-400">Issued {c.date} • Grade {c.grade}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCert(c)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> View & Download Certificate
            </button>
          </div>
        ))}
      </div>

      {selectedCert && (
        <CertificateModal
          studentName="Alex Developer"
          courseTitle={selectedCert.title}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}

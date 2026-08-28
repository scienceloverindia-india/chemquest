'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { SUBJECTS } from '@/lib/subjects';
import PDFViewer from '@/components/PDFViewer';

export default function NotesPage({ params }: { params: Promise<{ subject: string }> }) {
  const resolvedParams = use(params);
  const subjectId = resolvedParams.subject;
  const subject = SUBJECTS.find(s => s.code.toLowerCase() === subjectId.toLowerCase());

  const allFiles = subject ? [
    { name: `Master Notes (${subject.masterPages} pages)`, path: subject.masterFile, description: 'Authoritative lecture notes' },
    ...subject.secondaryFiles
  ] : [];

  const [activeFile, setActiveFile] = useState(allFiles[0] || null);

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h1 className="text-6xl font-bold text-gray-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">Subject Not Found</h2>
        <Link href="/" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-h-screen p-4 md:p-6 gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-200">{subject.name} ({subject.number})</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        {/* Left Sidebar - Files & Units */}
        <div className="w-full md:w-80 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-white mb-3">Study Materials</h2>
            <div className="space-y-2">
              {allFiles.map((file, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFile(file)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeFile?.path === file.path ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
                >
                  <div className="font-semibold">{file.name}</div>
                  <div className="text-xs opacity-70 mt-1 truncate">{file.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-white mb-3">Syllabus Units</h2>
            <div className="space-y-1.5">
              {subject.unitNames.map((unit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-400 py-1.5 border-b border-gray-800/50 last:border-0">
                  <span className="w-5 h-5 rounded bg-gray-800 flex items-center justify-center font-bold text-indigo-400 shrink-0">{idx + 1}</span>
                  <span className="leading-snug">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Area - PDF Viewer */}
        <div className="flex-1 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/80 backdrop-blur-sm z-10">
            <h3 className="font-semibold text-gray-200">{activeFile?.name || 'No file selected'}</h3>
          </div>
          <div className="flex-1 relative bg-gray-950">
            {activeFile?.path ? (
              <PDFViewer src={activeFile.path} title={activeFile.name} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a document to begin reading
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

interface PDFViewerProps {
  src: string;
  title: string;
}

export default function PDFViewer({ src, title }: PDFViewerProps) {
  return (
    <div className="w-full h-full flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 bg-gray-950 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-gray-200 truncate pr-4 flex-1">{title}</h2>
        <a
          href={src}
          download
          className="shrink-0 flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="hidden sm:inline">Download PDF</span>
        </a>
      </div>
      <div className="flex-1 relative bg-gray-950 w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
        <object
          data={src}
          type="application/pdf"
          className="absolute inset-0 w-full h-full"
        >
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-900">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center text-gray-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-200 mb-2">Browser cannot display inline PDFs</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Your browser doesn't support built-in PDF rendering. No worries, you can easily download the file to view it.
            </p>
            <a
              href={src}
              download
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-xl transition-colors"
            >
              Download PDF Instead
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}

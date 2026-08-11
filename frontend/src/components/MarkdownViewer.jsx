import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, ListFilter, FileText } from 'lucide-react';

export default function MarkdownViewer({ content = '' }) {
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  const handleCopyCode = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedSnippet(idx);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Simple headings extraction for Table of Contents
  const headings = content.split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.indexOf(' ');
      const text = line.replace(/#/g, '').trim();
      return { level, text };
    });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Markdown Content */}
      <div className="flex-1 space-y-4 text-slate-300 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="text-3xl font-extrabold text-white mt-8 mb-4 border-b border-slate-800 pb-3">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold text-slate-100 mt-6 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold text-blue-400 mt-4 mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-4 text-slate-300 leading-7">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside space-y-1.5 mb-4 text-slate-300">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 mb-4 text-slate-300">{children}</ol>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 bg-slate-900/80 p-4 rounded-r-xl my-4 text-slate-300 italic">{children}</blockquote>,
            table: ({ children }) => (
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse border border-slate-800 rounded-xl overflow-hidden">{children}</table>
              </div>
            ),
            th: ({ children }) => <th className="bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 uppercase border border-slate-800">{children}</th>,
            td: ({ children }) => <td className="px-4 py-3 text-sm border border-slate-800">{children}</td>,
            code({ node, inline, className, children, ...props }) {
              const codeString = String(children).replace(/\n$/, '');
              const snippetId = Math.random();

              if (inline) {
                return <code className="bg-slate-800 text-blue-300 px-1.5 py-0.5 rounded font-mono text-xs">{children}</code>;
              }

              return (
                <div className="relative my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs">
                  <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
                    <span>Code Snippet</span>
                    <button
                      onClick={() => handleCopyCode(codeString, snippetId)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedSnippet === snippetId ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedSnippet === snippetId ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">{codeString}</pre>
                </div>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Table of Contents Sidebar */}
      {headings.length > 0 && (
        <aside className="w-full lg:w-64 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sticky top-24">
            <div className="flex items-center gap-2 font-semibold text-sm text-slate-200 mb-3 pb-2 border-b border-slate-800">
              <ListFilter className="w-4 h-4 text-blue-400" />
              Table of Contents
            </div>
            <ul className="space-y-2 text-xs">
              {headings.map((h, i) => (
                <li 
                  key={i} 
                  style={{ paddingLeft: `${(h.level - 1) * 12}px` }}
                  className="text-slate-400 hover:text-blue-400 cursor-pointer truncate transition-colors"
                >
                  • {h.text}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}

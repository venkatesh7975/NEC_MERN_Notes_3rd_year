import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Copy, Check, RefreshCw, Terminal } from 'lucide-react';

export default function MonacoEditorRunner({ 
  initialCode = 'console.log("Hello MERN LMS!");', 
  language = 'javascript' 
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running code...');

    setTimeout(() => {
      try {
        let logs = [];
        const customConsole = {
          log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args) => logs.push(`[ERROR] ${args.join(' ')}`),
          warn: (...args) => logs.push(`[WARN] ${args.join(' ')}`)
        };

        // Execute JS safely in sandbox scope
        const runFn = new Function('console', code);
        runFn(customConsole);

        setOutput(logs.join('\n') || 'Code executed successfully (no output).');
      } catch (err) {
        setOutput(`Runtime Error: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl my-6">
      {/* Editor Header Bar */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-3 text-xs font-mono text-slate-400">Interactive Monaco Code Playground</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-all shadow-md shadow-blue-600/20"
          >
            {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            Run Code
          </button>
        </div>
      </div>

      {/* Editor Main */}
      <div className="h-64">
        <Editor
          height="100%"
          defaultLanguage={language}
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || '')}
          options={{
            fontSize: 13,
            fontFamily: "'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 }
          }}
        />
      </div>

      {/* Console Output Footer */}
      <div className="bg-slate-950 border-t border-slate-800 p-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="font-semibold uppercase tracking-wider">Console Output</span>
        </div>
        <pre className="text-slate-300 whitespace-pre-wrap max-h-32 overflow-y-auto bg-slate-900 p-3 rounded-xl border border-slate-800/80">
          {output || '// Click "Run Code" to view console output here...'}
        </pre>
      </div>
    </div>
  );
}

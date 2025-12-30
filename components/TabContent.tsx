import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TabData, TabId } from '../types';
import { Loader2, AlertCircle, RefreshCw, FileText, Check, Copy, ArrowRight } from 'lucide-react';

interface TabContentProps {
  activeTabId: TabId;
  data: TabData;
  inputsFilled: boolean;
  onRetry: () => void;
}

const MarkdownComponents = {
  // Headings with better spacing and color hierarchy
  h1: ({node, ...props}: any) => (
    <div className="mb-8 mt-6 border-b border-zinc-100 pb-6">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight" {...props} />
    </div>
  ),
  h2: ({node, ...props}: any) => (
    <h2 className="text-2xl font-bold text-zinc-900 mb-6 mt-12 flex items-center gap-3" {...props}>
      <span className="w-1.5 h-8 bg-electric rounded-full shadow-[0_0_10px_rgba(0,67,255,0.4)]"></span>
      {props.children}
    </h2>
  ),
  h3: ({node, ...props}: any) => (
    <h3 className="text-lg font-bold text-electric mb-3 mt-8 uppercase tracking-wide flex items-center gap-2" {...props}>
      <ArrowRight className="w-4 h-4" />
      {props.children}
    </h3>
  ),
  
  // Body text
  p: ({node, ...props}: any) => <p className="text-zinc-600 leading-relaxed mb-5 text-[15px]" {...props} />,
  
  // Lists with custom markers
  ul: ({node, ...props}: any) => <ul className="list-none mb-6 space-y-2 text-zinc-600" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-zinc-600 marker:text-electric marker:font-bold" {...props} />,
  li: ({node, ...props}: any) => (
    <li className="pl-2 relative flex gap-2 items-start" {...props}>
      {/* Note: simple list items might just render text. Complex ones might need structure. 
          For standard markdown UL, we can use CSS markers or pseudo-elements, but let's keep it simple. */}
      {props.children}
    </li>
  ),
  
  // Links
  a: ({node, ...props}: any) => <a className="text-electric hover:text-electric-600 font-semibold hover:underline decoration-2 underline-offset-2 transition-colors" {...props} />,
  
  // Strong emphasis
  strong: ({node, ...props}: any) => <strong className="font-bold text-zinc-900" {...props} />,
  
  // TABLES: The main request. Styled with Blue Header and clean rows.
  table: ({node, ...props}: any) => (
    <div className="overflow-hidden my-10 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] border border-zinc-100 bg-white ring-1 ring-zinc-900/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200" {...props} />
      </div>
    </div>
  ),
  thead: ({node, ...props}: any) => <thead className="bg-electric" {...props} />,
  tbody: ({node, ...props}: any) => <tbody className="divide-y divide-zinc-100 bg-white" {...props} />,
  tr: ({node, ...props}: any) => <tr className="hover:bg-blue-50/30 transition-colors group" {...props} />,
  
  // Table Cells
  th: ({node, ...props}: any) => (
    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider border-r border-electric-400 last:border-r-0" {...props} />
  ),
  td: ({node, ...props}: any) => (
    <td className="px-6 py-4 text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed border-r border-dashed border-zinc-100 last:border-r-0 group-hover:text-zinc-900 transition-colors" {...props} />
  ),
  
  // Insights / Quotes
  blockquote: ({node, ...props}: any) => (
    <blockquote className="relative border-l-4 border-electric bg-gradient-to-r from-blue-50 to-white py-5 px-6 my-8 rounded-r-lg shadow-sm" {...props}>
      <div className="text-electric font-bold text-xs uppercase mb-1 tracking-wider opacity-70">Strategic Insight</div>
      <div className="italic text-zinc-700 font-medium">{props.children}</div>
    </blockquote>
  ),
  
  // Code blocks for Copy/Paste content
  code: ({node, inline, className, children, ...props}: any) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline ? (
        <div className="relative my-8 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden group">
             <div className="flex items-center px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 text-xs text-zinc-400 uppercase tracking-wider font-mono justify-between">
                <span className="text-electric font-bold flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  {match ? match[1] : 'Content Block'}
                </span>
                <div className="flex gap-1.5 opacity-50">
                   <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                   <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                   <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
             </div>
             <div className="p-6 overflow-x-auto">
                <code className={`${className} text-sm font-mono text-zinc-100 leading-relaxed`} {...props}>
                  {children}
                </code>
             </div>
        </div>
      ) : (
        <code className="bg-blue-50 text-electric-600 px-1.5 py-0.5 rounded text-sm font-mono border border-blue-100 font-bold" {...props}>
          {children}
        </code>
      )
  },
  
  hr: ({node, ...props}: any) => <hr className="border-zinc-200 my-12 border-dashed" {...props} />
};

export const TabContent: React.FC<TabContentProps> = ({ activeTabId, data, inputsFilled, onRetry }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (!inputsFilled) {
     return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 p-8 text-center bg-white">
        <div className="max-w-lg w-full bg-white rounded-2xl p-8 border border-zinc-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
           <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <FileText className="w-10 h-10 text-electric" />
           </div>
           <h3 className="text-2xl font-bold text-zinc-900 mb-3">Welcome to Campaign Orchestrator</h3>
           <p className="text-zinc-500 mb-8 leading-relaxed">
             Configure your business parameters in the sidebar to generate a comprehensive, AI-driven marketing strategy tailored to your ICP.
           </p>
           <div className="text-xs font-semibold text-electric uppercase tracking-widest opacity-80">
             Awaiting Input
           </div>
        </div>
      </div>
     );
  }

  if (data.status === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-electric" />
        <p className="font-medium animate-pulse">Initializing Agent...</p>
      </div>
    );
  }

  if (data.status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-8 p-12">
        <div className="relative">
            <div className="w-24 h-24 border-4 border-zinc-100 border-t-electric rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-sm">
                <Loader2 className="w-8 h-8 text-electric animate-spin-slow" />
            </div>
        </div>
        <div className="text-center space-y-3 max-w-md animate-in fade-in zoom-in duration-500">
            <h3 className="text-xl font-bold text-zinc-900">Constructing Strategy</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Our AI is analyzing market data and formulating the <span className="text-electric font-bold">{data.label}</span> module...
            </p>
        </div>
      </div>
    );
  }

  if (data.status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500 space-y-6">
        <div className="bg-red-50 p-6 rounded-full border border-red-100 shadow-inner">
           <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <div className="text-center max-w-md">
            <p className="text-lg text-zinc-900 font-bold mb-2">Generation Interrupted</p>
            <p className="text-sm text-zinc-500 mb-6">{data.error || 'The AI encountered an issue while processing your request.'}</p>
            <button 
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <RefreshCw className="w-4 h-4" /> Retry Generation
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white scroll-smooth relative">
      {/* Content Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-8 py-5 lg:px-12 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-electric text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
               {/* We could pass the icon here dynamically, but for now simple box is fine */}
               <FileText className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-lg font-bold text-zinc-900 tracking-tight leading-none">
                  {data.label}
               </h2>
               <span className="text-xs text-zinc-400 font-medium">Strategic Output</span>
            </div>
         </div>
         
         <button 
           onClick={handleCopy}
           className="flex items-center gap-2 text-xs font-bold bg-white hover:bg-zinc-50 text-zinc-600 hover:text-electric px-4 py-2 rounded-lg border border-zinc-200 hover:border-electric transition-all shadow-sm"
         >
           {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
           {copied ? 'COPIED' : 'COPY CONTENT'}
         </button>
      </div>

      {/* Main Markdown Area */}
      <div className="px-8 py-10 lg:px-16 max-w-6xl mx-auto pb-40">
        <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-a:no-underline">
          <ReactMarkdown 
            components={MarkdownComponents} 
            remarkPlugins={[remarkGfm]}
          >
              {data.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

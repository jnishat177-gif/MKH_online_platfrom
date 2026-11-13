import React, { useState } from 'react';
import { downloadProjectZip } from '../utils/zipDownloader';
import { 
  Download, 
  X, 
  Check, 
  Copy, 
  Terminal, 
  GitBranch,
  Sparkles,
  Info,
  Globe
} from 'lucide-react';

interface DownloadProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadProjectModal: React.FC<DownloadProjectModalProps> = ({ isOpen, onClose }) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'vscode' | 'github'>('vscode');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadProjectZip();
    setIsDownloading(false);
    setDownloadStarted(true);
    setTimeout(() => setDownloadStarted(false), 4000);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gitCommands = `git init
git add .
git commit -m "Initial commit: MarketingHub Online Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/marketinghub-online-platform.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Download Project ZIP, Run in VS Code & Publish on GitHub
              </h3>
              <p className="text-[11px] text-slate-500">
                MarketingHub Online Platform · সম্পূর্ণ সোর্স কোড ও ডিপ্লয়মেন্ট গাইড
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[82vh] overflow-y-auto text-xs">
          {/* Main Download Action Banner */}
          <div className="p-5 bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-xl shadow-sm space-y-3.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Full Source Code Archive Ready
              </span>
              <h4 className="text-base font-extrabold text-white mt-0.5">
                marketinghub-project.zip
              </h4>
              <p className="text-slate-300 text-xs mt-1">
                Includes Grocery, Cosmetics, Furniture, Electronics, Ladies Dress One-Piece, bKash & Nagad simulators, 4 Role Dashboards, and auto-deploy GitHub Actions workflow.
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-99 text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
            >
              {isDownloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Preparing & Downloading Archive...</span>
                </>
              ) : downloadStarted ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Downloaded! Check your browser downloads folder</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Download Full Project ZIP (.zip)</span>
                </>
              )}
            </button>
          </div>

          {/* Guide Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveGuideTab('vscode')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeGuideTab === 'vscode'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-700" />
              <span>1. Run in VS Code</span>
            </button>
            <button
              onClick={() => setActiveGuideTab('github')}
              className={`flex-1 py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeGuideTab === 'github'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-indigo-700" />
              <span>2. Publish on GitHub Pages</span>
            </button>
          </div>

          {/* TAB 1: VS Code Setup */}
          {activeGuideTab === 'vscode' && (
            <div className="space-y-3.5">
              {/* Extraction Help Box */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 space-y-1">
                <p className="font-bold">⚠️ জিপ ফাইল আনজিপ করতে সমস্যা হলে:</p>
                <p className="text-[11px] text-amber-800">
                  Right Click ➔ Properties ➔ নিচে <strong>&quot;Unblock&quot;</strong> টিক দিয়ে OK করুন, অথবা <strong>WinRAR / 7-Zip</strong> দিয়ে Extract করুন।
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center shrink-0">
                  ১
                </span>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">ZIP Extract করে VS Code-এ Open Folder করুন</p>
                  <p className="text-slate-600">
                    <code>marketinghub-project.zip</code> Extract করে VS Code থেকে <strong>File ➔ Open Folder</strong> দিয়ে ফোল্ডারটি খুলুন।
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center shrink-0">
                  ২
                </span>
                <div className="space-y-2 flex-1">
                  <p className="font-bold text-slate-900">প্যাকেজ ইনস্টল করুন (Terminal: Ctrl + `)</p>
                  <div className="flex items-center justify-between bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-xs">
                    <span>npm install --legacy-peer-deps</span>
                    <button
                      onClick={() => copyToClipboard('npm install --legacy-peer-deps', 'install')}
                      className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'install' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{copiedKey === 'install' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center shrink-0">
                  ৩
                </span>
                <div className="space-y-2 flex-1">
                  <p className="font-bold text-slate-900">লোকাল সার্ভার চালু করুন</p>
                  <div className="flex items-center justify-between bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-xs">
                    <span>npm run dev</span>
                    <button
                      onClick={() => copyToClipboard('npm run dev', 'run')}
                      className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'run' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{copiedKey === 'run' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    ব্রাউজারে <strong>http://localhost:3000</strong> ওপেন করুন।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GitHub Push & GitHub Pages Publish */}
          {activeGuideTab === 'github' && (
            <div className="space-y-3.5">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-indigo-700" />
                  <span>অটোমেটিক GitHub Pages ডিপ্লয়মেন্ট যুক্ত করা আছে!</span>
                </p>
                <p className="text-[11px] text-indigo-800">
                  প্রজেক্টের ভেতরে <code>.github/workflows/deploy.yml</code> আগে থেকেই রেডি করা আছে। নিচের ৩ ধাপে প্রজেক্টটি গিটহাবে পাবলিশ হয়ে যাবে:
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-800 text-white font-bold flex items-center justify-center shrink-0">
                  ১
                </span>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">GitHub-এ নতুন Repository তৈরি করুন</p>
                  <p className="text-slate-600">
                    GitHub.com-এ গিয়ে <strong>New Repository</strong> বাটনে ক্লিক করে <code>marketinghub-online-platform</code> নামে একটি Public রিপোজিটরি খুলুন।
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-800 text-white font-bold flex items-center justify-center shrink-0">
                  ২
                </span>
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">VS Code Terminal থেকে কোড Push করুন</p>
                    <button
                      onClick={() => copyToClipboard(gitCommands, 'git')}
                      className="text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      {copiedKey === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{copiedKey === 'git' ? 'Copied' : 'Copy Commands'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
                    {gitCommands}
                  </pre>
                  <p className="text-[11px] text-slate-500">
                    *(<code>YOUR_USERNAME</code>-এর জায়গায় আপনার GitHub ইউজারনেম বসান)*
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-800 text-white font-bold flex items-center justify-center shrink-0">
                  ৩
                </span>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">GitHub Pages অন করুন</p>
                  <p className="text-slate-600">
                    আপনার GitHub Repository-তে গিয়ে <strong>Settings ➔ Pages</strong> অপশনে যান। সেখানে <strong>Source</strong> ড্রপডাউন থেকে <strong>&quot;GitHub Actions&quot;</strong> সিলেক্ট করুন।
                  </p>
                  <p className="text-emerald-800 font-semibold text-[11px]">
                    ১-২ মিনিটের মধ্যেই আপনার ওয়েবসাইট <code>https://YOUR_USERNAME.github.io/marketinghub-online-platform/</code> লিংকে লাইভ হয়ে যাবে!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Prerequisite Box */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">প্রয়োজনীয় সফটওয়্যার (Prerequisites):</p>
              <p className="text-blue-800 mt-0.5">
                কম্পিউটারে <strong>Node.js (v18+)</strong> এবং <strong>Git</strong> ইনস্টল থাকতে হবে। <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="underline font-bold">nodejs.org</a> ও <a href="https://git-scm.com" target="_blank" rel="noreferrer" className="underline font-bold">git-scm.com</a> থেকে ফ্রিতে ইনস্টল করতে পারেন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

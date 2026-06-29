import React from 'react';
import { Dna, Sparkles, Activity, ShieldCheck, Cpu, Save, History, Trash2 } from 'lucide-react';

interface NavbarProps {
  onSelectSample: (query: string, area: string) => void;
  apiSource: string;
  onSaveSession: () => void;
  onResumeSession: () => void;
  onClearSession: () => void;
  sessionSavedTime: string | null;
  hasBlueprint: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSelectSample, 
  apiSource,
  onSaveSession,
  onResumeSession,
  onClearSession,
  sessionSavedTime,
  hasBlueprint
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Dna className="h-6 w-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-xl text-white font-sans">BioAgent<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">X</span></span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">Google Cloud R&D Framework</span>
            </div>
            <p className="text-xs text-slate-400 font-sans hidden sm:block">Healthcare & Life Sciences Multi-Agent Discovery Engine</p>
          </div>
        </div>

        {/* Quick Quest Launcher & Status */}
        <div className="flex items-center gap-3 self-end md:self-auto flex-wrap justify-end">
          
          {/* Preset Samples Dropdown/Menu */}
          <div className="hidden xl:flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 rounded-lg p-1">
            <span className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-400" /> Breakthrough Quests:
            </span>
            <button 
              onClick={() => onSelectSample("KRAS G12D Switch-II Allosteric PROTAC Inhibitor for Pancreatic Cancer", "Oncology")}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-slate-300 transition-all font-medium cursor-pointer"
            >
              PDAC KRAS
            </button>
            <button 
              onClick={() => onSelectSample("CRISPR-Cas13a mRNA Target Cleavage Guide RNA Optimization for ALS", "Neurology")}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-teal-950 hover:text-teal-300 text-slate-300 transition-all font-medium cursor-pointer"
            >
              ALS CRISPR
            </button>
            <button 
              onClick={() => onSelectSample("Next-Gen Oral GLP-1/GIP Dual Agonist Macrocyclic Peptide Delivery", "Metabolic")}
              className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-indigo-950 hover:text-indigo-300 text-slate-300 transition-all font-medium cursor-pointer"
            >
              GLP-1 Oral
            </button>
          </div>

          {/* Session Storage Controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={onSaveSession}
              disabled={!hasBlueprint}
              className={`text-xs px-2.5 py-1 rounded flex items-center gap-1.5 font-mono transition-all cursor-pointer ${
                hasBlueprint
                  ? 'bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900 border border-emerald-800/60 shadow-sm'
                  : 'text-slate-600 cursor-not-allowed opacity-50'
              }`}
              title="Save current discovery state to local storage"
            >
              <Save className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Save State</span>
            </button>

            {sessionSavedTime && (
              <div className="flex items-center gap-1 border-l border-slate-800 pl-1 ml-0.5">
                <button
                  onClick={onResumeSession}
                  className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-all font-mono flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title={`Resume session saved at ${sessionSavedTime}`}
                >
                  <History className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="hidden md:inline">Restore ({sessionSavedTime})</span>
                </button>
                <button
                  onClick={onClearSession}
                  className="p-1.5 rounded hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 transition-all cursor-pointer"
                  title="Clear saved local storage state"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Engine Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-slate-300 text-[11px]">Orchestrator: <strong className="text-cyan-400">{apiSource === 'gemini_live' ? 'Gemini 2.5 Live' : 'Vertex AI Consortium'}</strong></span>
          </div>

        </div>

      </div>
    </header>
  );
};

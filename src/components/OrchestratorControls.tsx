import React, { useState } from 'react';
import { Sparkles, Search, Play, Layers, Compass, HelpCircle, ArrowRight } from 'lucide-react';

interface OrchestratorControlsProps {
  onRunDiscovery: (query: string, area: string) => void;
  isLoading: boolean;
}

export const OrchestratorControls: React.FC<OrchestratorControlsProps> = ({ onRunDiscovery, isLoading }) => {
  const [query, setQuery] = useState("KRAS G12D Switch-II Allosteric PROTAC Inhibitor for Pancreatic Ductal Adenocarcinoma");
  const [area, setArea] = useState("Oncology & Targeted Therapeutics");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onRunDiscovery(query, area);
  };

  return (
    <section className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden mb-8">
      {/* Background ambient glow glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Compass className="h-4 w-4 animate-spin-slow" /> Art of Possible Sandbox
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Explore Scientific Frontiers with Autonomous AI Agents
            </h1>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 max-w-sm">
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on Google Cloud's Life Sciences Framework: 5 AI agents synthesize literature, genomic AlphaFold structures, ADMET tox prediction, and trial designs simultaneously.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            
            {/* Therapeutic Area Selector */}
            <div className="md:w-72">
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-teal-400" /> Therapeutic Domain
              </label>
              <select 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
              >
                <option value="Oncology & Targeted Therapeutics">Oncology & Targeted Therapeutics</option>
                <option value="Neurology & Neurodegeneration">Neurology & Neurodegeneration</option>
                <option value="Immunology & Rare Autoimmune">Immunology & Rare Autoimmune</option>
                <option value="Metabolic & Cardiovascular">Metabolic & Cardiovascular</option>
                <option value="Infectious Disease & Vaccines">Infectious Disease & Vaccines</option>
                <option value="Longevity & Epigenetic Reprogramming">Longevity & Epigenetic Reprogramming</option>
              </select>
            </div>

            {/* Main Prompt Input */}
            <div className="flex-1">
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5 flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5 text-cyan-400" /> Target Hypothesis / Research Challenge
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Allosteric inhibition of SHP2 to overcome KRAS resistance..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-32 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all shadow-inner font-sans"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 fill-slate-950" />
                      <span>Launch R&D</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Quick Prompts Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <HelpCircle className="h-3.5 w-3.5 text-slate-500" /> Try Quest:
            </span>
            <button
              type="button"
              onClick={() => {
                setQuery("KRAS G12D Switch-II Allosteric PROTAC Inhibitor for Pancreatic Ductal Adenocarcinoma");
                setArea("Oncology & Targeted Therapeutics");
              }}
              className="text-xs bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 rounded-full px-3 py-1 transition-all"
            >
              Pancreatic Cancer KRAS Degradation
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("CRISPR-Cas13a mRNA Cleavage Guide RNA Optimization for C9orf72 ALS");
                setArea("Neurology & Neurodegeneration");
              }}
              className="text-xs bg-slate-800/80 hover:bg-slate-800 text-teal-300 border border-slate-700/80 rounded-full px-3 py-1 transition-all"
            >
              ALS CRISPR mRNA Targeting
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("Oral GLP-1/GIP Dual Agonist Macrocyclic Peptide with Permeability Enhancer");
                setArea("Metabolic & Cardiovascular");
              }}
              className="text-xs bg-slate-800/80 hover:bg-slate-800 text-indigo-300 border border-slate-700/80 rounded-full px-3 py-1 transition-all"
            >
              Next-Gen Oral GLP-1 Weight Loss
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

import React from 'react';
import { TargetMolecule } from '../types';
import { Atom, Shield, Dna, Zap, Copy, Check, ExternalLink } from 'lucide-react';

interface TargetMoleculeCardProps {
  molecule: TargetMolecule;
}

export const TargetMoleculeCard: React.FC<TargetMoleculeCardProps> = ({ molecule }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopySmiles = () => {
    navigator.clipboard.writeText(molecule.smiles);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div>
        {/* Header Header */}
        <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <Atom className="h-6 w-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Lead Candidate Scaffold</span>
              <h3 className="text-xl font-bold text-white tracking-tight">{molecule.name}</h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" /> Verified Lead
          </span>
        </div>

        {/* Mock 3D Molecular Canvas / SMILES Renderer Graphic */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-6 mb-6 relative flex flex-col items-center justify-center min-h-[180px] group">
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[10px] font-mono bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-800">Switch II Pocket Bound</span>
          </div>

          {/* Simulated Hexagonal Ring Structure Graphic */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="h-28 w-28 border-2 border-dashed border-cyan-500/30 rounded-full animate-spin-slow absolute"></div>
            <div className="h-20 w-20 border border-teal-400/40 rotate-45 flex items-center justify-center relative bg-cyan-950/20 backdrop-blur-sm rounded-lg shadow-inner">
              <div className="h-12 w-12 border border-indigo-400/50 rotate-12 bg-indigo-950/40 rounded flex items-center justify-center text-xs font-mono font-bold text-cyan-300">
                PROTAC
              </div>
            </div>
            <div className="absolute -right-12 top-2 px-2 py-1 bg-purple-950/90 border border-purple-500/50 rounded text-[10px] font-mono text-purple-300 shadow">
              E3 Ligase Linker
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 border-t border-slate-900 pt-3">
            <span>Formula: <strong className="text-slate-200">{molecule.formula}</strong></span>
            <span>MW: <strong className="text-slate-200">{molecule.molecularWeight} g/mol</strong></span>
          </div>
        </div>

        {/* SMILES String Box */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-slate-400 uppercase">SMILES Notation</span>
            <button
              onClick={handleCopySmiles}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied!' : 'Copy SMILES'}</span>
            </button>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all shadow-inner">
            {molecule.smiles}
          </div>
        </div>
      </div>

      {/* Biophysical Predictions Grid */}
      <div className="grid grid-cols-3 gap-3 border-t border-slate-800 pt-5 mt-auto">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono uppercase mb-1">
            <Zap className="h-3 w-3 text-amber-400" /> Cellular IC50
          </div>
          <div className="text-base font-bold text-amber-400 font-mono">{molecule.predictedIC50}</div>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono uppercase mb-1">
            <Dna className="h-3 w-3 text-cyan-400" /> Free Energy ΔG
          </div>
          <div className="text-base font-bold text-cyan-400 font-mono">{molecule.bindingAffinity}</div>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono uppercase mb-1">
            <Shield className="h-3 w-3 text-emerald-400" /> AlphaFold pLDDT
          </div>
          <div className="text-base font-bold text-emerald-400 font-mono">{molecule.alphaFoldpLDDT}</div>
        </div>
      </div>
    </div>
  );
};

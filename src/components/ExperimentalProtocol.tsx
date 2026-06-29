import React from 'react';
import { ExperimentalStep } from '../types';
import { FlaskConical, Calendar, CheckCircle2, Microscope } from 'lucide-react';

interface ExperimentalProtocolProps {
  steps: ExperimentalStep[];
}

export const ExperimentalProtocol: React.FC<ExperimentalProtocolProps> = ({ steps }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">Wet-Lab Validation Roadmap</span>
              <h3 className="text-xl font-bold text-white tracking-tight">Experimental Execution Protocol</h3>
            </div>
          </div>
          <span className="text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/60 px-3 py-1 rounded-full">
            4-Stage IND Track
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Synthesized by Clinical Protocol & Bio-Safety Agents to accelerate bench-to-bedside translation.
        </p>

        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((item, idx) => (
            <div key={item.step} className="bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/40 p-4 rounded-xl transition-all relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="h-6 w-6 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-slate-950 font-mono font-bold text-xs flex items-center justify-center shadow">
                    {item.step}
                  </span>
                  <h4 className="font-bold text-sm text-white">{item.name}</h4>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 pl-8 sm:pl-0">
                  <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-cyan-300">
                    <Calendar className="h-3 w-3" /> {item.duration}
                  </span>
                  <span className="text-slate-500 hidden md:inline">|</span>
                  <span className="text-slate-400 hidden lg:inline truncate max-w-[150px]" title={item.equipment}>{item.equipment}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 pl-8.5 leading-relaxed">
                <strong className="text-emerald-400 font-mono text-[11px]">Milestone Outcome:</strong> {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4 mt-6 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-mono flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Estimated Total IND Submission Timeline: <strong className="text-white">49 Days</strong></span>
        </span>
        <span className="text-purple-400 font-bold hidden sm:block">Automated GLP Dossier Ready</span>
      </div>
    </div>
  );
};

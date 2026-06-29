import React, { useState } from 'react';
import { ProbingQuestion } from '../types';
import { HelpCircle, Sparkles, MessageSquare, ArrowRight, Lightbulb, UserCheck, Bot, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface ProbingInquirySectionProps {
  questions: ProbingQuestion[];
  onOpenAgentChat: (agentName: string, role: string, initialQuestion?: string) => void;
}

export const ProbingInquirySection: React.FC<ProbingInquirySectionProps> = ({ questions, onOpenAgentChat }) => {
  const [activeQ, setActiveQ] = useState<string | null>(questions[0]?.id || null);

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-10">
      {/* Decorative background aura aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-5 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest mb-1.5">
              <Sparkles className="h-4 w-4 animate-bounce" /> Art of Possible: Principal Investigator Dialogue
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              "What questions do you have for me?"
            </h2>
          </div>
          <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-xl p-3.5 max-w-md">
            <p className="text-xs text-cyan-200 leading-relaxed">
              True scientific progress requires mutual challenge. Our AI agents analyzed your hypothesis trade-offs and generated these critical questions for you as the Principal Investigator.
            </p>
          </div>
        </div>

        {/* Probing Questions Interactive Accordion / Cards List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {questions.map((q, idx) => {
            const isActive = activeQ === q.id;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 }}
                onClick={() => setActiveQ(q.id)}
                className={`bg-slate-950 border rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between relative ${
                  isActive 
                    ? "border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400 bg-gradient-to-b from-cyan-950/20 to-slate-950" 
                    : "border-slate-800 hover:border-slate-700 opacity-90 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                      Challenged by: {q.sourceAgent}
                    </span>
                    <HelpCircle className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-600"}`} />
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white mb-3 leading-snug font-sans">
                    "{q.question}"
                  </h3>

                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 mb-4 text-xs">
                    <span className="font-mono text-[10px] text-slate-400 uppercase block mb-1">Empirical Context:</span>
                    <p className="text-slate-300 leading-relaxed">{q.context}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 mt-auto space-y-3">
                  <div className="flex items-start gap-2 text-xs">
                    <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-[11px] leading-snug"><strong className="text-amber-300">Exploration Path:</strong> {q.suggestedExploration}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAgentChat(q.sourceAgent, "Consortium Investigator", q.question);
                    }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600/20 hover:from-cyan-600 hover:to-teal-600 to-teal-600/20 border border-cyan-500/40 hover:border-cyan-400 rounded-xl text-xs font-bold text-cyan-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-cyan-400 group-hover:text-white transition-colors" />
                    <span>Answer or Debate {q.sourceAgent.split(' ')[0]}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

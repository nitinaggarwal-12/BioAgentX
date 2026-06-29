import React, { useState } from 'react';
import { AgentLog } from '../types';
import { BookOpen, Dna, FlaskConical, Stethoscope, ShieldAlert, CheckCircle2, AlertCircle, Clock, ChevronRight, Sparkles, MessageSquarePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AgentConsortiumGridProps {
  agents: AgentLog[];
  onOpenAgentChat: (agentName: string, role: string) => void;
}

const AGENT_ICONS: Record<string, React.ReactNode> = {
  biolit: <BookOpen className="h-5 w-5 text-cyan-400" />,
  genomic: <Dna className="h-5 w-5 text-emerald-400" />,
  insilico: <FlaskConical className="h-5 w-5 text-purple-400" />,
  clinical: <Stethoscope className="h-5 w-5 text-amber-400" />,
  regulatory: <ShieldAlert className="h-5 w-5 text-rose-400" />,
};

const AGENT_COLORS: Record<string, string> = {
  biolit: "from-cyan-500/10 via-slate-900 to-slate-950 border-cyan-500/30 hover:border-cyan-500/60",
  genomic: "from-emerald-500/10 via-slate-900 to-slate-950 border-emerald-500/30 hover:border-emerald-500/60",
  insilico: "from-purple-500/10 via-slate-900 to-slate-950 border-purple-500/30 hover:border-purple-500/60",
  clinical: "from-amber-500/10 via-slate-900 to-slate-950 border-amber-500/30 hover:border-amber-500/60",
  regulatory: "from-rose-500/10 via-slate-900 to-slate-950 border-rose-500/30 hover:border-rose-500/60",
};

export const AgentConsortiumGrid: React.FC<AgentConsortiumGridProps> = ({ agents, onOpenAgentChat }) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(agents[0]?.id || null);

  return (
    <section className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-sans">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <span>Autonomous Multi-Agent Discovery Consortium</span>
          </h2>
          <p className="text-xs text-slate-400">
            5 asynchronous agents operating on specialized Vertex AI knowledge bases
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
          <Clock className="h-3.5 w-3.5 text-cyan-400" />
          <span>Consortium Speed: <strong className="text-emerald-400">&lt; 2.5s Total</strong></span>
        </div>
      </div>

      {/* Agents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {agents.map((agent, idx) => {
          const isSelected = selectedAgent === agent.id;
          const colorClass = AGENT_COLORS[agent.id] || "from-slate-800/20 via-slate-900 to-slate-950 border-slate-700";
          const icon = AGENT_ICONS[agent.id] || <Sparkles className="h-5 w-5 text-cyan-400" />;

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedAgent(agent.id)}
              className={`bg-gradient-to-b ${colorClass} border rounded-xl p-4 cursor-pointer transition-all relative flex flex-col justify-between overflow-hidden shadow-xl ${
                isSelected ? "ring-2 ring-cyan-400 shadow-cyan-500/10 scale-[1.02]" : "opacity-90 hover:opacity-100"
              }`}
            >
              {/* Active Indicator Pulse */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 animate-pulse"></div>
              )}

              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 shadow-inner">
                    {icon}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{agent.timeTaken}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-white line-clamp-1">{agent.name}</h3>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5 mb-3 line-clamp-1">{agent.role}</p>

                {/* Confidence Meter */}
                <div className="space-y-1 mb-3 bg-slate-900/60 p-2 rounded border border-slate-800/60">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Grounding Score</span>
                    <span className="text-cyan-300 font-bold">{agent.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-1.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${agent.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                  {agent.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAgentChat(agent.name, agent.role);
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 py-1 px-2 rounded hover:bg-cyan-950/50 transition-colors"
                >
                  <MessageSquarePlus className="h-3.5 w-3.5" />
                  <span>Co-Scientist Ping</span>
                </button>
                <ChevronRight className={`h-4 w-4 text-slate-500 transition-transform ${isSelected ? "rotate-90 text-cyan-400" : ""}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Agent Expanded Deep-Dive Drawer */}
      {selectedAgent && (
        <AnimatePresence mode="wait">
          {agents.filter(a => a.id === selectedAgent).map(agent => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-slate-900/90 border border-cyan-500/30 rounded-xl p-5 shadow-2xl overflow-hidden backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {AGENT_ICONS[agent.id]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base font-sans">{agent.name}</h4>
                      <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded">Active Node</span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{agent.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenAgentChat(agent.name, agent.role)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageSquarePlus className="h-4 w-4" />
                    <span>Ask {agent.name.split(' ')[0]} a Question</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Synthesis Summary</h5>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                    {agent.summary}
                  </p>
                </div>

                <div className="lg:col-span-2 space-y-3">
                  <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Key Verified Findings</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {agent.keyFindings?.map((finding, fidx) => (
                      <div key={fidx} className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg flex items-start gap-2.5">
                        <div className="h-5 w-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5 border border-cyan-800/50">
                          {fidx + 1}
                        </div>
                        <span className="text-xs text-slate-300 leading-snug">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </section>
  );
};

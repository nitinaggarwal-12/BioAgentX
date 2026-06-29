import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OrchestratorControls } from './components/OrchestratorControls';
import { AgentConsortiumGrid } from './components/AgentConsortiumGrid';
import { TargetMoleculeCard } from './components/TargetMoleculeCard';
import { ADMETRadarChart } from './components/ADMETRadarChart';
import { ExperimentalProtocol } from './components/ExperimentalProtocol';
import { ProbingInquirySection } from './components/ProbingInquirySection';
import { CoScientistChatModal } from './components/CoScientistChatModal';
import { DiscoveryBlueprint } from './types';
import { Sparkles, Dna, Layers, ShieldCheck, Download, Share2, Award, Cpu, Terminal, ChevronUp, ChevronDown, Save, History, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [blueprint, setBlueprint] = useState<DiscoveryBlueprint | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiSource, setApiSource] = useState<string>('simulation');

  // Session Storage persistence state
  const [sessionSavedTime, setSessionSavedTime] = useState<string | null>(null);
  const [saveBannerMsg, setSaveBannerMsg] = useState<string | null>(null);

  // Co-Scientist Chat Modal state
  const [chatModalOpen, setChatModalOpen] = useState<boolean>(false);
  const [chatAgentName, setChatAgentName] = useState<string>('BioLit Scholar Agent');
  const [chatAgentRole, setChatAgentRole] = useState<string>('Literature Knowledge Graph');
  const [chatInitialQ, setChatInitialQ] = useState<string | undefined>(undefined);

  // System Architecture Footer Log Banner state
  const [showArchLog, setShowArchLog] = useState<boolean>(false);

  const runDiscoveryQuest = async (query: string, therapeuticArea: string, mode?: string) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/orchestrate-rd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, therapeuticArea, mode })
      });

      const data = await res.json();
      if (data && data.data) {
        setBlueprint(data.data);
        setApiSource(data.source || 'simulation');
      }
    } catch (err) {
      console.error("Discovery API failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check local storage or boot initial default quest on mount
  useEffect(() => {
    const saved = localStorage.getItem('bioagentx_saved_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.blueprint) {
          setBlueprint(parsed.blueprint);
          setApiSource(parsed.apiSource || 'simulation');
          setSessionSavedTime(parsed.timestamp || new Date().toLocaleTimeString());
          setSaveBannerMsg(`Restored discovery state from research session saved at ${parsed.timestamp || 'previous session'}.`);
          setTimeout(() => setSaveBannerMsg(null), 5000);
          return;
        }
      } catch (e) {
        console.error("Failed to parse saved session from localStorage:", e);
      }
    }

    runDiscoveryQuest(
      "KRAS G12D Switch-II Allosteric PROTAC Inhibitor for Pancreatic Ductal Adenocarcinoma",
      "Oncology & Targeted Therapeutics",
      "fast_mock"
    );
  }, []);

  const handleSaveSession = () => {
    if (!blueprint) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const sessionData = {
      blueprint,
      apiSource,
      timestamp
    };
    localStorage.setItem('bioagentx_saved_session', JSON.stringify(sessionData));
    setSessionSavedTime(timestamp);
    setSaveBannerMsg(`Discovery state successfully persisted to local storage at ${timestamp}.`);
    setTimeout(() => setSaveBannerMsg(null), 5000);
  };

  const handleResumeSession = () => {
    const saved = localStorage.getItem('bioagentx_saved_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.blueprint) {
          setBlueprint(parsed.blueprint);
          setApiSource(parsed.apiSource || 'simulation');
          setSaveBannerMsg(`Resumed research state from session saved at ${parsed.timestamp || 'previous session'}.`);
          setTimeout(() => setSaveBannerMsg(null), 5000);
        }
      } catch (e) {
        console.error("Failed to resume saved session:", e);
      }
    }
  };

  const handleClearSession = () => {
    localStorage.removeItem('bioagentx_saved_session');
    setSessionSavedTime(null);
    setSaveBannerMsg("Saved session state cleared from local storage.");
    setTimeout(() => setSaveBannerMsg(null), 4000);
  };

  const handleOpenChat = (name: string, role: string, initialQuestion?: string) => {
    setChatAgentName(name);
    setChatAgentRole(role);
    setChatInitialQ(initialQuestion);
    setChatModalOpen(true);
  };

  const handleExportDossier = () => {
    if (!blueprint) return;
    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BioAgentX_IND_Blueprint_${blueprint.targetMolecule?.name || 'Lead'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top sticky Navigation */}
      <Navbar 
        onSelectSample={(q, a) => runDiscoveryQuest(q, a)} 
        apiSource={apiSource}
        onSaveSession={handleSaveSession}
        onResumeSession={handleResumeSession}
        onClearSession={handleClearSession}
        sessionSavedTime={sessionSavedTime}
        hasBlueprint={!!blueprint}
      />

      {/* Persistence Status Toast Banner */}
      {saveBannerMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-950/90 border-b border-emerald-500/30 px-4 py-2.5 text-center z-30 shadow-md backdrop-blur-md sticky top-[65px]"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-mono text-emerald-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{saveBannerMsg}</span>
          </div>
        </motion.div>
      )}

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quest Launcher Controls */}
        <OrchestratorControls 
          onRunDiscovery={(q, a) => runDiscoveryQuest(q, a)}
          isLoading={isLoading}
        />

        {/* Loading Overlay skeleton state */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="my-16 flex flex-col items-center justify-center p-12 bg-slate-900/60 border border-cyan-500/30 rounded-3xl backdrop-blur-md shadow-2xl"
          >
            <div className="relative mb-6">
              <div className="h-20 w-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
              <Dna className="h-8 w-8 text-cyan-400 absolute top-6 left-6 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-sans">Consortium Agents Activating...</h3>
            <p className="text-xs font-mono text-cyan-300 max-w-md text-center">
              Synthesizing AlphaFold 3 atom coordinates, WIPO patent graphs, & FDA clinical trial simulations...
            </p>
          </motion.div>
        )}

        {/* Loaded Scientific Blueprint Display */}
        {!isLoading && blueprint && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            
            {/* Breakthrough Hypothesis Hero Banner */}
            <header className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 mb-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                      Hypothesis Grounded
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{blueprint.therapeuticArea}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight font-sans">
                    {blueprint.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl font-sans">
                    {blueprint.execSummary}
                  </p>
                </div>

                {/* Consensus & Actions Column */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-4 lg:pt-0 lg:pl-8">
                  <div className="text-center lg:text-right">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">AI Peer Consensus</div>
                    <div className="flex items-center gap-2">
                      <Award className="h-6 w-6 text-amber-400" />
                      <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-cyan-300 font-mono">
                        {blueprint.consensusScore}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap justify-end">
                    <button
                      onClick={handleSaveSession}
                      className="px-3.5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 text-xs font-bold font-mono flex items-center gap-2 border border-emerald-800/80 transition-all shadow-md cursor-pointer active:scale-95"
                      title="Save current discovery state to local storage"
                    >
                      <Save className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{sessionSavedTime ? `Saved` : 'Save State'}</span>
                    </button>
                    <button
                      onClick={handleExportDossier}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold font-mono flex items-center gap-2 border border-slate-700 transition-all shadow-md cursor-pointer active:scale-95"
                    >
                      <Download className="h-4 w-4 text-cyan-400" />
                      <span>IND JSON</span>
                    </button>
                    <button
                      onClick={() => alert("Breakthrough link copied to clipboard for co-author review!")}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                      title="Share Blueprint"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* 1. Autonomous Agent Consortium Row */}
            <AgentConsortiumGrid 
              agents={blueprint.agents || []}
              onOpenAgentChat={(name, role) => handleOpenChat(name, role)}
            />

            {/* 2. Tri-Grid Lead Candidate Biophysical & Safety Engine */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              
              {/* Col 1: Lead Scaffold Card */}
              <div className="lg:col-span-1">
                <TargetMoleculeCard molecule={blueprint.targetMolecule} />
              </div>

              {/* Col 2: ADMET Safety Radar */}
              <div className="lg:col-span-1">
                <ADMETRadarChart metrics={blueprint.admetMetrics || []} />
              </div>

              {/* Col 3: Experimental IND Roadmap */}
              <div className="lg:col-span-1">
                <ExperimentalProtocol steps={blueprint.experimentalProtocol || []} />
              </div>

            </section>

            {/* 3. Probing PI Dialogue Section (What questions do you have for me?) */}
            <ProbingInquirySection 
              questions={blueprint.probingQuestions || []}
              onOpenAgentChat={(name, role, initialQ) => handleOpenChat(name, role, initialQ)}
            />

          </motion.div>
        )}

      </main>

      {/* Collegial Co-Scientist Chat Drawer Modal */}
      <CoScientistChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        agentName={chatAgentName}
        agentRole={chatAgentRole}
        topicContext={blueprint?.title || "Life Sciences Discovery"}
        initialQuestion={chatInitialQ}
      />

      {/* Footer System Architecture Bar */}
      <footer className="border-t border-slate-900 bg-slate-950 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-500" />
            <span>Google Cloud Healthcare & Life Sciences Agentic R&D Blueprint v2.4</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowArchLog(!showArchLog)}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            >
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span>{showArchLog ? "Hide Pipeline Architecture" : "View Pipeline Architecture"}</span>
              {showArchLog ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
            </button>
            <span className="hidden md:inline">| Cloud Run Container</span>
          </div>
        </div>

        {/* Collapsible Architecture Specs Drawer */}
        {showArchLog && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-slate-900 border-t border-slate-800/80 px-4 py-6 text-xs font-mono"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-300">
              <div>
                <h5 className="text-cyan-400 font-bold mb-1.5 uppercase">1. Knowledge Graph Tier</h5>
                <p className="text-[11px] text-slate-400">Vertex AI Search connected to PubMed abstracts (14M nodes), ChEMBL assays, & WIPO global patent registries.</p>
              </div>
              <div>
                <h5 className="text-teal-400 font-bold mb-1.5 uppercase">2. Structural Tier</h5>
                <p className="text-[11px] text-slate-400">AlphaFold 3 deep learning transformer predicting protein-ligand pocket accessibility & atomic force constants.</p>
              </div>
              <div>
                <h5 className="text-indigo-400 font-bold mb-1.5 uppercase">3. ADMET Engine</h5>
                <p className="text-[11px] text-slate-400">Graph Neural Network screening virtual combinatorial modifications for hERG cardiotoxicity & blood-brain permeability.</p>
              </div>
              <div>
                <h5 className="text-purple-400 font-bold mb-1.5 uppercase">4. Clinical Twin Tier</h5>
                <p className="text-[11px] text-slate-400">Bayesian adaptive trial simulator stratifying digital twin cohorts by ctDNA baseline variant frequency.</p>
              </div>
            </div>
          </motion.div>
        )}
      </footer>

    </div>
  );
}

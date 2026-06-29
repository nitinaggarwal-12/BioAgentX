export interface AgentLog {
  id: string;
  name: string;
  role: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'CHALLENGED';
  timeTaken: string;
  confidence: number;
  summary: string;
  keyFindings: string[];
}

export interface TargetMolecule {
  name: string;
  smiles: string;
  formula: string;
  molecularWeight: number;
  predictedIC50: string;
  bindingAffinity: string;
  alphaFoldpLDDT: number;
}

export interface ADMETMetric {
  metric: string;
  value: number;
  benchmark: number;
}

export interface ExperimentalStep {
  step: number;
  name: string;
  duration: string;
  equipment: string;
  outcome: string;
}

export interface ProbingQuestion {
  id: string;
  sourceAgent: string;
  question: string;
  context: string;
  suggestedExploration: string;
}

export interface DiscoveryBlueprint {
  title: string;
  therapeuticArea: string;
  execSummary: string;
  consensusScore: number;
  agents: AgentLog[];
  targetMolecule: TargetMolecule;
  admetMetrics: ADMETMetric[];
  experimentalProtocol: ExperimentalStep[];
  probingQuestions: ProbingQuestion[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentName?: string;
  text: string;
  timestamp: string;
}

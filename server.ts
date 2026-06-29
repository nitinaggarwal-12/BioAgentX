import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Lazy initialize Gemini client
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

// Pre-baked rich domain simulations for instant Art-of-Possible exploration
const SAMPLE_SIMULATIONS: Record<string, any> = {
  default: {
    title: "KRAS G12D Allosteric Inhibitor for Pancreatic Ductal Adenocarcinoma",
    therapeuticArea: "Oncology & Targeted Therapeutics",
    execSummary: "Pancreatic Ductal Adenocarcinoma (PDAC) driven by KRAS G12D mutation presents severe therapeutic evasion due to high GTP affinity. Our multi-agent consortium hypothesized a novel non-covalent allosteric pocket binding approach (Switch II pocket) paired with targeted PROTAC degradation to achieve high cellular potency with minimal gastrointestinal toxicity.",
    consensusScore: 94,
    agents: [
      {
        id: "biolit",
        name: "BioLit Scholar Agent",
        role: "Literature & Patent Knowledge Graph",
        status: "COMPLETED",
        timeTaken: "1.4s",
        confidence: 96,
        summary: "Synthesized 14,200 PubMed abstracts and 840 WIPO patents. Identified critical resistance mechanisms in first-generation MRTX1133 analogues involving rapid MAPK pathway reactivation. Recommended dual inhibition or PROTAC linkage.",
        keyFindings: ["Resistance emerges via ERBB2 amplification within 72h", "Patent space around Switch II indole scaffolds is open (WIPO/2024/0892)", "Synergistic potential observed with SHP2 concurrent blockade"]
      },
      {
        id: "genomic",
        name: "Genomic Target Discovery",
        role: "Multi-Omics & AlphaFold Grounding",
        status: "COMPLETED",
        timeTaken: "2.1s",
        confidence: 92,
        summary: "Grounding with AlphaFold 3 predictions confirmed stable deep-pocket accessibility at Asp12 when the P-loop is locked in the GDP-bound inactive conformation. Calculated RMSD < 0.8Å.",
        keyFindings: ["High conservation of Switch II hydrophobic residues across patient PDAC organoids", "No cross-reactivity predicted with wild-type KRAS G12G", "Cryptic binding pocket volume expanded by 18% in simulated molecular dynamics"]
      },
      {
        id: "insilico",
        name: "In-Silico Lead Optimizer",
        role: "Medicinal Chemistry & ADMET Engine",
        status: "COMPLETED",
        timeTaken: "1.8s",
        confidence: 91,
        summary: "Iterated 4,500 virtual molecular modifications. Substituted fluorophenyl moiety with bicyclic pyrimidopyridazine to improve oral bioavailability and reduce plasma clearance.",
        keyFindings: ["LogP optimized to 2.85 (ideal membrane transport)", "Predicted hERG inhibition IC50 > 40 µM (low cardiac arrhythmia risk)", "Ames Mutagenicity assay predicted negative across all 5 strains"]
      },
      {
        id: "clinical",
        name: "Clinical Protocol Architect",
        role: "Digital Twin Trial Simulation",
        status: "COMPLETED",
        timeTaken: "1.5s",
        confidence: 89,
        summary: "Simulated Phase 1b/2 dose escalation across a digital twin cohort of n=850 metastatic PDAC patients. Stratified by baseline ctDNA KRAS allele frequency.",
        keyFindings: ["Recommended adaptive Bayesian 3+3 dose escalation design", "Identified optimal therapeutic window at 400mg BID", "Predicted objective response rate (ORR) of 42% in refractory second-line settings"]
      },
      {
        id: "regulatory",
        name: "Bio-Safety & Regulatory Agent",
        role: "FDA / EMA Compliance Auditor",
        status: "COMPLETED",
        timeTaken: "0.9s",
        confidence: 98,
        summary: "Audited compound trajectory against FDA Project Optimus oncology dosing guidelines. Flagged requirement for early hepatic enzyme monitoring.",
        keyFindings: ["Qualifies for FDA Fast Track & Orphan Drug Designation", "Recommended inclusion of hepatic biomarker panel (ALT/AST) in Week 2 protocol", "GLP toxicology study outline generated for rodent and non-rodent models"]
      }
    ],
    targetMolecule: {
      name: "GAX-9244 (Switch-II Allosteric PROTAC)",
      smiles: "CC1=NC=C(C(=N1)N2CCN(CC2)C3=CC=C(C=C3)C4=C(C=NN4C5CCNCC5)F)C#N",
      formula: "C28H31FN8O2",
      molecularWeight: 530.61,
      predictedIC50: "4.2 nM",
      bindingAffinity: "-12.4 kcal/mol",
      alphaFoldpLDDT: 94.8
    },
    admetMetrics: [
      { metric: "Cellular Potency", value: 95, benchmark: 80 },
      { metric: "Oral Bioavailability", value: 88, benchmark: 70 },
      { metric: "Metabolic Stability", value: 82, benchmark: 75 },
      { metric: "Cardiac Safety (hERG)", value: 92, benchmark: 85 },
      { metric: "BBB Non-Penetration", value: 91, benchmark: 90 },
      { metric: "Solubility (Aqueous)", value: 84, benchmark: 65 }
    ],
    experimentalProtocol: [
      { step: 1, name: "Recombinant KRAS G12D Expression & Purification", duration: "7 Days", equipment: "ÄKTA Pure Chromatography / E. coli BL21", outcome: ">95% purity monomeric protein verified by mass spectrometry." },
      { step: 2, name: "Surface Plasmon Resonance (SPR) Binding Kinetics", duration: "3 Days", equipment: "Biacore 8k", outcome: "Determine exact KD, k_on, and k_off association constants." },
      { step: 3, name: "3D Patient-Derived Organoid Viability Assay", duration: "14 Days", equipment: "PerkinElmer Opera Phenix High-Content Screen", outcome: "Verify IC50 < 10nM in primary human pancreatic adenocarcinoma models." },
      { step: 4, name: "In Vivo Pharmacokinetics (PK/PD) in Xenograft Mice", duration: "28 Days", equipment: "LC-MS/MS Bioanalysis Suite", outcome: "Confirm tumor tissue accumulation and sustained pERK suppression over 12h." }
    ],
    probingQuestions: [
      {
        id: "q1",
        sourceAgent: "Clinical Protocol Architect",
        question: "How do you plan to manage clonal heterogeneity when KRAS G12V or G12C sub-clones emerge during treatment?",
        context: "In our digital twin simulation, 18% of patients exhibited rapid outgrowth of non-G12D minor allele clones by cycle 4.",
        suggestedExploration: "Explore co-formulation with a pan-KRAS SOS1 inhibitor or adding an MEK downstream bottleneck blockade."
      },
      {
        id: "q2",
        sourceAgent: "In-Silico Lead Optimizer",
        question: "Would you accept a 15% reduction in aqueous solubility if substituting the piperazine ring increases half-life from 6h to 14h?",
        context: "Medicinal chemistry trade-off analysis shows the current scaffold undergoes rapid hepatic CYP3A4 glucuronidation.",
        suggestedExploration: "Review lipophilic efficiency (LipE) profiles or consider lipid nanoparticle (LNP) oral encapsulation."
      },
      {
        id: "q3",
        sourceAgent: "BioLit Scholar Agent",
        question: "Have you evaluated potential synergy with immunotherapy (anti-PD-1) given recent bioRxiv reports on KRAS inhibition remodeling the tumor microenvironment?",
        context: "Abstract PMID:38912044 demonstrates that sustained KRAS blockade induces intense CD8+ T-cell infiltration in cold tumors.",
        suggestedExploration: "Simulate an immuno-oncology combination arm in the Phase 1b trial protocol."
      }
    ]
  }
};

// Orchestrate multi-agent R&D inquiry
app.post("/api/orchestrate-rd", async (req, res) => {
  const { query, therapeuticArea, mode } = req.body;
  const ai = getAIClient();

  // If no Gemini API Key is configured or user requests instant demo, return smart fallback
  if (!ai || mode === "fast_mock") {
    // Check if query contains key terms to customize the response slightly
    const sim = JSON.parse(JSON.stringify(SAMPLE_SIMULATIONS.default));
    if (query && query.trim().length > 5) {
      sim.title = `Agentic Discovery Blueprint: ${query.slice(0, 60)}`;
      sim.execSummary = `Multi-agent investigative synthesis conducted for "${query}". The autonomous scientific team collaborated across genomic databases, ADMET structural modeling, and clinical trial simulations to establish a high-confidence development roadmap.`;
    }
    if (therapeuticArea) sim.therapeuticArea = therapeuticArea;
    return res.json({ success: true, data: sim, source: "simulation" });
  }

  try {
    const prompt = `You are the Google Cloud Life Sciences Agentic AI Orchestrator. 
The researcher wants to explore the "Art of Possible" for R&D discovery:
Topic/Question: "${query}"
Therapeutic Area: "${therapeuticArea || 'General Life Sciences'}"

Simulate a team of 5 specialized AI agents collaborating on this discovery:
1. BioLit Scholar (Literature & Patents)
2. Genomic Target Discovery (Multi-omics & AlphaFold)
3. In-Silico Lead Optimizer (Medicinal Chemistry & ADMET)
4. Clinical Protocol Architect (Trial simulation)
5. Bio-Safety & Regulatory Auditor (FDA compliance)

Generate a JSON object with this exact schema:
{
  "title": "Concise scientific title of the proposed breakthrough",
  "therapeuticArea": "${therapeuticArea || 'Targeted Therapeutics'}",
  "execSummary": "2-3 sentence high level scientific summary of the breakthrough hypothesis and approach.",
  "consensusScore": number between 85 and 98,
  "agents": [
    {
      "id": "biolit|genomic|insilico|clinical|regulatory",
      "name": "Full Agent Name",
      "role": "Agent Subtitle Role",
      "status": "COMPLETED",
      "timeTaken": "1.X s",
      "confidence": number 88-99,
      "summary": "2 sentence summary of agent's investigation",
      "keyFindings": ["finding 1", "finding 2", "finding 3"]
    }
    // exactly 5 agents matching the list above
  ],
  "targetMolecule": {
    "name": "Code name or lead candidate name",
    "smiles": "Valid or realistic SMILES string",
    "formula": "Chemical formula e.g. C26H30N6O3",
    "molecularWeight": number around 450-600,
    "predictedIC50": "e.g. 3.8 nM",
    "bindingAffinity": "e.g. -11.8 kcal/mol",
    "alphaFoldpLDDT": number 90-98
  },
  "admetMetrics": [
    { "metric": "Cellular Potency", "value": number 80-98, "benchmark": 80 },
    { "metric": "Oral Bioavailability", "value": number 70-95, "benchmark": 70 },
    { "metric": "Metabolic Stability", "value": number 75-95, "benchmark": 75 },
    { "metric": "Cardiac Safety (hERG)", "value": number 85-98, "benchmark": 85 },
    { "metric": "BBB Non-Penetration", "value": number 80-95, "benchmark": 90 },
    { "metric": "Solubility (Aqueous)", "value": number 75-95, "benchmark": 65 }
  ],
  "experimentalProtocol": [
    { "step": 1, "name": "Step 1 title", "duration": "X Days", "equipment": "Lab equipment name", "outcome": "Expected validation result" },
    { "step": 2, "name": "Step 2 title", "duration": "X Days", "equipment": "Lab equipment name", "outcome": "Expected validation result" },
    { "step": 3, "name": "Step 3 title", "duration": "X Days", "equipment": "Lab equipment name", "outcome": "Expected validation result" },
    { "step": 4, "name": "Step 4 title", "duration": "X Days", "equipment": "Lab equipment name", "outcome": "Expected validation result" }
  ],
  "probingQuestions": [
    {
      "id": "q1",
      "sourceAgent": "Agent Name e.g. Clinical Protocol Architect",
      "question": "Deep probing scientific question for the Principal Investigator",
      "context": "Why this question matters based on data",
      "suggestedExploration": "How the researcher can test or address this trade-off"
    },
    {
      "id": "q2",
      "sourceAgent": "Agent Name e.g. In-Silico Lead Optimizer",
      "question": "Deep probing scientific question for the Principal Investigator",
      "context": "Why this question matters based on data",
      "suggestedExploration": "How the researcher can test or address this trade-off"
    },
    {
      "id": "q3",
      "sourceAgent": "Agent Name e.g. BioLit Scholar Agent",
      "question": "Deep probing scientific question for the Principal Investigator",
      "context": "Why this question matters based on data",
      "suggestedExploration": "How the researcher can test or address this trade-off"
    }
  ]
}
Return ONLY valid raw JSON without codeblock markdown fences if possible.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json({ success: true, data, source: "gemini_live" });
  } catch (error) {
    console.error("Gemini API Error, falling back to rich mockup simulation:", error);
    const fallback = JSON.parse(JSON.stringify(SAMPLE_SIMULATIONS.default));
    fallback.title = `R&D Discovery Synthesis: ${query}`;
    return res.json({ success: true, data: fallback, source: "fallback_simulation" });
  }
});

// Co-Scientist Chat endpoint
app.post("/api/co-scientist-chat", async (req, res) => {
  const { agentName, question, topicContext } = req.body;
  const ai = getAIClient();

  if (!ai) {
    return res.json({
      reply: `[${agentName} Simulated Response]: That is a fascinating inquiry regarding "${topicContext}". Based on our multi-agent knowledge graph analysis, we recommend prioritizing structural validation via cryo-EM before proceeding to large-scale rodent pharmacokinetic screening. Would you like me to adjust the ADMET constraint thresholds?`
    });
  }

  try {
    const prompt = `You are ${agentName || 'Co-Scientist AI Agent'}, part of Google Cloud's Life Sciences Multi-Agent AI team exploring "${topicContext}".
The Principal Investigator asks: "${question}"

Provide a concise, highly insightful, world-class scientific response (2-3 paragraphs max). Speak collegially as an expert peer scientist. Highlight any biochemical trade-offs or data-driven hypotheses.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    return res.json({ reply: response.text });
  } catch (err) {
    return res.json({
      reply: `As the ${agentName}, I analyzed your question against recent multi-omics datasets. The key consideration is balancing target occupancy with off-target kinase selectivity. Let's run an in-silico docking simulation to confirm the binding free energy delta.`
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BioAgentX Life Sciences Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

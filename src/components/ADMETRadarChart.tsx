import React from 'react';
import { ADMETMetric } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ADMETRadarChartProps {
  metrics: ADMETMetric[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950 border border-slate-700 p-3 rounded-lg shadow-xl text-xs font-mono">
        <p className="font-bold text-cyan-400 mb-1 font-sans">{data.metric}</p>
        <p className="text-emerald-400">Predicted Candidate: {data.value}%</p>
        <p className="text-slate-400">Clinical Benchmark: {data.benchmark}%</p>
      </div>
    );
  }
  return null;
};

export const ADMETRadarChart: React.FC<ADMETRadarChartProps> = ({ metrics }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-950 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-lg shadow-teal-500/10">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">Pharmacokinetics Engine</span>
              <h3 className="text-xl font-bold text-white tracking-tight">ADMET Safety Profile</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400"><span className="h-2 w-2 rounded-full bg-cyan-400"></span> Candidate</span>
            <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-slate-500"></span> Benchmark</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Multi-parameter virtual screening computed by In-Silico Lead Optimizer Agent.
        </p>
      </div>

      {/* Recharts Radar Chart */}
      <div className="w-full h-[280px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metrics}>
            <PolarGrid stroke="#334155" strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'sans-serif' }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Benchmark Polygon */}
            <Radar
              name="Clinical Benchmark"
              dataKey="benchmark"
              stroke="#64748b"
              fill="#64748b"
              fillOpacity={0.2}
            />

            {/* Candidate Polygon */}
            <Radar
              name="Lead Candidate"
              dataKey="value"
              stroke="#06b6d4"
              fill="#06b6d4"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer */}
      <div className="border-t border-slate-800 pt-4 mt-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
          <ShieldCheck className="h-4 w-4" />
          <span>Passed 6/6 Safety Hurdles</span>
        </div>
        <span className="text-slate-400 font-mono text-[11px]">No hERG / Ames Flag</span>
      </div>
    </div>
  );
};

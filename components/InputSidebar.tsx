import React from 'react';
import { CampaignInputs } from '../types';
import { Settings, Layers, DollarSign, Globe, Briefcase, Zap, Sparkles } from 'lucide-react';

interface InputSidebarProps {
  inputs: CampaignInputs;
  setInputs: React.Dispatch<React.SetStateAction<CampaignInputs>>;
  isGenerated: boolean;
  onGenerate: () => void;
}

export const InputSidebar: React.FC<InputSidebarProps> = ({ inputs, setInputs, isGenerated, onGenerate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full lg:w-96 bg-zinc-50/50 flex flex-col h-full overflow-hidden relative">
      {/* Decorative bg gradient */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-0"></div>

      <div className="p-6 border-b border-zinc-200 bg-white/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-electric p-2.5 rounded-xl shadow-[0_4px_12px_rgba(0,67,255,0.25)]">
             <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-zinc-900 tracking-tight leading-none">Campaign<br/>Orchestrator</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Input Parameters</div>

        {/* Industries */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-electric transition-colors">
            <Briefcase className="w-3.5 h-3.5" />
            Target Industries
          </label>
          <textarea
            name="targetIndustries"
            value={inputs.targetIndustries}
            onChange={handleChange}
            placeholder="e.g. B2B SaaS, Healthcare, FinTech"
            className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-sm text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all h-20 resize-none shadow-sm hover:shadow-md hover:border-zinc-300"
          />
        </div>

        {/* Pain Points */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-electric transition-colors">
            <Zap className="w-3.5 h-3.5" />
            Business Pain Points
          </label>
          <textarea
            name="painPoints"
            value={inputs.painPoints}
            onChange={handleChange}
            placeholder="e.g. High churn, low LTV, legacy systems"
            className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-sm text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all h-24 resize-none shadow-sm hover:shadow-md hover:border-zinc-300"
          />
        </div>

        {/* Services */}
        <div className="space-y-2 group">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-electric transition-colors">
            <Settings className="w-3.5 h-3.5" />
            Services / Solutions
          </label>
          <textarea
            name="solutions"
            value={inputs.solutions}
            onChange={handleChange}
            placeholder="e.g. Cloud Migration, AI Customer Support, Staff Augmentation"
            className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-sm text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all h-24 resize-none shadow-sm hover:shadow-md hover:border-zinc-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Geographies */}
            <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-electric transition-colors">
                <Globe className="w-3.5 h-3.5" />
                Region
            </label>
            <input
                type="text"
                name="geographies"
                value={inputs.geographies}
                onChange={handleChange}
                placeholder="e.g. EMEA"
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all shadow-sm hover:shadow-md hover:border-zinc-300"
            />
            </div>

            {/* Budget */}
            <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 group-focus-within:text-electric transition-colors">
                <DollarSign className="w-3.5 h-3.5" />
                Budget
            </label>
            <input
                type="text"
                name="budget"
                value={inputs.budget}
                onChange={handleChange}
                placeholder="$50k/mo"
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all shadow-sm hover:shadow-md hover:border-zinc-300"
            />
            </div>
        </div>
      </div>

      <div className="p-6 border-t border-zinc-200 bg-white z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button
          onClick={onGenerate}
          className="w-full group bg-electric hover:bg-electric-600 text-white font-bold py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_-5px_rgba(0,67,255,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(0,67,255,0.5)] transform hover:-translate-y-0.5"
        >
          {isGenerated ? (
            <>
              <Layers className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> Update Strategy
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-white animate-pulse" /> Generate Campaign
            </>
          )}
        </button>
        {isGenerated && (
          <p className="text-center text-[10px] text-zinc-400 mt-3 font-medium tracking-wide">
            AI will regenerate the active strategy tab.
          </p>
        )}
      </div>
    </div>
  );
};

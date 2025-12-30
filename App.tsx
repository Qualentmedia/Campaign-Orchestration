import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { InputSidebar } from './components/InputSidebar';
import { TabContent } from './components/TabContent';
import { CampaignInputs, TabState, TabId, TabData } from './types';
import { generateTabContent } from './services/geminiService';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Magnet, 
  Search, 
  Megaphone, 
  Mail, 
  Share2, 
  Newspaper 
} from 'lucide-react';

const INITIAL_TABS: TabState = {
  [TabId.Orchestration]: { id: TabId.Orchestration, label: 'Orchestration', icon: 'LayoutDashboard', content: '', status: 'idle' },
  [TabId.ICP]: { id: TabId.ICP, label: 'Messaging', icon: 'Users', content: '', status: 'idle' },
  [TabId.ContentStrategy]: { id: TabId.ContentStrategy, label: 'Content', icon: 'FileText', content: '', status: 'idle' },
  [TabId.LeadMagnet]: { id: TabId.LeadMagnet, label: 'Lead Magnets', icon: 'Magnet', content: '', status: 'idle' },
  [TabId.SEO]: { id: TabId.SEO, label: 'SEO', icon: 'Search', content: '', status: 'idle' },
  [TabId.Ads]: { id: TabId.Ads, label: 'Ads', icon: 'Megaphone', content: '', status: 'idle' },
  [TabId.Email]: { id: TabId.Email, label: 'Email', icon: 'Mail', content: '', status: 'idle' },
  [TabId.Social]: { id: TabId.Social, label: 'Social', icon: 'Share2', content: '', status: 'idle' },
  [TabId.PR]: { id: TabId.PR, label: 'PR', icon: 'Newspaper', content: '', status: 'idle' },
};

export default function App() {
  const [inputs, setInputs] = useState<CampaignInputs>({
    targetIndustries: '',
    painPoints: '',
    solutions: '',
    geographies: '',
    budget: '',
  });

  const [activeTabId, setActiveTabId] = useState<TabId>(TabId.Orchestration);
  const [tabs, setTabs] = useState<TabState>(INITIAL_TABS);
  const [isGenerated, setIsGenerated] = useState(false);

  const updateTab = (id: TabId, updates: Partial<TabData>) => {
    setTabs(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  const fetchTabContent = useCallback(async (id: TabId, force = false) => {
    if (!inputs.targetIndustries) return;
    if (!force && tabs[id].status === 'success') return;

    updateTab(id, { status: 'loading', error: undefined });

    try {
      const content = await generateTabContent(id, inputs);
      updateTab(id, { status: 'success', content });
    } catch (err: any) {
      updateTab(id, { status: 'error', error: err.message || 'Failed to generate content.' });
    }
  }, [inputs, tabs]);

  const handleGenerate = () => {
    if (!inputs.targetIndustries) {
        alert("Please enter target industries at minimum.");
        return;
    }
    setIsGenerated(true);
    setTabs(prev => {
        const newTabs = { ...prev };
        Object.keys(newTabs).forEach(key => {
            newTabs[key].status = 'idle';
            newTabs[key].content = '';
        });
        return newTabs;
    });
    fetchTabContent(activeTabId, true);
  };

  useEffect(() => {
    if (isGenerated && tabs[activeTabId].status === 'idle') {
      fetchTabContent(activeTabId);
    }
  }, [activeTabId, isGenerated, fetchTabContent, tabs]);

  const IconMap: Record<string, React.FC<any>> = {
    LayoutDashboard, Users, FileText, Magnet, Search, Megaphone, Mail, Share2, Newspaper
  };

  const renderNavigation = () => (
    <div className="flex overflow-x-auto no-scrollbar border-b border-zinc-200 bg-white px-2">
      {Object.values(tabs).map((tab) => {
        const Icon = IconMap[tab.icon];
        const isActive = activeTabId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id as TabId)}
            className={`
              relative flex items-center gap-2 px-5 py-4 text-sm font-bold whitespace-nowrap transition-all
              ${isActive 
                ? 'text-electric' 
                : 'text-zinc-500 hover:text-zinc-800'}
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            {tab.label}
            {/* Active Indicator */}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-electric shadow-[0_-2px_6px_rgba(0,67,255,0.4)] rounded-t-full" />
            )}
            
            {/* Loading Indicator */}
            {tab.status === 'loading' && (
               <span className="absolute top-3 right-2 w-1.5 h-1.5 bg-electric rounded-full animate-ping" />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <Layout
      sidebar={
        <InputSidebar 
          inputs={inputs} 
          setInputs={setInputs} 
          isGenerated={isGenerated}
          onGenerate={handleGenerate} 
        />
      }
      navigation={renderNavigation()}
      content={
        <TabContent 
          activeTabId={activeTabId} 
          data={tabs[activeTabId]} 
          inputsFilled={isGenerated}
          onRetry={() => fetchTabContent(activeTabId, true)}
        />
      }
    />
  );
}

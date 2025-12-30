export interface CampaignInputs {
  targetIndustries: string;
  painPoints: string;
  solutions: string;
  geographies: string;
  budget: string;
}

export enum TabId {
  Orchestration = 'orchestration',
  ICP = 'icp',
  ContentStrategy = 'content',
  LeadMagnet = 'lead-magnet',
  SEO = 'seo',
  Ads = 'ads',
  Email = 'email',
  Social = 'social',
  PR = 'pr',
}

export interface TabData {
  id: TabId;
  label: string;
  icon: string;
  content: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}

export interface TabState {
  [key: string]: TabData;
}

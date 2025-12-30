import { CampaignInputs, TabId } from '../types';

const BASE_SYSTEM = `You are a world-class CMO and Marketing Strategist. You provide actionable, execution-ready marketing plans. 
IMPORTANT: 
- Use Markdown for formatting. 
- Use TABLES strictly for any structured data, lists of metrics, keywords, or schedules.
- Ensure all tables are preceded and followed by an empty line to ensure proper rendering.
- Use H3 headers for subsections.
- Keep the tone professional, strategic, and concise.`;

export const getPromptForTab = (tabId: TabId, inputs: CampaignInputs): string => {
  const context = `
    Context:
    - Target Industries: ${inputs.targetIndustries}
    - Business Pain Points: ${inputs.painPoints}
    - Services/Solutions: ${inputs.solutions}
    - Target Geographies: ${inputs.geographies}
    - Budget: ${inputs.budget}
  `;

  switch (tabId) {
    case TabId.Orchestration:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 1: Campaign Orchestration & ICP Analysis
        
        1. Deeply analyze the ICP for each industry provided.
        2. Create a Table for the ICP Breakdown with columns: Industry, Decision Maker, Buying Trigger, Key Objection.
        3. Create a Table mapping Pain Points to Your Solutions and Value Props.
        4. Provide a summary of priority industries based on budget.
        
        Output format: Structured Markdown.
      `;

    case TabId.ICP:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 2: ICP Deep Dive & Messaging Framework
        
        1. Create a Table for Target Audience Personas (Columns: Role, Seniority, Core Need, Buying Driver).
        2. Create a detailed Messaging Framework. Use a Table with columns: Pillar Name, Core Message, Proof Point, Objection Handler.
        3. Map the buying stages (Awareness, Consideration, Decision) in a list format.
        
        Output format: Structured Markdown.
      `;

    case TabId.ContentStrategy:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 3: AI Content Strategy (Pillar–Cluster Model)
        
        1. Pillar Pages Strategy: Present 3 major pillars.
        2. For each pillar, create a Table of Cluster Topics with columns: Topic, Primary Keyword, Search Intent (Info/Comm), Est. Difficulty.
        3. Case Study Strategy: Define 3 specific case study concepts (Industry, Funnel Stage, Key Metrics).
        
        Output format: Structured Markdown.
      `;

    case TabId.LeadMagnet:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 4: AI Lead Magnet & Asset Strategy
        
        Create a strategy for 3-5 high-value lead magnets.
        
        Output as a Table with columns:
        - Asset Name
        - Type (Guide/Checklist/Report)
        - Target ICP
        - Funnel Stage
        - Gated? (Yes/No)
        - Primary Distribution Channel
        
        Follow with a brief description of the "Hook" for each asset.
        
        Output format: Structured Markdown.
      `;

    case TabId.SEO:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 5: AI SEO & Keyword Intelligence Engine
        
        1. High-Intent Commercial Keywords Table (Columns: Keyword, Intent, Est. Vol, Difficulty).
        2. Problem-Aware Keywords Table (Columns: Keyword, User Problem, Content Angle).
        3. Content Mapping Table (Columns: Page Type, Target Keyword, Messaging Pillar, Internal Link Strategy).
        
        Output format: Structured Markdown.
      `;

    case TabId.Ads:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 6: Advertising Planner
        
        A. Google Ads Planner
        - Present Campaign Structure.
        - Table for Keyword Themes & Match Types.
        - Create 3 sample Ad Copies (Headlines + Descriptions) in a code block or distinct section.
        
        B. LinkedIn Ads Planner
        - Table for Targeting Criteria (Columns: Attribute, Value).
        - Table for Ad Formats & Objectives.
        - Sample Sponsored Content copy.
        
        Output format: Structured Markdown.
      `;

    case TabId.Email:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 7: AI Email Sequence Generator
        
        Create 3 distinct email sequences.
        
        For each sequence:
        1. Define Objective & Target Persona.
        2. Provide the full email copy in individual Code Blocks for easy copying.
        3. Include Subject Line, Body, and Call to Action.
        
        Output format: Structured Markdown.
      `;

    case TabId.Social:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 8: Social Media Plan Generator
        
        1. Create a Table for Posting Frequency (Columns: Platform, Frequency, Content Types, Time).
        2. Content Mix Strategy (Educational vs Authority vs Promo).
        3. Provide 3 specific Video/Reel Hook Scripts in code blocks.
        4. Engagement Strategy bullet points.
        
        Output format: Structured Markdown.
      `;

    case TabId.PR:
      return `
        ${BASE_SYSTEM}
        ${context}
        
        TASK: TAB 9: PR & Communications Plan
        
        1. Table of Story Angles per ICP (Columns: ICP, Story Angle, Media Type).
        2. Table of Target Media Publications (Columns: Category, Publication Name, Relevance).
        3. List of suggested Events or Speaking Opportunities.
        4. Executive Visibility Plan.
        
        Output format: Structured Markdown.
      `;
      
    default:
      return '';
  }
};

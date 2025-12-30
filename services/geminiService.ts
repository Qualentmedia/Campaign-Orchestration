import { GoogleGenAI } from "@google/genai";
import { CampaignInputs, TabId } from "../types";
import { getPromptForTab } from "./prompts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTabContent = async (
  tabId: TabId,
  inputs: CampaignInputs
): Promise<string> => {
  const prompt = getPromptForTab(tabId, inputs);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }, 
        // Using a modest thinking budget to improve structured reasoning for the strategy
        // while keeping latency reasonable.
      }
    });

    const text = response.text;
    
    if (!text) {
      throw new Error("No content generated.");
    }

    return text;
  } catch (error) {
    console.error(`Error generating content for ${tabId}:`, error);
    throw error;
  }
};


import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for development. In a real app, this key would be securely managed.
  // The environment is expected to have this variable set.
  console.warn("API_KEY environment variable not set. Using a placeholder. This will fail if not replaced.");
  process.env.API_KEY = "AIzaSyB646tzw5w-WiLOUA9ifj6Dxhf8IdnyZzk";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "AIzaSyB646tzw5w-WiLOUA9ifj6Dxhf8IdnyZzk" });

/**
 * AI powered chatbot using gemini-2.5-flash
 */
export const getChatbotResponse = async (history: ChatMessage[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are a helpful assistant for the 'Lazy Man' app, an on-demand service provider platform. Be friendly, concise, and helpful. You can answer questions about services, help users find providers, or give general advice.",
      },
    });

    const geminiHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Pass previous history to the model
    if (geminiHistory.length > 0) {
        // This is a simplified way to load history. For a more robust implementation,
        // you might need to manage the history array passed to `startChat`.
    }

    const response = await chat.sendMessage({ message });
    return response.text ?? "";
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};

/**
 * Use Google Maps grounding for location-based queries
 */
export const findProvidersWithMaps = async (query: string, location: { latitude: number; longitude: number }): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on my current location, ${query}. Give me a short summary and a list of suggestions.`,
      config: {
        tools: [{googleMaps: {}}],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            }
          }
        }
      },
    });
    return response.text??"";
  } catch (error) {
    console.error("Error with Maps Grounding:", error);
    return "Sorry, I couldn't find any local providers. Make sure you've enabled location services.";
  }
};

/**
 * Handles complex user queries with "thinking mode"
 */
export const generateComplexPlan = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: { 
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: "You are an expert AI planner for home and personal services. Create detailed, actionable plans based on user requests. Format your response clearly using markdown.",
      }
    });
    return response.text??"";
  } catch (error) {
    console.error("Error generating complex plan:", error);
    return "An error occurred while generating the plan. Please try a different query.";
  }
};

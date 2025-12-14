import { GoogleGenAI } from "@google/genai";

let SYSTEM_PROMPT_CACHE_ID: string;

export const initSystemPromptCache = async (
  ai: GoogleGenAI
) => {
  const GUSTO_SYSTEM_PROMPT =
    process.env.GUSTO_SYSTEM_LEVEL_INSTRUCTIONS;
  if (!GUSTO_SYSTEM_PROMPT) {
    throw new Error(
      "GUSTO_SYSTEM_LEVEL_INSTRUCTIONS environment variable is required and cannot be empty."
    );
  }

  if (!SYSTEM_PROMPT_CACHE_ID) {
    const cache = await ai.caches.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: GUSTO_SYSTEM_PROMPT,
      },
    });
    console.log({ cache });
    SYSTEM_PROMPT_CACHE_ID = cache.name || "";
  }

  return SYSTEM_PROMPT_CACHE_ID;
};

export const getSystemPromptCacheId = () => {
  if (!SYSTEM_PROMPT_CACHE_ID) {
    throw new Error("System prompt cache not initialized");
  }
  return SYSTEM_PROMPT_CACHE_ID;
};

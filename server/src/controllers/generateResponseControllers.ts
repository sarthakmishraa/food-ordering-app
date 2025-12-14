import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const googleApiKey =
  process.env.GOOGLE_AI_STUDIO_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: googleApiKey });

const SYSTEM_PROMPT =
  process.env.GUSTO_SMALL_SYSTEM_LEVEL_INSTRUCTIONS;

// (async () => {
//   // cache does not work on free tier
//   await initSystemPromptCache(ai); // initialize cache on startup
// })();

export const generateResponse = async (
  req: Request,
  res: Response
) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // const SYSTEM_PROMPT_CACHE_ID = getSystemPromptCacheId();

  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      res.status(404).send("Invalid prompt");
      return;
    }

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents:
        `${SYSTEM_PROMPT}\n\n User Asked: \n${prompt}` ||
        "",
      // config: {
      //   cachedContent: SYSTEM_PROMPT_CACHE_ID,
      // },
    });
    for await (const chunk of response) {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
    }
    res.write("data: [DONE]\n\n");
    res.status(200);
    res.end();
  } catch (err) {
    console.error(err);
    res.write(`data: ${JSON.stringify({ err })}\n\n`);
    res.end();
  }
};

import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSkillAdvice = async (
  learningGoal: string,
  currentSkills: string[]
): Promise<{ advice: string; roadmap: string[] }> => {
  if (!apiKey) {
    return {
      advice: "API Key missing. Please configure the environment.",
      roadmap: ["Check API Key", "Retry"]
    };
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      User wants to learn: ${learningGoal}.
      User already knows: ${currentSkills.join(', ')}.
      
      Act as a friendly skill-swap coach.
      1. Provide a short, encouraging paragraph connecting their current skills to the new goal if possible.
      2. Provide a 4-step bulleted learning roadmap.
      
      Output JSON format.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            roadmap: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["advice", "roadmap"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      advice: "I'm having trouble connecting to the skill network right now. Try again later!",
      roadmap: []
    };
  }
};

export const suggestSkills = async (bio: string): Promise<string[]> => {
  if (!apiKey) return ["Coding", "Cooking", "Guitar"];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on this user bio: "${bio}", suggest 5 specific skills they might be interested in learning or swapping. Return only a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
         responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    return ["Photography", "Public Speaking", "React.js"];
  }
};
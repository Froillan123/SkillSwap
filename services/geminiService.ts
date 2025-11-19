
import { GoogleGenAI, Type } from "@google/genai";
import { CareerPath } from "../types";

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

export const translateSkillConcept = async (concept: string, analogy: string): Promise<string> => {
  if (!apiKey) return `Imagine ${concept} but like ${analogy}... (AI Config Missing)`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain the concept of "${concept}" using an analogy related to "${analogy}". Keep it short, fun, and educational (max 3 sentences).`,
    });
    return response.text || "Could not translate concept.";
  } catch (error) {
    return "AI translator offline.";
  }
};

export const generateCareerPath = async (dreamJob: string): Promise<CareerPath> => {
  if (!apiKey) {
    return {
      jobTitle: dreamJob,
      estimatedSalary: "$80,000 - $120,000",
      steps: [
        { title: "Learn Basics", description: "Master the fundamentals.", duration: "1-2 Months", skills: ["Basics"] },
        { title: "Build Projects", description: "Create a portfolio.", duration: "2-3 Months", skills: ["Project Mgmt"] }
      ]
    };
  }

  try {
    const prompt = `
      Create a career roadmap for someone who wants to become a "${dreamJob}".
      Provide an estimated salary range (USD).
      Provide 3-4 major steps.
      Output JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            jobTitle: { type: Type.STRING },
            estimatedSalary: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  skills: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error(error);
    return {
      jobTitle: dreamJob,
      estimatedSalary: "Unavailable",
      steps: []
    };
  }
};

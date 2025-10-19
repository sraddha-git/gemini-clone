

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Replace with your actual Gemini API key
// export const ai = new GoogleGenerativeAI({
//   apiKey: "AIzaSyABv6nFbDzF_EDknsu3wRfCFCvSx2tl6pA",
// });


// export const run = async (prompt) => {
//   try {
//     console.log("Sending prompt to Gemini:", prompt);

//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       prompt: [
//         { author: "user", content: prompt } // required format for 2.5 flash
//       ],
//       temperature: 0.7,
//       maxOutputTokens: 400,
//     });

//     const text = response.candidates[0].content[0].text;
//     console.log("Received from Gemini:", text);
//     return text;

//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "Something went wrong. Please try again.";
//   }
// };
// import { GoogleGenAI } from "@google/genai"; // not "@google/generative-ai"
// export const ai = new GoogleGenAI({
//   apiKey: "AIzaSyABv6nFbDzF_EDknsu3wRfCFCvSx2tl6pA",
// });
// export const run = async (prompt) => {
//   try {
//     console.log("Sending prompt to Gemini:", prompt);

//     const response = await ai.models.generateText({
//       model: "gemini-2.5-flash",
//       input: prompt,
//       temperature: 0.7,
//       maxOutputTokens: 400,
//     });

//     console.log("Received from Gemini:", response.outputText);
//     return response.outputText;

//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "Something went wrong. Please try again.";
//   }
// };
// src/config/gemini.js
import { GoogleGenAI } from "@google/genai";

// Initialize AI client
export const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Function to send a prompt
export const run = async (prompt) => {
  try {
    console.log("Sending prompt to Gemini:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt, // just a string
      temperature: 0.7,
      maxOutputTokens: 400,
    });

    console.log("Received from Gemini:", response.text);
    return response.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please try again.";
  }
};

import { vertexAIModel } from "../config/vertexAIConfig";

async function responseGeminiAndStateSetting(prompt, stateSetters) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${vertexAIModel.modelName}:generateContent?key=${vertexAIModel.apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }]
                    }
                ]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            stateSetters.setValue(data.candidates[0].content.parts[0].text);
            stateSetters.setLoading(false);
        } else {
            stateSetters.setError(true);
            stateSetters.setLoading(false);
        }
    } catch (error) {
        console.error("Error contacting Gemini API:", error);
        stateSetters.setError(true);
        stateSetters.setLoading(false);
    }
}

export default responseGeminiAndStateSetting;
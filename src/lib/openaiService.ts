/**
 * OpenAI Service for chatbot integration
 */

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const generateChatResponse = async (
  messages: ChatMessage[],
): Promise<string> => {
  try {
    const apiKey =
      "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";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful IT support assistant for OC Tech Support, a company that provides IT services to small businesses and home clients in Orange County. Your name is TechBot. Keep responses brief and focused on IT support topics. Services include network setup, computer repair, security camera installation, and Wi-Fi optimization. If asked about pricing, mention that it varies by service and suggest booking a consultation. Business hours are Monday-Friday 8am-6pm.",
          },
          ...messages,
        ],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return "I'm having trouble connecting to my knowledge base right now. Please try again later or contact us directly at (949) 555-1234.";
    }

    const data = (await response.json()) as ChatCompletionResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later or contact us directly at (949) 555-1234.";
  }
};

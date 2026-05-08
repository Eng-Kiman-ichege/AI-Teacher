export async function chatCompletion(messages: any[], isJson = false) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not defined");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000", // Optional
      "X-Title": "AI Teacher Platform", // Optional
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      messages: messages,
      ...(isJson && { response_format: { type: "json_object" } }),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("OpenRouter Error Details:", JSON.stringify(error, null, 2));
    throw new Error(error.error?.message || "Failed to fetch from OpenRouter");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

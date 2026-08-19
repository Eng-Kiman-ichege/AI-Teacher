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
      model: "openrouter/free",
      messages: messages,
      max_tokens: 4000,
      // Disable JSON mode for free models as it's often unsupported
      // ...(isJson && { response_format: { type: "json_object" } }),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("OpenRouter Error Details:", JSON.stringify(error, null, 2));

    if (response.status === 402) {
      throw new Error("INSUFFICIENT_CREDITS: Your OpenRouter account has run out of credits. Please top up at https://openrouter.ai/settings/credits");
    }

    throw new Error(error.error?.message || "Failed to fetch from OpenRouter");
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  if (!content) {
    console.error("OpenRouter returned an empty content field. Full response:", JSON.stringify(data, null, 2));
  }

  return content;
}

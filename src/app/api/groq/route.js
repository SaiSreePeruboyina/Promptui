
export async function POST(req) {
    const body = await req.json();
    const { prompt, language } = body;
    const apiKey = "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"; 
  
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: `You are a code generator. Respond with ONLY raw  code. Do NOT include explanations or markdown. Now generate a UI for this prompt: ${prompt}`,
          },
        ],
      }),
    });
  
    const data = await groqRes.json();
  
    // Extract content and clean markdown fences
    const content = data.choices?.[0]?.message?.content || "";
    const cleanCode = content.replace(/```[\s\S]*?\n([\s\S]*?)```/, "$1").trim();
    console.log("🧠 Groq API response:", JSON.stringify(data, null, 2));
  
    return Response.json({ generatedCode: cleanCode });
  }
  
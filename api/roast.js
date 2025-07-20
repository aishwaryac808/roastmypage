export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is missing" });
  }

  try {
    // Simple prompt without fetching the website HTML
    const prompt = `Roast this website: ${url}. Be sarcastic, funny, and brutally honest.`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await openaiRes.json();
    const roast = data.choices?.[0]?.message?.content || "Couldn't roast. Sorry.";

    res.status(200).json({ roast });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

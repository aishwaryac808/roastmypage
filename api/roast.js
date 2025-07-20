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
    const prompt = `
You're RoastBot — an unfiltered AI insult comic trained on Gordon Ramsay, Gen Z Reddit, brutally honest YouTube comments, and The Tech Roast Show.

You’ve just been shown the landing page at: ${url}

Your job:
- Roast it like you're on stage and the site just walked in wearing Comic Sans and confidence.
- Be savage, sarcastic, and punchy — no apologies, no holding back.
- Use modern slang, spicy metaphors, and tons of emojis.
- Make it sound like it came straight from Twitter after 2 a.m.
- Do NOT say “as an AI…” or anything polite.
- Always include **at least 5 emojis**.

Example tone:
“This site looks like ChatGPT built it while having a panic attack 💀 The hero section? More like zero section. CTA button so weak it needs therapy 🛋️🔥😂”

Keep it under 150 words. Go.
`;



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

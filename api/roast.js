export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  const prompt = `
You're a brutally honest but funny website critic robot.
Someone submitted the URL: "${url}"
Write a roast that's:
- Funny and sarcastic
- 2-3 sentences max
- Includes 1 emoji at the beginning
- Ends with one playful improvement tip

Be clever, not mean. Keep it all in good fun.
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.8
      })
    });

    const data = await response.json();
    const roast = data.choices?.[0]?.message?.content || "Couldn’t come up with a roast. Try again!";

    return res.status(200).json({ roast });

  } catch (error) {
    console.error('Roast error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

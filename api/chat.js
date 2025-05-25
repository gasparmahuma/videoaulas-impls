export default async (req, res) => {
  // Configuração de CORS para segurança
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  try {
    const { messages } = req.body;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7
      })
    });

    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
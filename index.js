import express from "express";
import EdgeTTS from "edge-tts"; // <-- Correção principal: removidas as chaves {}

const app = express();

app.use(express.json());

app.post("/gerar-audio", async (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "Texto não informado" });
  }

  try {
    const tts = new EdgeTTS({
      voice: "pt-BR-FranciscaNeural"
    });

    const audioBuffer = await tts.synthesize(texto);

    res.setHeader("Content-Type", "audio/mpeg");
    return res.send(audioBuffer);
    
  } catch (error) {
    // Adicionei o console.error aqui para facilitar caso outro erro aconteça!
    console.error("Erro no TTS:", error); 
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando na porta 3000!"); // Um aviso para você saber que ligou certo
});

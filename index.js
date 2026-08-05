import express from "express";
import { EdgeTTS } from "edge-tts";

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
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.listen(3000, "0.0.0.0");

const express = require("express");
const { tts } = require("edge-tts");

const app = express();

app.use(express.json());

app.post("/tts", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                error: "Texto não informado"
            });
        }

        const audio = await tts(text, {
            voice: "pt-BR-AntonioNeural"
        });

        res.setHeader("Content-Type", "audio/mpeg");
        res.send(Buffer.from(audio));
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("API online");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado");
});

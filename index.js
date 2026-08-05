const express = require("express");
const fs = require("fs");
const path = require("path");
const { tts } = require("edge-tts");

const app = express();
app.use(express.json({ limit: "1mb" }));

app.post("/tts", async (req, res) => {
    try {
        const text = req.body.text;
        if (!text) {
            return res.status(400).json({ error = "Texto não informado" });
        }

        const buffer = await tts(text, {
            voice: "pt-BR-AntonioNeural"
        });

        res.setHeader("Content-Type", "audio/mpeg");
        res.send(Buffer.from(buffer));
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/", (_, res) => {
    res.send("Edge TTS API Online");
});

app.listen(process.env.PORT || 3000);

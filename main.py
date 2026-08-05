import edge_tts
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from langdetect import detect

app = FastAPI()

class Texto(BaseModel):
    texto: str

vozes = {
    "pt": "pt-BR-AntonioNeural",
    "en": "en-US-GuyNeural",
    "es": "es-ES-AlvaroNeural",
    "fr": "fr-FR-HenriNeural",
    "de": "de-DE-ConradNeural",
    "it": "it-IT-DiegoNeural",
    "ja": "ja-JP-KeitaNeural",
    "ko": "ko-KR-InJoonNeural",
    "zh-cn": "zh-CN-YunxiNeural"
}

@app.post("/gerar-audio")
async def gerar_audio(data: Texto):
    idioma = detect(data.texto)

    voz = vozes.get(idioma, "en-US-GuyNeural")

    arquivo = "voz.mp3"

    communicate = edge_tts.Communicate(
        data.texto,
        voz
    )

    await communicate.save(arquivo)

    return FileResponse(
        arquivo,
        media_type="audio/mpeg"
    )

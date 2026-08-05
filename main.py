import edge_tts
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

class Texto(BaseModel):
    texto: str

@app.post("/gerar-audio")
async def gerar_audio(data: Texto):
    arquivo = "voz.mp3"

    communicate = edge_tts.Communicate(
        data.texto,
        "pt-BR-AntonioNeural"
    )

    await communicate.save(arquivo)

    return FileResponse(
        arquivo,
        media_type="audio/mpeg"
    )

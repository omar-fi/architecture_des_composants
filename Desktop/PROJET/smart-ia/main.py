from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from extraction.pdf_extractor import extract_text_from_pdf
from nlp.cv_analyzer import analyze_text
from vector.vectorizer import vectorize_text_and_store

print("=" * 60)
print("🚀 Service IA SmartCareer")
print("📊 Modèle: Sentence Transformers (all-MiniLM-L6-v2)")
print("⚡ Backend: ONNX Runtime (sans PyTorch)")
print("=" * 60)

app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExtractRequest(BaseModel):
    file_path: str

@app.post("/extract")
async def extract(file: UploadFile):
    text = extract_text_from_pdf(file)
    return {"text": text}

@app.post("/extract-from-path")
async def extract_from_path(request: ExtractRequest):
    """Extrait le texte d'un PDF à partir d'un chemin de fichier"""
    from pathlib import Path
    import fitz  # PyMuPDF
    
    file_path = Path(request.file_path)
    if not file_path.exists():
        return {"error": f"File not found: {file_path}"}
    
    # Extraire directement depuis le chemin avec PyMuPDF
    doc = fitz.open(str(file_path))
    full_text = ""
    
    for page in doc:
        full_text += page.get_text()
    
    doc.close()
    
    return {"text": full_text}

@app.post("/analyze")
async def analyze(file: UploadFile):
    """Analyse complète d'un CV uploadé"""
    # Extraire le texte du PDF
    text = extract_text_from_pdf(file)
    
    # Analyser le texte
    analysis = analyze_text(text)
    
    return {
        "skills": analysis.get("skills", []),
        "experiences": analysis.get("experiences", []),
        "education": analysis.get("education", []),
        "status": "success"
    }

@app.post("/analyze-text")
async def analyze_text_endpoint(data: dict):
    """Analyse un texte déjà extrait"""
    text = data["text"]
    analysis = analyze_text(text)
    return analysis

class VectorizeRequest(BaseModel):
    cvId: int
    text: str

@app.post("/vectorize")
async def vectorize(data: VectorizeRequest):
    """Vectorise le texte d'un CV et le stocke dans ChromaDB"""
    result = vectorize_text_and_store(data.text, data.cvId)
    return {
        "chromaId": result.get("chroma_id"),
        "message": result.get("message"),
        "cvId": data.cvId
    }

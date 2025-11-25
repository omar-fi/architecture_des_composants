# 🤖 Service IA - SmartCareer

Service d'analyse de CV avec extraction de texte, analyse NLP et vectorisation.

## 🚀 Installation MINIMALE

```bash
./install_minimal.sh
```

**Taille**: 476 MB (au lieu de 1.3 GB)
**Packages**: 95 (au lieu de 143)

## ▶️ Démarrage

```bash
./start.sh
```

Service disponible sur: **http://localhost:8000/docs**

## 📊 Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /extract` | Extrait le texte d'un PDF uploadé |
| `POST /extract-from-path` | Extrait depuis un chemin fichier |
| `POST /analyze` | Analyse complète d'un CV (PDF) |
| `POST /analyze-text` | Analyse un texte déjà extrait |
| `POST /vectorize` | Vectorise et stocke dans ChromaDB |

## 🛠️ Technologies

- **FastAPI** + Uvicorn
- **PyMuPDF** (extraction PDF)
- **ChromaDB** avec DefaultEmbeddingFunction (ONNX)
- **Pas de PyTorch** (installation légère)

## ✅ Testé et fonctionnel

```bash
./smart/bin/python test_vectorize.py
./smart/bin/python verify_chroma.py
```

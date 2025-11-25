#!/bin/bash

echo "📦 Installation avec Sentence Transformers (ONNX - SANS PyTorch)"
echo "================================================================="
echo ""

# Activer l'environnement virtuel
source smart/bin/activate

# Désinstaller PyTorch si présent
echo "1️⃣ Nettoyage de PyTorch..."
pip uninstall -y torch torchvision torchaudio 2>/dev/null

# Installer les dépendances de base
echo ""
echo "2️⃣ Installation de FastAPI, ChromaDB et PyMuPDF..."
pip install fastapi==0.104.1
pip install uvicorn[standard]==0.24.0
pip install python-multipart==0.0.6
pip install pymupdf==1.23.8
pip install chromadb==0.4.18

# Installer ONNX Runtime (remplace PyTorch)
echo ""
echo "3️⃣ Installation de ONNX Runtime..."
pip install onnxruntime==1.16.3

# Installer Sentence Transformers et dépendances (sans PyTorch)
echo ""
echo "4️⃣ Installation de Sentence Transformers (utilisera ONNX)..."
pip install transformers==4.35.0
pip install tokenizers==0.15.0
pip install huggingface-hub==0.19.4
pip install sentence-transformers==2.2.2

# Vérifier l'installation
echo ""
echo "✅ Vérification de l'installation..."
python -c "import fastapi; print('✅ FastAPI OK')"
python -c "import chromadb; print('✅ ChromaDB OK')"
python -c "import onnxruntime; print('✅ ONNX Runtime OK')"
python -c "from chromadb.utils import embedding_functions; print('✅ Embedding Functions OK')"

echo ""
echo "🎯 Test du modèle Sentence Transformers..."
python -c "
from chromadb.utils import embedding_functions
try:
    ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name='all-MiniLM-L6-v2')
    print('✅ Sentence Transformers: all-MiniLM-L6-v2 chargé avec succès!')
    print('   (Le modèle sera téléchargé au premier usage)')
except Exception as e:
    print(f'⚠️  Erreur: {e}')
"

echo ""
echo "✅ Installation terminée!"
echo ""
echo "Le modèle all-MiniLM-L6-v2 sera téléchargé automatiquement"
echo "au premier usage (environ 90 MB)"

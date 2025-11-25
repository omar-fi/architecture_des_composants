#!/bin/bash

echo "📦 Installation MINIMALE - SmartCareer IA"
echo "=========================================="
echo ""

# Créer l'environnement virtuel
if [ ! -d "smart" ]; then
    echo "1️⃣ Création de l'environnement virtuel..."
    python3 -m venv smart
fi

# Activer l'environnement virtuel
source smart/bin/activate

# Installer les dépendances minimales
echo ""
echo "2️⃣ Installation des packages essentiels..."
pip install --upgrade pip
pip install -r requirements-minimal.txt

# Vérifier l'installation
echo ""
echo "✅ Vérification de l'installation..."
python -c "import fastapi; print('✅ FastAPI OK')"
python -c "import fitz; print('✅ PyMuPDF OK')"
python -c "import chromadb; print('✅ ChromaDB OK')"

echo ""
echo "✅ Installation terminée!"
echo ""
echo "📊 Taille de l'installation:"
du -sh smart/
echo ""
echo "🚀 Pour démarrer: ./start.sh"

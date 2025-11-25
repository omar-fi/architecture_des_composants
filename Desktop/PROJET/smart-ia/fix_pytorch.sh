#!/bin/bash

echo "🔧 Réparation de PyTorch et des dépendances..."

# Activer l'environnement virtuel
source smart/bin/activate

# Désinstaller PyTorch cassé
echo "1️⃣ Désinstallation de PyTorch cassé..."
pip uninstall -y torch torchvision torchaudio

# Réinstaller PyTorch pour macOS
echo "2️⃣ Réinstallation de PyTorch..."
pip install torch torchvision torchaudio

# Réinstaller sentence-transformers
echo "3️⃣ Réinstallation de sentence-transformers..."
pip install --upgrade sentence-transformers

# Vérifier l'installation
echo ""
echo "✅ Vérification de l'installation..."
python -c "import torch; print(f'PyTorch version: {torch.__version__}')"
python -c "from sentence_transformers import SentenceTransformer; print('SentenceTransformer OK')"

echo ""
echo "✅ Réparation terminée!"

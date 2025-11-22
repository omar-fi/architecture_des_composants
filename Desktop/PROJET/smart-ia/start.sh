#!/bin/bash

# Script de démarrage du microservice IA

echo "🚀 Démarrage du microservice IA..."

# Activer l'environnement virtuel si présent
if [ -d "smart" ]; then
    source smart/bin/activate
    echo "✅ Environnement virtuel activé"
fi

# Vérifier que les dépendances sont installées
echo "📦 Vérification des dépendances..."
python -c "import fastapi" 2>/dev/null || {
    echo "⚠️  Installation des dépendances..."
    pip install -r requirements.txt
}

# Démarrer le serveur FastAPI
echo "🌐 Démarrage du serveur FastAPI sur http://localhost:8000"
echo "📚 Documentation disponible sur http://localhost:8000/docs"
uvicorn main:app --host 0.0.0.0 --port 8000 --reload




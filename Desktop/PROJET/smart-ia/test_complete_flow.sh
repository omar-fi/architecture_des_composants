#!/bin/bash

echo "🧪 Test du flux complet d'analyse de CV"
echo "========================================"
echo ""

# Vérifier que le service est lancé
echo "1️⃣ Vérification du service IA..."
if curl -s http://localhost:8000/ > /dev/null 2>&1; then
    echo "   ✅ Service IA accessible"
else
    echo "   ❌ Service IA non accessible"
    echo "   Lancez-le avec: ./start.sh"
    exit 1
fi

echo ""
echo "2️⃣ Test de l'extraction depuis un chemin..."
CV_PATH="../SmartCareer/uploads/1763750210693_CV_2025-11-20_Mohamed Omar_Filali Baba.pdf"

if [ ! -f "$CV_PATH" ]; then
    echo "   ❌ CV non trouvé: $CV_PATH"
    exit 1
fi

EXTRACT_RESULT=$(curl -s -X POST http://localhost:8000/extract-from-path \
    -H "Content-Type: application/json" \
    -d "{\"file_path\": \"$CV_PATH\"}")

if echo "$EXTRACT_RESULT" | grep -q "error"; then
    echo "   ❌ Erreur d'extraction"
    echo "$EXTRACT_RESULT"
    exit 1
else
    TEXT_LENGTH=$(echo "$EXTRACT_RESULT" | grep -o '"text"' | wc -l)
    echo "   ✅ Texte extrait"
fi

echo ""
echo "3️⃣ Test de la vectorisation..."
VECTOR_RESULT=$(curl -s -X POST http://localhost:8000/vectorize \
    -H "Content-Type: application/json" \
    -d "{\"cvId\": 1, \"text\": \"Test de vectorisation avec des compétences comme Java Python React\"}")

if echo "$VECTOR_RESULT" | grep -q "chromaId"; then
    echo "   ✅ Vectorisation réussie"
    echo "$VECTOR_RESULT" | python3 -m json.tool 2>/dev/null || echo "$VECTOR_RESULT"
else
    echo "   ❌ Erreur de vectorisation"
    echo "$VECTOR_RESULT"
    exit 1
fi

echo ""
echo "4️⃣ Vérification de ChromaDB..."
if [ -d "./chroma_db" ]; then
    echo "   ✅ ChromaDB créé"
    ls -lh chroma_db/
else
    echo "   ❌ ChromaDB non créé"
fi

echo ""
echo "✅ Tests terminés!"

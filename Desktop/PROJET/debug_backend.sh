#!/bin/bash

echo "🔍 Diagnostic du système SmartCareer"
echo "===================================="
echo ""

# 1. Vérifier les services
echo "1️⃣ Vérification des services:"
echo ""

# Backend
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Backend Spring Boot: EN LIGNE (port 8080)"
else
    echo "❌ Backend Spring Boot: HORS LIGNE"
fi

# Service IA
if curl -s http://localhost:8000/docs > /dev/null 2>&1; then
    echo "✅ Service IA: EN LIGNE (port 8000)"
else
    echo "❌ Service IA: HORS LIGNE"
fi

# Frontend
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Frontend React: EN LIGNE (port 5173)"
else
    echo "❌ Frontend React: HORS LIGNE"
fi

echo ""
echo "2️⃣ Derniers CVs uploadés:"
ls -lht SmartCareer/uploads/ | head -5

echo ""
echo "3️⃣ État de ChromaDB:"
cd smart-ia && ./smart/bin/python verify_chroma.py

echo ""
echo "4️⃣ Test manuel de vectorisation:"
echo "Testez avec:"
echo "curl -X POST http://localhost:8000/vectorize -H 'Content-Type: application/json' -d '{\"cvId\": 999, \"text\": \"Test\"}'"

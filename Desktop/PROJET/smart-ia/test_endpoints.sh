#!/bin/bash

echo "🧪 Test des endpoints du service IA"
echo "===================================="
echo ""

# Test 1: Health check (si disponible)
echo "1️⃣ Test de base..."
curl -s http://localhost:8000/ 2>/dev/null && echo "✅ Service accessible" || echo "❌ Service non accessible"
echo ""

# Test 2: Documentation
echo "2️⃣ Documentation Swagger disponible sur:"
echo "   http://localhost:8000/docs"
echo ""

# Test 3: Endpoint analyze (nécessite un fichier PDF)
echo "3️⃣ Pour tester l'analyse de CV:"
echo "   curl -X POST -F 'file=@votre_cv.pdf' http://localhost:8000/analyze"
echo ""

echo "✅ Tests terminés"
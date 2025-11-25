#!/bin/bash

echo "🧪 Test de l'endpoint /analyze-text"
echo "=================================="

# Test avec un texte simple
curl -X POST http://localhost:8000/analyze-text \
  -H "Content-Type: application/json" \
  -d '{"text": "Développeur Java avec 5 ans d'\''expérience. Compétences: Spring Boot, MySQL, React. Formation: Master en Informatique."}' \
  | python3 -m json.tool

echo ""
echo "✅ Si vous voyez des skills, experiences et education, le fix fonctionne!"

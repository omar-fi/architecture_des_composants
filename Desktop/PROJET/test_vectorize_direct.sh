#!/bin/bash

echo "🧪 Test direct de l'endpoint /vectorize"
echo "========================================"

curl -X POST http://localhost:8000/vectorize \
  -H "Content-Type: application/json" \
  -d '{"cvId": 999, "text": "Développeur Java avec 5 ans d'\''expérience en Spring Boot et React."}' \
  -v

echo ""
echo "Vérifie les logs du service IA pour plus de détails"

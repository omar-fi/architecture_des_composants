#!/usr/bin/env python3
"""Test manuel de la vectorisation"""

import sys
sys.path.insert(0, '.')

from vector.vectorizer import vectorize_text_and_store

# Texte de test
test_text = """
Développeur Full Stack avec 5 ans d'expérience.

Compétences:
- Python, Java, JavaScript
- Spring Boot, React, Docker
- MySQL, PostgreSQL

Expérience:
2020-2025: Développeur Senior chez TechCorp
2018-2020: Développeur Junior chez StartupXYZ

Formation:
Master en Informatique - Université Paris
"""

print("🧪 Test de vectorisation\n")

try:
    result = vectorize_text_and_store(test_text, cv_id=999)
    print(f"\n✅ Succès!")
    print(f"   ChromaID: {result['chroma_id']}")
    print(f"   Chunks: {result['chunks_count']}")
    
    # Vérifier que ChromaDB existe maintenant
    import os
    if os.path.exists("./chroma_db"):
        print("\n✅ ChromaDB créé avec succès!")
    
except Exception as e:
    print(f"\n❌ Erreur: {e}")
    import traceback
    traceback.print_exc()

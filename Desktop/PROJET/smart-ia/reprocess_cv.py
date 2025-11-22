#!/usr/bin/env python3
"""Script pour re-traiter un CV déjà uploadé"""

import sys
import requests
from pathlib import Path

def reprocess_cv(cv_path: str, cv_id: int):
    """Re-traite un CV en appelant les endpoints du service IA"""
    
    print(f"🔄 Re-traitement du CV ID: {cv_id}")
    print(f"📄 Fichier: {cv_path}\n")
    
    # 1. Extraction du texte
    print("1️⃣ Extraction du texte...")
    try:
        response = requests.post(
            "http://localhost:8000/extract-from-path",
            json={"file_path": cv_path}
        )
        response.raise_for_status()
        text = response.json().get("text", "")
        print(f"   ✅ Texte extrait: {len(text)} caractères\n")
    except Exception as e:
        print(f"   ❌ Erreur: {e}")
        return False
    
    # 2. Analyse NLP
    print("2️⃣ Analyse NLP...")
    try:
        response = requests.post(
            "http://localhost:8000/analyze-text",
            json={"text": text}
        )
        response.raise_for_status()
        analysis = response.json()
        print(f"   ✅ Compétences: {len(analysis.get('skills', []))}")
        print(f"   ✅ Formations: {len(analysis.get('education', []))}")
        print(f"   ✅ Expériences: {len(analysis.get('experiences', []))}\n")
    except Exception as e:
        print(f"   ❌ Erreur: {e}")
        return False
    
    # 3. Vectorisation
    print("3️⃣ Vectorisation et stockage dans ChromaDB...")
    try:
        response = requests.post(
            "http://localhost:8000/vectorize",
            json={"cvId": cv_id, "text": text}
        )
        response.raise_for_status()
        result = response.json()
        chroma_id = result.get("chromaId")
        print(f"   ✅ ChromaID: {chroma_id}\n")
        
        print("✅ Re-traitement terminé avec succès!")
        return True
    except Exception as e:
        print(f"   ❌ Erreur: {e}")
        return False

if __name__ == "__main__":
    # Chemin du CV uploadé
    cv_path = "../SmartCareer/uploads/1763750210693_CV_2025-11-20_Mohamed Omar_Filali Baba.pdf"
    cv_id = 1  # ID du CV dans la base de données
    
    if not Path(cv_path).exists():
        print(f"❌ Fichier non trouvé: {cv_path}")
        print("\nListez les fichiers disponibles:")
        uploads_dir = Path("../SmartCareer/uploads/")
        if uploads_dir.exists():
            for f in uploads_dir.glob("*.pdf"):
                print(f"   - {f.name}")
        sys.exit(1)
    
    success = reprocess_cv(cv_path, cv_id)
    sys.exit(0 if success else 1)

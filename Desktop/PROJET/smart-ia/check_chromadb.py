#!/usr/bin/env python3
"""Script pour vérifier le contenu de ChromaDB"""

import chromadb
from chromadb.config import Settings
import os

CHROMA_DB_PATH = "./chroma_db"

def check_chromadb():
    if not os.path.exists(CHROMA_DB_PATH):
        print("❌ ChromaDB n'existe pas encore")
        print("   → Sera créé automatiquement au premier upload de CV")
        return
    
    print("✅ ChromaDB existe!")
    print(f"   Localisation: {os.path.abspath(CHROMA_DB_PATH)}")
    print()
    
    try:
        # Connexion à ChromaDB
        client = chromadb.PersistentClient(
            path=CHROMA_DB_PATH,
            settings=Settings(anonymized_telemetry=False)
        )
        
        # Lister les collections
        collections = client.list_collections()
        print(f"📚 Collections: {len(collections)}")
        
        for collection in collections:
            print(f"\n   Collection: {collection.name}")
            count = collection.count()
            print(f"   Nombre de vecteurs: {count}")
            
            if count > 0:
                # Afficher quelques exemples
                results = collection.peek(limit=3)
                print(f"   Exemple d'IDs: {results['ids'][:3]}")
                
                # Compter les CVs uniques
                metadatas = collection.get()['metadatas']
                cv_ids = set([m.get('cv_id') for m in metadatas if m.get('cv_id')])
                print(f"   Nombre de CVs stockés: {len(cv_ids)}")
                print(f"   IDs des CVs: {sorted(cv_ids)}")
        
        print("\n✅ ChromaDB est opérationnel!")
        
    except Exception as e:
        print(f"❌ Erreur lors de la lecture de ChromaDB: {e}")

if __name__ == "__main__":
    print("🔍 Vérification de ChromaDB\n")
    check_chromadb()

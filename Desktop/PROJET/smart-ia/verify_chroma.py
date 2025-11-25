#!/usr/bin/env python3
"""Vérifie si ChromaDB contient des données"""

import os
import chromadb
from chromadb.config import Settings

CHROMA_DB_PATH = "./chroma_db"

if not os.path.exists(CHROMA_DB_PATH):
    print("❌ ChromaDB n'existe pas encore")
    print("   Le dossier sera créé au premier upload de CV")
    exit(0)

print("✅ ChromaDB existe!")
print(f"   Localisation: {os.path.abspath(CHROMA_DB_PATH)}")
print()

try:
    client = chromadb.PersistentClient(
        path=CHROMA_DB_PATH,
        settings=Settings(anonymized_telemetry=False)
    )
    
    collections = client.list_collections()
    print(f"📚 Collections: {len(collections)}")
    
    for collection in collections:
        print(f"\n   Collection: {collection.name}")
        count = collection.count()
        print(f"   Nombre de vecteurs: {count}")
        
        if count > 0:
            results = collection.get()
            metadatas = results['metadatas']
            cv_ids = set([m.get('cv_id') for m in metadatas if m.get('cv_id')])
            print(f"   Nombre de CVs: {len(cv_ids)}")
            print(f"   IDs des CVs: {sorted(cv_ids)}")
    
    print("\n✅ ChromaDB opérationnel!")
    
except Exception as e:
    print(f"❌ Erreur: {e}")

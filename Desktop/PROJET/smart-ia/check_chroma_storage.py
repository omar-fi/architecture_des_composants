#!/usr/bin/env python3
"""Script pour vérifier le contenu de ChromaDB"""

import chromadb
from chromadb.config import Settings

print("=" * 60)
print("🔍 Vérification du stockage ChromaDB")
print("=" * 60)

# Connexion à ChromaDB
client = chromadb.PersistentClient(
    path="./chroma_db",
    settings=Settings(anonymized_telemetry=False)
)

# Récupérer la collection
try:
    collection = client.get_collection(name="cv_embeddings")
    
    # Compter les documents
    count = collection.count()
    print(f"\n📊 Nombre total de CVs vectorisés: {count}")
    
    if count > 0:
        # Récupérer tous les documents
        results = collection.get(include=["metadatas", "documents"])
        
        print(f"\n✅ CVs stockés dans ChromaDB:")
        print("-" * 60)
        
        for i, (doc_id, metadata, document) in enumerate(zip(
            results['ids'], 
            results['metadatas'], 
            results['documents']
        ), 1):
            print(f"\n{i}. ID ChromaDB: {doc_id}")
            print(f"   CV ID: {metadata.get('cv_id', 'N/A')}")
            print(f"   Texte (100 premiers caractères): {document[:100]}...")
            
    else:
        print("\n⚠️  Aucun CV vectorisé trouvé dans ChromaDB")
        
except Exception as e:
    print(f"\n❌ Erreur: {e}")
    print("La collection 'cv_embeddings' n'existe peut-être pas encore")

print("\n" + "=" * 60)

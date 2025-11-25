import chromadb
from chromadb.config import Settings
from chromadb.utils import embedding_functions
import uuid
import os

CHROMA_DB_PATH = "./chroma_db"

# Fonction d'embedding (lazy loading)
embedding_function = None

def get_embedding_function():
    """Charge la fonction d'embedding Sentence Transformers (ONNX - sans PyTorch)"""
    global embedding_function
    if embedding_function is None:
        try:
            # Option 1: Sentence Transformers avec ONNX (meilleure qualité)
            embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(
                model_name="all-MiniLM-L6-v2"
            )
            print("✅ Utilisation de Sentence Transformers: all-MiniLM-L6-v2 (ONNX)")
        except Exception as e1:
            try:
                # Option 2: Fallback vers DefaultEmbeddingFunction
                embedding_function = embedding_functions.DefaultEmbeddingFunction()
                print(f"⚠️  Sentence Transformers non disponible ({e1})")
                print("✅ Utilisation de DefaultEmbeddingFunction (ONNX)")
            except Exception as e2:
                print(f"❌ Erreur lors du chargement de l'embedding function: {e2}")
                raise ImportError("Impossible de charger la fonction d'embedding")
    return embedding_function

def split_text(text: str, chunk_size: int = 500, chunk_overlap: int = 100):
    """Divise le texte en chunks avec overlap"""
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), chunk_size - chunk_overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    
    return chunks

def vectorize_text_and_store(text: str, cv_id: int):
    """Vectorise le texte et le stocke dans ChromaDB (sans PyTorch)"""
    print(f"📊 Vectorisation du CV {cv_id}...")
    
    # Créer le client ChromaDB
    client = chromadb.PersistentClient(
        path=CHROMA_DB_PATH,
        settings=Settings(anonymized_telemetry=False)
    )
    
    # Obtenir la fonction d'embedding
    embed_fn = get_embedding_function()
    
    # Obtenir ou créer la collection avec la fonction d'embedding
    collection = client.get_or_create_collection(
        name="cv_vectors",
        embedding_function=embed_fn,
        metadata={"description": "CV embeddings"}
    )
    
    # Diviser le texte en chunks
    chunks = split_text(text, chunk_size=500, chunk_overlap=100)
    print(f"   Nombre de chunks: {len(chunks)}")
    
    # Générer un ID unique pour ce CV
    chroma_id = str(uuid.uuid4())
    
    # Préparer les IDs et métadonnées
    ids = [f"{chroma_id}_chunk_{i}" for i in range(len(chunks))]
    metadatas = [{"cv_id": cv_id, "chunk_index": i} for i in range(len(chunks))]
    
    # Ajouter à la collection (ChromaDB génère automatiquement les embeddings)
    collection.add(
        ids=ids,
        documents=chunks,
        metadatas=metadatas
    )
    
    print(f"   ✅ Vectorisation terminée: {chroma_id}")
    
    return {
        "message": "Vectorization done",
        "cv_id": cv_id,
        "chroma_id": chroma_id,
        "chunks_count": len(chunks)
    }

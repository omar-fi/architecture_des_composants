import chromadb
from chromadb.config import Settings
import uuid
import os

CHROMA_DB_PATH = "./chroma_db"

# Embeddings Sentence Transformers (lazy loading)
model = None

def get_embedding_model():
    """Charge le modèle d'embedding de manière lazy"""
    global model
    if model is None:
        try:
            from sentence_transformers import SentenceTransformer
            model = SentenceTransformer('all-MiniLM-L6-v2')
        except Exception as e:
            print(f"Warning: Could not load SentenceTransformer: {e}")
            # Fallback: utiliser des embeddings simples
            raise ImportError("SentenceTransformer not available. Please install torch and sentence-transformers correctly.")
    return model

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
    """Vectorise le texte et le stocke dans ChromaDB"""
    # Créer le client ChromaDB
    client = chromadb.PersistentClient(
        path=CHROMA_DB_PATH,
        settings=Settings(anonymized_telemetry=False)
    )
    
    # Obtenir ou créer la collection
    collection = client.get_or_create_collection(
        name="cv_vectors",
        metadata={"description": "CV embeddings"}
    )
    
    # Diviser le texte en chunks
    chunks = split_text(text, chunk_size=500, chunk_overlap=100)
    
    # Générer un ID unique pour ce CV
    chroma_id = str(uuid.uuid4())
    
    # Générer les embeddings pour chaque chunk
    embedding_model = get_embedding_model()
    embeddings = embedding_model.encode(chunks).tolist()
    
    # Préparer les IDs et métadonnées
    ids = [f"{chroma_id}_chunk_{i}" for i in range(len(chunks))]
    metadatas = [{"cv_id": cv_id, "chunk_index": i} for i in range(len(chunks))]
    
    # Ajouter à la collection
    collection.add(
        ids=ids,
        embeddings=embeddings,
        documents=chunks,
        metadatas=metadatas
    )
    
    return {
        "message": "Vectorization done",
        "cv_id": cv_id,
        "chroma_id": chroma_id
    }

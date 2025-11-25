"""
Module de vectorisation pour SmartCareer
Gère le split du texte et la création d'embeddings avec ChromaDB
"""

from .vectorizer import (
    vectorize_text_and_store,
    split_text,
    get_embedding_function,
    CHROMA_DB_PATH
)

__all__ = [
    'vectorize_text_and_store',
    'split_text',
    'get_embedding_function',
    'CHROMA_DB_PATH'
]

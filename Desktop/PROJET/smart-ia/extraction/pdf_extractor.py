from fastapi import UploadFile
import fitz  # PyMuPDF
import tempfile
import os

def extract_text_from_pdf(file: UploadFile):
    """
    Extrait le texte d'un fichier PDF uploadé
    """
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name

    try:
        # Ouvrir le PDF avec PyMuPDF
        doc = fitz.open(tmp_path)
        full_text = ""
        
        # Extraire le texte de chaque page
        for page in doc:
            full_text += page.get_text()
        
        doc.close()
        return full_text
    finally:
        # Nettoyer le fichier temporaire
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

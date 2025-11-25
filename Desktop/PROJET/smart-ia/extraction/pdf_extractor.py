from fastapi import UploadFile
import fitz 
import tempfile
import os

def extract_text_from_pdf(file: UploadFile):

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name

    try:
      
        doc = fitz.open(tmp_path)
        full_text = ""
        
        
        for page in doc:
            full_text += page.get_text()
        
        doc.close()
        return full_text
    finally:

        if os.path.exists(tmp_path):
            os.remove(tmp_path)

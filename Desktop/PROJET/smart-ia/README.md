# SmartCareer - Service IA d'Analyse de CV

Service Python FastAPI pour l'analyse automatique de CV (extraction de compétences, expériences, formations, vectorisation).

## Installation

1. Activer l'environnement virtuel:
```bash
source smart/bin/activate
```

2. Installer les dépendances:
```bash
pip install -r requirements.txt
```

3. Télécharger le modèle spaCy français (si pas déjà fait):
```bash
python -m spacy download fr_core_news_md
```

## Lancement

### Option 1: Script de démarrage
```bash
./start.sh
```

### Option 2: Commande directe
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Le service sera disponible sur `http://localhost:8000`
- Documentation API: `http://localhost:8000/docs`
- Documentation alternative: `http://localhost:8000/redoc`

## Endpoints

- `POST /extract` - Extrait le texte d'un PDF uploadé
  - Paramètre: `file` (multipart/form-data)
  - Retourne: `{filename, text}`

- `POST /extract-from-path` - Extrait le texte d'un PDF à partir d'un chemin
  - Body: `{file_path: string}`
  - Retourne: `{filename, text}`

- `POST /analyze` - Analyse un CV
  - Body: `{text: string}`
  - Retourne: `{text, skills[], education[], experiences[], chromaId}`

- `POST /vectorize` - Vectorise un CV et le stocke dans ChromaDB
  - Body: `{cvId: int, text: string}`
  - Retourne: `{text, skills[], education[], experiences[], chromaId}`

## Configuration Backend Java

Le backend Java doit être configuré avec les URLs suivantes dans `application.properties`:
```properties
ai.service.url.extract=http://localhost:8000/extract-from-path
ai.service.url.analyze=http://localhost:8000/analyze
ai.service.url.vectorize=http://localhost:8000/vectorize
```

## Test rapide

```bash
# Vérifier que le service est actif
curl http://localhost:8000/docs

# Tester l'analyse
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Développeur Java avec 5 ans d'expérience. Compétences: Spring Boot, MySQL"}'
```

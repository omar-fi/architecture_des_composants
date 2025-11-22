import re

# Liste étendue de compétences techniques
TECH_SKILLS = [
    # Langages
    "java", "python", "javascript", "typescript", "c++", "c#", "php", "ruby", "go", "rust",
    "kotlin", "swift", "scala", "r", "matlab", "sql",
    
    # Frameworks Backend
    "spring", "springboot", "spring boot", "django", "flask", "fastapi", "express", "nodejs",
    "node.js", "laravel", "rails", ".net", "asp.net",
    
    # Frameworks Frontend
    "react", "angular", "vue", "vue.js", "svelte", "next.js", "nuxt", "gatsby",
    
    # Bases de données
    "mysql", "postgresql", "mongodb", "redis", "oracle", "sql server", "cassandra",
    "dynamodb", "elasticsearch", "firebase",
    
    # DevOps & Cloud
    "docker", "kubernetes", "jenkins", "gitlab ci", "github actions", "terraform",
    "ansible", "aws", "azure", "gcp", "heroku", "ci/cd",
    
    # Outils & Autres
    "git", "jira", "confluence", "agile", "scrum", "rest api", "graphql",
    "microservices", "kafka", "rabbitmq", "nginx", "apache",
    
    # Data & AI
    "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
    "pandas", "numpy", "nlp", "computer vision", "data science"
]

# Mots-clés pour l'éducation
EDUCATION_KEYWORDS = [
    "diplôme", "master", "licence", "bachelor", "doctorat", "phd", "ingénieur",
    "bac", "bts", "dut", "université", "école", "degree", "university", "college",
    "certification", "formation", "mba", "deug", "dess", "dea"
]

def extract_skills(text: str):
    """Extrait les compétences techniques du texte"""
    text_lower = text.lower()
    found_skills = []
    
    for skill in TECH_SKILLS:
        if skill in text_lower:
            # Capitaliser proprement
            found_skills.append(skill.title())
    
    return list(set(found_skills))

def extract_education(text: str):
    """Extrait les formations du texte"""
    education = []
    lines = text.split('\n')
    
    for i, line in enumerate(lines):
        line_lower = line.lower()
        for keyword in EDUCATION_KEYWORDS:
            if keyword in line_lower and len(line.strip()) > 10:
                # Prendre la ligne et éventuellement la suivante
                edu_text = line.strip()
                if i + 1 < len(lines) and len(lines[i + 1].strip()) > 5:
                    edu_text += " " + lines[i + 1].strip()
                
                if len(edu_text) > 15:
                    education.append(edu_text[:200])
                break
    
    return list(set(education))[:5] if education else ["Formation à analyser"]

def extract_experiences(text: str):
    """Extrait les expériences professionnelles"""
    experiences = []
    
    # Patterns pour détecter les dates d'expérience
    date_patterns = [
        r'\b(20\d{2})\s*[-–]\s*(20\d{2}|présent|present|actuel|aujourd\'hui)\b',
        r'\b(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+20\d{2}\b',
        r'\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+20\d{2}\b'
    ]
    
    lines = text.split('\n')
    for i, line in enumerate(lines):
        for pattern in date_patterns:
            if re.search(pattern, line, re.IGNORECASE):
                # Prendre contexte (ligne + 2 suivantes)
                exp_lines = lines[i:min(i + 3, len(lines))]
                exp_text = ' '.join([l.strip() for l in exp_lines if l.strip()])
                
                if len(exp_text) > 20:
                    experiences.append(exp_text[:250])
                break
    
    return experiences[:5] if experiences else ["Expérience à analyser"]

def analyze_text(text: str):
    """Analyse complète du texte du CV"""
    return {
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experiences": extract_experiences(text)
    }

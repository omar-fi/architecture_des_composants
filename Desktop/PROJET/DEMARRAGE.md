# 🚀 Guide de Démarrage - SmartCareer

Ce guide explique comment démarrer tous les services nécessaires pour tester l'application complète.

## 📋 Prérequis

1. **MySQL** doit être installé et démarré
2. **Java** (JDK 17 ou supérieur)
3. **Node.js** et **npm**
4. **Python** 3.12 avec l'environnement virtuel configuré

## 🔧 Services à démarrer

L'application nécessite **3 services** qui doivent tourner simultanément :

### 1. 🐍 Service AI (Python/FastAPI) - Port 8000

**Terminal 1 :**
```bash
cd smart-ia
./start.sh
```

Ou manuellement :
```bash
cd smart-ia
source smart/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

✅ Vérification : http://localhost:8000/docs (documentation Swagger)

---

### 2. ☕ Backend Spring Boot (Java) - Port 8080

**Terminal 2 :**
```bash
cd SmartCareer
./mvnw spring-boot:run
```

Ou avec Maven installé :
```bash
cd SmartCareer
mvn spring-boot:run
```

✅ Vérification : http://localhost:8080/api/auth/login

**Note :** Assurez-vous que MySQL est démarré et que la base de données `orientation` existe (elle sera créée automatiquement si `createDatabaseIfNotExist=true`).

---

### 3. ⚛️ Frontend React (TypeScript/Vite) - Port 5173

**Terminal 3 :**
```bash
cd smartcareer-frontend
npm run dev
```

✅ Vérification : http://localhost:5173

---

## 🧪 Test de l'authentification (sans AI)

Pour tester **uniquement** l'authentification (login/register), vous pouvez démarrer seulement :
- ✅ Backend Spring Boot
- ✅ Frontend React
- ❌ Service AI (non nécessaire pour login/register)

## 🧪 Test complet (avec fonctionnalités CV)

Pour tester **toutes** les fonctionnalités (upload CV, analyse, etc.), vous devez démarrer :
- ✅ Service AI (port 8000)
- ✅ Backend Spring Boot (port 8080)
- ✅ Frontend React (port 5173)

---

## 📊 Architecture

```
Frontend (5173) ──→ Backend (8080) ──→ Service AI (8000)
                    └──→ MySQL
```

## 🔍 Vérification rapide

1. **Service AI** : http://localhost:8000/docs
2. **Backend** : http://localhost:8080/api/auth/login (POST)
3. **Frontend** : http://localhost:5173

## ⚠️ Dépannage

- **Erreur CORS** : Vérifiez que les ports sont corrects dans les configurations CORS
- **Erreur MySQL** : Vérifiez que MySQL est démarré et que les credentials sont corrects dans `application.properties`
- **Port déjà utilisé** : Changez le port dans la configuration ou arrêtez le processus qui l'utilise



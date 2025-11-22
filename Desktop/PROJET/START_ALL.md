# 🚀 Démarrage Rapide - SmartCareer

## Ordre de démarrage

### 1️⃣ Service IA (Port 8000)
```bash
cd smart-ia
./start.sh
```
Vérification: http://localhost:8000/docs

### 2️⃣ Backend Spring Boot (Port 8080)
```bash
cd SmartCareer
./mvnw spring-boot:run
```
Vérification: Le backend démarre et se connecte à MySQL

### 3️⃣ Frontend React (Port 5173)
```bash
cd smartcareer-frontend
npm run dev
```
Vérification: http://localhost:5173

## ✅ Vérification rapide

Une fois tous les services démarrés:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Service IA Docs: http://localhost:8000/docs

## 🔧 Résolution de l'erreur 500

L'erreur 500 que vous voyez vient probablement de:
1. MySQL n'est pas démarré
2. Le backend Spring Boot n'est pas lancé
3. Le service IA n'est pas lancé

Démarrez les services dans l'ordre ci-dessus!

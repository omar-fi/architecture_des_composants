package org.example.smartcareer.service;

import org.example.smartcareer.dto.CvAnalysisRequest;
import org.example.smartcareer.dto.CvAnalysisResponse;
import org.example.smartcareer.dto.CvExtractRequest;
import org.example.smartcareer.dto.CvVectorizationRequest;
import org.example.smartcareer.entite.Cv;
import org.example.smartcareer.entite.CvAnalysis;
import org.example.smartcareer.entite.User;
import org.example.smartcareer.repository.CvAnalysisRepository;
import org.example.smartcareer.repository.CvRepository;
import org.example.smartcareer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CvServiceImpl implements CvService {

    private final CvRepository cvRepository;
    private final UserRepository userRepository;
    private final CvAnalysisRepository cvAnalysisRepository;
    private final RestTemplate restTemplate;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${ai.service.url.extract}")
    private String aiExtractUrl;

    @Value("${ai.service.url.analyze}")
    private String aiAnalyzeUrl;

    @Value("${ai.service.url.vectorize}")
    private String aiVectorizeUrl;

    public CvServiceImpl(CvRepository cvRepository, UserRepository userRepository,
                         CvAnalysisRepository cvAnalysisRepository, RestTemplate restTemplate) {

        this.cvRepository = cvRepository;
        this.userRepository = userRepository;
        this.cvAnalysisRepository = cvAnalysisRepository;
        this.restTemplate = restTemplate;
    }

    @Override
    public Cv uploadCv(Long userId, MultipartFile file) {
        try {

         
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            // Utiliser le chemin ABSOLU pour que le service IA puisse trouver le fichier
            String absolutePath = filePath.toAbsolutePath().toString();
            System.out.println("📁 Fichier sauvegardé: " + absolutePath);
          
            Cv cv = new Cv();
            cv.setFileName(fileName);
            cv.setFilePath(absolutePath);  // CHEMIN ABSOLU
            cv.setUploadDate(LocalDateTime.now());
            cv.setUserId(userId);

            Cv savedCv = cvRepository.save(cv);

          
            analyzeCv(savedCv);

            return savedCv;

        } catch (Exception e) {
            throw new RuntimeException("Error uploading CV", e);
        }
    }

    private void analyzeCv(Cv cv) {
        System.out.println("🔄 Début de l'analyse du CV ID: " + cv.getId());
        System.out.println("   Fichier: " + cv.getFilePath());
        
        try {
            String filePath = cv.getFilePath();

            // ÉTAPE 1: EXTRACTION
            System.out.println("1️⃣ Extraction du texte...");
            System.out.println("   URL: " + aiExtractUrl);
            
            CvExtractRequest extractReq = new CvExtractRequest();
            extractReq.setFile_path(filePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<CvExtractRequest> extractEntity = new HttpEntity<>(extractReq, headers);

            ResponseEntity<CvAnalysisResponse> extractResponse = restTemplate.postForEntity(
                    aiExtractUrl,
                    extractEntity,
                    CvAnalysisResponse.class
            );

            String extractedText = extractResponse.getBody().getText();
            if (extractedText == null || extractedText.isEmpty()) {
                throw new RuntimeException("❌ ERREUR: Aucun texte extrait du CV");
            }
            System.out.println("   ✅ Texte extrait: " + extractedText.length() + " caractères");

            // ÉTAPE 2: ANALYSE NLP
            System.out.println("2️⃣ Analyse NLP...");
            System.out.println("   URL: " + aiAnalyzeUrl);
            
            // Créer un objet JSON avec la clé "text"
            java.util.Map<String, String> analysisReq = new java.util.HashMap<>();
            analysisReq.put("text", extractedText);

            HttpEntity<java.util.Map<String, String>> analysisEntity = new HttpEntity<>(analysisReq, headers);
            ResponseEntity<CvAnalysisResponse> analysisResponse = restTemplate.postForEntity(
                    aiAnalyzeUrl,
                    analysisEntity,
                    CvAnalysisResponse.class
            );

            CvAnalysisResponse analysisRes = analysisResponse.getBody();
            if (analysisRes == null) {
                throw new RuntimeException("❌ ERREUR: Aucun résultat d'analyse reçu");
            }
            System.out.println("   ✅ Analyse terminée");

           
            System.out.println("3️⃣ Vectorisation...");
            System.out.println("   URL: " + aiVectorizeUrl);
            
            CvVectorizationRequest vectorReq = new CvVectorizationRequest();
            vectorReq.setCvId(cv.getId());
            vectorReq.setText(extractedText);

            HttpEntity<CvVectorizationRequest> vectorEntity = new HttpEntity<>(vectorReq, headers);
            ResponseEntity<CvAnalysisResponse> vectorResponse = restTemplate.postForEntity(
                    aiVectorizeUrl,
                    vectorEntity,
                    CvAnalysisResponse.class
            );

            CvAnalysisResponse vectorRes = vectorResponse.getBody();
            if (vectorRes == null || vectorRes.getChromaId() == null) {
                throw new RuntimeException("❌ ERREUR: Vectorisation échouée - ChromaID manquant");
            }
            System.out.println("   ✅ Vectorisation terminée: " + vectorRes.getChromaId());

        
            System.out.println("4️⃣ Sauvegarde en base de données...");
            CvAnalysis result = new CvAnalysis();
            result.setCvId(cv.getId());
            result.setUserId(cv.getUserId());
            
            if (analysisRes.getSkills() != null) {
                result.setExtractedSkills(String.join(",", analysisRes.getSkills()));
                System.out.println("   Compétences: " + analysisRes.getSkills().size());
            }
            if (analysisRes.getEducation() != null) {
                result.setExtractedEducation(String.join(",", analysisRes.getEducation()));
                System.out.println("   Formations: " + analysisRes.getEducation().size());
            }
            if (analysisRes.getExperiences() != null) {
                result.setExtractedExperience(String.join(",", analysisRes.getExperiences()));
                System.out.println("   Expériences: " + analysisRes.getExperiences().size());
            }
            result.setChromaId(vectorRes.getChromaId());

            cvAnalysisRepository.save(result);
            System.out.println("✅✅✅ CV ANALYSE ET VECTORISE AVEC SUCCES - ID: " + cv.getId() + " - ChromaID: " + vectorRes.getChromaId());

        } catch (Exception e) {
            System.err.println("❌❌❌ ERREUR CRITIQUE lors de l'analyse du CV ID " + cv.getId());
            System.err.println("❌ Message: " + e.getMessage());
            System.err.println("❌ Cause: " + (e.getCause() != null ? e.getCause().getMessage() : "N/A"));
            e.printStackTrace();
            throw new RuntimeException("Échec de l'analyse du CV: " + e.getMessage(), e);
        }
    }

    @Override
    public List<Cv> getCvById(Long id) {
        return cvRepository.findByUserId(id);
    }
}

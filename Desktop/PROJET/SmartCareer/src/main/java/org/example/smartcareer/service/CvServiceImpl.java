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

            // 1) Vérification User
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 2) Sauvegarde du fichier PDF
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            // 3) Sauvegarde CV MySQL
            Cv cv = new Cv();
            cv.setFileName(fileName);
            cv.setFilePath(filePath.toString());
            cv.setUploadDate(LocalDateTime.now());
            cv.setUserId(userId);

            Cv savedCv = cvRepository.save(cv);

            // 4) Analyse IA
            analyzeCv(savedCv);

            return savedCv;

        } catch (Exception e) {
            throw new RuntimeException("Error uploading CV", e);
        }
    }

    private void analyzeCv(Cv cv) {
        try {
            String filePath = cv.getFilePath();

            // ---------------------------
            // STEP 1: EXTRACTION
            // ---------------------------
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
                System.err.println("⚠️ WARNING: No text extracted from CV");
                return;
            }

            // ---------------------------
            // STEP 2: ANALYSE NLP
            // ---------------------------
            CvAnalysisRequest analysisReq = new CvAnalysisRequest();
            analysisReq.setText(extractedText);

            HttpEntity<CvAnalysisRequest> analysisEntity = new HttpEntity<>(analysisReq, headers);
            ResponseEntity<CvAnalysisResponse> analysisResponse = restTemplate.postForEntity(
                    aiAnalyzeUrl,
                    analysisEntity,
                    CvAnalysisResponse.class
            );

            CvAnalysisResponse analysisRes = analysisResponse.getBody();
            if (analysisRes == null) {
                System.err.println("⚠️ WARNING: No analysis result received");
                return;
            }

            // ---------------------------
            // STEP 3: VECTORISATION
            // ---------------------------
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
            if (vectorRes == null) {
                System.err.println("⚠️ WARNING: No vectorization result received");
                return;
            }

            // ---------------------------
            // SAVE INTO DATABASE
            // ---------------------------
            CvAnalysis result = new CvAnalysis();
            result.setCvId(cv.getId());
            result.setUserId(cv.getUserId());
            
            if (analysisRes.getSkills() != null) {
                result.setExtractedSkills(String.join(",", analysisRes.getSkills()));
            }
            if (analysisRes.getEducation() != null) {
                result.setExtractedEducation(String.join(",", analysisRes.getEducation()));
            }
            if (analysisRes.getExperiences() != null) {
                result.setExtractedExperience(String.join(",", analysisRes.getExperiences()));
            }
            result.setChromaId(vectorRes.getChromaId());

            cvAnalysisRepository.save(result);
            System.out.println("✅ CV analysis completed successfully for CV ID: " + cv.getId());

        } catch (Exception e) {
            System.err.println("❌ ERROR analyzing CV: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public List<Cv> getCvById(Long id) {
        return cvRepository.findByUserId(id);
    }
}

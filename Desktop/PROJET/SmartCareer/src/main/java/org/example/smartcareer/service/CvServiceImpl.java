package org.example.smartcareer.service;


import org.example.smartcareer.entite.Cv;
import org.example.smartcareer.entite.User;
import org.example.smartcareer.repository.CvRepository;
import org.example.smartcareer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;

@Service
public class CvServiceImpl implements CvService {

    private final CvRepository cvRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public CvServiceImpl(CvRepository cvRepository, UserRepository userRepository) {
        this.cvRepository = cvRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Cv uploadCv(Long userId, MultipartFile file) {
        try {

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));


            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }


            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());


            Cv cv = new Cv();
            cv.setFileName(fileName);
            cv.setFilePath(filePath.toString());
            cv.setUserId(userId);

            return cvRepository.save(cv);

        } catch (IOException e) {
            throw new RuntimeException("Error uploading file", e);
        }
    }

    @Override
    public List<Cv> getCvById(Long id) {
        return Collections.singletonList(cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CV not found")));
    }
}

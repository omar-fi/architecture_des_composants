package org.example.smartcareer.service;

import org.example.smartcareer.entite.Cv;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CvService {
    Cv uploadCv(Long userId, MultipartFile file);

    List<Cv> getCvById(Long id);
}

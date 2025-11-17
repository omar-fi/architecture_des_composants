package org.example.smartcareer.controller;

import lombok.RequiredArgsConstructor;
import org.example.smartcareer.entite.Cv;
import org.example.smartcareer.service.CvService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
public class CvController {

    private final CvService cvService;


    @PostMapping("/upload/{userId}")
    public ResponseEntity<Cv> uploadCv(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        Cv cv = cvService.uploadCv(userId, file);
        return ResponseEntity.ok(cv);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cv>> getUserCvs(@PathVariable Long userId) {
        return ResponseEntity.ok(cvService.getCvById(userId));
    }
}

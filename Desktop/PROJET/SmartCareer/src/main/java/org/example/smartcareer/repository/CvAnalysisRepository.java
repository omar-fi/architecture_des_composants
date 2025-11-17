package org.example.smartcareer.repository;

import org.example.smartcareer.entite.CvAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvAnalysisRepository extends JpaRepository<CvAnalysis, Long> {

    CvAnalysis findByUserId(Long userId);
}

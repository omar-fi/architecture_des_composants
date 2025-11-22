package org.example.smartcareer.entite;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CvAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long cvId;         
    private Long userId;

    @Column(columnDefinition = "TEXT")
    private String extractedSkills;

    @Column(columnDefinition = "TEXT")
    private String extractedEducation;

    @Column(columnDefinition = "TEXT")
    private String extractedExperience;

    private String chromaId;
}

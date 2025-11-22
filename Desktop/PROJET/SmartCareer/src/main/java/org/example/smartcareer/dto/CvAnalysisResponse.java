package org.example.smartcareer.dto;

import lombok.Data;
import java.util.List;

@Data
public class CvAnalysisResponse {
    private String text;
    private List<String> skills;
    private List<String> education;
    private List<String> experiences;
    private String chromaId;
}

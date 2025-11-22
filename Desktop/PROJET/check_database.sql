-- Script pour vérifier les données dans MySQL

USE orientation;

-- Voir tous les utilisateurs
SELECT * FROM user;

-- Voir tous les CVs uploadés
SELECT * FROM cv;

-- Voir toutes les analyses de CV
SELECT * FROM cv_analysis;

-- Voir les détails complets
SELECT 
    u.full_name,
    u.email,
    cv.file_name,
    cv.upload_date,
    ca.extracted_skills,
    ca.extracted_education,
    ca.extracted_experience,
    ca.chroma_id
FROM user u
LEFT JOIN cv ON cv.user_id = u.id
LEFT JOIN cv_analysis ca ON ca.cv_id = cv.id
ORDER BY cv.upload_date DESC;

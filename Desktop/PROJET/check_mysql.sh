#!/bin/bash
echo "🔍 Vérification de la base de données MySQL"
echo ""

mysql -u root orientation -e "
SELECT 
    cv.id as cv_id,
    cv.file_name,
    cv.upload_date,
    ca.id as analysis_id,
    ca.chroma_id,
    SUBSTRING(ca.extracted_skills, 1, 50) as skills
FROM cv 
LEFT JOIN cv_analysis ca ON ca.cv_id = cv.id
ORDER BY cv.upload_date DESC
LIMIT 5;
" 2>/dev/null || echo "❌ Impossible de se connecter à MySQL"

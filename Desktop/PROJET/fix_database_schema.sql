-- Fix database schema for cv_analysis table
-- Change VARCHAR columns to TEXT to handle large data

USE orientation;

-- Check current structure
DESCRIBE cv_analysis;

-- Alter columns to TEXT type
ALTER TABLE cv_analysis 
  MODIFY COLUMN extracted_skills TEXT,
  MODIFY COLUMN extracted_education TEXT,
  MODIFY COLUMN extracted_experience TEXT;

-- Verify changes
DESCRIBE cv_analysis;

SELECT 'Schema updated successfully!' as status;

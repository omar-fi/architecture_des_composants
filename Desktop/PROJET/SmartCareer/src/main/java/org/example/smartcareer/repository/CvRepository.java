package org.example.smartcareer.repository;


import org.example.smartcareer.entite.Cv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CvRepository extends JpaRepository<Cv, Long> {
    List<Cv> findByUserId(Long userId);
}

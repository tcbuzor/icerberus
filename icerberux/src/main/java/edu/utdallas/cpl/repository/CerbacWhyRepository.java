package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhy;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhyRepository extends JpaRepository<CerbacWhy, Long> {}

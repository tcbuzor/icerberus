package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhereTarget;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhereTarget entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhereTargetRepository extends JpaRepository<CerbacWhereTarget, Long> {}

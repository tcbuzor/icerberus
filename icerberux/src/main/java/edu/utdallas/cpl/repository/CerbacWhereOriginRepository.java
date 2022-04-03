package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhereOrigin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhereOrigin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhereOriginRepository extends JpaRepository<CerbacWhereOrigin, Long> {}

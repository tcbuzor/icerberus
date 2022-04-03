package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhereRepository extends JpaRepository<CerbacWhere, Long> {}

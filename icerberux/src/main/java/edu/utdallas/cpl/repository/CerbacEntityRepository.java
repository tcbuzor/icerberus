package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacEntityRepository extends JpaRepository<CerbacEntity, Long> {}

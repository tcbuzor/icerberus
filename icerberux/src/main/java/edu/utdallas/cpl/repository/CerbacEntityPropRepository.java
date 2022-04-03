package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacEntityProp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacEntityProp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacEntityPropRepository extends JpaRepository<CerbacEntityProp, Long> {}

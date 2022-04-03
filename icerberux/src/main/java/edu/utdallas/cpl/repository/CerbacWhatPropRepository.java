package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhatProp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhatProp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhatPropRepository extends JpaRepository<CerbacWhatProp, Long> {}

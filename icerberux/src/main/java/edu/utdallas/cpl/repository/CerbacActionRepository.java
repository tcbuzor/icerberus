package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacAction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacActionRepository extends JpaRepository<CerbacAction, Long> {}

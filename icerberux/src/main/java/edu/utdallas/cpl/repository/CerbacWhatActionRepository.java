package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhatAction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhatAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhatActionRepository extends JpaRepository<CerbacWhatAction, Long> {}

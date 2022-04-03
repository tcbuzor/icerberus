package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhen;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhenRepository extends JpaRepository<CerbacWhen, Long> {}

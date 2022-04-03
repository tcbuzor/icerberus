package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWho;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWho entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhoRepository extends JpaRepository<CerbacWho, Long> {}

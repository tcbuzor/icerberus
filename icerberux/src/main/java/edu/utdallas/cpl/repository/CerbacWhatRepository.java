package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhatRepository extends JpaRepository<CerbacWhat, Long> {}

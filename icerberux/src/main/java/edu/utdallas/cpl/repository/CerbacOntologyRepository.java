package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacOntology;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacOntology entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacOntologyRepository extends JpaRepository<CerbacOntology, Long> {}

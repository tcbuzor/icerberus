package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacPolicy;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacPolicy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacPolicyRepository extends JpaRepository<CerbacPolicy, Long> {}

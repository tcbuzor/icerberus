package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacHow;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacHow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacHowRepository extends JpaRepository<CerbacHow, Long> {}

package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacTypeRepository extends JpaRepository<CerbacType, Long> {}

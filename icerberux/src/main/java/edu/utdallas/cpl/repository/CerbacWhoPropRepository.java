package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacWhoProp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacWhoProp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CerbacWhoPropRepository extends JpaRepository<CerbacWhoProp, Long> {}

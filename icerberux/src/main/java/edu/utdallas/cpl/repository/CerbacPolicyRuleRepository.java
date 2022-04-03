package edu.utdallas.cpl.repository;

import edu.utdallas.cpl.domain.CerbacPolicyRule;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CerbacPolicyRule entity.
 */
@Repository
public interface CerbacPolicyRuleRepository extends JpaRepository<CerbacPolicyRule, Long> {
    @Query(
        value = "select distinct cerbacPolicyRule from CerbacPolicyRule cerbacPolicyRule left join fetch cerbacPolicyRule.cerbacActions",
        countQuery = "select count(distinct cerbacPolicyRule) from CerbacPolicyRule cerbacPolicyRule"
    )
    Page<CerbacPolicyRule> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct cerbacPolicyRule from CerbacPolicyRule cerbacPolicyRule left join fetch cerbacPolicyRule.cerbacActions")
    List<CerbacPolicyRule> findAllWithEagerRelationships();

    @Query(
        "select cerbacPolicyRule from CerbacPolicyRule cerbacPolicyRule left join fetch cerbacPolicyRule.cerbacActions where cerbacPolicyRule.id =:id"
    )
    Optional<CerbacPolicyRule> findOneWithEagerRelationships(@Param("id") Long id);
}

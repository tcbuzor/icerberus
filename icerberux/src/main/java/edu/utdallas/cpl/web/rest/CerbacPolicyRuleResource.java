package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacPolicyRule;
import edu.utdallas.cpl.repository.CerbacPolicyRuleRepository;
import edu.utdallas.cpl.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacPolicyRule}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacPolicyRuleResource {

    private final Logger log = LoggerFactory.getLogger(CerbacPolicyRuleResource.class);

    private static final String ENTITY_NAME = "cerbacPolicyRule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacPolicyRuleRepository cerbacPolicyRuleRepository;

    public CerbacPolicyRuleResource(CerbacPolicyRuleRepository cerbacPolicyRuleRepository) {
        this.cerbacPolicyRuleRepository = cerbacPolicyRuleRepository;
    }

    /**
     * {@code POST  /cerbac-policy-rules} : Create a new cerbacPolicyRule.
     *
     * @param cerbacPolicyRule the cerbacPolicyRule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacPolicyRule, or with status {@code 400 (Bad Request)} if the cerbacPolicyRule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-policy-rules")
    public ResponseEntity<CerbacPolicyRule> createCerbacPolicyRule(@Valid @RequestBody CerbacPolicyRule cerbacPolicyRule)
        throws URISyntaxException {
        log.debug("REST request to save CerbacPolicyRule : {}", cerbacPolicyRule);
        if (cerbacPolicyRule.getId() != null) {
            throw new BadRequestAlertException("A new cerbacPolicyRule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacPolicyRule result = cerbacPolicyRuleRepository.save(cerbacPolicyRule);
        return ResponseEntity
            .created(new URI("/api/cerbac-policy-rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-policy-rules/:id} : Updates an existing cerbacPolicyRule.
     *
     * @param id the id of the cerbacPolicyRule to save.
     * @param cerbacPolicyRule the cerbacPolicyRule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacPolicyRule,
     * or with status {@code 400 (Bad Request)} if the cerbacPolicyRule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacPolicyRule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-policy-rules/{id}")
    public ResponseEntity<CerbacPolicyRule> updateCerbacPolicyRule(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacPolicyRule cerbacPolicyRule
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacPolicyRule : {}, {}", id, cerbacPolicyRule);
        if (cerbacPolicyRule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacPolicyRule.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacPolicyRuleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacPolicyRule result = cerbacPolicyRuleRepository.save(cerbacPolicyRule);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacPolicyRule.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-policy-rules/:id} : Partial updates given fields of an existing cerbacPolicyRule, field will ignore if it is null
     *
     * @param id the id of the cerbacPolicyRule to save.
     * @param cerbacPolicyRule the cerbacPolicyRule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacPolicyRule,
     * or with status {@code 400 (Bad Request)} if the cerbacPolicyRule is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacPolicyRule is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacPolicyRule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-policy-rules/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacPolicyRule> partialUpdateCerbacPolicyRule(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacPolicyRule cerbacPolicyRule
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacPolicyRule partially : {}, {}", id, cerbacPolicyRule);
        if (cerbacPolicyRule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacPolicyRule.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacPolicyRuleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacPolicyRule> result = cerbacPolicyRuleRepository
            .findById(cerbacPolicyRule.getId())
            .map(
                existingCerbacPolicyRule -> {
                    if (cerbacPolicyRule.getSid() != null) {
                        existingCerbacPolicyRule.setSid(cerbacPolicyRule.getSid());
                    }

                    return existingCerbacPolicyRule;
                }
            )
            .map(cerbacPolicyRuleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacPolicyRule.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-policy-rules} : get all the cerbacPolicyRules.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacPolicyRules in body.
     */
    @GetMapping("/cerbac-policy-rules")
    public List<CerbacPolicyRule> getAllCerbacPolicyRules(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all CerbacPolicyRules");
        return cerbacPolicyRuleRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /cerbac-policy-rules/:id} : get the "id" cerbacPolicyRule.
     *
     * @param id the id of the cerbacPolicyRule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacPolicyRule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-policy-rules/{id}")
    public ResponseEntity<CerbacPolicyRule> getCerbacPolicyRule(@PathVariable Long id) {
        log.debug("REST request to get CerbacPolicyRule : {}", id);
        Optional<CerbacPolicyRule> cerbacPolicyRule = cerbacPolicyRuleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(cerbacPolicyRule);
    }

    /**
     * {@code DELETE  /cerbac-policy-rules/:id} : delete the "id" cerbacPolicyRule.
     *
     * @param id the id of the cerbacPolicyRule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-policy-rules/{id}")
    public ResponseEntity<Void> deleteCerbacPolicyRule(@PathVariable Long id) {
        log.debug("REST request to delete CerbacPolicyRule : {}", id);
        cerbacPolicyRuleRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

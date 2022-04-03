package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacPolicy;
import edu.utdallas.cpl.repository.CerbacPolicyRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacPolicy}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacPolicyResource {

    private final Logger log = LoggerFactory.getLogger(CerbacPolicyResource.class);

    private static final String ENTITY_NAME = "cerbacPolicy";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacPolicyRepository cerbacPolicyRepository;

    public CerbacPolicyResource(CerbacPolicyRepository cerbacPolicyRepository) {
        this.cerbacPolicyRepository = cerbacPolicyRepository;
    }

    /**
     * {@code POST  /cerbac-policies} : Create a new cerbacPolicy.
     *
     * @param cerbacPolicy the cerbacPolicy to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacPolicy, or with status {@code 400 (Bad Request)} if the cerbacPolicy has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-policies")
    public ResponseEntity<CerbacPolicy> createCerbacPolicy(@Valid @RequestBody CerbacPolicy cerbacPolicy) throws URISyntaxException {
        log.debug("REST request to save CerbacPolicy : {}", cerbacPolicy);
        if (cerbacPolicy.getId() != null) {
            throw new BadRequestAlertException("A new cerbacPolicy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacPolicy result = cerbacPolicyRepository.save(cerbacPolicy);
        return ResponseEntity
            .created(new URI("/api/cerbac-policies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-policies/:id} : Updates an existing cerbacPolicy.
     *
     * @param id the id of the cerbacPolicy to save.
     * @param cerbacPolicy the cerbacPolicy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacPolicy,
     * or with status {@code 400 (Bad Request)} if the cerbacPolicy is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacPolicy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-policies/{id}")
    public ResponseEntity<CerbacPolicy> updateCerbacPolicy(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacPolicy cerbacPolicy
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacPolicy : {}, {}", id, cerbacPolicy);
        if (cerbacPolicy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacPolicy.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacPolicyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacPolicy result = cerbacPolicyRepository.save(cerbacPolicy);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacPolicy.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-policies/:id} : Partial updates given fields of an existing cerbacPolicy, field will ignore if it is null
     *
     * @param id the id of the cerbacPolicy to save.
     * @param cerbacPolicy the cerbacPolicy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacPolicy,
     * or with status {@code 400 (Bad Request)} if the cerbacPolicy is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacPolicy is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacPolicy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-policies/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CerbacPolicy> partialUpdateCerbacPolicy(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacPolicy cerbacPolicy
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacPolicy partially : {}, {}", id, cerbacPolicy);
        if (cerbacPolicy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacPolicy.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacPolicyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacPolicy> result = cerbacPolicyRepository
            .findById(cerbacPolicy.getId())
            .map(existingCerbacPolicy -> {
                if (cerbacPolicy.getPid() != null) {
                    existingCerbacPolicy.setPid(cerbacPolicy.getPid());
                }
                if (cerbacPolicy.getPriority() != null) {
                    existingCerbacPolicy.setPriority(cerbacPolicy.getPriority());
                }

                return existingCerbacPolicy;
            })
            .map(cerbacPolicyRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacPolicy.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-policies} : get all the cerbacPolicies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacPolicies in body.
     */
    @GetMapping("/cerbac-policies")
    public List<CerbacPolicy> getAllCerbacPolicies() {
        log.debug("REST request to get all CerbacPolicies");
        return cerbacPolicyRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-policies/:id} : get the "id" cerbacPolicy.
     *
     * @param id the id of the cerbacPolicy to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacPolicy, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-policies/{id}")
    public ResponseEntity<CerbacPolicy> getCerbacPolicy(@PathVariable Long id) {
        log.debug("REST request to get CerbacPolicy : {}", id);
        Optional<CerbacPolicy> cerbacPolicy = cerbacPolicyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacPolicy);
    }

    /**
     * {@code DELETE  /cerbac-policies/:id} : delete the "id" cerbacPolicy.
     *
     * @param id the id of the cerbacPolicy to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-policies/{id}")
    public ResponseEntity<Void> deleteCerbacPolicy(@PathVariable Long id) {
        log.debug("REST request to delete CerbacPolicy : {}", id);
        cerbacPolicyRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhereTarget;
import edu.utdallas.cpl.repository.CerbacWhereTargetRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhereTarget}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhereTargetResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhereTargetResource.class);

    private static final String ENTITY_NAME = "cerbacWhereTarget";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhereTargetRepository cerbacWhereTargetRepository;

    public CerbacWhereTargetResource(CerbacWhereTargetRepository cerbacWhereTargetRepository) {
        this.cerbacWhereTargetRepository = cerbacWhereTargetRepository;
    }

    /**
     * {@code POST  /cerbac-where-targets} : Create a new cerbacWhereTarget.
     *
     * @param cerbacWhereTarget the cerbacWhereTarget to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhereTarget, or with status {@code 400 (Bad Request)} if the cerbacWhereTarget has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-where-targets")
    public ResponseEntity<CerbacWhereTarget> createCerbacWhereTarget(@Valid @RequestBody CerbacWhereTarget cerbacWhereTarget)
        throws URISyntaxException {
        log.debug("REST request to save CerbacWhereTarget : {}", cerbacWhereTarget);
        if (cerbacWhereTarget.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhereTarget cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhereTarget result = cerbacWhereTargetRepository.save(cerbacWhereTarget);
        return ResponseEntity
            .created(new URI("/api/cerbac-where-targets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-where-targets/:id} : Updates an existing cerbacWhereTarget.
     *
     * @param id the id of the cerbacWhereTarget to save.
     * @param cerbacWhereTarget the cerbacWhereTarget to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhereTarget,
     * or with status {@code 400 (Bad Request)} if the cerbacWhereTarget is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhereTarget couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-where-targets/{id}")
    public ResponseEntity<CerbacWhereTarget> updateCerbacWhereTarget(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacWhereTarget cerbacWhereTarget
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhereTarget : {}, {}", id, cerbacWhereTarget);
        if (cerbacWhereTarget.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhereTarget.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhereTargetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhereTarget result = cerbacWhereTargetRepository.save(cerbacWhereTarget);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhereTarget.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-where-targets/:id} : Partial updates given fields of an existing cerbacWhereTarget, field will ignore if it is null
     *
     * @param id the id of the cerbacWhereTarget to save.
     * @param cerbacWhereTarget the cerbacWhereTarget to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhereTarget,
     * or with status {@code 400 (Bad Request)} if the cerbacWhereTarget is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhereTarget is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhereTarget couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-where-targets/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhereTarget> partialUpdateCerbacWhereTarget(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacWhereTarget cerbacWhereTarget
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhereTarget partially : {}, {}", id, cerbacWhereTarget);
        if (cerbacWhereTarget.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhereTarget.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhereTargetRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhereTarget> result = cerbacWhereTargetRepository
            .findById(cerbacWhereTarget.getId())
            .map(
                existingCerbacWhereTarget -> {
                    if (cerbacWhereTarget.getValue() != null) {
                        existingCerbacWhereTarget.setValue(cerbacWhereTarget.getValue());
                    }

                    return existingCerbacWhereTarget;
                }
            )
            .map(cerbacWhereTargetRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhereTarget.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-where-targets} : get all the cerbacWhereTargets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhereTargets in body.
     */
    @GetMapping("/cerbac-where-targets")
    public List<CerbacWhereTarget> getAllCerbacWhereTargets() {
        log.debug("REST request to get all CerbacWhereTargets");
        return cerbacWhereTargetRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-where-targets/:id} : get the "id" cerbacWhereTarget.
     *
     * @param id the id of the cerbacWhereTarget to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhereTarget, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-where-targets/{id}")
    public ResponseEntity<CerbacWhereTarget> getCerbacWhereTarget(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhereTarget : {}", id);
        Optional<CerbacWhereTarget> cerbacWhereTarget = cerbacWhereTargetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhereTarget);
    }

    /**
     * {@code DELETE  /cerbac-where-targets/:id} : delete the "id" cerbacWhereTarget.
     *
     * @param id the id of the cerbacWhereTarget to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-where-targets/{id}")
    public ResponseEntity<Void> deleteCerbacWhereTarget(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhereTarget : {}", id);
        cerbacWhereTargetRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

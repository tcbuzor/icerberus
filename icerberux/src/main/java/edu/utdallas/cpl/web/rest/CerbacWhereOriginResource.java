package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhereOrigin;
import edu.utdallas.cpl.repository.CerbacWhereOriginRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhereOrigin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhereOriginResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhereOriginResource.class);

    private static final String ENTITY_NAME = "cerbacWhereOrigin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhereOriginRepository cerbacWhereOriginRepository;

    public CerbacWhereOriginResource(CerbacWhereOriginRepository cerbacWhereOriginRepository) {
        this.cerbacWhereOriginRepository = cerbacWhereOriginRepository;
    }

    /**
     * {@code POST  /cerbac-where-origins} : Create a new cerbacWhereOrigin.
     *
     * @param cerbacWhereOrigin the cerbacWhereOrigin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhereOrigin, or with status {@code 400 (Bad Request)} if the cerbacWhereOrigin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-where-origins")
    public ResponseEntity<CerbacWhereOrigin> createCerbacWhereOrigin(@Valid @RequestBody CerbacWhereOrigin cerbacWhereOrigin)
        throws URISyntaxException {
        log.debug("REST request to save CerbacWhereOrigin : {}", cerbacWhereOrigin);
        if (cerbacWhereOrigin.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhereOrigin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhereOrigin result = cerbacWhereOriginRepository.save(cerbacWhereOrigin);
        return ResponseEntity
            .created(new URI("/api/cerbac-where-origins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-where-origins/:id} : Updates an existing cerbacWhereOrigin.
     *
     * @param id the id of the cerbacWhereOrigin to save.
     * @param cerbacWhereOrigin the cerbacWhereOrigin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhereOrigin,
     * or with status {@code 400 (Bad Request)} if the cerbacWhereOrigin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhereOrigin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-where-origins/{id}")
    public ResponseEntity<CerbacWhereOrigin> updateCerbacWhereOrigin(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacWhereOrigin cerbacWhereOrigin
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhereOrigin : {}, {}", id, cerbacWhereOrigin);
        if (cerbacWhereOrigin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhereOrigin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhereOriginRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhereOrigin result = cerbacWhereOriginRepository.save(cerbacWhereOrigin);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhereOrigin.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-where-origins/:id} : Partial updates given fields of an existing cerbacWhereOrigin, field will ignore if it is null
     *
     * @param id the id of the cerbacWhereOrigin to save.
     * @param cerbacWhereOrigin the cerbacWhereOrigin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhereOrigin,
     * or with status {@code 400 (Bad Request)} if the cerbacWhereOrigin is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhereOrigin is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhereOrigin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-where-origins/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhereOrigin> partialUpdateCerbacWhereOrigin(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacWhereOrigin cerbacWhereOrigin
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhereOrigin partially : {}, {}", id, cerbacWhereOrigin);
        if (cerbacWhereOrigin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhereOrigin.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhereOriginRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhereOrigin> result = cerbacWhereOriginRepository
            .findById(cerbacWhereOrigin.getId())
            .map(
                existingCerbacWhereOrigin -> {
                    if (cerbacWhereOrigin.getValue() != null) {
                        existingCerbacWhereOrigin.setValue(cerbacWhereOrigin.getValue());
                    }

                    return existingCerbacWhereOrigin;
                }
            )
            .map(cerbacWhereOriginRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhereOrigin.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-where-origins} : get all the cerbacWhereOrigins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhereOrigins in body.
     */
    @GetMapping("/cerbac-where-origins")
    public List<CerbacWhereOrigin> getAllCerbacWhereOrigins() {
        log.debug("REST request to get all CerbacWhereOrigins");
        return cerbacWhereOriginRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-where-origins/:id} : get the "id" cerbacWhereOrigin.
     *
     * @param id the id of the cerbacWhereOrigin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhereOrigin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-where-origins/{id}")
    public ResponseEntity<CerbacWhereOrigin> getCerbacWhereOrigin(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhereOrigin : {}", id);
        Optional<CerbacWhereOrigin> cerbacWhereOrigin = cerbacWhereOriginRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhereOrigin);
    }

    /**
     * {@code DELETE  /cerbac-where-origins/:id} : delete the "id" cerbacWhereOrigin.
     *
     * @param id the id of the cerbacWhereOrigin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-where-origins/{id}")
    public ResponseEntity<Void> deleteCerbacWhereOrigin(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhereOrigin : {}", id);
        cerbacWhereOriginRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

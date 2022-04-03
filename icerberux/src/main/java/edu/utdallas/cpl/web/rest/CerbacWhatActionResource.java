package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhatAction;
import edu.utdallas.cpl.repository.CerbacWhatActionRepository;
import edu.utdallas.cpl.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhatAction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhatActionResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhatActionResource.class);

    private static final String ENTITY_NAME = "cerbacWhatAction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhatActionRepository cerbacWhatActionRepository;

    public CerbacWhatActionResource(CerbacWhatActionRepository cerbacWhatActionRepository) {
        this.cerbacWhatActionRepository = cerbacWhatActionRepository;
    }

    /**
     * {@code POST  /cerbac-what-actions} : Create a new cerbacWhatAction.
     *
     * @param cerbacWhatAction the cerbacWhatAction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhatAction, or with status {@code 400 (Bad Request)} if the cerbacWhatAction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-what-actions")
    public ResponseEntity<CerbacWhatAction> createCerbacWhatAction(@RequestBody CerbacWhatAction cerbacWhatAction)
        throws URISyntaxException {
        log.debug("REST request to save CerbacWhatAction : {}", cerbacWhatAction);
        if (cerbacWhatAction.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhatAction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhatAction result = cerbacWhatActionRepository.save(cerbacWhatAction);
        return ResponseEntity
            .created(new URI("/api/cerbac-what-actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-what-actions/:id} : Updates an existing cerbacWhatAction.
     *
     * @param id the id of the cerbacWhatAction to save.
     * @param cerbacWhatAction the cerbacWhatAction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhatAction,
     * or with status {@code 400 (Bad Request)} if the cerbacWhatAction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhatAction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-what-actions/{id}")
    public ResponseEntity<CerbacWhatAction> updateCerbacWhatAction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CerbacWhatAction cerbacWhatAction
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhatAction : {}, {}", id, cerbacWhatAction);
        if (cerbacWhatAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhatAction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhatActionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhatAction result = cerbacWhatActionRepository.save(cerbacWhatAction);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhatAction.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-what-actions/:id} : Partial updates given fields of an existing cerbacWhatAction, field will ignore if it is null
     *
     * @param id the id of the cerbacWhatAction to save.
     * @param cerbacWhatAction the cerbacWhatAction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhatAction,
     * or with status {@code 400 (Bad Request)} if the cerbacWhatAction is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhatAction is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhatAction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-what-actions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhatAction> partialUpdateCerbacWhatAction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CerbacWhatAction cerbacWhatAction
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhatAction partially : {}, {}", id, cerbacWhatAction);
        if (cerbacWhatAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhatAction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhatActionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhatAction> result = cerbacWhatActionRepository
            .findById(cerbacWhatAction.getId())
            .map(
                existingCerbacWhatAction -> {
                    return existingCerbacWhatAction;
                }
            )
            .map(cerbacWhatActionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhatAction.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-what-actions} : get all the cerbacWhatActions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhatActions in body.
     */
    @GetMapping("/cerbac-what-actions")
    public List<CerbacWhatAction> getAllCerbacWhatActions() {
        log.debug("REST request to get all CerbacWhatActions");
        return cerbacWhatActionRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-what-actions/:id} : get the "id" cerbacWhatAction.
     *
     * @param id the id of the cerbacWhatAction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhatAction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-what-actions/{id}")
    public ResponseEntity<CerbacWhatAction> getCerbacWhatAction(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhatAction : {}", id);
        Optional<CerbacWhatAction> cerbacWhatAction = cerbacWhatActionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhatAction);
    }

    /**
     * {@code DELETE  /cerbac-what-actions/:id} : delete the "id" cerbacWhatAction.
     *
     * @param id the id of the cerbacWhatAction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-what-actions/{id}")
    public ResponseEntity<Void> deleteCerbacWhatAction(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhatAction : {}", id);
        cerbacWhatActionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

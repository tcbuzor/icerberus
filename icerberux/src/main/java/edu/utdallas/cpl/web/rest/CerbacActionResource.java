package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacAction;
import edu.utdallas.cpl.repository.CerbacActionRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacAction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacActionResource {

    private final Logger log = LoggerFactory.getLogger(CerbacActionResource.class);

    private static final String ENTITY_NAME = "cerbacAction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacActionRepository cerbacActionRepository;

    public CerbacActionResource(CerbacActionRepository cerbacActionRepository) {
        this.cerbacActionRepository = cerbacActionRepository;
    }

    /**
     * {@code POST  /cerbac-actions} : Create a new cerbacAction.
     *
     * @param cerbacAction the cerbacAction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacAction, or with status {@code 400 (Bad Request)} if the cerbacAction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-actions")
    public ResponseEntity<CerbacAction> createCerbacAction(@Valid @RequestBody CerbacAction cerbacAction) throws URISyntaxException {
        log.debug("REST request to save CerbacAction : {}", cerbacAction);
        if (cerbacAction.getId() != null) {
            throw new BadRequestAlertException("A new cerbacAction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacAction result = cerbacActionRepository.save(cerbacAction);
        return ResponseEntity
            .created(new URI("/api/cerbac-actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-actions/:id} : Updates an existing cerbacAction.
     *
     * @param id the id of the cerbacAction to save.
     * @param cerbacAction the cerbacAction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacAction,
     * or with status {@code 400 (Bad Request)} if the cerbacAction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacAction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-actions/{id}")
    public ResponseEntity<CerbacAction> updateCerbacAction(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacAction cerbacAction
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacAction : {}, {}", id, cerbacAction);
        if (cerbacAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacAction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacActionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacAction result = cerbacActionRepository.save(cerbacAction);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacAction.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-actions/:id} : Partial updates given fields of an existing cerbacAction, field will ignore if it is null
     *
     * @param id the id of the cerbacAction to save.
     * @param cerbacAction the cerbacAction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacAction,
     * or with status {@code 400 (Bad Request)} if the cerbacAction is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacAction is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacAction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-actions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacAction> partialUpdateCerbacAction(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacAction cerbacAction
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacAction partially : {}, {}", id, cerbacAction);
        if (cerbacAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacAction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacActionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacAction> result = cerbacActionRepository
            .findById(cerbacAction.getId())
            .map(
                existingCerbacAction -> {
                    if (cerbacAction.getName() != null) {
                        existingCerbacAction.setName(cerbacAction.getName());
                    }

                    return existingCerbacAction;
                }
            )
            .map(cerbacActionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacAction.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-actions} : get all the cerbacActions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacActions in body.
     */
    @GetMapping("/cerbac-actions")
    public List<CerbacAction> getAllCerbacActions() {
        log.debug("REST request to get all CerbacActions");
        return cerbacActionRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-actions/:id} : get the "id" cerbacAction.
     *
     * @param id the id of the cerbacAction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacAction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-actions/{id}")
    public ResponseEntity<CerbacAction> getCerbacAction(@PathVariable Long id) {
        log.debug("REST request to get CerbacAction : {}", id);
        Optional<CerbacAction> cerbacAction = cerbacActionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacAction);
    }

    /**
     * {@code DELETE  /cerbac-actions/:id} : delete the "id" cerbacAction.
     *
     * @param id the id of the cerbacAction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-actions/{id}")
    public ResponseEntity<Void> deleteCerbacAction(@PathVariable Long id) {
        log.debug("REST request to delete CerbacAction : {}", id);
        cerbacActionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

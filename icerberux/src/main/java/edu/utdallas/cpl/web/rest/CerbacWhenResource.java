package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhen;
import edu.utdallas.cpl.repository.CerbacWhenRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhen}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhenResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhenResource.class);

    private static final String ENTITY_NAME = "cerbacWhen";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhenRepository cerbacWhenRepository;

    public CerbacWhenResource(CerbacWhenRepository cerbacWhenRepository) {
        this.cerbacWhenRepository = cerbacWhenRepository;
    }

    /**
     * {@code POST  /cerbac-whens} : Create a new cerbacWhen.
     *
     * @param cerbacWhen the cerbacWhen to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhen, or with status {@code 400 (Bad Request)} if the cerbacWhen has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-whens")
    public ResponseEntity<CerbacWhen> createCerbacWhen(@Valid @RequestBody CerbacWhen cerbacWhen) throws URISyntaxException {
        log.debug("REST request to save CerbacWhen : {}", cerbacWhen);
        if (cerbacWhen.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhen cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhen result = cerbacWhenRepository.save(cerbacWhen);
        return ResponseEntity
            .created(new URI("/api/cerbac-whens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-whens/:id} : Updates an existing cerbacWhen.
     *
     * @param id the id of the cerbacWhen to save.
     * @param cerbacWhen the cerbacWhen to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhen,
     * or with status {@code 400 (Bad Request)} if the cerbacWhen is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhen couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-whens/{id}")
    public ResponseEntity<CerbacWhen> updateCerbacWhen(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacWhen cerbacWhen
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhen : {}, {}", id, cerbacWhen);
        if (cerbacWhen.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhen.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhenRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhen result = cerbacWhenRepository.save(cerbacWhen);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhen.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-whens/:id} : Partial updates given fields of an existing cerbacWhen, field will ignore if it is null
     *
     * @param id the id of the cerbacWhen to save.
     * @param cerbacWhen the cerbacWhen to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhen,
     * or with status {@code 400 (Bad Request)} if the cerbacWhen is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhen is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhen couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-whens/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhen> partialUpdateCerbacWhen(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacWhen cerbacWhen
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhen partially : {}, {}", id, cerbacWhen);
        if (cerbacWhen.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhen.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhenRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhen> result = cerbacWhenRepository
            .findById(cerbacWhen.getId())
            .map(
                existingCerbacWhen -> {
                    if (cerbacWhen.getWhenCondition() != null) {
                        existingCerbacWhen.setWhenCondition(cerbacWhen.getWhenCondition());
                    }
                    if (cerbacWhen.getValue() != null) {
                        existingCerbacWhen.setValue(cerbacWhen.getValue());
                    }

                    return existingCerbacWhen;
                }
            )
            .map(cerbacWhenRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhen.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-whens} : get all the cerbacWhens.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhens in body.
     */
    @GetMapping("/cerbac-whens")
    public List<CerbacWhen> getAllCerbacWhens() {
        log.debug("REST request to get all CerbacWhens");
        return cerbacWhenRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-whens/:id} : get the "id" cerbacWhen.
     *
     * @param id the id of the cerbacWhen to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhen, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-whens/{id}")
    public ResponseEntity<CerbacWhen> getCerbacWhen(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhen : {}", id);
        Optional<CerbacWhen> cerbacWhen = cerbacWhenRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhen);
    }

    /**
     * {@code DELETE  /cerbac-whens/:id} : delete the "id" cerbacWhen.
     *
     * @param id the id of the cerbacWhen to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-whens/{id}")
    public ResponseEntity<Void> deleteCerbacWhen(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhen : {}", id);
        cerbacWhenRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

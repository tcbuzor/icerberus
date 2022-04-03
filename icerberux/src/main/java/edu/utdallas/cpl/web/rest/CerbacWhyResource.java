package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhy;
import edu.utdallas.cpl.repository.CerbacWhyRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhy}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhyResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhyResource.class);

    private static final String ENTITY_NAME = "cerbacWhy";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhyRepository cerbacWhyRepository;

    public CerbacWhyResource(CerbacWhyRepository cerbacWhyRepository) {
        this.cerbacWhyRepository = cerbacWhyRepository;
    }

    /**
     * {@code POST  /cerbac-whies} : Create a new cerbacWhy.
     *
     * @param cerbacWhy the cerbacWhy to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhy, or with status {@code 400 (Bad Request)} if the cerbacWhy has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-whies")
    public ResponseEntity<CerbacWhy> createCerbacWhy(@Valid @RequestBody CerbacWhy cerbacWhy) throws URISyntaxException {
        log.debug("REST request to save CerbacWhy : {}", cerbacWhy);
        if (cerbacWhy.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhy cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhy result = cerbacWhyRepository.save(cerbacWhy);
        return ResponseEntity
            .created(new URI("/api/cerbac-whies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-whies/:id} : Updates an existing cerbacWhy.
     *
     * @param id the id of the cerbacWhy to save.
     * @param cerbacWhy the cerbacWhy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhy,
     * or with status {@code 400 (Bad Request)} if the cerbacWhy is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-whies/{id}")
    public ResponseEntity<CerbacWhy> updateCerbacWhy(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacWhy cerbacWhy
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhy : {}, {}", id, cerbacWhy);
        if (cerbacWhy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhy.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhy result = cerbacWhyRepository.save(cerbacWhy);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhy.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-whies/:id} : Partial updates given fields of an existing cerbacWhy, field will ignore if it is null
     *
     * @param id the id of the cerbacWhy to save.
     * @param cerbacWhy the cerbacWhy to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhy,
     * or with status {@code 400 (Bad Request)} if the cerbacWhy is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhy is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhy couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-whies/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhy> partialUpdateCerbacWhy(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacWhy cerbacWhy
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhy partially : {}, {}", id, cerbacWhy);
        if (cerbacWhy.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhy.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhy> result = cerbacWhyRepository
            .findById(cerbacWhy.getId())
            .map(
                existingCerbacWhy -> {
                    if (cerbacWhy.getReason() != null) {
                        existingCerbacWhy.setReason(cerbacWhy.getReason());
                    }

                    return existingCerbacWhy;
                }
            )
            .map(cerbacWhyRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhy.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-whies} : get all the cerbacWhies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhies in body.
     */
    @GetMapping("/cerbac-whies")
    public List<CerbacWhy> getAllCerbacWhies() {
        log.debug("REST request to get all CerbacWhies");
        return cerbacWhyRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-whies/:id} : get the "id" cerbacWhy.
     *
     * @param id the id of the cerbacWhy to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhy, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-whies/{id}")
    public ResponseEntity<CerbacWhy> getCerbacWhy(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhy : {}", id);
        Optional<CerbacWhy> cerbacWhy = cerbacWhyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhy);
    }

    /**
     * {@code DELETE  /cerbac-whies/:id} : delete the "id" cerbacWhy.
     *
     * @param id the id of the cerbacWhy to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-whies/{id}")
    public ResponseEntity<Void> deleteCerbacWhy(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhy : {}", id);
        cerbacWhyRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

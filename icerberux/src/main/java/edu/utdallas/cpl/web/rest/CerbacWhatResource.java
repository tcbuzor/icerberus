package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhat;
import edu.utdallas.cpl.repository.CerbacWhatRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhat}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhatResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhatResource.class);

    private static final String ENTITY_NAME = "cerbacWhat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhatRepository cerbacWhatRepository;

    public CerbacWhatResource(CerbacWhatRepository cerbacWhatRepository) {
        this.cerbacWhatRepository = cerbacWhatRepository;
    }

    /**
     * {@code POST  /cerbac-whats} : Create a new cerbacWhat.
     *
     * @param cerbacWhat the cerbacWhat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhat, or with status {@code 400 (Bad Request)} if the cerbacWhat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-whats")
    public ResponseEntity<CerbacWhat> createCerbacWhat(@Valid @RequestBody CerbacWhat cerbacWhat) throws URISyntaxException {
        log.debug("REST request to save CerbacWhat : {}", cerbacWhat);
        if (cerbacWhat.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhat result = cerbacWhatRepository.save(cerbacWhat);
        return ResponseEntity
            .created(new URI("/api/cerbac-whats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-whats/:id} : Updates an existing cerbacWhat.
     *
     * @param id the id of the cerbacWhat to save.
     * @param cerbacWhat the cerbacWhat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhat,
     * or with status {@code 400 (Bad Request)} if the cerbacWhat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-whats/{id}")
    public ResponseEntity<CerbacWhat> updateCerbacWhat(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacWhat cerbacWhat
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhat : {}, {}", id, cerbacWhat);
        if (cerbacWhat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhat result = cerbacWhatRepository.save(cerbacWhat);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhat.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-whats/:id} : Partial updates given fields of an existing cerbacWhat, field will ignore if it is null
     *
     * @param id the id of the cerbacWhat to save.
     * @param cerbacWhat the cerbacWhat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhat,
     * or with status {@code 400 (Bad Request)} if the cerbacWhat is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhat is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-whats/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhat> partialUpdateCerbacWhat(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacWhat cerbacWhat
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhat partially : {}, {}", id, cerbacWhat);
        if (cerbacWhat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhat.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhatRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhat> result = cerbacWhatRepository
            .findById(cerbacWhat.getId())
            .map(
                existingCerbacWhat -> {
                    if (cerbacWhat.getName() != null) {
                        existingCerbacWhat.setName(cerbacWhat.getName());
                    }

                    return existingCerbacWhat;
                }
            )
            .map(cerbacWhatRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhat.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-whats} : get all the cerbacWhats.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhats in body.
     */
    @GetMapping("/cerbac-whats")
    public List<CerbacWhat> getAllCerbacWhats() {
        log.debug("REST request to get all CerbacWhats");
        return cerbacWhatRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-whats/:id} : get the "id" cerbacWhat.
     *
     * @param id the id of the cerbacWhat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-whats/{id}")
    public ResponseEntity<CerbacWhat> getCerbacWhat(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhat : {}", id);
        Optional<CerbacWhat> cerbacWhat = cerbacWhatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhat);
    }

    /**
     * {@code DELETE  /cerbac-whats/:id} : delete the "id" cerbacWhat.
     *
     * @param id the id of the cerbacWhat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-whats/{id}")
    public ResponseEntity<Void> deleteCerbacWhat(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhat : {}", id);
        cerbacWhatRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

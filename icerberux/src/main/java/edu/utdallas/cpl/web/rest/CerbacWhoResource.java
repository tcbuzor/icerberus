package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWho;
import edu.utdallas.cpl.repository.CerbacWhoRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWho}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhoResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhoResource.class);

    private static final String ENTITY_NAME = "cerbacWho";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhoRepository cerbacWhoRepository;

    public CerbacWhoResource(CerbacWhoRepository cerbacWhoRepository) {
        this.cerbacWhoRepository = cerbacWhoRepository;
    }

    /**
     * {@code POST  /cerbac-whos} : Create a new cerbacWho.
     *
     * @param cerbacWho the cerbacWho to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWho, or with status {@code 400 (Bad Request)} if the cerbacWho has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-whos")
    public ResponseEntity<CerbacWho> createCerbacWho(@Valid @RequestBody CerbacWho cerbacWho) throws URISyntaxException {
        log.debug("REST request to save CerbacWho : {}", cerbacWho);
        if (cerbacWho.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWho cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWho result = cerbacWhoRepository.save(cerbacWho);
        return ResponseEntity
            .created(new URI("/api/cerbac-whos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-whos/:id} : Updates an existing cerbacWho.
     *
     * @param id the id of the cerbacWho to save.
     * @param cerbacWho the cerbacWho to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWho,
     * or with status {@code 400 (Bad Request)} if the cerbacWho is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWho couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-whos/{id}")
    public ResponseEntity<CerbacWho> updateCerbacWho(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacWho cerbacWho
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWho : {}, {}", id, cerbacWho);
        if (cerbacWho.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWho.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWho result = cerbacWhoRepository.save(cerbacWho);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWho.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-whos/:id} : Partial updates given fields of an existing cerbacWho, field will ignore if it is null
     *
     * @param id the id of the cerbacWho to save.
     * @param cerbacWho the cerbacWho to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWho,
     * or with status {@code 400 (Bad Request)} if the cerbacWho is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWho is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWho couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-whos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWho> partialUpdateCerbacWho(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacWho cerbacWho
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWho partially : {}, {}", id, cerbacWho);
        if (cerbacWho.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWho.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWho> result = cerbacWhoRepository
            .findById(cerbacWho.getId())
            .map(
                existingCerbacWho -> {
                    if (cerbacWho.getName() != null) {
                        existingCerbacWho.setName(cerbacWho.getName());
                    }

                    return existingCerbacWho;
                }
            )
            .map(cerbacWhoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWho.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-whos} : get all the cerbacWhos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhos in body.
     */
    @GetMapping("/cerbac-whos")
    public List<CerbacWho> getAllCerbacWhos() {
        log.debug("REST request to get all CerbacWhos");
        return cerbacWhoRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-whos/:id} : get the "id" cerbacWho.
     *
     * @param id the id of the cerbacWho to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWho, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-whos/{id}")
    public ResponseEntity<CerbacWho> getCerbacWho(@PathVariable Long id) {
        log.debug("REST request to get CerbacWho : {}", id);
        Optional<CerbacWho> cerbacWho = cerbacWhoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWho);
    }

    /**
     * {@code DELETE  /cerbac-whos/:id} : delete the "id" cerbacWho.
     *
     * @param id the id of the cerbacWho to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-whos/{id}")
    public ResponseEntity<Void> deleteCerbacWho(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWho : {}", id);
        cerbacWhoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacOntology;
import edu.utdallas.cpl.repository.CerbacOntologyRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacOntology}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacOntologyResource {

    private final Logger log = LoggerFactory.getLogger(CerbacOntologyResource.class);

    private static final String ENTITY_NAME = "cerbacOntology";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacOntologyRepository cerbacOntologyRepository;

    public CerbacOntologyResource(CerbacOntologyRepository cerbacOntologyRepository) {
        this.cerbacOntologyRepository = cerbacOntologyRepository;
    }

    /**
     * {@code POST  /cerbac-ontologies} : Create a new cerbacOntology.
     *
     * @param cerbacOntology the cerbacOntology to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacOntology, or with status {@code 400 (Bad Request)} if the cerbacOntology has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-ontologies")
    public ResponseEntity<CerbacOntology> createCerbacOntology(@Valid @RequestBody CerbacOntology cerbacOntology)
        throws URISyntaxException {
        log.debug("REST request to save CerbacOntology : {}", cerbacOntology);
        if (cerbacOntology.getId() != null) {
            throw new BadRequestAlertException("A new cerbacOntology cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacOntology result = cerbacOntologyRepository.save(cerbacOntology);
        return ResponseEntity
            .created(new URI("/api/cerbac-ontologies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-ontologies/:id} : Updates an existing cerbacOntology.
     *
     * @param id the id of the cerbacOntology to save.
     * @param cerbacOntology the cerbacOntology to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacOntology,
     * or with status {@code 400 (Bad Request)} if the cerbacOntology is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacOntology couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-ontologies/{id}")
    public ResponseEntity<CerbacOntology> updateCerbacOntology(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacOntology cerbacOntology
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacOntology : {}, {}", id, cerbacOntology);
        if (cerbacOntology.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacOntology.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacOntologyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacOntology result = cerbacOntologyRepository.save(cerbacOntology);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacOntology.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-ontologies/:id} : Partial updates given fields of an existing cerbacOntology, field will ignore if it is null
     *
     * @param id the id of the cerbacOntology to save.
     * @param cerbacOntology the cerbacOntology to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacOntology,
     * or with status {@code 400 (Bad Request)} if the cerbacOntology is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacOntology is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacOntology couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-ontologies/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CerbacOntology> partialUpdateCerbacOntology(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacOntology cerbacOntology
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacOntology partially : {}, {}", id, cerbacOntology);
        if (cerbacOntology.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacOntology.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacOntologyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacOntology> result = cerbacOntologyRepository
            .findById(cerbacOntology.getId())
            .map(existingCerbacOntology -> {
                if (cerbacOntology.getSource() != null) {
                    existingCerbacOntology.setSource(cerbacOntology.getSource());
                }

                return existingCerbacOntology;
            })
            .map(cerbacOntologyRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacOntology.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-ontologies} : get all the cerbacOntologies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacOntologies in body.
     */
    @GetMapping("/cerbac-ontologies")
    public List<CerbacOntology> getAllCerbacOntologies() {
        log.debug("REST request to get all CerbacOntologies");
        return cerbacOntologyRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-ontologies/:id} : get the "id" cerbacOntology.
     *
     * @param id the id of the cerbacOntology to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacOntology, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-ontologies/{id}")
    public ResponseEntity<CerbacOntology> getCerbacOntology(@PathVariable Long id) {
        log.debug("REST request to get CerbacOntology : {}", id);
        Optional<CerbacOntology> cerbacOntology = cerbacOntologyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacOntology);
    }

    /**
     * {@code DELETE  /cerbac-ontologies/:id} : delete the "id" cerbacOntology.
     *
     * @param id the id of the cerbacOntology to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-ontologies/{id}")
    public ResponseEntity<Void> deleteCerbacOntology(@PathVariable Long id) {
        log.debug("REST request to delete CerbacOntology : {}", id);
        cerbacOntologyRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

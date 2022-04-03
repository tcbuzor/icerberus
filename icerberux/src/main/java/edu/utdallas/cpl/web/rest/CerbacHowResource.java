package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacHow;
import edu.utdallas.cpl.repository.CerbacHowRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacHow}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacHowResource {

    private final Logger log = LoggerFactory.getLogger(CerbacHowResource.class);

    private static final String ENTITY_NAME = "cerbacHow";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacHowRepository cerbacHowRepository;

    public CerbacHowResource(CerbacHowRepository cerbacHowRepository) {
        this.cerbacHowRepository = cerbacHowRepository;
    }

    /**
     * {@code POST  /cerbac-hows} : Create a new cerbacHow.
     *
     * @param cerbacHow the cerbacHow to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacHow, or with status {@code 400 (Bad Request)} if the cerbacHow has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-hows")
    public ResponseEntity<CerbacHow> createCerbacHow(@Valid @RequestBody CerbacHow cerbacHow) throws URISyntaxException {
        log.debug("REST request to save CerbacHow : {}", cerbacHow);
        if (cerbacHow.getId() != null) {
            throw new BadRequestAlertException("A new cerbacHow cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacHow result = cerbacHowRepository.save(cerbacHow);
        return ResponseEntity
            .created(new URI("/api/cerbac-hows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-hows/:id} : Updates an existing cerbacHow.
     *
     * @param id the id of the cerbacHow to save.
     * @param cerbacHow the cerbacHow to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacHow,
     * or with status {@code 400 (Bad Request)} if the cerbacHow is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacHow couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-hows/{id}")
    public ResponseEntity<CerbacHow> updateCerbacHow(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacHow cerbacHow
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacHow : {}, {}", id, cerbacHow);
        if (cerbacHow.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacHow.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacHowRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacHow result = cerbacHowRepository.save(cerbacHow);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacHow.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-hows/:id} : Partial updates given fields of an existing cerbacHow, field will ignore if it is null
     *
     * @param id the id of the cerbacHow to save.
     * @param cerbacHow the cerbacHow to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacHow,
     * or with status {@code 400 (Bad Request)} if the cerbacHow is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacHow is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacHow couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-hows/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacHow> partialUpdateCerbacHow(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacHow cerbacHow
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacHow partially : {}, {}", id, cerbacHow);
        if (cerbacHow.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacHow.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacHowRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacHow> result = cerbacHowRepository
            .findById(cerbacHow.getId())
            .map(
                existingCerbacHow -> {
                    if (cerbacHow.getHow() != null) {
                        existingCerbacHow.setHow(cerbacHow.getHow());
                    }

                    return existingCerbacHow;
                }
            )
            .map(cerbacHowRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacHow.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-hows} : get all the cerbacHows.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacHows in body.
     */
    @GetMapping("/cerbac-hows")
    public List<CerbacHow> getAllCerbacHows() {
        log.debug("REST request to get all CerbacHows");
        return cerbacHowRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-hows/:id} : get the "id" cerbacHow.
     *
     * @param id the id of the cerbacHow to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacHow, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-hows/{id}")
    public ResponseEntity<CerbacHow> getCerbacHow(@PathVariable Long id) {
        log.debug("REST request to get CerbacHow : {}", id);
        Optional<CerbacHow> cerbacHow = cerbacHowRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacHow);
    }

    /**
     * {@code DELETE  /cerbac-hows/:id} : delete the "id" cerbacHow.
     *
     * @param id the id of the cerbacHow to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-hows/{id}")
    public ResponseEntity<Void> deleteCerbacHow(@PathVariable Long id) {
        log.debug("REST request to delete CerbacHow : {}", id);
        cerbacHowRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

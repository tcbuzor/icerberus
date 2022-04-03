package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhere;
import edu.utdallas.cpl.repository.CerbacWhereRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhere}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhereResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhereResource.class);

    private static final String ENTITY_NAME = "cerbacWhere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhereRepository cerbacWhereRepository;

    public CerbacWhereResource(CerbacWhereRepository cerbacWhereRepository) {
        this.cerbacWhereRepository = cerbacWhereRepository;
    }

    /**
     * {@code POST  /cerbac-wheres} : Create a new cerbacWhere.
     *
     * @param cerbacWhere the cerbacWhere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhere, or with status {@code 400 (Bad Request)} if the cerbacWhere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-wheres")
    public ResponseEntity<CerbacWhere> createCerbacWhere(@RequestBody CerbacWhere cerbacWhere) throws URISyntaxException {
        log.debug("REST request to save CerbacWhere : {}", cerbacWhere);
        if (cerbacWhere.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhere result = cerbacWhereRepository.save(cerbacWhere);
        return ResponseEntity
            .created(new URI("/api/cerbac-wheres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-wheres/:id} : Updates an existing cerbacWhere.
     *
     * @param id the id of the cerbacWhere to save.
     * @param cerbacWhere the cerbacWhere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhere,
     * or with status {@code 400 (Bad Request)} if the cerbacWhere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-wheres/{id}")
    public ResponseEntity<CerbacWhere> updateCerbacWhere(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CerbacWhere cerbacWhere
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhere : {}, {}", id, cerbacWhere);
        if (cerbacWhere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhere result = cerbacWhereRepository.save(cerbacWhere);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhere.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-wheres/:id} : Partial updates given fields of an existing cerbacWhere, field will ignore if it is null
     *
     * @param id the id of the cerbacWhere to save.
     * @param cerbacWhere the cerbacWhere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhere,
     * or with status {@code 400 (Bad Request)} if the cerbacWhere is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhere is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-wheres/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhere> partialUpdateCerbacWhere(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CerbacWhere cerbacWhere
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhere partially : {}, {}", id, cerbacWhere);
        if (cerbacWhere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhere> result = cerbacWhereRepository
            .findById(cerbacWhere.getId())
            .map(
                existingCerbacWhere -> {
                    return existingCerbacWhere;
                }
            )
            .map(cerbacWhereRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhere.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-wheres} : get all the cerbacWheres.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWheres in body.
     */
    @GetMapping("/cerbac-wheres")
    public List<CerbacWhere> getAllCerbacWheres() {
        log.debug("REST request to get all CerbacWheres");
        return cerbacWhereRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-wheres/:id} : get the "id" cerbacWhere.
     *
     * @param id the id of the cerbacWhere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-wheres/{id}")
    public ResponseEntity<CerbacWhere> getCerbacWhere(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhere : {}", id);
        Optional<CerbacWhere> cerbacWhere = cerbacWhereRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhere);
    }

    /**
     * {@code DELETE  /cerbac-wheres/:id} : delete the "id" cerbacWhere.
     *
     * @param id the id of the cerbacWhere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-wheres/{id}")
    public ResponseEntity<Void> deleteCerbacWhere(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhere : {}", id);
        cerbacWhereRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

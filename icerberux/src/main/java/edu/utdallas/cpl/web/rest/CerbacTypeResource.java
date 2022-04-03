package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacType;
import edu.utdallas.cpl.repository.CerbacTypeRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacTypeResource {

    private final Logger log = LoggerFactory.getLogger(CerbacTypeResource.class);

    private static final String ENTITY_NAME = "cerbacType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacTypeRepository cerbacTypeRepository;

    public CerbacTypeResource(CerbacTypeRepository cerbacTypeRepository) {
        this.cerbacTypeRepository = cerbacTypeRepository;
    }

    /**
     * {@code POST  /cerbac-types} : Create a new cerbacType.
     *
     * @param cerbacType the cerbacType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacType, or with status {@code 400 (Bad Request)} if the cerbacType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-types")
    public ResponseEntity<CerbacType> createCerbacType(@Valid @RequestBody CerbacType cerbacType) throws URISyntaxException {
        log.debug("REST request to save CerbacType : {}", cerbacType);
        if (cerbacType.getId() != null) {
            throw new BadRequestAlertException("A new cerbacType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacType result = cerbacTypeRepository.save(cerbacType);
        return ResponseEntity
            .created(new URI("/api/cerbac-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-types/:id} : Updates an existing cerbacType.
     *
     * @param id the id of the cerbacType to save.
     * @param cerbacType the cerbacType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacType,
     * or with status {@code 400 (Bad Request)} if the cerbacType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-types/{id}")
    public ResponseEntity<CerbacType> updateCerbacType(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacType cerbacType
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacType : {}, {}", id, cerbacType);
        if (cerbacType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacType result = cerbacTypeRepository.save(cerbacType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacType.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-types/:id} : Partial updates given fields of an existing cerbacType, field will ignore if it is null
     *
     * @param id the id of the cerbacType to save.
     * @param cerbacType the cerbacType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacType,
     * or with status {@code 400 (Bad Request)} if the cerbacType is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacType is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-types/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacType> partialUpdateCerbacType(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacType cerbacType
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacType partially : {}, {}", id, cerbacType);
        if (cerbacType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacType.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacType> result = cerbacTypeRepository
            .findById(cerbacType.getId())
            .map(
                existingCerbacType -> {
                    if (cerbacType.getName() != null) {
                        existingCerbacType.setName(cerbacType.getName());
                    }

                    return existingCerbacType;
                }
            )
            .map(cerbacTypeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacType.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-types} : get all the cerbacTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacTypes in body.
     */
    @GetMapping("/cerbac-types")
    public List<CerbacType> getAllCerbacTypes() {
        log.debug("REST request to get all CerbacTypes");
        return cerbacTypeRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-types/:id} : get the "id" cerbacType.
     *
     * @param id the id of the cerbacType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-types/{id}")
    public ResponseEntity<CerbacType> getCerbacType(@PathVariable Long id) {
        log.debug("REST request to get CerbacType : {}", id);
        Optional<CerbacType> cerbacType = cerbacTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacType);
    }

    /**
     * {@code DELETE  /cerbac-types/:id} : delete the "id" cerbacType.
     *
     * @param id the id of the cerbacType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-types/{id}")
    public ResponseEntity<Void> deleteCerbacType(@PathVariable Long id) {
        log.debug("REST request to delete CerbacType : {}", id);
        cerbacTypeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

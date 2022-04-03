package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhatProp;
import edu.utdallas.cpl.repository.CerbacWhatPropRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhatProp}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhatPropResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhatPropResource.class);

    private static final String ENTITY_NAME = "cerbacWhatProp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhatPropRepository cerbacWhatPropRepository;

    public CerbacWhatPropResource(CerbacWhatPropRepository cerbacWhatPropRepository) {
        this.cerbacWhatPropRepository = cerbacWhatPropRepository;
    }

    /**
     * {@code POST  /cerbac-what-props} : Create a new cerbacWhatProp.
     *
     * @param cerbacWhatProp the cerbacWhatProp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhatProp, or with status {@code 400 (Bad Request)} if the cerbacWhatProp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-what-props")
    public ResponseEntity<CerbacWhatProp> createCerbacWhatProp(@Valid @RequestBody CerbacWhatProp cerbacWhatProp)
        throws URISyntaxException {
        log.debug("REST request to save CerbacWhatProp : {}", cerbacWhatProp);
        if (cerbacWhatProp.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhatProp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhatProp result = cerbacWhatPropRepository.save(cerbacWhatProp);
        return ResponseEntity
            .created(new URI("/api/cerbac-what-props/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-what-props/:id} : Updates an existing cerbacWhatProp.
     *
     * @param id the id of the cerbacWhatProp to save.
     * @param cerbacWhatProp the cerbacWhatProp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhatProp,
     * or with status {@code 400 (Bad Request)} if the cerbacWhatProp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhatProp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-what-props/{id}")
    public ResponseEntity<CerbacWhatProp> updateCerbacWhatProp(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacWhatProp cerbacWhatProp
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhatProp : {}, {}", id, cerbacWhatProp);
        if (cerbacWhatProp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhatProp.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhatPropRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhatProp result = cerbacWhatPropRepository.save(cerbacWhatProp);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhatProp.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-what-props/:id} : Partial updates given fields of an existing cerbacWhatProp, field will ignore if it is null
     *
     * @param id the id of the cerbacWhatProp to save.
     * @param cerbacWhatProp the cerbacWhatProp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhatProp,
     * or with status {@code 400 (Bad Request)} if the cerbacWhatProp is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhatProp is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhatProp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-what-props/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhatProp> partialUpdateCerbacWhatProp(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacWhatProp cerbacWhatProp
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhatProp partially : {}, {}", id, cerbacWhatProp);
        if (cerbacWhatProp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhatProp.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhatPropRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhatProp> result = cerbacWhatPropRepository
            .findById(cerbacWhatProp.getId())
            .map(
                existingCerbacWhatProp -> {
                    if (cerbacWhatProp.getName() != null) {
                        existingCerbacWhatProp.setName(cerbacWhatProp.getName());
                    }
                    if (cerbacWhatProp.getValue() != null) {
                        existingCerbacWhatProp.setValue(cerbacWhatProp.getValue());
                    }
                    if (cerbacWhatProp.getCondition() != null) {
                        existingCerbacWhatProp.setCondition(cerbacWhatProp.getCondition());
                    }

                    return existingCerbacWhatProp;
                }
            )
            .map(cerbacWhatPropRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhatProp.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-what-props} : get all the cerbacWhatProps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhatProps in body.
     */
    @GetMapping("/cerbac-what-props")
    public List<CerbacWhatProp> getAllCerbacWhatProps() {
        log.debug("REST request to get all CerbacWhatProps");
        return cerbacWhatPropRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-what-props/:id} : get the "id" cerbacWhatProp.
     *
     * @param id the id of the cerbacWhatProp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhatProp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-what-props/{id}")
    public ResponseEntity<CerbacWhatProp> getCerbacWhatProp(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhatProp : {}", id);
        Optional<CerbacWhatProp> cerbacWhatProp = cerbacWhatPropRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhatProp);
    }

    /**
     * {@code DELETE  /cerbac-what-props/:id} : delete the "id" cerbacWhatProp.
     *
     * @param id the id of the cerbacWhatProp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-what-props/{id}")
    public ResponseEntity<Void> deleteCerbacWhatProp(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhatProp : {}", id);
        cerbacWhatPropRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

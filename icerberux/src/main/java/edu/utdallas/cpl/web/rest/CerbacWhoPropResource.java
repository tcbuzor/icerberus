package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacWhoProp;
import edu.utdallas.cpl.repository.CerbacWhoPropRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacWhoProp}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacWhoPropResource {

    private final Logger log = LoggerFactory.getLogger(CerbacWhoPropResource.class);

    private static final String ENTITY_NAME = "cerbacWhoProp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacWhoPropRepository cerbacWhoPropRepository;

    public CerbacWhoPropResource(CerbacWhoPropRepository cerbacWhoPropRepository) {
        this.cerbacWhoPropRepository = cerbacWhoPropRepository;
    }

    /**
     * {@code POST  /cerbac-who-props} : Create a new cerbacWhoProp.
     *
     * @param cerbacWhoProp the cerbacWhoProp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacWhoProp, or with status {@code 400 (Bad Request)} if the cerbacWhoProp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-who-props")
    public ResponseEntity<CerbacWhoProp> createCerbacWhoProp(@Valid @RequestBody CerbacWhoProp cerbacWhoProp) throws URISyntaxException {
        log.debug("REST request to save CerbacWhoProp : {}", cerbacWhoProp);
        if (cerbacWhoProp.getId() != null) {
            throw new BadRequestAlertException("A new cerbacWhoProp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacWhoProp result = cerbacWhoPropRepository.save(cerbacWhoProp);
        return ResponseEntity
            .created(new URI("/api/cerbac-who-props/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-who-props/:id} : Updates an existing cerbacWhoProp.
     *
     * @param id the id of the cerbacWhoProp to save.
     * @param cerbacWhoProp the cerbacWhoProp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhoProp,
     * or with status {@code 400 (Bad Request)} if the cerbacWhoProp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhoProp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-who-props/{id}")
    public ResponseEntity<CerbacWhoProp> updateCerbacWhoProp(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacWhoProp cerbacWhoProp
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacWhoProp : {}, {}", id, cerbacWhoProp);
        if (cerbacWhoProp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhoProp.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhoPropRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacWhoProp result = cerbacWhoPropRepository.save(cerbacWhoProp);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhoProp.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-who-props/:id} : Partial updates given fields of an existing cerbacWhoProp, field will ignore if it is null
     *
     * @param id the id of the cerbacWhoProp to save.
     * @param cerbacWhoProp the cerbacWhoProp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacWhoProp,
     * or with status {@code 400 (Bad Request)} if the cerbacWhoProp is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacWhoProp is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacWhoProp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-who-props/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacWhoProp> partialUpdateCerbacWhoProp(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacWhoProp cerbacWhoProp
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacWhoProp partially : {}, {}", id, cerbacWhoProp);
        if (cerbacWhoProp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacWhoProp.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacWhoPropRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacWhoProp> result = cerbacWhoPropRepository
            .findById(cerbacWhoProp.getId())
            .map(
                existingCerbacWhoProp -> {
                    if (cerbacWhoProp.getName() != null) {
                        existingCerbacWhoProp.setName(cerbacWhoProp.getName());
                    }
                    if (cerbacWhoProp.getValue() != null) {
                        existingCerbacWhoProp.setValue(cerbacWhoProp.getValue());
                    }
                    if (cerbacWhoProp.getCondition() != null) {
                        existingCerbacWhoProp.setCondition(cerbacWhoProp.getCondition());
                    }

                    return existingCerbacWhoProp;
                }
            )
            .map(cerbacWhoPropRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacWhoProp.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-who-props} : get all the cerbacWhoProps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacWhoProps in body.
     */
    @GetMapping("/cerbac-who-props")
    public List<CerbacWhoProp> getAllCerbacWhoProps() {
        log.debug("REST request to get all CerbacWhoProps");
        return cerbacWhoPropRepository.findAll();
    }

    /**
     * {@code GET  /cerbac-who-props/:id} : get the "id" cerbacWhoProp.
     *
     * @param id the id of the cerbacWhoProp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacWhoProp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-who-props/{id}")
    public ResponseEntity<CerbacWhoProp> getCerbacWhoProp(@PathVariable Long id) {
        log.debug("REST request to get CerbacWhoProp : {}", id);
        Optional<CerbacWhoProp> cerbacWhoProp = cerbacWhoPropRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacWhoProp);
    }

    /**
     * {@code DELETE  /cerbac-who-props/:id} : delete the "id" cerbacWhoProp.
     *
     * @param id the id of the cerbacWhoProp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-who-props/{id}")
    public ResponseEntity<Void> deleteCerbacWhoProp(@PathVariable Long id) {
        log.debug("REST request to delete CerbacWhoProp : {}", id);
        cerbacWhoPropRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

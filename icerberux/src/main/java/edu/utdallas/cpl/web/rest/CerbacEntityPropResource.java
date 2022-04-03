package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacEntityProp;
import edu.utdallas.cpl.repository.CerbacEntityPropRepository;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacEntityProp}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacEntityPropResource {

    private final Logger log = LoggerFactory.getLogger(CerbacEntityPropResource.class);

    private static final String ENTITY_NAME = "cerbacEntityProp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacEntityPropRepository cerbacEntityPropRepository;

    public CerbacEntityPropResource(CerbacEntityPropRepository cerbacEntityPropRepository) {
        this.cerbacEntityPropRepository = cerbacEntityPropRepository;
    }

    /**
     * {@code POST  /cerbac-entity-props} : Create a new cerbacEntityProp.
     *
     * @param cerbacEntityProp the cerbacEntityProp to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacEntityProp, or with status {@code 400 (Bad Request)} if the cerbacEntityProp has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-entity-props")
    public ResponseEntity<CerbacEntityProp> createCerbacEntityProp(@Valid @RequestBody CerbacEntityProp cerbacEntityProp)
        throws URISyntaxException {
        log.debug("REST request to save CerbacEntityProp : {}", cerbacEntityProp);
        if (cerbacEntityProp.getId() != null) {
            throw new BadRequestAlertException("A new cerbacEntityProp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacEntityProp result = cerbacEntityPropRepository.save(cerbacEntityProp);
        return ResponseEntity
            .created(new URI("/api/cerbac-entity-props/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-entity-props/:id} : Updates an existing cerbacEntityProp.
     *
     * @param id the id of the cerbacEntityProp to save.
     * @param cerbacEntityProp the cerbacEntityProp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacEntityProp,
     * or with status {@code 400 (Bad Request)} if the cerbacEntityProp is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacEntityProp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-entity-props/{id}")
    public ResponseEntity<CerbacEntityProp> updateCerbacEntityProp(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacEntityProp cerbacEntityProp
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacEntityProp : {}, {}", id, cerbacEntityProp);
        if (cerbacEntityProp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacEntityProp.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacEntityPropRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacEntityProp result = cerbacEntityPropRepository.save(cerbacEntityProp);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacEntityProp.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-entity-props/:id} : Partial updates given fields of an existing cerbacEntityProp, field will ignore if it is null
     *
     * @param id the id of the cerbacEntityProp to save.
     * @param cerbacEntityProp the cerbacEntityProp to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacEntityProp,
     * or with status {@code 400 (Bad Request)} if the cerbacEntityProp is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacEntityProp is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacEntityProp couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-entity-props/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacEntityProp> partialUpdateCerbacEntityProp(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacEntityProp cerbacEntityProp
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacEntityProp partially : {}, {}", id, cerbacEntityProp);
        if (cerbacEntityProp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacEntityProp.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacEntityPropRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacEntityProp> result = cerbacEntityPropRepository
            .findById(cerbacEntityProp.getId())
            .map(
                existingCerbacEntityProp -> {
                    if (cerbacEntityProp.getPropName() != null) {
                        existingCerbacEntityProp.setPropName(cerbacEntityProp.getPropName());
                    }

                    return existingCerbacEntityProp;
                }
            )
            .map(cerbacEntityPropRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacEntityProp.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-entity-props} : get all the cerbacEntityProps.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacEntityProps in body.
     */
    @GetMapping("/cerbac-entity-props")
    public ResponseEntity<List<CerbacEntityProp>> getAllCerbacEntityProps(Pageable pageable) {
        log.debug("REST request to get a page of CerbacEntityProps");
        Page<CerbacEntityProp> page = cerbacEntityPropRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /cerbac-entity-props/:id} : get the "id" cerbacEntityProp.
     *
     * @param id the id of the cerbacEntityProp to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacEntityProp, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-entity-props/{id}")
    public ResponseEntity<CerbacEntityProp> getCerbacEntityProp(@PathVariable Long id) {
        log.debug("REST request to get CerbacEntityProp : {}", id);
        Optional<CerbacEntityProp> cerbacEntityProp = cerbacEntityPropRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacEntityProp);
    }

    /**
     * {@code DELETE  /cerbac-entity-props/:id} : delete the "id" cerbacEntityProp.
     *
     * @param id the id of the cerbacEntityProp to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-entity-props/{id}")
    public ResponseEntity<Void> deleteCerbacEntityProp(@PathVariable Long id) {
        log.debug("REST request to delete CerbacEntityProp : {}", id);
        cerbacEntityPropRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package edu.utdallas.cpl.web.rest;

import edu.utdallas.cpl.domain.CerbacEntity;
import edu.utdallas.cpl.repository.CerbacEntityRepository;
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
 * REST controller for managing {@link edu.utdallas.cpl.domain.CerbacEntity}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CerbacEntityResource {

    private final Logger log = LoggerFactory.getLogger(CerbacEntityResource.class);

    private static final String ENTITY_NAME = "cerbacEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CerbacEntityRepository cerbacEntityRepository;

    public CerbacEntityResource(CerbacEntityRepository cerbacEntityRepository) {
        this.cerbacEntityRepository = cerbacEntityRepository;
    }

    /**
     * {@code POST  /cerbac-entities} : Create a new cerbacEntity.
     *
     * @param cerbacEntity the cerbacEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cerbacEntity, or with status {@code 400 (Bad Request)} if the cerbacEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cerbac-entities")
    public ResponseEntity<CerbacEntity> createCerbacEntity(@Valid @RequestBody CerbacEntity cerbacEntity) throws URISyntaxException {
        log.debug("REST request to save CerbacEntity : {}", cerbacEntity);
        if (cerbacEntity.getId() != null) {
            throw new BadRequestAlertException("A new cerbacEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CerbacEntity result = cerbacEntityRepository.save(cerbacEntity);
        return ResponseEntity
            .created(new URI("/api/cerbac-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cerbac-entities/:id} : Updates an existing cerbacEntity.
     *
     * @param id the id of the cerbacEntity to save.
     * @param cerbacEntity the cerbacEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacEntity,
     * or with status {@code 400 (Bad Request)} if the cerbacEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cerbacEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cerbac-entities/{id}")
    public ResponseEntity<CerbacEntity> updateCerbacEntity(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CerbacEntity cerbacEntity
    ) throws URISyntaxException {
        log.debug("REST request to update CerbacEntity : {}, {}", id, cerbacEntity);
        if (cerbacEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacEntity.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacEntityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CerbacEntity result = cerbacEntityRepository.save(cerbacEntity);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cerbac-entities/:id} : Partial updates given fields of an existing cerbacEntity, field will ignore if it is null
     *
     * @param id the id of the cerbacEntity to save.
     * @param cerbacEntity the cerbacEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cerbacEntity,
     * or with status {@code 400 (Bad Request)} if the cerbacEntity is not valid,
     * or with status {@code 404 (Not Found)} if the cerbacEntity is not found,
     * or with status {@code 500 (Internal Server Error)} if the cerbacEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cerbac-entities/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CerbacEntity> partialUpdateCerbacEntity(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CerbacEntity cerbacEntity
    ) throws URISyntaxException {
        log.debug("REST request to partial update CerbacEntity partially : {}, {}", id, cerbacEntity);
        if (cerbacEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cerbacEntity.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cerbacEntityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CerbacEntity> result = cerbacEntityRepository
            .findById(cerbacEntity.getId())
            .map(
                existingCerbacEntity -> {
                    if (cerbacEntity.getName() != null) {
                        existingCerbacEntity.setName(cerbacEntity.getName());
                    }

                    return existingCerbacEntity;
                }
            )
            .map(cerbacEntityRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cerbacEntity.getId().toString())
        );
    }

    /**
     * {@code GET  /cerbac-entities} : get all the cerbacEntities.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cerbacEntities in body.
     */
    @GetMapping("/cerbac-entities")
    public ResponseEntity<List<CerbacEntity>> getAllCerbacEntities(Pageable pageable) {
        log.debug("REST request to get a page of CerbacEntities");
        Page<CerbacEntity> page = cerbacEntityRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /cerbac-entities/:id} : get the "id" cerbacEntity.
     *
     * @param id the id of the cerbacEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cerbacEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cerbac-entities/{id}")
    public ResponseEntity<CerbacEntity> getCerbacEntity(@PathVariable Long id) {
        log.debug("REST request to get CerbacEntity : {}", id);
        Optional<CerbacEntity> cerbacEntity = cerbacEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cerbacEntity);
    }

    /**
     * {@code DELETE  /cerbac-entities/:id} : delete the "id" cerbacEntity.
     *
     * @param id the id of the cerbacEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cerbac-entities/{id}")
    public ResponseEntity<Void> deleteCerbacEntity(@PathVariable Long id) {
        log.debug("REST request to delete CerbacEntity : {}", id);
        cerbacEntityRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

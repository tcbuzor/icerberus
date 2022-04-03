package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacEntity;
import edu.utdallas.cpl.repository.CerbacEntityRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CerbacEntityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacEntityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-entities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacEntityRepository cerbacEntityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacEntityMockMvc;

    private CerbacEntity cerbacEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacEntity createEntity(EntityManager em) {
        CerbacEntity cerbacEntity = new CerbacEntity().name(DEFAULT_NAME);
        return cerbacEntity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacEntity createUpdatedEntity(EntityManager em) {
        CerbacEntity cerbacEntity = new CerbacEntity().name(UPDATED_NAME);
        return cerbacEntity;
    }

    @BeforeEach
    public void initTest() {
        cerbacEntity = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacEntity() throws Exception {
        int databaseSizeBeforeCreate = cerbacEntityRepository.findAll().size();
        // Create the CerbacEntity
        restCerbacEntityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacEntity)))
            .andExpect(status().isCreated());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacEntity testCerbacEntity = cerbacEntityList.get(cerbacEntityList.size() - 1);
        assertThat(testCerbacEntity.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createCerbacEntityWithExistingId() throws Exception {
        // Create the CerbacEntity with an existing ID
        cerbacEntity.setId(1L);

        int databaseSizeBeforeCreate = cerbacEntityRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacEntityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacEntity)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacEntityRepository.findAll().size();
        // set the field null
        cerbacEntity.setName(null);

        // Create the CerbacEntity, which fails.

        restCerbacEntityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacEntity)))
            .andExpect(status().isBadRequest());

        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacEntities() throws Exception {
        // Initialize the database
        cerbacEntityRepository.saveAndFlush(cerbacEntity);

        // Get all the cerbacEntityList
        restCerbacEntityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getCerbacEntity() throws Exception {
        // Initialize the database
        cerbacEntityRepository.saveAndFlush(cerbacEntity);

        // Get the cerbacEntity
        restCerbacEntityMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingCerbacEntity() throws Exception {
        // Get the cerbacEntity
        restCerbacEntityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacEntity() throws Exception {
        // Initialize the database
        cerbacEntityRepository.saveAndFlush(cerbacEntity);

        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();

        // Update the cerbacEntity
        CerbacEntity updatedCerbacEntity = cerbacEntityRepository.findById(cerbacEntity.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacEntity are not directly saved in db
        em.detach(updatedCerbacEntity);
        updatedCerbacEntity.name(UPDATED_NAME);

        restCerbacEntityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacEntity.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacEntity))
            )
            .andExpect(status().isOk());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
        CerbacEntity testCerbacEntity = cerbacEntityList.get(cerbacEntityList.size() - 1);
        assertThat(testCerbacEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingCerbacEntity() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();
        cerbacEntity.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacEntityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacEntity.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntity))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacEntity() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();
        cerbacEntity.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacEntityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntity))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacEntity() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();
        cerbacEntity.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacEntityMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacEntity)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacEntityWithPatch() throws Exception {
        // Initialize the database
        cerbacEntityRepository.saveAndFlush(cerbacEntity);

        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();

        // Update the cerbacEntity using partial update
        CerbacEntity partialUpdatedCerbacEntity = new CerbacEntity();
        partialUpdatedCerbacEntity.setId(cerbacEntity.getId());

        restCerbacEntityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacEntity))
            )
            .andExpect(status().isOk());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
        CerbacEntity testCerbacEntity = cerbacEntityList.get(cerbacEntityList.size() - 1);
        assertThat(testCerbacEntity.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateCerbacEntityWithPatch() throws Exception {
        // Initialize the database
        cerbacEntityRepository.saveAndFlush(cerbacEntity);

        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();

        // Update the cerbacEntity using partial update
        CerbacEntity partialUpdatedCerbacEntity = new CerbacEntity();
        partialUpdatedCerbacEntity.setId(cerbacEntity.getId());

        partialUpdatedCerbacEntity.name(UPDATED_NAME);

        restCerbacEntityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacEntity))
            )
            .andExpect(status().isOk());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
        CerbacEntity testCerbacEntity = cerbacEntityList.get(cerbacEntityList.size() - 1);
        assertThat(testCerbacEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacEntity() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();
        cerbacEntity.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacEntityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacEntity.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntity))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacEntity() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();
        cerbacEntity.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacEntityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntity))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacEntity() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityRepository.findAll().size();
        cerbacEntity.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacEntityMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacEntity))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacEntity in the database
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacEntity() throws Exception {
        // Initialize the database
        cerbacEntityRepository.saveAndFlush(cerbacEntity);

        int databaseSizeBeforeDelete = cerbacEntityRepository.findAll().size();

        // Delete the cerbacEntity
        restCerbacEntityMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacEntity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacEntity> cerbacEntityList = cerbacEntityRepository.findAll();
        assertThat(cerbacEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacType;
import edu.utdallas.cpl.repository.CerbacTypeRepository;
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
 * Integration tests for the {@link CerbacTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacTypeRepository cerbacTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacTypeMockMvc;

    private CerbacType cerbacType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacType createEntity(EntityManager em) {
        CerbacType cerbacType = new CerbacType().name(DEFAULT_NAME);
        return cerbacType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacType createUpdatedEntity(EntityManager em) {
        CerbacType cerbacType = new CerbacType().name(UPDATED_NAME);
        return cerbacType;
    }

    @BeforeEach
    public void initTest() {
        cerbacType = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacType() throws Exception {
        int databaseSizeBeforeCreate = cerbacTypeRepository.findAll().size();
        // Create the CerbacType
        restCerbacTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacType)))
            .andExpect(status().isCreated());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacType testCerbacType = cerbacTypeList.get(cerbacTypeList.size() - 1);
        assertThat(testCerbacType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createCerbacTypeWithExistingId() throws Exception {
        // Create the CerbacType with an existing ID
        cerbacType.setId(1L);

        int databaseSizeBeforeCreate = cerbacTypeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacType)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacTypeRepository.findAll().size();
        // set the field null
        cerbacType.setName(null);

        // Create the CerbacType, which fails.

        restCerbacTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacType)))
            .andExpect(status().isBadRequest());

        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacTypes() throws Exception {
        // Initialize the database
        cerbacTypeRepository.saveAndFlush(cerbacType);

        // Get all the cerbacTypeList
        restCerbacTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getCerbacType() throws Exception {
        // Initialize the database
        cerbacTypeRepository.saveAndFlush(cerbacType);

        // Get the cerbacType
        restCerbacTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingCerbacType() throws Exception {
        // Get the cerbacType
        restCerbacTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacType() throws Exception {
        // Initialize the database
        cerbacTypeRepository.saveAndFlush(cerbacType);

        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();

        // Update the cerbacType
        CerbacType updatedCerbacType = cerbacTypeRepository.findById(cerbacType.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacType are not directly saved in db
        em.detach(updatedCerbacType);
        updatedCerbacType.name(UPDATED_NAME);

        restCerbacTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacType.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacType))
            )
            .andExpect(status().isOk());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
        CerbacType testCerbacType = cerbacTypeList.get(cerbacTypeList.size() - 1);
        assertThat(testCerbacType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingCerbacType() throws Exception {
        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();
        cerbacType.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacType.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacType))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacType() throws Exception {
        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();
        cerbacType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacType))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacType() throws Exception {
        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();
        cerbacType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacTypeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacType)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacTypeWithPatch() throws Exception {
        // Initialize the database
        cerbacTypeRepository.saveAndFlush(cerbacType);

        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();

        // Update the cerbacType using partial update
        CerbacType partialUpdatedCerbacType = new CerbacType();
        partialUpdatedCerbacType.setId(cerbacType.getId());

        partialUpdatedCerbacType.name(UPDATED_NAME);

        restCerbacTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacType))
            )
            .andExpect(status().isOk());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
        CerbacType testCerbacType = cerbacTypeList.get(cerbacTypeList.size() - 1);
        assertThat(testCerbacType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void fullUpdateCerbacTypeWithPatch() throws Exception {
        // Initialize the database
        cerbacTypeRepository.saveAndFlush(cerbacType);

        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();

        // Update the cerbacType using partial update
        CerbacType partialUpdatedCerbacType = new CerbacType();
        partialUpdatedCerbacType.setId(cerbacType.getId());

        partialUpdatedCerbacType.name(UPDATED_NAME);

        restCerbacTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacType))
            )
            .andExpect(status().isOk());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
        CerbacType testCerbacType = cerbacTypeList.get(cerbacTypeList.size() - 1);
        assertThat(testCerbacType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacType() throws Exception {
        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();
        cerbacType.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacType))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacType() throws Exception {
        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();
        cerbacType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacType))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacType() throws Exception {
        int databaseSizeBeforeUpdate = cerbacTypeRepository.findAll().size();
        cerbacType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacTypeMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacType))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacType in the database
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacType() throws Exception {
        // Initialize the database
        cerbacTypeRepository.saveAndFlush(cerbacType);

        int databaseSizeBeforeDelete = cerbacTypeRepository.findAll().size();

        // Delete the cerbacType
        restCerbacTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacType> cerbacTypeList = cerbacTypeRepository.findAll();
        assertThat(cerbacTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

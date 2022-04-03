package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacWhy;
import edu.utdallas.cpl.repository.CerbacWhyRepository;
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
 * Integration tests for the {@link CerbacWhyResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhyResourceIT {

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-whies";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhyRepository cerbacWhyRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhyMockMvc;

    private CerbacWhy cerbacWhy;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhy createEntity(EntityManager em) {
        CerbacWhy cerbacWhy = new CerbacWhy().reason(DEFAULT_REASON);
        return cerbacWhy;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhy createUpdatedEntity(EntityManager em) {
        CerbacWhy cerbacWhy = new CerbacWhy().reason(UPDATED_REASON);
        return cerbacWhy;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhy = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhy() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhyRepository.findAll().size();
        // Create the CerbacWhy
        restCerbacWhyMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhy)))
            .andExpect(status().isCreated());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhy testCerbacWhy = cerbacWhyList.get(cerbacWhyList.size() - 1);
        assertThat(testCerbacWhy.getReason()).isEqualTo(DEFAULT_REASON);
    }

    @Test
    @Transactional
    void createCerbacWhyWithExistingId() throws Exception {
        // Create the CerbacWhy with an existing ID
        cerbacWhy.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhyRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhyMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhy)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkReasonIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhyRepository.findAll().size();
        // set the field null
        cerbacWhy.setReason(null);

        // Create the CerbacWhy, which fails.

        restCerbacWhyMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhy)))
            .andExpect(status().isBadRequest());

        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacWhies() throws Exception {
        // Initialize the database
        cerbacWhyRepository.saveAndFlush(cerbacWhy);

        // Get all the cerbacWhyList
        restCerbacWhyMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhy.getId().intValue())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON)));
    }

    @Test
    @Transactional
    void getCerbacWhy() throws Exception {
        // Initialize the database
        cerbacWhyRepository.saveAndFlush(cerbacWhy);

        // Get the cerbacWhy
        restCerbacWhyMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhy.getId().intValue()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhy() throws Exception {
        // Get the cerbacWhy
        restCerbacWhyMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhy() throws Exception {
        // Initialize the database
        cerbacWhyRepository.saveAndFlush(cerbacWhy);

        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();

        // Update the cerbacWhy
        CerbacWhy updatedCerbacWhy = cerbacWhyRepository.findById(cerbacWhy.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhy are not directly saved in db
        em.detach(updatedCerbacWhy);
        updatedCerbacWhy.reason(UPDATED_REASON);

        restCerbacWhyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhy.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhy))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhy testCerbacWhy = cerbacWhyList.get(cerbacWhyList.size() - 1);
        assertThat(testCerbacWhy.getReason()).isEqualTo(UPDATED_REASON);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();
        cerbacWhy.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhy.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhy))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();
        cerbacWhy.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhy))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();
        cerbacWhy.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhyMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhy)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhyWithPatch() throws Exception {
        // Initialize the database
        cerbacWhyRepository.saveAndFlush(cerbacWhy);

        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();

        // Update the cerbacWhy using partial update
        CerbacWhy partialUpdatedCerbacWhy = new CerbacWhy();
        partialUpdatedCerbacWhy.setId(cerbacWhy.getId());

        partialUpdatedCerbacWhy.reason(UPDATED_REASON);

        restCerbacWhyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhy.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhy))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhy testCerbacWhy = cerbacWhyList.get(cerbacWhyList.size() - 1);
        assertThat(testCerbacWhy.getReason()).isEqualTo(UPDATED_REASON);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhyWithPatch() throws Exception {
        // Initialize the database
        cerbacWhyRepository.saveAndFlush(cerbacWhy);

        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();

        // Update the cerbacWhy using partial update
        CerbacWhy partialUpdatedCerbacWhy = new CerbacWhy();
        partialUpdatedCerbacWhy.setId(cerbacWhy.getId());

        partialUpdatedCerbacWhy.reason(UPDATED_REASON);

        restCerbacWhyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhy.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhy))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhy testCerbacWhy = cerbacWhyList.get(cerbacWhyList.size() - 1);
        assertThat(testCerbacWhy.getReason()).isEqualTo(UPDATED_REASON);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();
        cerbacWhy.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhy.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhy))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();
        cerbacWhy.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhy))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhyRepository.findAll().size();
        cerbacWhy.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhyMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacWhy))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhy in the database
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhy() throws Exception {
        // Initialize the database
        cerbacWhyRepository.saveAndFlush(cerbacWhy);

        int databaseSizeBeforeDelete = cerbacWhyRepository.findAll().size();

        // Delete the cerbacWhy
        restCerbacWhyMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhy.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhy> cerbacWhyList = cerbacWhyRepository.findAll();
        assertThat(cerbacWhyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

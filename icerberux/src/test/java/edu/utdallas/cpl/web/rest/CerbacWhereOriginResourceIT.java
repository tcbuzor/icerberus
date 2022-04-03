package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacWhereOrigin;
import edu.utdallas.cpl.repository.CerbacWhereOriginRepository;
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
 * Integration tests for the {@link CerbacWhereOriginResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhereOriginResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-where-origins";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhereOriginRepository cerbacWhereOriginRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhereOriginMockMvc;

    private CerbacWhereOrigin cerbacWhereOrigin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhereOrigin createEntity(EntityManager em) {
        CerbacWhereOrigin cerbacWhereOrigin = new CerbacWhereOrigin().value(DEFAULT_VALUE);
        return cerbacWhereOrigin;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhereOrigin createUpdatedEntity(EntityManager em) {
        CerbacWhereOrigin cerbacWhereOrigin = new CerbacWhereOrigin().value(UPDATED_VALUE);
        return cerbacWhereOrigin;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhereOrigin = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhereOrigin() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhereOriginRepository.findAll().size();
        // Create the CerbacWhereOrigin
        restCerbacWhereOriginMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isCreated());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhereOrigin testCerbacWhereOrigin = cerbacWhereOriginList.get(cerbacWhereOriginList.size() - 1);
        assertThat(testCerbacWhereOrigin.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    void createCerbacWhereOriginWithExistingId() throws Exception {
        // Create the CerbacWhereOrigin with an existing ID
        cerbacWhereOrigin.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhereOriginRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhereOriginMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhereOriginRepository.findAll().size();
        // set the field null
        cerbacWhereOrigin.setValue(null);

        // Create the CerbacWhereOrigin, which fails.

        restCerbacWhereOriginMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isBadRequest());

        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacWhereOrigins() throws Exception {
        // Initialize the database
        cerbacWhereOriginRepository.saveAndFlush(cerbacWhereOrigin);

        // Get all the cerbacWhereOriginList
        restCerbacWhereOriginMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhereOrigin.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }

    @Test
    @Transactional
    void getCerbacWhereOrigin() throws Exception {
        // Initialize the database
        cerbacWhereOriginRepository.saveAndFlush(cerbacWhereOrigin);

        // Get the cerbacWhereOrigin
        restCerbacWhereOriginMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhereOrigin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhereOrigin.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhereOrigin() throws Exception {
        // Get the cerbacWhereOrigin
        restCerbacWhereOriginMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhereOrigin() throws Exception {
        // Initialize the database
        cerbacWhereOriginRepository.saveAndFlush(cerbacWhereOrigin);

        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();

        // Update the cerbacWhereOrigin
        CerbacWhereOrigin updatedCerbacWhereOrigin = cerbacWhereOriginRepository.findById(cerbacWhereOrigin.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhereOrigin are not directly saved in db
        em.detach(updatedCerbacWhereOrigin);
        updatedCerbacWhereOrigin.value(UPDATED_VALUE);

        restCerbacWhereOriginMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhereOrigin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhereOrigin))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhereOrigin testCerbacWhereOrigin = cerbacWhereOriginList.get(cerbacWhereOriginList.size() - 1);
        assertThat(testCerbacWhereOrigin.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhereOrigin() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();
        cerbacWhereOrigin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhereOriginMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhereOrigin.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhereOrigin() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();
        cerbacWhereOrigin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereOriginMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhereOrigin() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();
        cerbacWhereOrigin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereOriginMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhereOriginWithPatch() throws Exception {
        // Initialize the database
        cerbacWhereOriginRepository.saveAndFlush(cerbacWhereOrigin);

        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();

        // Update the cerbacWhereOrigin using partial update
        CerbacWhereOrigin partialUpdatedCerbacWhereOrigin = new CerbacWhereOrigin();
        partialUpdatedCerbacWhereOrigin.setId(cerbacWhereOrigin.getId());

        restCerbacWhereOriginMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhereOrigin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhereOrigin))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhereOrigin testCerbacWhereOrigin = cerbacWhereOriginList.get(cerbacWhereOriginList.size() - 1);
        assertThat(testCerbacWhereOrigin.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhereOriginWithPatch() throws Exception {
        // Initialize the database
        cerbacWhereOriginRepository.saveAndFlush(cerbacWhereOrigin);

        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();

        // Update the cerbacWhereOrigin using partial update
        CerbacWhereOrigin partialUpdatedCerbacWhereOrigin = new CerbacWhereOrigin();
        partialUpdatedCerbacWhereOrigin.setId(cerbacWhereOrigin.getId());

        partialUpdatedCerbacWhereOrigin.value(UPDATED_VALUE);

        restCerbacWhereOriginMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhereOrigin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhereOrigin))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhereOrigin testCerbacWhereOrigin = cerbacWhereOriginList.get(cerbacWhereOriginList.size() - 1);
        assertThat(testCerbacWhereOrigin.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhereOrigin() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();
        cerbacWhereOrigin.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhereOriginMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhereOrigin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhereOrigin() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();
        cerbacWhereOrigin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereOriginMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhereOrigin() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereOriginRepository.findAll().size();
        cerbacWhereOrigin.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereOriginMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereOrigin))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhereOrigin in the database
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhereOrigin() throws Exception {
        // Initialize the database
        cerbacWhereOriginRepository.saveAndFlush(cerbacWhereOrigin);

        int databaseSizeBeforeDelete = cerbacWhereOriginRepository.findAll().size();

        // Delete the cerbacWhereOrigin
        restCerbacWhereOriginMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhereOrigin.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhereOrigin> cerbacWhereOriginList = cerbacWhereOriginRepository.findAll();
        assertThat(cerbacWhereOriginList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

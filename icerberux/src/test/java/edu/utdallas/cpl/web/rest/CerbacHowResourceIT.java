package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacHow;
import edu.utdallas.cpl.repository.CerbacHowRepository;
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
 * Integration tests for the {@link CerbacHowResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacHowResourceIT {

    private static final String DEFAULT_HOW = "AAAAAAAAAA";
    private static final String UPDATED_HOW = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-hows";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacHowRepository cerbacHowRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacHowMockMvc;

    private CerbacHow cerbacHow;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacHow createEntity(EntityManager em) {
        CerbacHow cerbacHow = new CerbacHow().how(DEFAULT_HOW);
        return cerbacHow;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacHow createUpdatedEntity(EntityManager em) {
        CerbacHow cerbacHow = new CerbacHow().how(UPDATED_HOW);
        return cerbacHow;
    }

    @BeforeEach
    public void initTest() {
        cerbacHow = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacHow() throws Exception {
        int databaseSizeBeforeCreate = cerbacHowRepository.findAll().size();
        // Create the CerbacHow
        restCerbacHowMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacHow)))
            .andExpect(status().isCreated());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacHow testCerbacHow = cerbacHowList.get(cerbacHowList.size() - 1);
        assertThat(testCerbacHow.getHow()).isEqualTo(DEFAULT_HOW);
    }

    @Test
    @Transactional
    void createCerbacHowWithExistingId() throws Exception {
        // Create the CerbacHow with an existing ID
        cerbacHow.setId(1L);

        int databaseSizeBeforeCreate = cerbacHowRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacHowMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacHow)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkHowIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacHowRepository.findAll().size();
        // set the field null
        cerbacHow.setHow(null);

        // Create the CerbacHow, which fails.

        restCerbacHowMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacHow)))
            .andExpect(status().isBadRequest());

        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacHows() throws Exception {
        // Initialize the database
        cerbacHowRepository.saveAndFlush(cerbacHow);

        // Get all the cerbacHowList
        restCerbacHowMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacHow.getId().intValue())))
            .andExpect(jsonPath("$.[*].how").value(hasItem(DEFAULT_HOW)));
    }

    @Test
    @Transactional
    void getCerbacHow() throws Exception {
        // Initialize the database
        cerbacHowRepository.saveAndFlush(cerbacHow);

        // Get the cerbacHow
        restCerbacHowMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacHow.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacHow.getId().intValue()))
            .andExpect(jsonPath("$.how").value(DEFAULT_HOW));
    }

    @Test
    @Transactional
    void getNonExistingCerbacHow() throws Exception {
        // Get the cerbacHow
        restCerbacHowMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacHow() throws Exception {
        // Initialize the database
        cerbacHowRepository.saveAndFlush(cerbacHow);

        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();

        // Update the cerbacHow
        CerbacHow updatedCerbacHow = cerbacHowRepository.findById(cerbacHow.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacHow are not directly saved in db
        em.detach(updatedCerbacHow);
        updatedCerbacHow.how(UPDATED_HOW);

        restCerbacHowMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacHow.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacHow))
            )
            .andExpect(status().isOk());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
        CerbacHow testCerbacHow = cerbacHowList.get(cerbacHowList.size() - 1);
        assertThat(testCerbacHow.getHow()).isEqualTo(UPDATED_HOW);
    }

    @Test
    @Transactional
    void putNonExistingCerbacHow() throws Exception {
        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();
        cerbacHow.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacHowMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacHow.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacHow))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacHow() throws Exception {
        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();
        cerbacHow.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacHowMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacHow))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacHow() throws Exception {
        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();
        cerbacHow.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacHowMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacHow)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacHowWithPatch() throws Exception {
        // Initialize the database
        cerbacHowRepository.saveAndFlush(cerbacHow);

        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();

        // Update the cerbacHow using partial update
        CerbacHow partialUpdatedCerbacHow = new CerbacHow();
        partialUpdatedCerbacHow.setId(cerbacHow.getId());

        partialUpdatedCerbacHow.how(UPDATED_HOW);

        restCerbacHowMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacHow.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacHow))
            )
            .andExpect(status().isOk());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
        CerbacHow testCerbacHow = cerbacHowList.get(cerbacHowList.size() - 1);
        assertThat(testCerbacHow.getHow()).isEqualTo(UPDATED_HOW);
    }

    @Test
    @Transactional
    void fullUpdateCerbacHowWithPatch() throws Exception {
        // Initialize the database
        cerbacHowRepository.saveAndFlush(cerbacHow);

        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();

        // Update the cerbacHow using partial update
        CerbacHow partialUpdatedCerbacHow = new CerbacHow();
        partialUpdatedCerbacHow.setId(cerbacHow.getId());

        partialUpdatedCerbacHow.how(UPDATED_HOW);

        restCerbacHowMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacHow.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacHow))
            )
            .andExpect(status().isOk());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
        CerbacHow testCerbacHow = cerbacHowList.get(cerbacHowList.size() - 1);
        assertThat(testCerbacHow.getHow()).isEqualTo(UPDATED_HOW);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacHow() throws Exception {
        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();
        cerbacHow.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacHowMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacHow.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacHow))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacHow() throws Exception {
        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();
        cerbacHow.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacHowMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacHow))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacHow() throws Exception {
        int databaseSizeBeforeUpdate = cerbacHowRepository.findAll().size();
        cerbacHow.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacHowMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacHow))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacHow in the database
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacHow() throws Exception {
        // Initialize the database
        cerbacHowRepository.saveAndFlush(cerbacHow);

        int databaseSizeBeforeDelete = cerbacHowRepository.findAll().size();

        // Delete the cerbacHow
        restCerbacHowMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacHow.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacHow> cerbacHowList = cerbacHowRepository.findAll();
        assertThat(cerbacHowList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

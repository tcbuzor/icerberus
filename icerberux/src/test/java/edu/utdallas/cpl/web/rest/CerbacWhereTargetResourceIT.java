package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacWhereTarget;
import edu.utdallas.cpl.repository.CerbacWhereTargetRepository;
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
 * Integration tests for the {@link CerbacWhereTargetResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhereTargetResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-where-targets";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhereTargetRepository cerbacWhereTargetRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhereTargetMockMvc;

    private CerbacWhereTarget cerbacWhereTarget;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhereTarget createEntity(EntityManager em) {
        CerbacWhereTarget cerbacWhereTarget = new CerbacWhereTarget().value(DEFAULT_VALUE);
        return cerbacWhereTarget;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhereTarget createUpdatedEntity(EntityManager em) {
        CerbacWhereTarget cerbacWhereTarget = new CerbacWhereTarget().value(UPDATED_VALUE);
        return cerbacWhereTarget;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhereTarget = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhereTarget() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhereTargetRepository.findAll().size();
        // Create the CerbacWhereTarget
        restCerbacWhereTargetMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isCreated());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhereTarget testCerbacWhereTarget = cerbacWhereTargetList.get(cerbacWhereTargetList.size() - 1);
        assertThat(testCerbacWhereTarget.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    void createCerbacWhereTargetWithExistingId() throws Exception {
        // Create the CerbacWhereTarget with an existing ID
        cerbacWhereTarget.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhereTargetRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhereTargetMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhereTargetRepository.findAll().size();
        // set the field null
        cerbacWhereTarget.setValue(null);

        // Create the CerbacWhereTarget, which fails.

        restCerbacWhereTargetMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isBadRequest());

        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacWhereTargets() throws Exception {
        // Initialize the database
        cerbacWhereTargetRepository.saveAndFlush(cerbacWhereTarget);

        // Get all the cerbacWhereTargetList
        restCerbacWhereTargetMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhereTarget.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }

    @Test
    @Transactional
    void getCerbacWhereTarget() throws Exception {
        // Initialize the database
        cerbacWhereTargetRepository.saveAndFlush(cerbacWhereTarget);

        // Get the cerbacWhereTarget
        restCerbacWhereTargetMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhereTarget.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhereTarget.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhereTarget() throws Exception {
        // Get the cerbacWhereTarget
        restCerbacWhereTargetMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhereTarget() throws Exception {
        // Initialize the database
        cerbacWhereTargetRepository.saveAndFlush(cerbacWhereTarget);

        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();

        // Update the cerbacWhereTarget
        CerbacWhereTarget updatedCerbacWhereTarget = cerbacWhereTargetRepository.findById(cerbacWhereTarget.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhereTarget are not directly saved in db
        em.detach(updatedCerbacWhereTarget);
        updatedCerbacWhereTarget.value(UPDATED_VALUE);

        restCerbacWhereTargetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhereTarget.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhereTarget))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhereTarget testCerbacWhereTarget = cerbacWhereTargetList.get(cerbacWhereTargetList.size() - 1);
        assertThat(testCerbacWhereTarget.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhereTarget() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();
        cerbacWhereTarget.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhereTargetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhereTarget.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhereTarget() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();
        cerbacWhereTarget.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereTargetMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhereTarget() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();
        cerbacWhereTarget.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereTargetMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhereTargetWithPatch() throws Exception {
        // Initialize the database
        cerbacWhereTargetRepository.saveAndFlush(cerbacWhereTarget);

        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();

        // Update the cerbacWhereTarget using partial update
        CerbacWhereTarget partialUpdatedCerbacWhereTarget = new CerbacWhereTarget();
        partialUpdatedCerbacWhereTarget.setId(cerbacWhereTarget.getId());

        partialUpdatedCerbacWhereTarget.value(UPDATED_VALUE);

        restCerbacWhereTargetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhereTarget.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhereTarget))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhereTarget testCerbacWhereTarget = cerbacWhereTargetList.get(cerbacWhereTargetList.size() - 1);
        assertThat(testCerbacWhereTarget.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhereTargetWithPatch() throws Exception {
        // Initialize the database
        cerbacWhereTargetRepository.saveAndFlush(cerbacWhereTarget);

        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();

        // Update the cerbacWhereTarget using partial update
        CerbacWhereTarget partialUpdatedCerbacWhereTarget = new CerbacWhereTarget();
        partialUpdatedCerbacWhereTarget.setId(cerbacWhereTarget.getId());

        partialUpdatedCerbacWhereTarget.value(UPDATED_VALUE);

        restCerbacWhereTargetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhereTarget.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhereTarget))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhereTarget testCerbacWhereTarget = cerbacWhereTargetList.get(cerbacWhereTargetList.size() - 1);
        assertThat(testCerbacWhereTarget.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhereTarget() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();
        cerbacWhereTarget.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhereTargetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhereTarget.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhereTarget() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();
        cerbacWhereTarget.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereTargetMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhereTarget() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereTargetRepository.findAll().size();
        cerbacWhereTarget.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereTargetMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhereTarget))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhereTarget in the database
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhereTarget() throws Exception {
        // Initialize the database
        cerbacWhereTargetRepository.saveAndFlush(cerbacWhereTarget);

        int databaseSizeBeforeDelete = cerbacWhereTargetRepository.findAll().size();

        // Delete the cerbacWhereTarget
        restCerbacWhereTargetMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhereTarget.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhereTarget> cerbacWhereTargetList = cerbacWhereTargetRepository.findAll();
        assertThat(cerbacWhereTargetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

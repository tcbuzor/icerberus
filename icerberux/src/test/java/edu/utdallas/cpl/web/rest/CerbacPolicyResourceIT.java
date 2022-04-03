package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacPolicy;
import edu.utdallas.cpl.repository.CerbacPolicyRepository;
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
 * Integration tests for the {@link CerbacPolicyResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacPolicyResourceIT {

    private static final String DEFAULT_PID = "AAAAAAAAAA";
    private static final String UPDATED_PID = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-policies";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacPolicyRepository cerbacPolicyRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacPolicyMockMvc;

    private CerbacPolicy cerbacPolicy;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacPolicy createEntity(EntityManager em) {
        CerbacPolicy cerbacPolicy = new CerbacPolicy().pid(DEFAULT_PID);
        return cerbacPolicy;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacPolicy createUpdatedEntity(EntityManager em) {
        CerbacPolicy cerbacPolicy = new CerbacPolicy().pid(UPDATED_PID);
        return cerbacPolicy;
    }

    @BeforeEach
    public void initTest() {
        cerbacPolicy = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacPolicy() throws Exception {
        int databaseSizeBeforeCreate = cerbacPolicyRepository.findAll().size();
        // Create the CerbacPolicy
        restCerbacPolicyMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacPolicy)))
            .andExpect(status().isCreated());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacPolicy testCerbacPolicy = cerbacPolicyList.get(cerbacPolicyList.size() - 1);
        assertThat(testCerbacPolicy.getPid()).isEqualTo(DEFAULT_PID);
    }

    @Test
    @Transactional
    void createCerbacPolicyWithExistingId() throws Exception {
        // Create the CerbacPolicy with an existing ID
        cerbacPolicy.setId(1L);

        int databaseSizeBeforeCreate = cerbacPolicyRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacPolicyMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacPolicy)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPidIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacPolicyRepository.findAll().size();
        // set the field null
        cerbacPolicy.setPid(null);

        // Create the CerbacPolicy, which fails.

        restCerbacPolicyMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacPolicy)))
            .andExpect(status().isBadRequest());

        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacPolicies() throws Exception {
        // Initialize the database
        cerbacPolicyRepository.saveAndFlush(cerbacPolicy);

        // Get all the cerbacPolicyList
        restCerbacPolicyMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacPolicy.getId().intValue())))
            .andExpect(jsonPath("$.[*].pid").value(hasItem(DEFAULT_PID)));
    }

    @Test
    @Transactional
    void getCerbacPolicy() throws Exception {
        // Initialize the database
        cerbacPolicyRepository.saveAndFlush(cerbacPolicy);

        // Get the cerbacPolicy
        restCerbacPolicyMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacPolicy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacPolicy.getId().intValue()))
            .andExpect(jsonPath("$.pid").value(DEFAULT_PID));
    }

    @Test
    @Transactional
    void getNonExistingCerbacPolicy() throws Exception {
        // Get the cerbacPolicy
        restCerbacPolicyMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacPolicy() throws Exception {
        // Initialize the database
        cerbacPolicyRepository.saveAndFlush(cerbacPolicy);

        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();

        // Update the cerbacPolicy
        CerbacPolicy updatedCerbacPolicy = cerbacPolicyRepository.findById(cerbacPolicy.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacPolicy are not directly saved in db
        em.detach(updatedCerbacPolicy);
        updatedCerbacPolicy.pid(UPDATED_PID);

        restCerbacPolicyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacPolicy.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacPolicy))
            )
            .andExpect(status().isOk());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
        CerbacPolicy testCerbacPolicy = cerbacPolicyList.get(cerbacPolicyList.size() - 1);
        assertThat(testCerbacPolicy.getPid()).isEqualTo(UPDATED_PID);
    }

    @Test
    @Transactional
    void putNonExistingCerbacPolicy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();
        cerbacPolicy.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacPolicyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacPolicy.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicy))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacPolicy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();
        cerbacPolicy.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacPolicyMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicy))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacPolicy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();
        cerbacPolicy.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacPolicyMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacPolicy)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacPolicyWithPatch() throws Exception {
        // Initialize the database
        cerbacPolicyRepository.saveAndFlush(cerbacPolicy);

        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();

        // Update the cerbacPolicy using partial update
        CerbacPolicy partialUpdatedCerbacPolicy = new CerbacPolicy();
        partialUpdatedCerbacPolicy.setId(cerbacPolicy.getId());

        partialUpdatedCerbacPolicy.pid(UPDATED_PID);

        restCerbacPolicyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacPolicy.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacPolicy))
            )
            .andExpect(status().isOk());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
        CerbacPolicy testCerbacPolicy = cerbacPolicyList.get(cerbacPolicyList.size() - 1);
        assertThat(testCerbacPolicy.getPid()).isEqualTo(UPDATED_PID);
    }

    @Test
    @Transactional
    void fullUpdateCerbacPolicyWithPatch() throws Exception {
        // Initialize the database
        cerbacPolicyRepository.saveAndFlush(cerbacPolicy);

        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();

        // Update the cerbacPolicy using partial update
        CerbacPolicy partialUpdatedCerbacPolicy = new CerbacPolicy();
        partialUpdatedCerbacPolicy.setId(cerbacPolicy.getId());

        partialUpdatedCerbacPolicy.pid(UPDATED_PID);

        restCerbacPolicyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacPolicy.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacPolicy))
            )
            .andExpect(status().isOk());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
        CerbacPolicy testCerbacPolicy = cerbacPolicyList.get(cerbacPolicyList.size() - 1);
        assertThat(testCerbacPolicy.getPid()).isEqualTo(UPDATED_PID);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacPolicy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();
        cerbacPolicy.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacPolicyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacPolicy.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicy))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacPolicy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();
        cerbacPolicy.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacPolicyMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicy))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacPolicy() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRepository.findAll().size();
        cerbacPolicy.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacPolicyMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacPolicy))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacPolicy in the database
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacPolicy() throws Exception {
        // Initialize the database
        cerbacPolicyRepository.saveAndFlush(cerbacPolicy);

        int databaseSizeBeforeDelete = cerbacPolicyRepository.findAll().size();

        // Delete the cerbacPolicy
        restCerbacPolicyMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacPolicy.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacPolicy> cerbacPolicyList = cerbacPolicyRepository.findAll();
        assertThat(cerbacPolicyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacWhen;
import edu.utdallas.cpl.domain.enumeration.ConditionEnum;
import edu.utdallas.cpl.repository.CerbacWhenRepository;
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
 * Integration tests for the {@link CerbacWhenResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhenResourceIT {

    private static final ConditionEnum DEFAULT_WHEN_CONDITION = ConditionEnum.EQ;
    private static final ConditionEnum UPDATED_WHEN_CONDITION = ConditionEnum.NEQ;

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-whens";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhenRepository cerbacWhenRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhenMockMvc;

    private CerbacWhen cerbacWhen;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhen createEntity(EntityManager em) {
        CerbacWhen cerbacWhen = new CerbacWhen().whenCondition(DEFAULT_WHEN_CONDITION).value(DEFAULT_VALUE);
        return cerbacWhen;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhen createUpdatedEntity(EntityManager em) {
        CerbacWhen cerbacWhen = new CerbacWhen().whenCondition(UPDATED_WHEN_CONDITION).value(UPDATED_VALUE);
        return cerbacWhen;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhen = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhen() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhenRepository.findAll().size();
        // Create the CerbacWhen
        restCerbacWhenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhen)))
            .andExpect(status().isCreated());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhen testCerbacWhen = cerbacWhenList.get(cerbacWhenList.size() - 1);
        assertThat(testCerbacWhen.getWhenCondition()).isEqualTo(DEFAULT_WHEN_CONDITION);
        assertThat(testCerbacWhen.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    void createCerbacWhenWithExistingId() throws Exception {
        // Create the CerbacWhen with an existing ID
        cerbacWhen.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhenRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhen)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhenRepository.findAll().size();
        // set the field null
        cerbacWhen.setValue(null);

        // Create the CerbacWhen, which fails.

        restCerbacWhenMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhen)))
            .andExpect(status().isBadRequest());

        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacWhens() throws Exception {
        // Initialize the database
        cerbacWhenRepository.saveAndFlush(cerbacWhen);

        // Get all the cerbacWhenList
        restCerbacWhenMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhen.getId().intValue())))
            .andExpect(jsonPath("$.[*].whenCondition").value(hasItem(DEFAULT_WHEN_CONDITION.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }

    @Test
    @Transactional
    void getCerbacWhen() throws Exception {
        // Initialize the database
        cerbacWhenRepository.saveAndFlush(cerbacWhen);

        // Get the cerbacWhen
        restCerbacWhenMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhen.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhen.getId().intValue()))
            .andExpect(jsonPath("$.whenCondition").value(DEFAULT_WHEN_CONDITION.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhen() throws Exception {
        // Get the cerbacWhen
        restCerbacWhenMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhen() throws Exception {
        // Initialize the database
        cerbacWhenRepository.saveAndFlush(cerbacWhen);

        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();

        // Update the cerbacWhen
        CerbacWhen updatedCerbacWhen = cerbacWhenRepository.findById(cerbacWhen.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhen are not directly saved in db
        em.detach(updatedCerbacWhen);
        updatedCerbacWhen.whenCondition(UPDATED_WHEN_CONDITION).value(UPDATED_VALUE);

        restCerbacWhenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhen.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhen))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhen testCerbacWhen = cerbacWhenList.get(cerbacWhenList.size() - 1);
        assertThat(testCerbacWhen.getWhenCondition()).isEqualTo(UPDATED_WHEN_CONDITION);
        assertThat(testCerbacWhen.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhen() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();
        cerbacWhen.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhen.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhen))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhen() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();
        cerbacWhen.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhenMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhen))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhen() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();
        cerbacWhen.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhenMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhen)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhenWithPatch() throws Exception {
        // Initialize the database
        cerbacWhenRepository.saveAndFlush(cerbacWhen);

        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();

        // Update the cerbacWhen using partial update
        CerbacWhen partialUpdatedCerbacWhen = new CerbacWhen();
        partialUpdatedCerbacWhen.setId(cerbacWhen.getId());

        restCerbacWhenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhen.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhen))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhen testCerbacWhen = cerbacWhenList.get(cerbacWhenList.size() - 1);
        assertThat(testCerbacWhen.getWhenCondition()).isEqualTo(DEFAULT_WHEN_CONDITION);
        assertThat(testCerbacWhen.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhenWithPatch() throws Exception {
        // Initialize the database
        cerbacWhenRepository.saveAndFlush(cerbacWhen);

        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();

        // Update the cerbacWhen using partial update
        CerbacWhen partialUpdatedCerbacWhen = new CerbacWhen();
        partialUpdatedCerbacWhen.setId(cerbacWhen.getId());

        partialUpdatedCerbacWhen.whenCondition(UPDATED_WHEN_CONDITION).value(UPDATED_VALUE);

        restCerbacWhenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhen.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhen))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhen testCerbacWhen = cerbacWhenList.get(cerbacWhenList.size() - 1);
        assertThat(testCerbacWhen.getWhenCondition()).isEqualTo(UPDATED_WHEN_CONDITION);
        assertThat(testCerbacWhen.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhen() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();
        cerbacWhen.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhen.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhen))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhen() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();
        cerbacWhen.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhenMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhen))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhen() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhenRepository.findAll().size();
        cerbacWhen.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhenMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacWhen))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhen in the database
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhen() throws Exception {
        // Initialize the database
        cerbacWhenRepository.saveAndFlush(cerbacWhen);

        int databaseSizeBeforeDelete = cerbacWhenRepository.findAll().size();

        // Delete the cerbacWhen
        restCerbacWhenMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhen.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhen> cerbacWhenList = cerbacWhenRepository.findAll();
        assertThat(cerbacWhenList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacWhatProp;
import edu.utdallas.cpl.domain.enumeration.ConditionEnum;
import edu.utdallas.cpl.repository.CerbacWhatPropRepository;
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
 * Integration tests for the {@link CerbacWhatPropResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhatPropResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final ConditionEnum DEFAULT_CONDITION = ConditionEnum.EQ;
    private static final ConditionEnum UPDATED_CONDITION = ConditionEnum.NEQ;

    private static final String ENTITY_API_URL = "/api/cerbac-what-props";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhatPropRepository cerbacWhatPropRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhatPropMockMvc;

    private CerbacWhatProp cerbacWhatProp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhatProp createEntity(EntityManager em) {
        CerbacWhatProp cerbacWhatProp = new CerbacWhatProp().name(DEFAULT_NAME).value(DEFAULT_VALUE).condition(DEFAULT_CONDITION);
        return cerbacWhatProp;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhatProp createUpdatedEntity(EntityManager em) {
        CerbacWhatProp cerbacWhatProp = new CerbacWhatProp().name(UPDATED_NAME).value(UPDATED_VALUE).condition(UPDATED_CONDITION);
        return cerbacWhatProp;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhatProp = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhatProp() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhatPropRepository.findAll().size();
        // Create the CerbacWhatProp
        restCerbacWhatPropMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isCreated());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhatProp testCerbacWhatProp = cerbacWhatPropList.get(cerbacWhatPropList.size() - 1);
        assertThat(testCerbacWhatProp.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCerbacWhatProp.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testCerbacWhatProp.getCondition()).isEqualTo(DEFAULT_CONDITION);
    }

    @Test
    @Transactional
    void createCerbacWhatPropWithExistingId() throws Exception {
        // Create the CerbacWhatProp with an existing ID
        cerbacWhatProp.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhatPropRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhatPropMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhatPropRepository.findAll().size();
        // set the field null
        cerbacWhatProp.setName(null);

        // Create the CerbacWhatProp, which fails.

        restCerbacWhatPropMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isBadRequest());

        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhatPropRepository.findAll().size();
        // set the field null
        cerbacWhatProp.setValue(null);

        // Create the CerbacWhatProp, which fails.

        restCerbacWhatPropMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isBadRequest());

        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacWhatProps() throws Exception {
        // Initialize the database
        cerbacWhatPropRepository.saveAndFlush(cerbacWhatProp);

        // Get all the cerbacWhatPropList
        restCerbacWhatPropMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhatProp.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].condition").value(hasItem(DEFAULT_CONDITION.toString())));
    }

    @Test
    @Transactional
    void getCerbacWhatProp() throws Exception {
        // Initialize the database
        cerbacWhatPropRepository.saveAndFlush(cerbacWhatProp);

        // Get the cerbacWhatProp
        restCerbacWhatPropMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhatProp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhatProp.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.condition").value(DEFAULT_CONDITION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhatProp() throws Exception {
        // Get the cerbacWhatProp
        restCerbacWhatPropMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhatProp() throws Exception {
        // Initialize the database
        cerbacWhatPropRepository.saveAndFlush(cerbacWhatProp);

        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();

        // Update the cerbacWhatProp
        CerbacWhatProp updatedCerbacWhatProp = cerbacWhatPropRepository.findById(cerbacWhatProp.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhatProp are not directly saved in db
        em.detach(updatedCerbacWhatProp);
        updatedCerbacWhatProp.name(UPDATED_NAME).value(UPDATED_VALUE).condition(UPDATED_CONDITION);

        restCerbacWhatPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhatProp.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhatProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhatProp testCerbacWhatProp = cerbacWhatPropList.get(cerbacWhatPropList.size() - 1);
        assertThat(testCerbacWhatProp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCerbacWhatProp.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testCerbacWhatProp.getCondition()).isEqualTo(UPDATED_CONDITION);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhatProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();
        cerbacWhatProp.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhatPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhatProp.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhatProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();
        cerbacWhatProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhatProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();
        cerbacWhatProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatPropMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhatPropWithPatch() throws Exception {
        // Initialize the database
        cerbacWhatPropRepository.saveAndFlush(cerbacWhatProp);

        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();

        // Update the cerbacWhatProp using partial update
        CerbacWhatProp partialUpdatedCerbacWhatProp = new CerbacWhatProp();
        partialUpdatedCerbacWhatProp.setId(cerbacWhatProp.getId());

        partialUpdatedCerbacWhatProp.name(UPDATED_NAME).value(UPDATED_VALUE).condition(UPDATED_CONDITION);

        restCerbacWhatPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhatProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhatProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhatProp testCerbacWhatProp = cerbacWhatPropList.get(cerbacWhatPropList.size() - 1);
        assertThat(testCerbacWhatProp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCerbacWhatProp.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testCerbacWhatProp.getCondition()).isEqualTo(UPDATED_CONDITION);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhatPropWithPatch() throws Exception {
        // Initialize the database
        cerbacWhatPropRepository.saveAndFlush(cerbacWhatProp);

        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();

        // Update the cerbacWhatProp using partial update
        CerbacWhatProp partialUpdatedCerbacWhatProp = new CerbacWhatProp();
        partialUpdatedCerbacWhatProp.setId(cerbacWhatProp.getId());

        partialUpdatedCerbacWhatProp.name(UPDATED_NAME).value(UPDATED_VALUE).condition(UPDATED_CONDITION);

        restCerbacWhatPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhatProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhatProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhatProp testCerbacWhatProp = cerbacWhatPropList.get(cerbacWhatPropList.size() - 1);
        assertThat(testCerbacWhatProp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCerbacWhatProp.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testCerbacWhatProp.getCondition()).isEqualTo(UPDATED_CONDITION);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhatProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();
        cerbacWhatProp.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhatPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhatProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhatProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();
        cerbacWhatProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhatProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatPropRepository.findAll().size();
        cerbacWhatProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatPropMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacWhatProp))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhatProp in the database
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhatProp() throws Exception {
        // Initialize the database
        cerbacWhatPropRepository.saveAndFlush(cerbacWhatProp);

        int databaseSizeBeforeDelete = cerbacWhatPropRepository.findAll().size();

        // Delete the cerbacWhatProp
        restCerbacWhatPropMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhatProp.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhatProp> cerbacWhatPropList = cerbacWhatPropRepository.findAll();
        assertThat(cerbacWhatPropList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

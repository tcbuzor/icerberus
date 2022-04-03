package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacWhoProp;
import edu.utdallas.cpl.domain.enumeration.ConditionEnum;
import edu.utdallas.cpl.repository.CerbacWhoPropRepository;
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
 * Integration tests for the {@link CerbacWhoPropResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhoPropResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final ConditionEnum DEFAULT_CONDITION = ConditionEnum.EQ;
    private static final ConditionEnum UPDATED_CONDITION = ConditionEnum.NEQ;

    private static final String ENTITY_API_URL = "/api/cerbac-who-props";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhoPropRepository cerbacWhoPropRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhoPropMockMvc;

    private CerbacWhoProp cerbacWhoProp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhoProp createEntity(EntityManager em) {
        CerbacWhoProp cerbacWhoProp = new CerbacWhoProp().name(DEFAULT_NAME).value(DEFAULT_VALUE).condition(DEFAULT_CONDITION);
        return cerbacWhoProp;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhoProp createUpdatedEntity(EntityManager em) {
        CerbacWhoProp cerbacWhoProp = new CerbacWhoProp().name(UPDATED_NAME).value(UPDATED_VALUE).condition(UPDATED_CONDITION);
        return cerbacWhoProp;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhoProp = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhoProp() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhoPropRepository.findAll().size();
        // Create the CerbacWhoProp
        restCerbacWhoPropMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp)))
            .andExpect(status().isCreated());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhoProp testCerbacWhoProp = cerbacWhoPropList.get(cerbacWhoPropList.size() - 1);
        assertThat(testCerbacWhoProp.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCerbacWhoProp.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testCerbacWhoProp.getCondition()).isEqualTo(DEFAULT_CONDITION);
    }

    @Test
    @Transactional
    void createCerbacWhoPropWithExistingId() throws Exception {
        // Create the CerbacWhoProp with an existing ID
        cerbacWhoProp.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhoPropRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhoPropMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhoPropRepository.findAll().size();
        // set the field null
        cerbacWhoProp.setName(null);

        // Create the CerbacWhoProp, which fails.

        restCerbacWhoPropMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp)))
            .andExpect(status().isBadRequest());

        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhoPropRepository.findAll().size();
        // set the field null
        cerbacWhoProp.setValue(null);

        // Create the CerbacWhoProp, which fails.

        restCerbacWhoPropMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp)))
            .andExpect(status().isBadRequest());

        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacWhoProps() throws Exception {
        // Initialize the database
        cerbacWhoPropRepository.saveAndFlush(cerbacWhoProp);

        // Get all the cerbacWhoPropList
        restCerbacWhoPropMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhoProp.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].condition").value(hasItem(DEFAULT_CONDITION.toString())));
    }

    @Test
    @Transactional
    void getCerbacWhoProp() throws Exception {
        // Initialize the database
        cerbacWhoPropRepository.saveAndFlush(cerbacWhoProp);

        // Get the cerbacWhoProp
        restCerbacWhoPropMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhoProp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhoProp.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.condition").value(DEFAULT_CONDITION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhoProp() throws Exception {
        // Get the cerbacWhoProp
        restCerbacWhoPropMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhoProp() throws Exception {
        // Initialize the database
        cerbacWhoPropRepository.saveAndFlush(cerbacWhoProp);

        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();

        // Update the cerbacWhoProp
        CerbacWhoProp updatedCerbacWhoProp = cerbacWhoPropRepository.findById(cerbacWhoProp.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhoProp are not directly saved in db
        em.detach(updatedCerbacWhoProp);
        updatedCerbacWhoProp.name(UPDATED_NAME).value(UPDATED_VALUE).condition(UPDATED_CONDITION);

        restCerbacWhoPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhoProp.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhoProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhoProp testCerbacWhoProp = cerbacWhoPropList.get(cerbacWhoPropList.size() - 1);
        assertThat(testCerbacWhoProp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCerbacWhoProp.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testCerbacWhoProp.getCondition()).isEqualTo(UPDATED_CONDITION);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhoProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();
        cerbacWhoProp.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhoPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhoProp.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhoProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();
        cerbacWhoProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhoPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhoProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();
        cerbacWhoProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhoPropMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhoPropWithPatch() throws Exception {
        // Initialize the database
        cerbacWhoPropRepository.saveAndFlush(cerbacWhoProp);

        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();

        // Update the cerbacWhoProp using partial update
        CerbacWhoProp partialUpdatedCerbacWhoProp = new CerbacWhoProp();
        partialUpdatedCerbacWhoProp.setId(cerbacWhoProp.getId());

        partialUpdatedCerbacWhoProp.name(UPDATED_NAME).value(UPDATED_VALUE);

        restCerbacWhoPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhoProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhoProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhoProp testCerbacWhoProp = cerbacWhoPropList.get(cerbacWhoPropList.size() - 1);
        assertThat(testCerbacWhoProp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCerbacWhoProp.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testCerbacWhoProp.getCondition()).isEqualTo(DEFAULT_CONDITION);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhoPropWithPatch() throws Exception {
        // Initialize the database
        cerbacWhoPropRepository.saveAndFlush(cerbacWhoProp);

        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();

        // Update the cerbacWhoProp using partial update
        CerbacWhoProp partialUpdatedCerbacWhoProp = new CerbacWhoProp();
        partialUpdatedCerbacWhoProp.setId(cerbacWhoProp.getId());

        partialUpdatedCerbacWhoProp.name(UPDATED_NAME).value(UPDATED_VALUE).condition(UPDATED_CONDITION);

        restCerbacWhoPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhoProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhoProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhoProp testCerbacWhoProp = cerbacWhoPropList.get(cerbacWhoPropList.size() - 1);
        assertThat(testCerbacWhoProp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCerbacWhoProp.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testCerbacWhoProp.getCondition()).isEqualTo(UPDATED_CONDITION);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhoProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();
        cerbacWhoProp.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhoPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhoProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhoProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();
        cerbacWhoProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhoPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhoProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoPropRepository.findAll().size();
        cerbacWhoProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhoPropMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacWhoProp))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhoProp in the database
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhoProp() throws Exception {
        // Initialize the database
        cerbacWhoPropRepository.saveAndFlush(cerbacWhoProp);

        int databaseSizeBeforeDelete = cerbacWhoPropRepository.findAll().size();

        // Delete the cerbacWhoProp
        restCerbacWhoPropMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhoProp.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhoProp> cerbacWhoPropList = cerbacWhoPropRepository.findAll();
        assertThat(cerbacWhoPropList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

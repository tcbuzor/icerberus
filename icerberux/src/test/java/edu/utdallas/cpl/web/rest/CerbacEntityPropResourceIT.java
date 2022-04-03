package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacEntityProp;
import edu.utdallas.cpl.repository.CerbacEntityPropRepository;
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
 * Integration tests for the {@link CerbacEntityPropResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacEntityPropResourceIT {

    private static final String DEFAULT_PROP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROP_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-entity-props";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacEntityPropRepository cerbacEntityPropRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacEntityPropMockMvc;

    private CerbacEntityProp cerbacEntityProp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacEntityProp createEntity(EntityManager em) {
        CerbacEntityProp cerbacEntityProp = new CerbacEntityProp().propName(DEFAULT_PROP_NAME);
        return cerbacEntityProp;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacEntityProp createUpdatedEntity(EntityManager em) {
        CerbacEntityProp cerbacEntityProp = new CerbacEntityProp().propName(UPDATED_PROP_NAME);
        return cerbacEntityProp;
    }

    @BeforeEach
    public void initTest() {
        cerbacEntityProp = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacEntityProp() throws Exception {
        int databaseSizeBeforeCreate = cerbacEntityPropRepository.findAll().size();
        // Create the CerbacEntityProp
        restCerbacEntityPropMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isCreated());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacEntityProp testCerbacEntityProp = cerbacEntityPropList.get(cerbacEntityPropList.size() - 1);
        assertThat(testCerbacEntityProp.getPropName()).isEqualTo(DEFAULT_PROP_NAME);
    }

    @Test
    @Transactional
    void createCerbacEntityPropWithExistingId() throws Exception {
        // Create the CerbacEntityProp with an existing ID
        cerbacEntityProp.setId(1L);

        int databaseSizeBeforeCreate = cerbacEntityPropRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacEntityPropMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPropNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacEntityPropRepository.findAll().size();
        // set the field null
        cerbacEntityProp.setPropName(null);

        // Create the CerbacEntityProp, which fails.

        restCerbacEntityPropMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isBadRequest());

        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacEntityProps() throws Exception {
        // Initialize the database
        cerbacEntityPropRepository.saveAndFlush(cerbacEntityProp);

        // Get all the cerbacEntityPropList
        restCerbacEntityPropMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacEntityProp.getId().intValue())))
            .andExpect(jsonPath("$.[*].propName").value(hasItem(DEFAULT_PROP_NAME)));
    }

    @Test
    @Transactional
    void getCerbacEntityProp() throws Exception {
        // Initialize the database
        cerbacEntityPropRepository.saveAndFlush(cerbacEntityProp);

        // Get the cerbacEntityProp
        restCerbacEntityPropMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacEntityProp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacEntityProp.getId().intValue()))
            .andExpect(jsonPath("$.propName").value(DEFAULT_PROP_NAME));
    }

    @Test
    @Transactional
    void getNonExistingCerbacEntityProp() throws Exception {
        // Get the cerbacEntityProp
        restCerbacEntityPropMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacEntityProp() throws Exception {
        // Initialize the database
        cerbacEntityPropRepository.saveAndFlush(cerbacEntityProp);

        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();

        // Update the cerbacEntityProp
        CerbacEntityProp updatedCerbacEntityProp = cerbacEntityPropRepository.findById(cerbacEntityProp.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacEntityProp are not directly saved in db
        em.detach(updatedCerbacEntityProp);
        updatedCerbacEntityProp.propName(UPDATED_PROP_NAME);

        restCerbacEntityPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacEntityProp.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacEntityProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacEntityProp testCerbacEntityProp = cerbacEntityPropList.get(cerbacEntityPropList.size() - 1);
        assertThat(testCerbacEntityProp.getPropName()).isEqualTo(UPDATED_PROP_NAME);
    }

    @Test
    @Transactional
    void putNonExistingCerbacEntityProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();
        cerbacEntityProp.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacEntityPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacEntityProp.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacEntityProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();
        cerbacEntityProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacEntityPropMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacEntityProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();
        cerbacEntityProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacEntityPropMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacEntityPropWithPatch() throws Exception {
        // Initialize the database
        cerbacEntityPropRepository.saveAndFlush(cerbacEntityProp);

        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();

        // Update the cerbacEntityProp using partial update
        CerbacEntityProp partialUpdatedCerbacEntityProp = new CerbacEntityProp();
        partialUpdatedCerbacEntityProp.setId(cerbacEntityProp.getId());

        partialUpdatedCerbacEntityProp.propName(UPDATED_PROP_NAME);

        restCerbacEntityPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacEntityProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacEntityProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacEntityProp testCerbacEntityProp = cerbacEntityPropList.get(cerbacEntityPropList.size() - 1);
        assertThat(testCerbacEntityProp.getPropName()).isEqualTo(UPDATED_PROP_NAME);
    }

    @Test
    @Transactional
    void fullUpdateCerbacEntityPropWithPatch() throws Exception {
        // Initialize the database
        cerbacEntityPropRepository.saveAndFlush(cerbacEntityProp);

        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();

        // Update the cerbacEntityProp using partial update
        CerbacEntityProp partialUpdatedCerbacEntityProp = new CerbacEntityProp();
        partialUpdatedCerbacEntityProp.setId(cerbacEntityProp.getId());

        partialUpdatedCerbacEntityProp.propName(UPDATED_PROP_NAME);

        restCerbacEntityPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacEntityProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacEntityProp))
            )
            .andExpect(status().isOk());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
        CerbacEntityProp testCerbacEntityProp = cerbacEntityPropList.get(cerbacEntityPropList.size() - 1);
        assertThat(testCerbacEntityProp.getPropName()).isEqualTo(UPDATED_PROP_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacEntityProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();
        cerbacEntityProp.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacEntityPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacEntityProp.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacEntityProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();
        cerbacEntityProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacEntityPropMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacEntityProp() throws Exception {
        int databaseSizeBeforeUpdate = cerbacEntityPropRepository.findAll().size();
        cerbacEntityProp.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacEntityPropMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacEntityProp))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacEntityProp in the database
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacEntityProp() throws Exception {
        // Initialize the database
        cerbacEntityPropRepository.saveAndFlush(cerbacEntityProp);

        int databaseSizeBeforeDelete = cerbacEntityPropRepository.findAll().size();

        // Delete the cerbacEntityProp
        restCerbacEntityPropMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacEntityProp.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacEntityProp> cerbacEntityPropList = cerbacEntityPropRepository.findAll();
        assertThat(cerbacEntityPropList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

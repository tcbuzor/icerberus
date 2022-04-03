package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacWhere;
import edu.utdallas.cpl.repository.CerbacWhereRepository;
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
 * Integration tests for the {@link CerbacWhereResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhereResourceIT {

    private static final String ENTITY_API_URL = "/api/cerbac-wheres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhereRepository cerbacWhereRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhereMockMvc;

    private CerbacWhere cerbacWhere;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhere createEntity(EntityManager em) {
        CerbacWhere cerbacWhere = new CerbacWhere();
        return cerbacWhere;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhere createUpdatedEntity(EntityManager em) {
        CerbacWhere cerbacWhere = new CerbacWhere();
        return cerbacWhere;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhere = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhere() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhereRepository.findAll().size();
        // Create the CerbacWhere
        restCerbacWhereMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhere)))
            .andExpect(status().isCreated());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhere testCerbacWhere = cerbacWhereList.get(cerbacWhereList.size() - 1);
    }

    @Test
    @Transactional
    void createCerbacWhereWithExistingId() throws Exception {
        // Create the CerbacWhere with an existing ID
        cerbacWhere.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhereRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhereMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhere)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCerbacWheres() throws Exception {
        // Initialize the database
        cerbacWhereRepository.saveAndFlush(cerbacWhere);

        // Get all the cerbacWhereList
        restCerbacWhereMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhere.getId().intValue())));
    }

    @Test
    @Transactional
    void getCerbacWhere() throws Exception {
        // Initialize the database
        cerbacWhereRepository.saveAndFlush(cerbacWhere);

        // Get the cerbacWhere
        restCerbacWhereMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhere.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhere() throws Exception {
        // Get the cerbacWhere
        restCerbacWhereMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhere() throws Exception {
        // Initialize the database
        cerbacWhereRepository.saveAndFlush(cerbacWhere);

        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();

        // Update the cerbacWhere
        CerbacWhere updatedCerbacWhere = cerbacWhereRepository.findById(cerbacWhere.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhere are not directly saved in db
        em.detach(updatedCerbacWhere);

        restCerbacWhereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhere))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhere testCerbacWhere = cerbacWhereList.get(cerbacWhereList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhere() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();
        cerbacWhere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhere.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhere))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhere() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();
        cerbacWhere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhere))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhere() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();
        cerbacWhere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhere)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhereWithPatch() throws Exception {
        // Initialize the database
        cerbacWhereRepository.saveAndFlush(cerbacWhere);

        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();

        // Update the cerbacWhere using partial update
        CerbacWhere partialUpdatedCerbacWhere = new CerbacWhere();
        partialUpdatedCerbacWhere.setId(cerbacWhere.getId());

        restCerbacWhereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhere))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhere testCerbacWhere = cerbacWhereList.get(cerbacWhereList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhereWithPatch() throws Exception {
        // Initialize the database
        cerbacWhereRepository.saveAndFlush(cerbacWhere);

        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();

        // Update the cerbacWhere using partial update
        CerbacWhere partialUpdatedCerbacWhere = new CerbacWhere();
        partialUpdatedCerbacWhere.setId(cerbacWhere.getId());

        restCerbacWhereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhere))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhere testCerbacWhere = cerbacWhereList.get(cerbacWhereList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhere() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();
        cerbacWhere.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhere.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhere))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhere() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();
        cerbacWhere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhere))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhere() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhereRepository.findAll().size();
        cerbacWhere.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhereMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacWhere))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhere in the database
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhere() throws Exception {
        // Initialize the database
        cerbacWhereRepository.saveAndFlush(cerbacWhere);

        int databaseSizeBeforeDelete = cerbacWhereRepository.findAll().size();

        // Delete the cerbacWhere
        restCerbacWhereMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhere.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhere> cerbacWhereList = cerbacWhereRepository.findAll();
        assertThat(cerbacWhereList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

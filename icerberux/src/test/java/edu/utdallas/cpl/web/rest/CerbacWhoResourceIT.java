package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacEntity;
import edu.utdallas.cpl.domain.CerbacWho;
import edu.utdallas.cpl.repository.CerbacWhoRepository;
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
 * Integration tests for the {@link CerbacWhoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhoResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-whos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhoRepository cerbacWhoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhoMockMvc;

    private CerbacWho cerbacWho;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWho createEntity(EntityManager em) {
        CerbacWho cerbacWho = new CerbacWho().name(DEFAULT_NAME);
        // Add required entity
        CerbacEntity cerbacEntity;
        if (TestUtil.findAll(em, CerbacEntity.class).isEmpty()) {
            cerbacEntity = CerbacEntityResourceIT.createEntity(em);
            em.persist(cerbacEntity);
            em.flush();
        } else {
            cerbacEntity = TestUtil.findAll(em, CerbacEntity.class).get(0);
        }
        cerbacWho.setCerbacEntity(cerbacEntity);
        return cerbacWho;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWho createUpdatedEntity(EntityManager em) {
        CerbacWho cerbacWho = new CerbacWho().name(UPDATED_NAME);
        // Add required entity
        CerbacEntity cerbacEntity;
        if (TestUtil.findAll(em, CerbacEntity.class).isEmpty()) {
            cerbacEntity = CerbacEntityResourceIT.createUpdatedEntity(em);
            em.persist(cerbacEntity);
            em.flush();
        } else {
            cerbacEntity = TestUtil.findAll(em, CerbacEntity.class).get(0);
        }
        cerbacWho.setCerbacEntity(cerbacEntity);
        return cerbacWho;
    }

    @BeforeEach
    public void initTest() {
        cerbacWho = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWho() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhoRepository.findAll().size();
        // Create the CerbacWho
        restCerbacWhoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWho)))
            .andExpect(status().isCreated());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWho testCerbacWho = cerbacWhoList.get(cerbacWhoList.size() - 1);
        assertThat(testCerbacWho.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createCerbacWhoWithExistingId() throws Exception {
        // Create the CerbacWho with an existing ID
        cerbacWho.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWho)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhoRepository.findAll().size();
        // set the field null
        cerbacWho.setName(null);

        // Create the CerbacWho, which fails.

        restCerbacWhoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWho)))
            .andExpect(status().isBadRequest());

        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacWhos() throws Exception {
        // Initialize the database
        cerbacWhoRepository.saveAndFlush(cerbacWho);

        // Get all the cerbacWhoList
        restCerbacWhoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWho.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getCerbacWho() throws Exception {
        // Initialize the database
        cerbacWhoRepository.saveAndFlush(cerbacWho);

        // Get the cerbacWho
        restCerbacWhoMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWho.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWho.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWho() throws Exception {
        // Get the cerbacWho
        restCerbacWhoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWho() throws Exception {
        // Initialize the database
        cerbacWhoRepository.saveAndFlush(cerbacWho);

        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();

        // Update the cerbacWho
        CerbacWho updatedCerbacWho = cerbacWhoRepository.findById(cerbacWho.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWho are not directly saved in db
        em.detach(updatedCerbacWho);
        updatedCerbacWho.name(UPDATED_NAME);

        restCerbacWhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWho.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWho))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
        CerbacWho testCerbacWho = cerbacWhoList.get(cerbacWhoList.size() - 1);
        assertThat(testCerbacWho.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWho() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();
        cerbacWho.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWho.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWho))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWho() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();
        cerbacWho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWho))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWho() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();
        cerbacWho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWho)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhoWithPatch() throws Exception {
        // Initialize the database
        cerbacWhoRepository.saveAndFlush(cerbacWho);

        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();

        // Update the cerbacWho using partial update
        CerbacWho partialUpdatedCerbacWho = new CerbacWho();
        partialUpdatedCerbacWho.setId(cerbacWho.getId());

        restCerbacWhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWho))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
        CerbacWho testCerbacWho = cerbacWhoList.get(cerbacWhoList.size() - 1);
        assertThat(testCerbacWho.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhoWithPatch() throws Exception {
        // Initialize the database
        cerbacWhoRepository.saveAndFlush(cerbacWho);

        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();

        // Update the cerbacWho using partial update
        CerbacWho partialUpdatedCerbacWho = new CerbacWho();
        partialUpdatedCerbacWho.setId(cerbacWho.getId());

        partialUpdatedCerbacWho.name(UPDATED_NAME);

        restCerbacWhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWho))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
        CerbacWho testCerbacWho = cerbacWhoList.get(cerbacWhoList.size() - 1);
        assertThat(testCerbacWho.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWho() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();
        cerbacWho.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWho))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWho() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();
        cerbacWho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWho))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWho() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhoRepository.findAll().size();
        cerbacWho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacWho))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWho in the database
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWho() throws Exception {
        // Initialize the database
        cerbacWhoRepository.saveAndFlush(cerbacWho);

        int databaseSizeBeforeDelete = cerbacWhoRepository.findAll().size();

        // Delete the cerbacWho
        restCerbacWhoMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWho.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWho> cerbacWhoList = cerbacWhoRepository.findAll();
        assertThat(cerbacWhoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

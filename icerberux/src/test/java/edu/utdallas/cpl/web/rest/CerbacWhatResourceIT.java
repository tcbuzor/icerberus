package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacEntity;
import edu.utdallas.cpl.domain.CerbacWhat;
import edu.utdallas.cpl.repository.CerbacWhatRepository;
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
 * Integration tests for the {@link CerbacWhatResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhatResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-whats";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhatRepository cerbacWhatRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhatMockMvc;

    private CerbacWhat cerbacWhat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhat createEntity(EntityManager em) {
        CerbacWhat cerbacWhat = new CerbacWhat().name(DEFAULT_NAME);
        // Add required entity
        CerbacEntity cerbacEntity;
        if (TestUtil.findAll(em, CerbacEntity.class).isEmpty()) {
            cerbacEntity = CerbacEntityResourceIT.createEntity(em);
            em.persist(cerbacEntity);
            em.flush();
        } else {
            cerbacEntity = TestUtil.findAll(em, CerbacEntity.class).get(0);
        }
        cerbacWhat.setCerbacEntity(cerbacEntity);
        return cerbacWhat;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhat createUpdatedEntity(EntityManager em) {
        CerbacWhat cerbacWhat = new CerbacWhat().name(UPDATED_NAME);
        // Add required entity
        CerbacEntity cerbacEntity;
        if (TestUtil.findAll(em, CerbacEntity.class).isEmpty()) {
            cerbacEntity = CerbacEntityResourceIT.createUpdatedEntity(em);
            em.persist(cerbacEntity);
            em.flush();
        } else {
            cerbacEntity = TestUtil.findAll(em, CerbacEntity.class).get(0);
        }
        cerbacWhat.setCerbacEntity(cerbacEntity);
        return cerbacWhat;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhat = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhat() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhatRepository.findAll().size();
        // Create the CerbacWhat
        restCerbacWhatMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhat)))
            .andExpect(status().isCreated());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhat testCerbacWhat = cerbacWhatList.get(cerbacWhatList.size() - 1);
        assertThat(testCerbacWhat.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createCerbacWhatWithExistingId() throws Exception {
        // Create the CerbacWhat with an existing ID
        cerbacWhat.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhatRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhatMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhat)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacWhatRepository.findAll().size();
        // set the field null
        cerbacWhat.setName(null);

        // Create the CerbacWhat, which fails.

        restCerbacWhatMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhat)))
            .andExpect(status().isBadRequest());

        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacWhats() throws Exception {
        // Initialize the database
        cerbacWhatRepository.saveAndFlush(cerbacWhat);

        // Get all the cerbacWhatList
        restCerbacWhatMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhat.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getCerbacWhat() throws Exception {
        // Initialize the database
        cerbacWhatRepository.saveAndFlush(cerbacWhat);

        // Get the cerbacWhat
        restCerbacWhatMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhat.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhat() throws Exception {
        // Get the cerbacWhat
        restCerbacWhatMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhat() throws Exception {
        // Initialize the database
        cerbacWhatRepository.saveAndFlush(cerbacWhat);

        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();

        // Update the cerbacWhat
        CerbacWhat updatedCerbacWhat = cerbacWhatRepository.findById(cerbacWhat.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhat are not directly saved in db
        em.detach(updatedCerbacWhat);
        updatedCerbacWhat.name(UPDATED_NAME);

        restCerbacWhatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhat.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhat))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhat testCerbacWhat = cerbacWhatList.get(cerbacWhatList.size() - 1);
        assertThat(testCerbacWhat.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhat() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();
        cerbacWhat.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhat.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhat))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhat() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();
        cerbacWhat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhat))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhat() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();
        cerbacWhat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhat)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhatWithPatch() throws Exception {
        // Initialize the database
        cerbacWhatRepository.saveAndFlush(cerbacWhat);

        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();

        // Update the cerbacWhat using partial update
        CerbacWhat partialUpdatedCerbacWhat = new CerbacWhat();
        partialUpdatedCerbacWhat.setId(cerbacWhat.getId());

        restCerbacWhatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhat.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhat))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhat testCerbacWhat = cerbacWhatList.get(cerbacWhatList.size() - 1);
        assertThat(testCerbacWhat.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhatWithPatch() throws Exception {
        // Initialize the database
        cerbacWhatRepository.saveAndFlush(cerbacWhat);

        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();

        // Update the cerbacWhat using partial update
        CerbacWhat partialUpdatedCerbacWhat = new CerbacWhat();
        partialUpdatedCerbacWhat.setId(cerbacWhat.getId());

        partialUpdatedCerbacWhat.name(UPDATED_NAME);

        restCerbacWhatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhat.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhat))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhat testCerbacWhat = cerbacWhatList.get(cerbacWhatList.size() - 1);
        assertThat(testCerbacWhat.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhat() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();
        cerbacWhat.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhat.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhat))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhat() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();
        cerbacWhat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhat))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhat() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatRepository.findAll().size();
        cerbacWhat.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacWhat))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhat in the database
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhat() throws Exception {
        // Initialize the database
        cerbacWhatRepository.saveAndFlush(cerbacWhat);

        int databaseSizeBeforeDelete = cerbacWhatRepository.findAll().size();

        // Delete the cerbacWhat
        restCerbacWhatMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhat.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhat> cerbacWhatList = cerbacWhatRepository.findAll();
        assertThat(cerbacWhatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

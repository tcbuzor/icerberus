package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacAction;
import edu.utdallas.cpl.repository.CerbacActionRepository;
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
 * Integration tests for the {@link CerbacActionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacActionResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-actions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacActionRepository cerbacActionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacActionMockMvc;

    private CerbacAction cerbacAction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacAction createEntity(EntityManager em) {
        CerbacAction cerbacAction = new CerbacAction().name(DEFAULT_NAME);
        return cerbacAction;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacAction createUpdatedEntity(EntityManager em) {
        CerbacAction cerbacAction = new CerbacAction().name(UPDATED_NAME);
        return cerbacAction;
    }

    @BeforeEach
    public void initTest() {
        cerbacAction = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacAction() throws Exception {
        int databaseSizeBeforeCreate = cerbacActionRepository.findAll().size();
        // Create the CerbacAction
        restCerbacActionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacAction)))
            .andExpect(status().isCreated());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacAction testCerbacAction = cerbacActionList.get(cerbacActionList.size() - 1);
        assertThat(testCerbacAction.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createCerbacActionWithExistingId() throws Exception {
        // Create the CerbacAction with an existing ID
        cerbacAction.setId(1L);

        int databaseSizeBeforeCreate = cerbacActionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacActionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacAction)))
            .andExpect(status().isBadRequest());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacActionRepository.findAll().size();
        // set the field null
        cerbacAction.setName(null);

        // Create the CerbacAction, which fails.

        restCerbacActionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacAction)))
            .andExpect(status().isBadRequest());

        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacActions() throws Exception {
        // Initialize the database
        cerbacActionRepository.saveAndFlush(cerbacAction);

        // Get all the cerbacActionList
        restCerbacActionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacAction.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getCerbacAction() throws Exception {
        // Initialize the database
        cerbacActionRepository.saveAndFlush(cerbacAction);

        // Get the cerbacAction
        restCerbacActionMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacAction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacAction.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingCerbacAction() throws Exception {
        // Get the cerbacAction
        restCerbacActionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacAction() throws Exception {
        // Initialize the database
        cerbacActionRepository.saveAndFlush(cerbacAction);

        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();

        // Update the cerbacAction
        CerbacAction updatedCerbacAction = cerbacActionRepository.findById(cerbacAction.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacAction are not directly saved in db
        em.detach(updatedCerbacAction);
        updatedCerbacAction.name(UPDATED_NAME);

        restCerbacActionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacAction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacAction))
            )
            .andExpect(status().isOk());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
        CerbacAction testCerbacAction = cerbacActionList.get(cerbacActionList.size() - 1);
        assertThat(testCerbacAction.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingCerbacAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();
        cerbacAction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacActionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacAction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();
        cerbacAction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacActionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();
        cerbacAction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacActionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacAction)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacActionWithPatch() throws Exception {
        // Initialize the database
        cerbacActionRepository.saveAndFlush(cerbacAction);

        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();

        // Update the cerbacAction using partial update
        CerbacAction partialUpdatedCerbacAction = new CerbacAction();
        partialUpdatedCerbacAction.setId(cerbacAction.getId());

        restCerbacActionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacAction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacAction))
            )
            .andExpect(status().isOk());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
        CerbacAction testCerbacAction = cerbacActionList.get(cerbacActionList.size() - 1);
        assertThat(testCerbacAction.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateCerbacActionWithPatch() throws Exception {
        // Initialize the database
        cerbacActionRepository.saveAndFlush(cerbacAction);

        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();

        // Update the cerbacAction using partial update
        CerbacAction partialUpdatedCerbacAction = new CerbacAction();
        partialUpdatedCerbacAction.setId(cerbacAction.getId());

        partialUpdatedCerbacAction.name(UPDATED_NAME);

        restCerbacActionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacAction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacAction))
            )
            .andExpect(status().isOk());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
        CerbacAction testCerbacAction = cerbacActionList.get(cerbacActionList.size() - 1);
        assertThat(testCerbacAction.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();
        cerbacAction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacActionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacAction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();
        cerbacAction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacActionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacActionRepository.findAll().size();
        cerbacAction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacActionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cerbacAction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacAction in the database
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacAction() throws Exception {
        // Initialize the database
        cerbacActionRepository.saveAndFlush(cerbacAction);

        int databaseSizeBeforeDelete = cerbacActionRepository.findAll().size();

        // Delete the cerbacAction
        restCerbacActionMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacAction.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacAction> cerbacActionList = cerbacActionRepository.findAll();
        assertThat(cerbacActionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

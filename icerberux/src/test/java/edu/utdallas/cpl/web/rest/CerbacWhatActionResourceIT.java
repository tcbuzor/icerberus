package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacWhatAction;
import edu.utdallas.cpl.repository.CerbacWhatActionRepository;
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
 * Integration tests for the {@link CerbacWhatActionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CerbacWhatActionResourceIT {

    private static final String ENTITY_API_URL = "/api/cerbac-what-actions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacWhatActionRepository cerbacWhatActionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacWhatActionMockMvc;

    private CerbacWhatAction cerbacWhatAction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhatAction createEntity(EntityManager em) {
        CerbacWhatAction cerbacWhatAction = new CerbacWhatAction();
        return cerbacWhatAction;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacWhatAction createUpdatedEntity(EntityManager em) {
        CerbacWhatAction cerbacWhatAction = new CerbacWhatAction();
        return cerbacWhatAction;
    }

    @BeforeEach
    public void initTest() {
        cerbacWhatAction = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacWhatAction() throws Exception {
        int databaseSizeBeforeCreate = cerbacWhatActionRepository.findAll().size();
        // Create the CerbacWhatAction
        restCerbacWhatActionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhatAction))
            )
            .andExpect(status().isCreated());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacWhatAction testCerbacWhatAction = cerbacWhatActionList.get(cerbacWhatActionList.size() - 1);
    }

    @Test
    @Transactional
    void createCerbacWhatActionWithExistingId() throws Exception {
        // Create the CerbacWhatAction with an existing ID
        cerbacWhatAction.setId(1L);

        int databaseSizeBeforeCreate = cerbacWhatActionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacWhatActionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhatAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCerbacWhatActions() throws Exception {
        // Initialize the database
        cerbacWhatActionRepository.saveAndFlush(cerbacWhatAction);

        // Get all the cerbacWhatActionList
        restCerbacWhatActionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacWhatAction.getId().intValue())));
    }

    @Test
    @Transactional
    void getCerbacWhatAction() throws Exception {
        // Initialize the database
        cerbacWhatActionRepository.saveAndFlush(cerbacWhatAction);

        // Get the cerbacWhatAction
        restCerbacWhatActionMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacWhatAction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacWhatAction.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCerbacWhatAction() throws Exception {
        // Get the cerbacWhatAction
        restCerbacWhatActionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacWhatAction() throws Exception {
        // Initialize the database
        cerbacWhatActionRepository.saveAndFlush(cerbacWhatAction);

        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();

        // Update the cerbacWhatAction
        CerbacWhatAction updatedCerbacWhatAction = cerbacWhatActionRepository.findById(cerbacWhatAction.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacWhatAction are not directly saved in db
        em.detach(updatedCerbacWhatAction);

        restCerbacWhatActionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacWhatAction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacWhatAction))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhatAction testCerbacWhatAction = cerbacWhatActionList.get(cerbacWhatActionList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingCerbacWhatAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();
        cerbacWhatAction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhatActionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacWhatAction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacWhatAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();
        cerbacWhatAction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatActionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacWhatAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();
        cerbacWhatAction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatActionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacWhatAction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacWhatActionWithPatch() throws Exception {
        // Initialize the database
        cerbacWhatActionRepository.saveAndFlush(cerbacWhatAction);

        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();

        // Update the cerbacWhatAction using partial update
        CerbacWhatAction partialUpdatedCerbacWhatAction = new CerbacWhatAction();
        partialUpdatedCerbacWhatAction.setId(cerbacWhatAction.getId());

        restCerbacWhatActionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhatAction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhatAction))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhatAction testCerbacWhatAction = cerbacWhatActionList.get(cerbacWhatActionList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateCerbacWhatActionWithPatch() throws Exception {
        // Initialize the database
        cerbacWhatActionRepository.saveAndFlush(cerbacWhatAction);

        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();

        // Update the cerbacWhatAction using partial update
        CerbacWhatAction partialUpdatedCerbacWhatAction = new CerbacWhatAction();
        partialUpdatedCerbacWhatAction.setId(cerbacWhatAction.getId());

        restCerbacWhatActionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacWhatAction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacWhatAction))
            )
            .andExpect(status().isOk());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
        CerbacWhatAction testCerbacWhatAction = cerbacWhatActionList.get(cerbacWhatActionList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacWhatAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();
        cerbacWhatAction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacWhatActionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacWhatAction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacWhatAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();
        cerbacWhatAction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatActionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatAction))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacWhatAction() throws Exception {
        int databaseSizeBeforeUpdate = cerbacWhatActionRepository.findAll().size();
        cerbacWhatAction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacWhatActionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacWhatAction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacWhatAction in the database
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacWhatAction() throws Exception {
        // Initialize the database
        cerbacWhatActionRepository.saveAndFlush(cerbacWhatAction);

        int databaseSizeBeforeDelete = cerbacWhatActionRepository.findAll().size();

        // Delete the cerbacWhatAction
        restCerbacWhatActionMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacWhatAction.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacWhatAction> cerbacWhatActionList = cerbacWhatActionRepository.findAll();
        assertThat(cerbacWhatActionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

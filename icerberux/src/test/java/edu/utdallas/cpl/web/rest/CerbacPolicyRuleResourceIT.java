package edu.utdallas.cpl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import edu.utdallas.cpl.IntegrationTest;
import edu.utdallas.cpl.domain.CerbacAction;
import edu.utdallas.cpl.domain.CerbacPolicyRule;
import edu.utdallas.cpl.domain.CerbacType;
import edu.utdallas.cpl.domain.CerbacWhat;
import edu.utdallas.cpl.domain.CerbacWho;
import edu.utdallas.cpl.repository.CerbacPolicyRuleRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CerbacPolicyRuleResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CerbacPolicyRuleResourceIT {

    private static final String DEFAULT_SID = "AAAAAAAAAA";
    private static final String UPDATED_SID = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/cerbac-policy-rules";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CerbacPolicyRuleRepository cerbacPolicyRuleRepository;

    @Mock
    private CerbacPolicyRuleRepository cerbacPolicyRuleRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCerbacPolicyRuleMockMvc;

    private CerbacPolicyRule cerbacPolicyRule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacPolicyRule createEntity(EntityManager em) {
        CerbacPolicyRule cerbacPolicyRule = new CerbacPolicyRule().sid(DEFAULT_SID);
        // Add required entity
        CerbacWho cerbacWho;
        if (TestUtil.findAll(em, CerbacWho.class).isEmpty()) {
            cerbacWho = CerbacWhoResourceIT.createEntity(em);
            em.persist(cerbacWho);
            em.flush();
        } else {
            cerbacWho = TestUtil.findAll(em, CerbacWho.class).get(0);
        }
        cerbacPolicyRule.setWho(cerbacWho);
        // Add required entity
        CerbacWhat cerbacWhat;
        if (TestUtil.findAll(em, CerbacWhat.class).isEmpty()) {
            cerbacWhat = CerbacWhatResourceIT.createEntity(em);
            em.persist(cerbacWhat);
            em.flush();
        } else {
            cerbacWhat = TestUtil.findAll(em, CerbacWhat.class).get(0);
        }
        cerbacPolicyRule.setWhat(cerbacWhat);
        // Add required entity
        CerbacType cerbacType;
        if (TestUtil.findAll(em, CerbacType.class).isEmpty()) {
            cerbacType = CerbacTypeResourceIT.createEntity(em);
            em.persist(cerbacType);
            em.flush();
        } else {
            cerbacType = TestUtil.findAll(em, CerbacType.class).get(0);
        }
        cerbacPolicyRule.setType(cerbacType);
        // Add required entity
        CerbacAction cerbacAction;
        if (TestUtil.findAll(em, CerbacAction.class).isEmpty()) {
            cerbacAction = CerbacActionResourceIT.createEntity(em);
            em.persist(cerbacAction);
            em.flush();
        } else {
            cerbacAction = TestUtil.findAll(em, CerbacAction.class).get(0);
        }
        cerbacPolicyRule.getCerbacActions().add(cerbacAction);
        return cerbacPolicyRule;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CerbacPolicyRule createUpdatedEntity(EntityManager em) {
        CerbacPolicyRule cerbacPolicyRule = new CerbacPolicyRule().sid(UPDATED_SID);
        // Add required entity
        CerbacWho cerbacWho;
        if (TestUtil.findAll(em, CerbacWho.class).isEmpty()) {
            cerbacWho = CerbacWhoResourceIT.createUpdatedEntity(em);
            em.persist(cerbacWho);
            em.flush();
        } else {
            cerbacWho = TestUtil.findAll(em, CerbacWho.class).get(0);
        }
        cerbacPolicyRule.setWho(cerbacWho);
        // Add required entity
        CerbacWhat cerbacWhat;
        if (TestUtil.findAll(em, CerbacWhat.class).isEmpty()) {
            cerbacWhat = CerbacWhatResourceIT.createUpdatedEntity(em);
            em.persist(cerbacWhat);
            em.flush();
        } else {
            cerbacWhat = TestUtil.findAll(em, CerbacWhat.class).get(0);
        }
        cerbacPolicyRule.setWhat(cerbacWhat);
        // Add required entity
        CerbacType cerbacType;
        if (TestUtil.findAll(em, CerbacType.class).isEmpty()) {
            cerbacType = CerbacTypeResourceIT.createUpdatedEntity(em);
            em.persist(cerbacType);
            em.flush();
        } else {
            cerbacType = TestUtil.findAll(em, CerbacType.class).get(0);
        }
        cerbacPolicyRule.setType(cerbacType);
        // Add required entity
        CerbacAction cerbacAction;
        if (TestUtil.findAll(em, CerbacAction.class).isEmpty()) {
            cerbacAction = CerbacActionResourceIT.createUpdatedEntity(em);
            em.persist(cerbacAction);
            em.flush();
        } else {
            cerbacAction = TestUtil.findAll(em, CerbacAction.class).get(0);
        }
        cerbacPolicyRule.getCerbacActions().add(cerbacAction);
        return cerbacPolicyRule;
    }

    @BeforeEach
    public void initTest() {
        cerbacPolicyRule = createEntity(em);
    }

    @Test
    @Transactional
    void createCerbacPolicyRule() throws Exception {
        int databaseSizeBeforeCreate = cerbacPolicyRuleRepository.findAll().size();
        // Create the CerbacPolicyRule
        restCerbacPolicyRuleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isCreated());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeCreate + 1);
        CerbacPolicyRule testCerbacPolicyRule = cerbacPolicyRuleList.get(cerbacPolicyRuleList.size() - 1);
        assertThat(testCerbacPolicyRule.getSid()).isEqualTo(DEFAULT_SID);
    }

    @Test
    @Transactional
    void createCerbacPolicyRuleWithExistingId() throws Exception {
        // Create the CerbacPolicyRule with an existing ID
        cerbacPolicyRule.setId(1L);

        int databaseSizeBeforeCreate = cerbacPolicyRuleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCerbacPolicyRuleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkSidIsRequired() throws Exception {
        int databaseSizeBeforeTest = cerbacPolicyRuleRepository.findAll().size();
        // set the field null
        cerbacPolicyRule.setSid(null);

        // Create the CerbacPolicyRule, which fails.

        restCerbacPolicyRuleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isBadRequest());

        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCerbacPolicyRules() throws Exception {
        // Initialize the database
        cerbacPolicyRuleRepository.saveAndFlush(cerbacPolicyRule);

        // Get all the cerbacPolicyRuleList
        restCerbacPolicyRuleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cerbacPolicyRule.getId().intValue())))
            .andExpect(jsonPath("$.[*].sid").value(hasItem(DEFAULT_SID)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCerbacPolicyRulesWithEagerRelationshipsIsEnabled() throws Exception {
        when(cerbacPolicyRuleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCerbacPolicyRuleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(cerbacPolicyRuleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCerbacPolicyRulesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(cerbacPolicyRuleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCerbacPolicyRuleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(cerbacPolicyRuleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getCerbacPolicyRule() throws Exception {
        // Initialize the database
        cerbacPolicyRuleRepository.saveAndFlush(cerbacPolicyRule);

        // Get the cerbacPolicyRule
        restCerbacPolicyRuleMockMvc
            .perform(get(ENTITY_API_URL_ID, cerbacPolicyRule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cerbacPolicyRule.getId().intValue()))
            .andExpect(jsonPath("$.sid").value(DEFAULT_SID));
    }

    @Test
    @Transactional
    void getNonExistingCerbacPolicyRule() throws Exception {
        // Get the cerbacPolicyRule
        restCerbacPolicyRuleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCerbacPolicyRule() throws Exception {
        // Initialize the database
        cerbacPolicyRuleRepository.saveAndFlush(cerbacPolicyRule);

        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();

        // Update the cerbacPolicyRule
        CerbacPolicyRule updatedCerbacPolicyRule = cerbacPolicyRuleRepository.findById(cerbacPolicyRule.getId()).get();
        // Disconnect from session so that the updates on updatedCerbacPolicyRule are not directly saved in db
        em.detach(updatedCerbacPolicyRule);
        updatedCerbacPolicyRule.sid(UPDATED_SID);

        restCerbacPolicyRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCerbacPolicyRule.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCerbacPolicyRule))
            )
            .andExpect(status().isOk());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
        CerbacPolicyRule testCerbacPolicyRule = cerbacPolicyRuleList.get(cerbacPolicyRuleList.size() - 1);
        assertThat(testCerbacPolicyRule.getSid()).isEqualTo(UPDATED_SID);
    }

    @Test
    @Transactional
    void putNonExistingCerbacPolicyRule() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();
        cerbacPolicyRule.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacPolicyRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cerbacPolicyRule.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCerbacPolicyRule() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();
        cerbacPolicyRule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacPolicyRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCerbacPolicyRule() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();
        cerbacPolicyRule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacPolicyRuleMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCerbacPolicyRuleWithPatch() throws Exception {
        // Initialize the database
        cerbacPolicyRuleRepository.saveAndFlush(cerbacPolicyRule);

        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();

        // Update the cerbacPolicyRule using partial update
        CerbacPolicyRule partialUpdatedCerbacPolicyRule = new CerbacPolicyRule();
        partialUpdatedCerbacPolicyRule.setId(cerbacPolicyRule.getId());

        restCerbacPolicyRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacPolicyRule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacPolicyRule))
            )
            .andExpect(status().isOk());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
        CerbacPolicyRule testCerbacPolicyRule = cerbacPolicyRuleList.get(cerbacPolicyRuleList.size() - 1);
        assertThat(testCerbacPolicyRule.getSid()).isEqualTo(DEFAULT_SID);
    }

    @Test
    @Transactional
    void fullUpdateCerbacPolicyRuleWithPatch() throws Exception {
        // Initialize the database
        cerbacPolicyRuleRepository.saveAndFlush(cerbacPolicyRule);

        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();

        // Update the cerbacPolicyRule using partial update
        CerbacPolicyRule partialUpdatedCerbacPolicyRule = new CerbacPolicyRule();
        partialUpdatedCerbacPolicyRule.setId(cerbacPolicyRule.getId());

        partialUpdatedCerbacPolicyRule.sid(UPDATED_SID);

        restCerbacPolicyRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCerbacPolicyRule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCerbacPolicyRule))
            )
            .andExpect(status().isOk());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
        CerbacPolicyRule testCerbacPolicyRule = cerbacPolicyRuleList.get(cerbacPolicyRuleList.size() - 1);
        assertThat(testCerbacPolicyRule.getSid()).isEqualTo(UPDATED_SID);
    }

    @Test
    @Transactional
    void patchNonExistingCerbacPolicyRule() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();
        cerbacPolicyRule.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCerbacPolicyRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cerbacPolicyRule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCerbacPolicyRule() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();
        cerbacPolicyRule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacPolicyRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isBadRequest());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCerbacPolicyRule() throws Exception {
        int databaseSizeBeforeUpdate = cerbacPolicyRuleRepository.findAll().size();
        cerbacPolicyRule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCerbacPolicyRuleMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cerbacPolicyRule))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CerbacPolicyRule in the database
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCerbacPolicyRule() throws Exception {
        // Initialize the database
        cerbacPolicyRuleRepository.saveAndFlush(cerbacPolicyRule);

        int databaseSizeBeforeDelete = cerbacPolicyRuleRepository.findAll().size();

        // Delete the cerbacPolicyRule
        restCerbacPolicyRuleMockMvc
            .perform(delete(ENTITY_API_URL_ID, cerbacPolicyRule.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CerbacPolicyRule> cerbacPolicyRuleList = cerbacPolicyRuleRepository.findAll();
        assertThat(cerbacPolicyRuleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

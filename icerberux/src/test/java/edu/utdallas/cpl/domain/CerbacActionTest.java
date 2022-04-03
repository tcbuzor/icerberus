package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacActionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacAction.class);
        CerbacAction cerbacAction1 = new CerbacAction();
        cerbacAction1.setId(1L);
        CerbacAction cerbacAction2 = new CerbacAction();
        cerbacAction2.setId(cerbacAction1.getId());
        assertThat(cerbacAction1).isEqualTo(cerbacAction2);
        cerbacAction2.setId(2L);
        assertThat(cerbacAction1).isNotEqualTo(cerbacAction2);
        cerbacAction1.setId(null);
        assertThat(cerbacAction1).isNotEqualTo(cerbacAction2);
    }
}

package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWho.class);
        CerbacWho cerbacWho1 = new CerbacWho();
        cerbacWho1.setId(1L);
        CerbacWho cerbacWho2 = new CerbacWho();
        cerbacWho2.setId(cerbacWho1.getId());
        assertThat(cerbacWho1).isEqualTo(cerbacWho2);
        cerbacWho2.setId(2L);
        assertThat(cerbacWho1).isNotEqualTo(cerbacWho2);
        cerbacWho1.setId(null);
        assertThat(cerbacWho1).isNotEqualTo(cerbacWho2);
    }
}

package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacPolicyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacPolicy.class);
        CerbacPolicy cerbacPolicy1 = new CerbacPolicy();
        cerbacPolicy1.setId(1L);
        CerbacPolicy cerbacPolicy2 = new CerbacPolicy();
        cerbacPolicy2.setId(cerbacPolicy1.getId());
        assertThat(cerbacPolicy1).isEqualTo(cerbacPolicy2);
        cerbacPolicy2.setId(2L);
        assertThat(cerbacPolicy1).isNotEqualTo(cerbacPolicy2);
        cerbacPolicy1.setId(null);
        assertThat(cerbacPolicy1).isNotEqualTo(cerbacPolicy2);
    }
}

package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacPolicyRuleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacPolicyRule.class);
        CerbacPolicyRule cerbacPolicyRule1 = new CerbacPolicyRule();
        cerbacPolicyRule1.setId(1L);
        CerbacPolicyRule cerbacPolicyRule2 = new CerbacPolicyRule();
        cerbacPolicyRule2.setId(cerbacPolicyRule1.getId());
        assertThat(cerbacPolicyRule1).isEqualTo(cerbacPolicyRule2);
        cerbacPolicyRule2.setId(2L);
        assertThat(cerbacPolicyRule1).isNotEqualTo(cerbacPolicyRule2);
        cerbacPolicyRule1.setId(null);
        assertThat(cerbacPolicyRule1).isNotEqualTo(cerbacPolicyRule2);
    }
}

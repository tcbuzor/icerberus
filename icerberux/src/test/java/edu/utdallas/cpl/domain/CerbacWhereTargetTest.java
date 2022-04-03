package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhereTargetTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhereTarget.class);
        CerbacWhereTarget cerbacWhereTarget1 = new CerbacWhereTarget();
        cerbacWhereTarget1.setId(1L);
        CerbacWhereTarget cerbacWhereTarget2 = new CerbacWhereTarget();
        cerbacWhereTarget2.setId(cerbacWhereTarget1.getId());
        assertThat(cerbacWhereTarget1).isEqualTo(cerbacWhereTarget2);
        cerbacWhereTarget2.setId(2L);
        assertThat(cerbacWhereTarget1).isNotEqualTo(cerbacWhereTarget2);
        cerbacWhereTarget1.setId(null);
        assertThat(cerbacWhereTarget1).isNotEqualTo(cerbacWhereTarget2);
    }
}

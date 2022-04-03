package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhereOriginTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhereOrigin.class);
        CerbacWhereOrigin cerbacWhereOrigin1 = new CerbacWhereOrigin();
        cerbacWhereOrigin1.setId(1L);
        CerbacWhereOrigin cerbacWhereOrigin2 = new CerbacWhereOrigin();
        cerbacWhereOrigin2.setId(cerbacWhereOrigin1.getId());
        assertThat(cerbacWhereOrigin1).isEqualTo(cerbacWhereOrigin2);
        cerbacWhereOrigin2.setId(2L);
        assertThat(cerbacWhereOrigin1).isNotEqualTo(cerbacWhereOrigin2);
        cerbacWhereOrigin1.setId(null);
        assertThat(cerbacWhereOrigin1).isNotEqualTo(cerbacWhereOrigin2);
    }
}

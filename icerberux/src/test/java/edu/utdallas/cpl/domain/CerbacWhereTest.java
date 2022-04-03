package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhereTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhere.class);
        CerbacWhere cerbacWhere1 = new CerbacWhere();
        cerbacWhere1.setId(1L);
        CerbacWhere cerbacWhere2 = new CerbacWhere();
        cerbacWhere2.setId(cerbacWhere1.getId());
        assertThat(cerbacWhere1).isEqualTo(cerbacWhere2);
        cerbacWhere2.setId(2L);
        assertThat(cerbacWhere1).isNotEqualTo(cerbacWhere2);
        cerbacWhere1.setId(null);
        assertThat(cerbacWhere1).isNotEqualTo(cerbacWhere2);
    }
}

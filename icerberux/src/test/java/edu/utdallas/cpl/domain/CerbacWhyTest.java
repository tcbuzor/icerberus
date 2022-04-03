package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhy.class);
        CerbacWhy cerbacWhy1 = new CerbacWhy();
        cerbacWhy1.setId(1L);
        CerbacWhy cerbacWhy2 = new CerbacWhy();
        cerbacWhy2.setId(cerbacWhy1.getId());
        assertThat(cerbacWhy1).isEqualTo(cerbacWhy2);
        cerbacWhy2.setId(2L);
        assertThat(cerbacWhy1).isNotEqualTo(cerbacWhy2);
        cerbacWhy1.setId(null);
        assertThat(cerbacWhy1).isNotEqualTo(cerbacWhy2);
    }
}

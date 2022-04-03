package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhenTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhen.class);
        CerbacWhen cerbacWhen1 = new CerbacWhen();
        cerbacWhen1.setId(1L);
        CerbacWhen cerbacWhen2 = new CerbacWhen();
        cerbacWhen2.setId(cerbacWhen1.getId());
        assertThat(cerbacWhen1).isEqualTo(cerbacWhen2);
        cerbacWhen2.setId(2L);
        assertThat(cerbacWhen1).isNotEqualTo(cerbacWhen2);
        cerbacWhen1.setId(null);
        assertThat(cerbacWhen1).isNotEqualTo(cerbacWhen2);
    }
}

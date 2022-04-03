package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacType.class);
        CerbacType cerbacType1 = new CerbacType();
        cerbacType1.setId(1L);
        CerbacType cerbacType2 = new CerbacType();
        cerbacType2.setId(cerbacType1.getId());
        assertThat(cerbacType1).isEqualTo(cerbacType2);
        cerbacType2.setId(2L);
        assertThat(cerbacType1).isNotEqualTo(cerbacType2);
        cerbacType1.setId(null);
        assertThat(cerbacType1).isNotEqualTo(cerbacType2);
    }
}

package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacHowTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacHow.class);
        CerbacHow cerbacHow1 = new CerbacHow();
        cerbacHow1.setId(1L);
        CerbacHow cerbacHow2 = new CerbacHow();
        cerbacHow2.setId(cerbacHow1.getId());
        assertThat(cerbacHow1).isEqualTo(cerbacHow2);
        cerbacHow2.setId(2L);
        assertThat(cerbacHow1).isNotEqualTo(cerbacHow2);
        cerbacHow1.setId(null);
        assertThat(cerbacHow1).isNotEqualTo(cerbacHow2);
    }
}

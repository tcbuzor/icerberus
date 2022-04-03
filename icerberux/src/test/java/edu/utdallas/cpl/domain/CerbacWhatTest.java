package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhatTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhat.class);
        CerbacWhat cerbacWhat1 = new CerbacWhat();
        cerbacWhat1.setId(1L);
        CerbacWhat cerbacWhat2 = new CerbacWhat();
        cerbacWhat2.setId(cerbacWhat1.getId());
        assertThat(cerbacWhat1).isEqualTo(cerbacWhat2);
        cerbacWhat2.setId(2L);
        assertThat(cerbacWhat1).isNotEqualTo(cerbacWhat2);
        cerbacWhat1.setId(null);
        assertThat(cerbacWhat1).isNotEqualTo(cerbacWhat2);
    }
}

package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacEntityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacEntity.class);
        CerbacEntity cerbacEntity1 = new CerbacEntity();
        cerbacEntity1.setId(1L);
        CerbacEntity cerbacEntity2 = new CerbacEntity();
        cerbacEntity2.setId(cerbacEntity1.getId());
        assertThat(cerbacEntity1).isEqualTo(cerbacEntity2);
        cerbacEntity2.setId(2L);
        assertThat(cerbacEntity1).isNotEqualTo(cerbacEntity2);
        cerbacEntity1.setId(null);
        assertThat(cerbacEntity1).isNotEqualTo(cerbacEntity2);
    }
}

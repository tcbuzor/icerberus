package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacEntityPropTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacEntityProp.class);
        CerbacEntityProp cerbacEntityProp1 = new CerbacEntityProp();
        cerbacEntityProp1.setId(1L);
        CerbacEntityProp cerbacEntityProp2 = new CerbacEntityProp();
        cerbacEntityProp2.setId(cerbacEntityProp1.getId());
        assertThat(cerbacEntityProp1).isEqualTo(cerbacEntityProp2);
        cerbacEntityProp2.setId(2L);
        assertThat(cerbacEntityProp1).isNotEqualTo(cerbacEntityProp2);
        cerbacEntityProp1.setId(null);
        assertThat(cerbacEntityProp1).isNotEqualTo(cerbacEntityProp2);
    }
}

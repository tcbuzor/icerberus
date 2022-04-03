package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhoPropTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhoProp.class);
        CerbacWhoProp cerbacWhoProp1 = new CerbacWhoProp();
        cerbacWhoProp1.setId(1L);
        CerbacWhoProp cerbacWhoProp2 = new CerbacWhoProp();
        cerbacWhoProp2.setId(cerbacWhoProp1.getId());
        assertThat(cerbacWhoProp1).isEqualTo(cerbacWhoProp2);
        cerbacWhoProp2.setId(2L);
        assertThat(cerbacWhoProp1).isNotEqualTo(cerbacWhoProp2);
        cerbacWhoProp1.setId(null);
        assertThat(cerbacWhoProp1).isNotEqualTo(cerbacWhoProp2);
    }
}

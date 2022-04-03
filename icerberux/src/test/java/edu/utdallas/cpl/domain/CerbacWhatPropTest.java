package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhatPropTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhatProp.class);
        CerbacWhatProp cerbacWhatProp1 = new CerbacWhatProp();
        cerbacWhatProp1.setId(1L);
        CerbacWhatProp cerbacWhatProp2 = new CerbacWhatProp();
        cerbacWhatProp2.setId(cerbacWhatProp1.getId());
        assertThat(cerbacWhatProp1).isEqualTo(cerbacWhatProp2);
        cerbacWhatProp2.setId(2L);
        assertThat(cerbacWhatProp1).isNotEqualTo(cerbacWhatProp2);
        cerbacWhatProp1.setId(null);
        assertThat(cerbacWhatProp1).isNotEqualTo(cerbacWhatProp2);
    }
}

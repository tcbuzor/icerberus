package edu.utdallas.cpl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import edu.utdallas.cpl.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CerbacWhatActionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CerbacWhatAction.class);
        CerbacWhatAction cerbacWhatAction1 = new CerbacWhatAction();
        cerbacWhatAction1.setId(1L);
        CerbacWhatAction cerbacWhatAction2 = new CerbacWhatAction();
        cerbacWhatAction2.setId(cerbacWhatAction1.getId());
        assertThat(cerbacWhatAction1).isEqualTo(cerbacWhatAction2);
        cerbacWhatAction2.setId(2L);
        assertThat(cerbacWhatAction1).isNotEqualTo(cerbacWhatAction2);
        cerbacWhatAction1.setId(null);
        assertThat(cerbacWhatAction1).isNotEqualTo(cerbacWhatAction2);
    }
}

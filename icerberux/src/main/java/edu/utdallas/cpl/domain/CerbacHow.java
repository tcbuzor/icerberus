package edu.utdallas.cpl.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CerbacHow.
 */
@Entity
@Table(name = "cerbac_how")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacHow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "how", nullable = false)
    private String how;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacHow id(Long id) {
        this.id = id;
        return this;
    }

    public String getHow() {
        return this.how;
    }

    public CerbacHow how(String how) {
        this.how = how;
        return this;
    }

    public void setHow(String how) {
        this.how = how;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacHow)) {
            return false;
        }
        return id != null && id.equals(((CerbacHow) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacHow{" +
            "id=" + getId() +
            ", how='" + getHow() + "'" +
            "}";
    }
}

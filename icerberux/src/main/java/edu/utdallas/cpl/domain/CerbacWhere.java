package edu.utdallas.cpl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CerbacWhere.
 */
@Entity
@Table(name = "cerbac_where")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacWhere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "wheres" }, allowSetters = true)
    private CerbacWhereOrigin origin;

    @ManyToOne
    @JsonIgnoreProperties(value = { "wheres" }, allowSetters = true)
    private CerbacWhereTarget target;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacWhere id(Long id) {
        this.id = id;
        return this;
    }

    public CerbacWhereOrigin getOrigin() {
        return this.origin;
    }

    public CerbacWhere origin(CerbacWhereOrigin cerbacWhereOrigin) {
        this.setOrigin(cerbacWhereOrigin);
        return this;
    }

    public void setOrigin(CerbacWhereOrigin cerbacWhereOrigin) {
        this.origin = cerbacWhereOrigin;
    }

    public CerbacWhereTarget getTarget() {
        return this.target;
    }

    public CerbacWhere target(CerbacWhereTarget cerbacWhereTarget) {
        this.setTarget(cerbacWhereTarget);
        return this;
    }

    public void setTarget(CerbacWhereTarget cerbacWhereTarget) {
        this.target = cerbacWhereTarget;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacWhere)) {
            return false;
        }
        return id != null && id.equals(((CerbacWhere) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacWhere{" +
            "id=" + getId() +
            "}";
    }
}

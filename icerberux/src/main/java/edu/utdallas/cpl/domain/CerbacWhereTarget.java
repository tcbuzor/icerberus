package edu.utdallas.cpl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CerbacWhereTarget.
 */
@Entity
@Table(name = "cerbac_where_target")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacWhereTarget implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "value", nullable = false)
    private String value;

    @OneToMany(mappedBy = "target")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "origin", "target" }, allowSetters = true)
    private Set<CerbacWhere> wheres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacWhereTarget id(Long id) {
        this.id = id;
        return this;
    }

    public String getValue() {
        return this.value;
    }

    public CerbacWhereTarget value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Set<CerbacWhere> getWheres() {
        return this.wheres;
    }

    public CerbacWhereTarget wheres(Set<CerbacWhere> cerbacWheres) {
        this.setWheres(cerbacWheres);
        return this;
    }

    public CerbacWhereTarget addWhere(CerbacWhere cerbacWhere) {
        this.wheres.add(cerbacWhere);
        cerbacWhere.setTarget(this);
        return this;
    }

    public CerbacWhereTarget removeWhere(CerbacWhere cerbacWhere) {
        this.wheres.remove(cerbacWhere);
        cerbacWhere.setTarget(null);
        return this;
    }

    public void setWheres(Set<CerbacWhere> cerbacWheres) {
        if (this.wheres != null) {
            this.wheres.forEach(i -> i.setTarget(null));
        }
        if (cerbacWheres != null) {
            cerbacWheres.forEach(i -> i.setTarget(this));
        }
        this.wheres = cerbacWheres;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacWhereTarget)) {
            return false;
        }
        return id != null && id.equals(((CerbacWhereTarget) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacWhereTarget{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}

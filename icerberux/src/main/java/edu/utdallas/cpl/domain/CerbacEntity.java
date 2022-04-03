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
 * A CerbacEntity.
 */
@Entity
@Table(name = "cerbac_entity")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "cerbacEntity")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cerbacEntity" }, allowSetters = true)
    private Set<CerbacEntityProp> properties = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacEntity id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public CerbacEntity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CerbacEntityProp> getProperties() {
        return this.properties;
    }

    public CerbacEntity properties(Set<CerbacEntityProp> cerbacEntityProps) {
        this.setProperties(cerbacEntityProps);
        return this;
    }

    public CerbacEntity addProperty(CerbacEntityProp cerbacEntityProp) {
        this.properties.add(cerbacEntityProp);
        cerbacEntityProp.setCerbacEntity(this);
        return this;
    }

    public CerbacEntity removeProperty(CerbacEntityProp cerbacEntityProp) {
        this.properties.remove(cerbacEntityProp);
        cerbacEntityProp.setCerbacEntity(null);
        return this;
    }

    public void setProperties(Set<CerbacEntityProp> cerbacEntityProps) {
        if (this.properties != null) {
            this.properties.forEach(i -> i.setCerbacEntity(null));
        }
        if (cerbacEntityProps != null) {
            cerbacEntityProps.forEach(i -> i.setCerbacEntity(this));
        }
        this.properties = cerbacEntityProps;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacEntity)) {
            return false;
        }
        return id != null && id.equals(((CerbacEntity) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacEntity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

package edu.utdallas.cpl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CerbacEntityProp.
 */
@Entity
@Table(name = "cerbac_entity_prop")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacEntityProp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "prop_name", nullable = false, unique = true)
    private String propName;

    @ManyToOne
    @JsonIgnoreProperties(value = { "properties" }, allowSetters = true)
    private CerbacEntity cerbacEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacEntityProp id(Long id) {
        this.id = id;
        return this;
    }

    public String getPropName() {
        return this.propName;
    }

    public CerbacEntityProp propName(String propName) {
        this.propName = propName;
        return this;
    }

    public void setPropName(String propName) {
        this.propName = propName;
    }

    public CerbacEntity getCerbacEntity() {
        return this.cerbacEntity;
    }

    public CerbacEntityProp cerbacEntity(CerbacEntity cerbacEntity) {
        this.setCerbacEntity(cerbacEntity);
        return this;
    }

    public void setCerbacEntity(CerbacEntity cerbacEntity) {
        this.cerbacEntity = cerbacEntity;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacEntityProp)) {
            return false;
        }
        return id != null && id.equals(((CerbacEntityProp) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacEntityProp{" +
            "id=" + getId() +
            ", propName='" + getPropName() + "'" +
            "}";
    }
}

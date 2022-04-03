package edu.utdallas.cpl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CerbacWho.
 */
@Entity
@Table(name = "cerbac_who")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacWho implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @JsonIgnoreProperties(value = { "properties" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private CerbacEntity cerbacEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacWho id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public CerbacWho name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CerbacEntity getCerbacEntity() {
        return this.cerbacEntity;
    }

    public CerbacWho cerbacEntity(CerbacEntity cerbacEntity) {
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
        if (!(o instanceof CerbacWho)) {
            return false;
        }
        return id != null && id.equals(((CerbacWho) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacWho{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

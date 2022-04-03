package edu.utdallas.cpl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CerbacWhatAction.
 */
@Entity
@Table(name = "cerbac_what_action")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacWhatAction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cerbacEntity" }, allowSetters = true)
    private CerbacWhat cebacWhat;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cerbacPolicyRules" }, allowSetters = true)
    private CerbacAction cebacAction;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacWhatAction id(Long id) {
        this.id = id;
        return this;
    }

    public CerbacWhat getCebacWhat() {
        return this.cebacWhat;
    }

    public CerbacWhatAction cebacWhat(CerbacWhat cerbacWhat) {
        this.setCebacWhat(cerbacWhat);
        return this;
    }

    public void setCebacWhat(CerbacWhat cerbacWhat) {
        this.cebacWhat = cerbacWhat;
    }

    public CerbacAction getCebacAction() {
        return this.cebacAction;
    }

    public CerbacWhatAction cebacAction(CerbacAction cerbacAction) {
        this.setCebacAction(cerbacAction);
        return this;
    }

    public void setCebacAction(CerbacAction cerbacAction) {
        this.cebacAction = cerbacAction;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacWhatAction)) {
            return false;
        }
        return id != null && id.equals(((CerbacWhatAction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacWhatAction{" +
            "id=" + getId() +
            "}";
    }
}

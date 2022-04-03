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
 * A CerbacAction.
 */
@Entity
@Table(name = "cerbac_action")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacAction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "cerbacActions")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = {
            "where", "when", "how", "why", "whoProperties", "whatProperties", "who", "what", "type", "cerbacActions", "cerbacPolicy",
        },
        allowSetters = true
    )
    private Set<CerbacPolicyRule> cerbacPolicyRules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacAction id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public CerbacAction name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CerbacPolicyRule> getCerbacPolicyRules() {
        return this.cerbacPolicyRules;
    }

    public CerbacAction cerbacPolicyRules(Set<CerbacPolicyRule> cerbacPolicyRules) {
        this.setCerbacPolicyRules(cerbacPolicyRules);
        return this;
    }

    public CerbacAction addCerbacPolicyRule(CerbacPolicyRule cerbacPolicyRule) {
        this.cerbacPolicyRules.add(cerbacPolicyRule);
        cerbacPolicyRule.getCerbacActions().add(this);
        return this;
    }

    public CerbacAction removeCerbacPolicyRule(CerbacPolicyRule cerbacPolicyRule) {
        this.cerbacPolicyRules.remove(cerbacPolicyRule);
        cerbacPolicyRule.getCerbacActions().remove(this);
        return this;
    }

    public void setCerbacPolicyRules(Set<CerbacPolicyRule> cerbacPolicyRules) {
        if (this.cerbacPolicyRules != null) {
            this.cerbacPolicyRules.forEach(i -> i.removeCerbacAction(this));
        }
        if (cerbacPolicyRules != null) {
            cerbacPolicyRules.forEach(i -> i.addCerbacAction(this));
        }
        this.cerbacPolicyRules = cerbacPolicyRules;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacAction)) {
            return false;
        }
        return id != null && id.equals(((CerbacAction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacAction{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}

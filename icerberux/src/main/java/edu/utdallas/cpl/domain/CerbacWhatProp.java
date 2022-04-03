package edu.utdallas.cpl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.utdallas.cpl.domain.enumeration.ConditionEnum;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CerbacWhatProp.
 */
@Entity
@Table(name = "cerbac_what_prop")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacWhatProp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "value", nullable = false)
    private String value;

    @Enumerated(EnumType.STRING)
    @Column(name = "condition")
    private ConditionEnum condition;

    @JsonIgnoreProperties(value = { "cerbacEntity" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private CerbacEntityProp entityProperty;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "where", "when", "how", "why", "whoProperties", "whatProperties", "who", "what", "type", "cerbacActions", "cerbacPolicy",
        },
        allowSetters = true
    )
    private CerbacPolicyRule policyRule;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacWhatProp id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public CerbacWhatProp name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return this.value;
    }

    public CerbacWhatProp value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public ConditionEnum getCondition() {
        return this.condition;
    }

    public CerbacWhatProp condition(ConditionEnum condition) {
        this.condition = condition;
        return this;
    }

    public void setCondition(ConditionEnum condition) {
        this.condition = condition;
    }

    public CerbacEntityProp getEntityProperty() {
        return this.entityProperty;
    }

    public CerbacWhatProp entityProperty(CerbacEntityProp cerbacEntityProp) {
        this.setEntityProperty(cerbacEntityProp);
        return this;
    }

    public void setEntityProperty(CerbacEntityProp cerbacEntityProp) {
        this.entityProperty = cerbacEntityProp;
    }

    public CerbacPolicyRule getPolicyRule() {
        return this.policyRule;
    }

    public CerbacWhatProp policyRule(CerbacPolicyRule cerbacPolicyRule) {
        this.setPolicyRule(cerbacPolicyRule);
        return this;
    }

    public void setPolicyRule(CerbacPolicyRule cerbacPolicyRule) {
        this.policyRule = cerbacPolicyRule;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacWhatProp)) {
            return false;
        }
        return id != null && id.equals(((CerbacWhatProp) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacWhatProp{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", value='" + getValue() + "'" +
            ", condition='" + getCondition() + "'" +
            "}";
    }
}

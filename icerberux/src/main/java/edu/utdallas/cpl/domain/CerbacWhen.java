package edu.utdallas.cpl.domain;

import edu.utdallas.cpl.domain.enumeration.ConditionEnum;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CerbacWhen.
 */
@Entity
@Table(name = "cerbac_when")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacWhen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "when_condition")
    private ConditionEnum whenCondition;

    @NotNull
    @Column(name = "value", nullable = false)
    private String value;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacWhen id(Long id) {
        this.id = id;
        return this;
    }

    public ConditionEnum getWhenCondition() {
        return this.whenCondition;
    }

    public CerbacWhen whenCondition(ConditionEnum whenCondition) {
        this.whenCondition = whenCondition;
        return this;
    }

    public void setWhenCondition(ConditionEnum whenCondition) {
        this.whenCondition = whenCondition;
    }

    public String getValue() {
        return this.value;
    }

    public CerbacWhen value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacWhen)) {
            return false;
        }
        return id != null && id.equals(((CerbacWhen) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacWhen{" +
            "id=" + getId() +
            ", whenCondition='" + getWhenCondition() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}

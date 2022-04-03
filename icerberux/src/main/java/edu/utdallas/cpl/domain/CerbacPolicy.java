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
 * A CerbacPolicy.
 */
@Entity
@Table(name = "cerbac_policy")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacPolicy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "pid", nullable = false, unique = true)
    private String pid;

    @Column(name = "priority")
    private Integer priority;

    @OneToMany(mappedBy = "cerbacPolicy")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = {
            "where", "when", "how", "why", "whoProperties", "whatProperties", "who", "what", "type", "cerbacActions", "cerbacPolicy",
        },
        allowSetters = true
    )
    private Set<CerbacPolicyRule> policyRules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CerbacPolicy id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPid() {
        return this.pid;
    }

    public CerbacPolicy pid(String pid) {
        this.setPid(pid);
        return this;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public Integer getPriority() {
        return this.priority;
    }

    public CerbacPolicy priority(Integer priority) {
        this.setPriority(priority);
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Set<CerbacPolicyRule> getPolicyRules() {
        return this.policyRules;
    }

    public void setPolicyRules(Set<CerbacPolicyRule> cerbacPolicyRules) {
        if (this.policyRules != null) {
            this.policyRules.forEach(i -> i.setCerbacPolicy(null));
        }
        if (cerbacPolicyRules != null) {
            cerbacPolicyRules.forEach(i -> i.setCerbacPolicy(this));
        }
        this.policyRules = cerbacPolicyRules;
    }

    public CerbacPolicy policyRules(Set<CerbacPolicyRule> cerbacPolicyRules) {
        this.setPolicyRules(cerbacPolicyRules);
        return this;
    }

    public CerbacPolicy addPolicyRule(CerbacPolicyRule cerbacPolicyRule) {
        this.policyRules.add(cerbacPolicyRule);
        cerbacPolicyRule.setCerbacPolicy(this);
        return this;
    }

    public CerbacPolicy removePolicyRule(CerbacPolicyRule cerbacPolicyRule) {
        this.policyRules.remove(cerbacPolicyRule);
        cerbacPolicyRule.setCerbacPolicy(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacPolicy)) {
            return false;
        }
        return id != null && id.equals(((CerbacPolicy) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacPolicy{" +
            "id=" + getId() +
            ", pid='" + getPid() + "'" +
            ", priority=" + getPriority() +
            "}";
    }
}

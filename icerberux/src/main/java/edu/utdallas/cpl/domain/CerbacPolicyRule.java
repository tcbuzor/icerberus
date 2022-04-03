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
 * A CerbacPolicyRule.
 */
@Entity
@Table(name = "cerbac_policy_rule")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CerbacPolicyRule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sid", nullable = false, unique = true)
    private String sid;

    @JsonIgnoreProperties(value = { "origin", "target" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private CerbacWhere where;

    @OneToOne
    @JoinColumn(unique = true)
    private CerbacWhen when;

    @OneToOne
    @JoinColumn(unique = true)
    private CerbacHow how;

    @OneToOne
    @JoinColumn(unique = true)
    private CerbacWhy why;

    @OneToMany(mappedBy = "policyRule")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "entityProperty", "policyRule" }, allowSetters = true)
    private Set<CerbacWhoProp> whoProperties = new HashSet<>();

    @OneToMany(mappedBy = "policyRule")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "entityProperty", "policyRule" }, allowSetters = true)
    private Set<CerbacWhatProp> whatProperties = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "cerbacEntity" }, allowSetters = true)
    private CerbacWho who;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "cerbacEntity" }, allowSetters = true)
    private CerbacWhat what;

    @ManyToOne(optional = false)
    @NotNull
    private CerbacType type;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @NotNull
    @JoinTable(
        name = "rel_cerbac_policy_rule__cerbac_action",
        joinColumns = @JoinColumn(name = "cerbac_policy_rule_id"),
        inverseJoinColumns = @JoinColumn(name = "cerbac_action_id")
    )
    @JsonIgnoreProperties(value = { "cerbacPolicyRules" }, allowSetters = true)
    private Set<CerbacAction> cerbacActions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "policyRules" }, allowSetters = true)
    private CerbacPolicy cerbacPolicy;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CerbacPolicyRule id(Long id) {
        this.id = id;
        return this;
    }

    public String getSid() {
        return this.sid;
    }

    public CerbacPolicyRule sid(String sid) {
        this.sid = sid;
        return this;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public CerbacWhere getWhere() {
        return this.where;
    }

    public CerbacPolicyRule where(CerbacWhere cerbacWhere) {
        this.setWhere(cerbacWhere);
        return this;
    }

    public void setWhere(CerbacWhere cerbacWhere) {
        this.where = cerbacWhere;
    }

    public CerbacWhen getWhen() {
        return this.when;
    }

    public CerbacPolicyRule when(CerbacWhen cerbacWhen) {
        this.setWhen(cerbacWhen);
        return this;
    }

    public void setWhen(CerbacWhen cerbacWhen) {
        this.when = cerbacWhen;
    }

    public CerbacHow getHow() {
        return this.how;
    }

    public CerbacPolicyRule how(CerbacHow cerbacHow) {
        this.setHow(cerbacHow);
        return this;
    }

    public void setHow(CerbacHow cerbacHow) {
        this.how = cerbacHow;
    }

    public CerbacWhy getWhy() {
        return this.why;
    }

    public CerbacPolicyRule why(CerbacWhy cerbacWhy) {
        this.setWhy(cerbacWhy);
        return this;
    }

    public void setWhy(CerbacWhy cerbacWhy) {
        this.why = cerbacWhy;
    }

    public Set<CerbacWhoProp> getWhoProperties() {
        return this.whoProperties;
    }

    public CerbacPolicyRule whoProperties(Set<CerbacWhoProp> cerbacWhoProps) {
        this.setWhoProperties(cerbacWhoProps);
        return this;
    }

    public CerbacPolicyRule addWhoProperty(CerbacWhoProp cerbacWhoProp) {
        this.whoProperties.add(cerbacWhoProp);
        cerbacWhoProp.setPolicyRule(this);
        return this;
    }

    public CerbacPolicyRule removeWhoProperty(CerbacWhoProp cerbacWhoProp) {
        this.whoProperties.remove(cerbacWhoProp);
        cerbacWhoProp.setPolicyRule(null);
        return this;
    }

    public void setWhoProperties(Set<CerbacWhoProp> cerbacWhoProps) {
        if (this.whoProperties != null) {
            this.whoProperties.forEach(i -> i.setPolicyRule(null));
        }
        if (cerbacWhoProps != null) {
            cerbacWhoProps.forEach(i -> i.setPolicyRule(this));
        }
        this.whoProperties = cerbacWhoProps;
    }

    public Set<CerbacWhatProp> getWhatProperties() {
        return this.whatProperties;
    }

    public CerbacPolicyRule whatProperties(Set<CerbacWhatProp> cerbacWhatProps) {
        this.setWhatProperties(cerbacWhatProps);
        return this;
    }

    public CerbacPolicyRule addWhatProperty(CerbacWhatProp cerbacWhatProp) {
        this.whatProperties.add(cerbacWhatProp);
        cerbacWhatProp.setPolicyRule(this);
        return this;
    }

    public CerbacPolicyRule removeWhatProperty(CerbacWhatProp cerbacWhatProp) {
        this.whatProperties.remove(cerbacWhatProp);
        cerbacWhatProp.setPolicyRule(null);
        return this;
    }

    public void setWhatProperties(Set<CerbacWhatProp> cerbacWhatProps) {
        if (this.whatProperties != null) {
            this.whatProperties.forEach(i -> i.setPolicyRule(null));
        }
        if (cerbacWhatProps != null) {
            cerbacWhatProps.forEach(i -> i.setPolicyRule(this));
        }
        this.whatProperties = cerbacWhatProps;
    }

    public CerbacWho getWho() {
        return this.who;
    }

    public CerbacPolicyRule who(CerbacWho cerbacWho) {
        this.setWho(cerbacWho);
        return this;
    }

    public void setWho(CerbacWho cerbacWho) {
        this.who = cerbacWho;
    }

    public CerbacWhat getWhat() {
        return this.what;
    }

    public CerbacPolicyRule what(CerbacWhat cerbacWhat) {
        this.setWhat(cerbacWhat);
        return this;
    }

    public void setWhat(CerbacWhat cerbacWhat) {
        this.what = cerbacWhat;
    }

    public CerbacType getType() {
        return this.type;
    }

    public CerbacPolicyRule type(CerbacType cerbacType) {
        this.setType(cerbacType);
        return this;
    }

    public void setType(CerbacType cerbacType) {
        this.type = cerbacType;
    }

    public Set<CerbacAction> getCerbacActions() {
        return this.cerbacActions;
    }

    public CerbacPolicyRule cerbacActions(Set<CerbacAction> cerbacActions) {
        this.setCerbacActions(cerbacActions);
        return this;
    }

    public CerbacPolicyRule addCerbacAction(CerbacAction cerbacAction) {
        this.cerbacActions.add(cerbacAction);
        cerbacAction.getCerbacPolicyRules().add(this);
        return this;
    }

    public CerbacPolicyRule removeCerbacAction(CerbacAction cerbacAction) {
        this.cerbacActions.remove(cerbacAction);
        cerbacAction.getCerbacPolicyRules().remove(this);
        return this;
    }

    public void setCerbacActions(Set<CerbacAction> cerbacActions) {
        this.cerbacActions = cerbacActions;
    }

    public CerbacPolicy getCerbacPolicy() {
        return this.cerbacPolicy;
    }

    public CerbacPolicyRule cerbacPolicy(CerbacPolicy cerbacPolicy) {
        this.setCerbacPolicy(cerbacPolicy);
        return this;
    }

    public void setCerbacPolicy(CerbacPolicy cerbacPolicy) {
        this.cerbacPolicy = cerbacPolicy;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CerbacPolicyRule)) {
            return false;
        }
        return id != null && id.equals(((CerbacPolicyRule) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CerbacPolicyRule{" +
            "id=" + getId() +
            ", sid='" + getSid() + "'" +
            "}";
    }
}

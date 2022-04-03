export interface ICerbacCommittedPolicy {
  sid?: string;
  policyType?: string;
  errorType?: string,
}
export class CerbacCommittedPolicy implements ICerbacCommittedPolicy {
  constructor(public sid?: string, public policyType?: string,  public errorType?: string) {}
}

export interface ICerbacUnCommittedPolicy {
  sid?: string;
  policyType?: string;

}
export class CerbacUnCommittedPolicy implements ICerbacUnCommittedPolicy {
  constructor(public sid?: string, public policyType?: string) {}
}

export interface ICerbacPolicyError {
  pid?: string;
  uncommittedPolicy?: ICerbacUnCommittedPolicy;
  committedPolicies?: ICerbacCommittedPolicy[];
}

export class CerbacPolicyError implements ICerbacPolicyError {
  constructor(
    public pid?: string,
    public uncommittedPolicy?: ICerbacUnCommittedPolicy,
    public committedPolicies?: ICerbacCommittedPolicy[]) {}
}

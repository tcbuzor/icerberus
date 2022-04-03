import { ICerbacPolicyRule } from 'app/entities/cerbac-policy-rule/cerbac-policy-rule.model';

export interface ICerbacPolicy {
  id?: number;
  pid?: string;
  priority?: number | null;
  policyRules?: ICerbacPolicyRule[] | null;
}

export class CerbacPolicy implements ICerbacPolicy {
  constructor(public id?: number, public pid?: string, public priority?: number | null, public policyRules?: ICerbacPolicyRule[] | null) {}
}

export function getCerbacPolicyIdentifier(cerbacPolicy: ICerbacPolicy): number | undefined {
  return cerbacPolicy.id;
}

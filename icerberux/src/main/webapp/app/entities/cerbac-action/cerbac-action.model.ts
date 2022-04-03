import { ICerbacPolicyRule } from 'app/entities/cerbac-policy-rule/cerbac-policy-rule.model';

export interface ICerbacAction {
  id?: number;
  name?: string;
  cerbacPolicyRules?: ICerbacPolicyRule[] | null;
}

export class CerbacAction implements ICerbacAction {
  constructor(public id?: number, public name?: string, public cerbacPolicyRules?: ICerbacPolicyRule[] | null) {}
}

export function getCerbacActionIdentifier(cerbacAction: ICerbacAction): number | undefined {
  return cerbacAction.id;
}

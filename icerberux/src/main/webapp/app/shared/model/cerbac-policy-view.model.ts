import {ICerbacPolicyRuleView} from "app/shared/model/cerbac-policy-rule-view.model";

export interface ICerbacPolicyView {
  pid?: string;
  policyRules?: ICerbacPolicyRuleView[] | null;
}

export class CerbacPolicyView implements ICerbacPolicyView {
  constructor(public pid?: string, public policyRules?: ICerbacPolicyRuleView[] | null) {}
}

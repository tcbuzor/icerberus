import { ICerbacEntityProp } from 'app/entities/cerbac-entity-prop/cerbac-entity-prop.model';
import { ICerbacPolicyRule } from 'app/entities/cerbac-policy-rule/cerbac-policy-rule.model';
import { ConditionEnum } from 'app/entities/enumerations/condition-enum.model';

export interface ICerbacWhatProp {
  id?: number;
  name?: string;
  value?: string;
  condition?: ConditionEnum | null;
  entityProperty?: ICerbacEntityProp | null;
  policyRule?: ICerbacPolicyRule | null;
}

export class CerbacWhatProp implements ICerbacWhatProp {
  constructor(
    public id?: number,
    public name?: string,
    public value?: string,
    public condition?: ConditionEnum | null,
    public entityProperty?: ICerbacEntityProp | null,
    public policyRule?: ICerbacPolicyRule | null
  ) {}
}

export function getCerbacWhatPropIdentifier(cerbacWhatProp: ICerbacWhatProp): number | undefined {
  return cerbacWhatProp.id;
}

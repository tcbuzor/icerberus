import { ICerbacWhere } from 'app/entities/cerbac-where/cerbac-where.model';
import { ICerbacWhen } from 'app/entities/cerbac-when/cerbac-when.model';
import { ICerbacHow } from 'app/entities/cerbac-how/cerbac-how.model';
import { ICerbacWhy } from 'app/entities/cerbac-why/cerbac-why.model';
import { ICerbacWhoProp } from 'app/entities/cerbac-who-prop/cerbac-who-prop.model';
import { ICerbacWhatProp } from 'app/entities/cerbac-what-prop/cerbac-what-prop.model';
import { ICerbacWho } from 'app/entities/cerbac-who/cerbac-who.model';
import { ICerbacWhat } from 'app/entities/cerbac-what/cerbac-what.model';
import { ICerbacType } from 'app/entities/cerbac-type/cerbac-type.model';
import { ICerbacAction } from 'app/entities/cerbac-action/cerbac-action.model';
import { ICerbacPolicy } from 'app/entities/cerbac-policy/cerbac-policy.model';

export interface ICerbacPolicyRule {
  id?: number;
  sid?: string;
  where?: ICerbacWhere | null;
  when?: ICerbacWhen | null;
  how?: ICerbacHow | null;
  why?: ICerbacWhy | null;
  whoProperties?: ICerbacWhoProp[] | null;
  whatProperties?: ICerbacWhatProp[] | null;
  who?: ICerbacWho;
  what?: ICerbacWhat;
  type?: ICerbacType;
  cerbacActions?: ICerbacAction[];
  cerbacPolicy?: ICerbacPolicy | null;
}

export class CerbacPolicyRule implements ICerbacPolicyRule {
  constructor(
    public id?: number,
    public sid?: string,
    public where?: ICerbacWhere | null,
    public when?: ICerbacWhen | null,
    public how?: ICerbacHow | null,
    public why?: ICerbacWhy | null,
    public whoProperties?: ICerbacWhoProp[] | null,
    public whatProperties?: ICerbacWhatProp[] | null,
    public who?: ICerbacWho,
    public what?: ICerbacWhat,
    public type?: ICerbacType,
    public cerbacActions?: ICerbacAction[],
    public cerbacPolicy?: ICerbacPolicy | null
  ) {}
}

export function getCerbacPolicyRuleIdentifier(cerbacPolicyRule: ICerbacPolicyRule): number | undefined {
  return cerbacPolicyRule.id;
}

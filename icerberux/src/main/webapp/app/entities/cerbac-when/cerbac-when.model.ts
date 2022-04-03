import { ConditionEnum } from 'app/entities/enumerations/condition-enum.model';

export interface ICerbacWhen {
  id?: number;
  whenCondition?: ConditionEnum | null;
  value?: string;
}

export class CerbacWhen implements ICerbacWhen {
  constructor(public id?: number, public whenCondition?: ConditionEnum | null, public value?: string) {}
}

export function getCerbacWhenIdentifier(cerbacWhen: ICerbacWhen): number | undefined {
  return cerbacWhen.id;
}

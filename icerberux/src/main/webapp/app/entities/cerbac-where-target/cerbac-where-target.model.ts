import { ICerbacWhere } from 'app/entities/cerbac-where/cerbac-where.model';

export interface ICerbacWhereTarget {
  id?: number;
  value?: string;
  wheres?: ICerbacWhere[] | null;
}

export class CerbacWhereTarget implements ICerbacWhereTarget {
  constructor(public id?: number, public value?: string, public wheres?: ICerbacWhere[] | null) {}
}

export function getCerbacWhereTargetIdentifier(cerbacWhereTarget: ICerbacWhereTarget): number | undefined {
  return cerbacWhereTarget.id;
}

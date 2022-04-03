import { ICerbacWhere } from 'app/entities/cerbac-where/cerbac-where.model';

export interface ICerbacWhereOrigin {
  id?: number;
  value?: string;
  wheres?: ICerbacWhere[] | null;
}

export class CerbacWhereOrigin implements ICerbacWhereOrigin {
  constructor(public id?: number, public value?: string, public wheres?: ICerbacWhere[] | null) {}
}

export function getCerbacWhereOriginIdentifier(cerbacWhereOrigin: ICerbacWhereOrigin): number | undefined {
  return cerbacWhereOrigin.id;
}

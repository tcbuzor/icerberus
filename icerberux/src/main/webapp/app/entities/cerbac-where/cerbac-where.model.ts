import { ICerbacWhereOrigin } from 'app/entities/cerbac-where-origin/cerbac-where-origin.model';
import { ICerbacWhereTarget } from 'app/entities/cerbac-where-target/cerbac-where-target.model';

export interface ICerbacWhere {
  id?: number;
  origin?: ICerbacWhereOrigin | null;
  target?: ICerbacWhereTarget | null;
}

export class CerbacWhere implements ICerbacWhere {
  constructor(public id?: number, public origin?: ICerbacWhereOrigin | null, public target?: ICerbacWhereTarget | null) {}
}

export function getCerbacWhereIdentifier(cerbacWhere: ICerbacWhere): number | undefined {
  return cerbacWhere.id;
}

import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';

export interface ICerbacWho {
  id?: number;
  name?: string;
  cerbacEntity?: ICerbacEntity;
}

export class CerbacWho implements ICerbacWho {
  constructor(public id?: number, public name?: string, public cerbacEntity?: ICerbacEntity) {}
}

export function getCerbacWhoIdentifier(cerbacWho: ICerbacWho): number | undefined {
  return cerbacWho.id;
}

import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';

export interface ICerbacWhat {
  id?: number;
  name?: string;
  cerbacEntity?: ICerbacEntity;
}

export class CerbacWhat implements ICerbacWhat {
  constructor(public id?: number, public name?: string, public cerbacEntity?: ICerbacEntity) {}
}

export function getCerbacWhatIdentifier(cerbacWhat: ICerbacWhat): number | undefined {
  return cerbacWhat.id;
}

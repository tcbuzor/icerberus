import { ICerbacEntity } from 'app/shared/model/cerbac-entity.model';

export interface ICerbacEntityProp {
  id?: number;
  propName?: string;
  cerbacEntity?: ICerbacEntity | null;
}

export class CerbacEntityProp implements ICerbacEntityProp {
  constructor(public id?: number, public propName?: string, public cerbacEntity?: ICerbacEntity | null) {}
}

export function getCerbacEntityPropIdentifier(cerbacEntityProp: ICerbacEntityProp): number | undefined {
  return cerbacEntityProp.id;
}

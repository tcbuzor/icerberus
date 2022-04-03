import { ICerbacEntityProp } from 'app/entities/cerbac-entity-prop/cerbac-entity-prop.model';

export interface ICerbacEntity {
  id?: number;
  name?: string;
  properties?: ICerbacEntityProp[] | null;
}

export class CerbacEntity implements ICerbacEntity {
  constructor(public id?: number, public name?: string, public properties?: ICerbacEntityProp[] | null) {}
}

export function getCerbacEntityIdentifier(cerbacEntity: ICerbacEntity): number | undefined {
  return cerbacEntity.id;
}

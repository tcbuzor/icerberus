export interface ICerbacType {
  id?: number;
  name?: string;
}

export class CerbacType implements ICerbacType {
  constructor(public id?: number, public name?: string) {}
}

export function getCerbacTypeIdentifier(cerbacType: ICerbacType): number | undefined {
  return cerbacType.id;
}

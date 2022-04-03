export interface ICerbacHow {
  id?: number;
  how?: string;
}

export class CerbacHow implements ICerbacHow {
  constructor(public id?: number, public how?: string) {}
}

export function getCerbacHowIdentifier(cerbacHow: ICerbacHow): number | undefined {
  return cerbacHow.id;
}

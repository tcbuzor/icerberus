export interface ICerbacWhy {
  id?: number;
  reason?: string;
}

export class CerbacWhy implements ICerbacWhy {
  constructor(public id?: number, public reason?: string) {}
}

export function getCerbacWhyIdentifier(cerbacWhy: ICerbacWhy): number | undefined {
  return cerbacWhy.id;
}

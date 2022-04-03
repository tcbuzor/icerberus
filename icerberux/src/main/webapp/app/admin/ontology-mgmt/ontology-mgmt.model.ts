export interface ICerbacOntology {
  id?: number;
  source?: string;
}

export class CerbacOntology implements ICerbacOntology {
  constructor(public id?: number, public source?: string) {}
}

export function getCerbacOntologyIdentifier(cerbacOntology: ICerbacOntology): number | undefined {
  return cerbacOntology.id;
}


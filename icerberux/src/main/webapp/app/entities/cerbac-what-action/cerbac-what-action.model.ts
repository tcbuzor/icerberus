import { ICerbacWhat } from 'app/entities/cerbac-what/cerbac-what.model';
import { ICerbacAction } from 'app/entities/cerbac-action/cerbac-action.model';

export interface ICerbacWhatAction {
  id?: number;
  cebacWhat?: ICerbacWhat | null;
  cebacAction?: ICerbacAction | null;
}

export class CerbacWhatAction implements ICerbacWhatAction {
  constructor(public id?: number, public cebacWhat?: ICerbacWhat | null, public cebacAction?: ICerbacAction | null) {}
}

export function getCerbacWhatActionIdentifier(cerbacWhatAction: ICerbacWhatAction): number | undefined {
  return cerbacWhatAction.id;
}

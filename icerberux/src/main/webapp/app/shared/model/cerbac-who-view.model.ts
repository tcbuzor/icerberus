import {ICerbacWhoPropView} from "app/shared/model/cerbac-who-prop-view.model";

export interface ICerbacWhoView {
  wType?: string;
  attributes?: ICerbacWhoPropView[] | null;
}

export class CerbacWhoView implements ICerbacWhoView {
  constructor(public wType?: string, public attributes?: ICerbacWhoPropView[]) {}
}

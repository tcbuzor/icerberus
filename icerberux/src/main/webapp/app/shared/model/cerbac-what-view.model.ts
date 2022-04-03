import {ICerbacWhoPropView} from "app/shared/model/cerbac-who-prop-view.model";

export interface ICerbacWhatView {
  wType?: string;
  attributes?: ICerbacWhoPropView[] | null;
}

export class CerbacWhatView implements ICerbacWhatView {
  constructor(public wType?: string, public attributes?: ICerbacWhoPropView[]) {}
}

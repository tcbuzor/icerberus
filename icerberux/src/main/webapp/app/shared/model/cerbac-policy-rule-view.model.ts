import {ICerbacWhoView} from "app/shared/model/cerbac-who-view.model";
import {ICerbacWhatView} from "app/shared/model/cerbac-what-view.model";
import {ICerbacWhy} from "app/entities/cerbac-why/cerbac-why.model";
import {ICerbacHow} from "app/entities/cerbac-how/cerbac-how.model";


export interface ICerbacPolicyRuleView {
  sid?: string;
  type?: string;
  who?: ICerbacWhoView;
  what?: ICerbacWhatView;
  action?: string[];
  why?: ICerbacWhy;
  how?: ICerbacHow;
  rule?: string;

}

export class CerbacPolicyRuleView implements ICerbacPolicyRuleView {
  constructor(
    public sid?: string,
    public type?: string,
    public who?: ICerbacWhoView,
    public what?: ICerbacWhatView,
    public action?: string[],
    public why?: ICerbacWhy,
    public how?: ICerbacHow,
    public rule?: string,


  ) {}
}


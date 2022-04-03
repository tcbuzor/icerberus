import { Routes } from '@angular/router';

import {PolEditorComponent} from "app/policy-editor/pol-editor.component";
import {CreatePolicyComponent} from "app/policy-editor/create-policy/create-policy.component";
import {CerbacWhosResolveService} from "app/policy-editor/cerbac-whos-resolve.service";
import {CerbacWhatsResolveService} from "app/policy-editor/cerbac-whats-resolve.service";
import {CerbacActionsResolveService} from "app/policy-editor/cerbac-actions-resolve.service";
import {CerbacWhysResolveService} from "app/policy-editor/cerbac-whys-resolve.service";
import {CerbacHowsResolveService} from "app/policy-editor/cerbac-hows-resolve.service";

// const POLICY_MGMT_ROUTES = [polEditorRoute];
//
// export const policyMgmtState: Routes = [
//   {
//     path: '',
//     children: POLICY_MGMT_ROUTES,
//   },
// ];

export const polMgmtRoute: Routes = [
  {
    path: '',
    component: PolEditorComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },

  {
    path: 'new',
    component: CreatePolicyComponent,
    resolve: {
      cerbacWhos: CerbacWhosResolveService,
      cerbacWhats: CerbacWhatsResolveService,
      cerbacActions: CerbacActionsResolveService,
      cerbacWhys: CerbacWhysResolveService,
      cerbacHows: CerbacHowsResolveService
    }

  },

];

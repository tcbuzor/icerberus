import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolEditorComponent } from './pol-editor.component';
import {RouterModule} from "@angular/router";
import {polMgmtRoute} from "app/policy-editor/policy-editor.route";
import { SharedModule } from 'app/shared/shared.module';
import { CreatePolicyComponent } from './create-policy/create-policy.component';
import { PolicyStepComponent } from './create-policy/policy-step/policy-step.component';
import { PolicyRulesStepComponent } from './create-policy/policy-rules-step/policy-rules-step.component';
import { PolicyPreviewDlgComponent } from './create-policy/policy-preview-dlg/policy-preview-dlg.component';
import {CerbacPolicyTreeComponent} from "app/policy-editor/create-policy/cerbac-policy-tree/cerbac-policy-tree.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { PolicyErrorDlgComponent } from './create-policy/policy-error-dlg/policy-error-dlg.component';
import { WhyAttribDlgComponent } from './create-policy/why-attrib-dlg/why-attrib-dlg.component';
import { WhenAttribDlgComponent } from './create-policy/when-attrib-dlg/when-attrib-dlg.component';
import { WhereAttribDlgComponent } from './create-policy/where-attrib-dlg/where-attrib-dlg.component';
import { HowAttribDlgComponent } from './create-policy/how-attrib-dlg/how-attrib-dlg.component';
import { WhoAttribDlgComponent } from './create-policy/who-attrib-dlg/who-attrib-dlg.component';
import { EcaPolicyComponent } from './create-policy/templates/eca-policy/eca-policy.component';
import { DelegationPolicyComponent } from './create-policy/templates/delegation-policy/delegation-policy.component';
import { AuthorizationPolicyComponent } from './create-policy/templates/authorization-policy/authorization-policy.component';
import { ObligationPolicyComponent } from './create-policy/templates/obligation-policy/obligation-policy.component';
import { WhatAttribDlgComponent } from './create-policy/what-attrib-dlg/what-attrib-dlg.component';

@NgModule({
  declarations: [PolEditorComponent, CreatePolicyComponent, PolicyStepComponent,
    PolicyRulesStepComponent, PolicyPreviewDlgComponent, CerbacPolicyTreeComponent, PolicyErrorDlgComponent,
    WhyAttribDlgComponent, WhenAttribDlgComponent, WhereAttribDlgComponent, HowAttribDlgComponent,
    WhoAttribDlgComponent, EcaPolicyComponent, DelegationPolicyComponent,
    AuthorizationPolicyComponent, ObligationPolicyComponent, WhatAttribDlgComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(polMgmtRoute),
    Ng2SmartTableModule,

  ]
})
export class PolicyEditorModule { }

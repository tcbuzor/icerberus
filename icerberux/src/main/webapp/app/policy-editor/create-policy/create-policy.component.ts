import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatStepper} from "@angular/material/stepper";
import {PolicyStepComponent} from "app/policy-editor/create-policy/policy-step/policy-step.component";
import {PolicyRulesStepComponent} from "app/policy-editor/create-policy/policy-rules-step/policy-rules-step.component";
import {ICerbacWhat} from "app/entities/cerbac-what/cerbac-what.model";
import {ICerbacWho} from "app/entities/cerbac-who/cerbac-who.model";
import {ICerbacAction} from "app/entities/cerbac-action/cerbac-action.model";
import {ICerbacHow} from "app/entities/cerbac-how/cerbac-how.model";
import {ICerbacWhy} from "app/entities/cerbac-why/cerbac-why.model";
import {CerbacWhysResolveService} from "app/policy-editor/cerbac-whys-resolve.service";
import {CerbacHowsResolveService} from "app/policy-editor/cerbac-hows-resolve.service";

@Component({
  selector: 'cpl-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent implements OnInit {

  policySC: any;
  policyRuleSC: any;
  whatEntities: ICerbacWhat[] | undefined = [];
  whoEntities: ICerbacWho[] | undefined;
  actions: ICerbacAction[] | undefined;
  howEntities: ICerbacHow[] | undefined;
  whyEntities: ICerbacWhy[] | undefined;

  @ViewChild(PolicyStepComponent, { static: false }) policyStepComponent: PolicyStepComponent | undefined;
  @ViewChild(PolicyRulesStepComponent, { static: false }) policyRulesComponent: PolicyRulesStepComponent | undefined;

  @ViewChild('stepper') private stepper: MatStepper | undefined;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ cerbacWhos, cerbacWhats, cerbacActions , cerbacWhys, cerbacHows}) => {
      this.whatEntities = cerbacWhats;
      this.whoEntities = cerbacWhos;
      this.actions = cerbacActions;
      this.whyEntities = cerbacWhys;
      this.howEntities = cerbacHows;
    });
  }


}

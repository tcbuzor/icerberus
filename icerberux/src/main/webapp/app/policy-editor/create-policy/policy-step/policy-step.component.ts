import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'cpl-policy-step',
  templateUrl: './policy-step.component.html',
  styleUrls: ['./policy-step.component.scss']
})
export class PolicyStepComponent {

  cerbacPolicyForm = this.fb.group({
    pid: ['', []],
    priority: ['', []],
  });
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  getPid(): string {
    const pid =  <string>this.cerbacPolicyForm.get(['pid'])!.value;
    return pid;
  }

}

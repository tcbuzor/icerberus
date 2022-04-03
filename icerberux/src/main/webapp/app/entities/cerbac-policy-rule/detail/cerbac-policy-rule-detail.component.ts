import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacPolicyRule } from '../cerbac-policy-rule.model';

@Component({
  selector: 'cpl-cerbac-policy-rule-detail',
  templateUrl: './cerbac-policy-rule-detail.component.html',
})
export class CerbacPolicyRuleDetailComponent implements OnInit {
  cerbacPolicyRule: ICerbacPolicyRule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacPolicyRule }) => {
      this.cerbacPolicyRule = cerbacPolicyRule;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacPolicy } from '../cerbac-policy.model';

@Component({
  selector: 'cpl-cerbac-policy-detail',
  templateUrl: './cerbac-policy-detail.component.html',
})
export class CerbacPolicyDetailComponent implements OnInit {
  cerbacPolicy: ICerbacPolicy | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacPolicy }) => {
      this.cerbacPolicy = cerbacPolicy;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

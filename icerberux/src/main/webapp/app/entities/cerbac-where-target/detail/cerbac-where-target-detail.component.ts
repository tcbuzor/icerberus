import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhereTarget } from '../cerbac-where-target.model';

@Component({
  selector: 'cpl-cerbac-where-target-detail',
  templateUrl: './cerbac-where-target-detail.component.html',
})
export class CerbacWhereTargetDetailComponent implements OnInit {
  cerbacWhereTarget: ICerbacWhereTarget | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhereTarget }) => {
      this.cerbacWhereTarget = cerbacWhereTarget;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

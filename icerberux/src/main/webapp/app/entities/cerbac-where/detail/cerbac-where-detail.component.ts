import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhere } from '../cerbac-where.model';

@Component({
  selector: 'cpl-cerbac-where-detail',
  templateUrl: './cerbac-where-detail.component.html',
})
export class CerbacWhereDetailComponent implements OnInit {
  cerbacWhere: ICerbacWhere | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhere }) => {
      this.cerbacWhere = cerbacWhere;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

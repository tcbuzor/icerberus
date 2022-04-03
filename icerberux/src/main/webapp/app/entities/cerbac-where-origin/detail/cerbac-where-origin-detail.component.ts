import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhereOrigin } from '../cerbac-where-origin.model';

@Component({
  selector: 'cpl-cerbac-where-origin-detail',
  templateUrl: './cerbac-where-origin-detail.component.html',
})
export class CerbacWhereOriginDetailComponent implements OnInit {
  cerbacWhereOrigin: ICerbacWhereOrigin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhereOrigin }) => {
      this.cerbacWhereOrigin = cerbacWhereOrigin;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

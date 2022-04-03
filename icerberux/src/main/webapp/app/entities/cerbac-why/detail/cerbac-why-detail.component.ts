import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhy } from '../cerbac-why.model';

@Component({
  selector: 'cpl-cerbac-why-detail',
  templateUrl: './cerbac-why-detail.component.html',
})
export class CerbacWhyDetailComponent implements OnInit {
  cerbacWhy: ICerbacWhy | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhy }) => {
      this.cerbacWhy = cerbacWhy;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

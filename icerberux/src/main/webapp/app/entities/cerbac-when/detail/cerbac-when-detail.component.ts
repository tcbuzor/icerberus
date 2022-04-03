import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhen } from '../cerbac-when.model';

@Component({
  selector: 'cpl-cerbac-when-detail',
  templateUrl: './cerbac-when-detail.component.html',
})
export class CerbacWhenDetailComponent implements OnInit {
  cerbacWhen: ICerbacWhen | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhen }) => {
      this.cerbacWhen = cerbacWhen;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

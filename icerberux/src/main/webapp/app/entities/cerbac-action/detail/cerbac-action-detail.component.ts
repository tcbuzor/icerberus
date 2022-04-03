import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacAction } from '../cerbac-action.model';

@Component({
  selector: 'cpl-cerbac-action-detail',
  templateUrl: './cerbac-action-detail.component.html',
})
export class CerbacActionDetailComponent implements OnInit {
  cerbacAction: ICerbacAction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacAction }) => {
      this.cerbacAction = cerbacAction;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

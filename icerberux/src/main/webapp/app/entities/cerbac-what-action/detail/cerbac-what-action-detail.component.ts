import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhatAction } from '../cerbac-what-action.model';

@Component({
  selector: 'cpl-cerbac-what-action-detail',
  templateUrl: './cerbac-what-action-detail.component.html',
})
export class CerbacWhatActionDetailComponent implements OnInit {
  cerbacWhatAction: ICerbacWhatAction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhatAction }) => {
      this.cerbacWhatAction = cerbacWhatAction;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhatProp } from '../cerbac-what-prop.model';

@Component({
  selector: 'cpl-cerbac-what-prop-detail',
  templateUrl: './cerbac-what-prop-detail.component.html',
})
export class CerbacWhatPropDetailComponent implements OnInit {
  cerbacWhatProp: ICerbacWhatProp | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhatProp }) => {
      this.cerbacWhatProp = cerbacWhatProp;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

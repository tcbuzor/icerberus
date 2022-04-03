import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacEntityProp } from '../cerbac-entity-prop.model';

@Component({
  selector: 'cpl-cerbac-entity-prop-detail',
  templateUrl: './cerbac-entity-prop-detail.component.html',
})
export class CerbacEntityPropDetailComponent implements OnInit {
  cerbacEntityProp: ICerbacEntityProp | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacEntityProp }) => {
      this.cerbacEntityProp = cerbacEntityProp;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

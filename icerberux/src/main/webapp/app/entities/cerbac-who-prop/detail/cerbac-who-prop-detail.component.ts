import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhoProp } from '../cerbac-who-prop.model';

@Component({
  selector: 'cpl-cerbac-who-prop-detail',
  templateUrl: './cerbac-who-prop-detail.component.html',
})
export class CerbacWhoPropDetailComponent implements OnInit {
  cerbacWhoProp: ICerbacWhoProp | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhoProp }) => {
      this.cerbacWhoProp = cerbacWhoProp;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

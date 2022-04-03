import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacType } from '../cerbac-type.model';

@Component({
  selector: 'cpl-cerbac-type-detail',
  templateUrl: './cerbac-type-detail.component.html',
})
export class CerbacTypeDetailComponent implements OnInit {
  cerbacType: ICerbacType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacType }) => {
      this.cerbacType = cerbacType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

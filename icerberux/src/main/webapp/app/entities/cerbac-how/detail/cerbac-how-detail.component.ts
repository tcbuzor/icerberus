import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacHow } from '../cerbac-how.model';

@Component({
  selector: 'cpl-cerbac-how-detail',
  templateUrl: './cerbac-how-detail.component.html',
})
export class CerbacHowDetailComponent implements OnInit {
  cerbacHow: ICerbacHow | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacHow }) => {
      this.cerbacHow = cerbacHow;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

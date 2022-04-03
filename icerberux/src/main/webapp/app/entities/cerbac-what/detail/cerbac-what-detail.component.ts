import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWhat } from '../cerbac-what.model';

@Component({
  selector: 'cpl-cerbac-what-detail',
  templateUrl: './cerbac-what-detail.component.html',
})
export class CerbacWhatDetailComponent implements OnInit {
  cerbacWhat: ICerbacWhat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWhat }) => {
      this.cerbacWhat = cerbacWhat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

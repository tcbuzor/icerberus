import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacWho } from '../cerbac-who.model';

@Component({
  selector: 'cpl-cerbac-who-detail',
  templateUrl: './cerbac-who-detail.component.html',
})
export class CerbacWhoDetailComponent implements OnInit {
  cerbacWho: ICerbacWho | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacWho }) => {
      this.cerbacWho = cerbacWho;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

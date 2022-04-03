import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacEntity } from '../../../shared/model/cerbac-entity.model';

@Component({
  selector: 'cpl-cerbac-entity-detail',
  templateUrl: './cerbac-entity-detail.component.html',
})
export class CerbacEntityDetailComponent implements OnInit {
  cerbacEntity: ICerbacEntity | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacEntity }) => {
      this.cerbacEntity = cerbacEntity;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

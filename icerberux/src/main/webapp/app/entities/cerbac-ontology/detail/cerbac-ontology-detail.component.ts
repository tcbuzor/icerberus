import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICerbacOntology } from '../cerbac-ontology.model';

@Component({
  selector: 'cpl-cerbac-ontology-detail',
  templateUrl: './cerbac-ontology-detail.component.html',
})
export class CerbacOntologyDetailComponent implements OnInit {
  cerbacOntology: ICerbacOntology | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cerbacOntology }) => {
      this.cerbacOntology = cerbacOntology;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'cpl-ontology-mgmt',
  templateUrl: './ontology-mgmt.component.html',
  styleUrls: ['./ontology-mgmt.component.scss']
})
export class OntologyMgmtComponent {

  ontologyDataSource: LocalDataSource = new LocalDataSource();
  ontologySettings = {
    columns: {
      source: {
        title: 'Source Link',
        filter: false
      },
    }
  };
  constructor(private router: Router,
              private route: ActivatedRoute) { }


}

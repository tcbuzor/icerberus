import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntologyMgmtComponent } from './list/ontology-mgmt.component';
import { OntologyMgmtEditComponent } from './edit/ontology-mgmt-edit.component';
import { OntologyMgmtCreateComponent } from './create/ontology-mgmt-create.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {SharedModule} from "app/shared/shared.module";



@NgModule({
  declarations: [OntologyMgmtComponent, OntologyMgmtEditComponent, OntologyMgmtCreateComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    SharedModule
  ]
})
export class OntologyMgmtModule { }

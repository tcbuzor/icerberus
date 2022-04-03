import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder} from "@angular/forms";
import {LocalDataSource} from "ng2-smart-table";
import {CerbacWhoPropView, ICerbacWhoPropView} from "app/shared/model/cerbac-who-prop-view.model";
import {ICerbacWhatPropView} from "app/shared/model/cerbac-what-prop-view.model";

@Component({
  selector: 'cpl-what-attrib-dlg',
  templateUrl: './what-attrib-dlg.component.html',
  styleUrls: ['./what-attrib-dlg.component.scss']
})
export class WhatAttribDlgComponent {


  attributesDataSource: LocalDataSource = new LocalDataSource();
  whatProps: ICerbacWhatPropView[] = [];

  attributesSettings = {
    defaultStyle: true,
    filter: false,
    pager: {
      display: true,
      perPage: 5,
    },
    actions: {
      add: true,
      edit: true,
      delete: true,
      position: 'right',
    },

    columns: {
      name: {
        title: 'Attribute Name',
        type: 'string',
        filter: false,
      },
      value: {
        title: 'Attribute Value',
        type: 'string',
        filter: false,
      },

    },
    attr: {
      class: 'table table-bordered'
    }
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    message: string[],
    title: string,

  }, private mdDialogRef: MatDialogRef<WhatAttribDlgComponent>, private fb: FormBuilder,){
    // this.mdDialogRef.updateSize('300vw','300vw')
  }


  public cancel(): void {
    this.close(false);
  }
  public close(value: boolean): void {
    this.mdDialogRef.close({ event: 'close', data: this.whatProps});
    // this.mdDialogRef.close(value);
  }

  @HostListener("keydown.esc")
  public onEsc(): void {
    this.close(false);
  }


  saveWhoAttributes(): void {

    this.whatProps = new Array<ICerbacWhatPropView>();
    this.attributesDataSource.getAll().then(value => {
      // eslint-disable-next-line no-console
      console.log('value ...' + JSON.stringify(value));

      value.forEach((element: { name: string; value: string; }) => {
        // eslint-disable-next-line no-console
        console.log('name ...' + element.name);
        // eslint-disable-next-line no-console
        console.log('value ...' + element.value);
        const prop = new CerbacWhoPropView();
        prop.name = element.name;
        prop.value = element.value;
        this.whatProps.push(prop);

      });

      this.close(false);
    });
  }
}

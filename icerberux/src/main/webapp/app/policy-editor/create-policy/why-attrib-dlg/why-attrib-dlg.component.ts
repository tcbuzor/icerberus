import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ICerbacWhy} from "app/entities/cerbac-why/cerbac-why.model";

@Component({
  selector: 'cpl-why-attrib-dlg',
  templateUrl: './why-attrib-dlg.component.html',
  styleUrls: ['./why-attrib-dlg.component.scss']
})
export class WhyAttribDlgComponent {

  whyArribForm = this.fb.group({
    whyControl: [null, []],
  });
  selectedWhy: ICerbacWhy = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    message: string[],
    title: string,
    whyEntities: ICerbacWhy[]

  }, private mdDialogRef: MatDialogRef<WhyAttribDlgComponent>, private fb: FormBuilder,){
    // this.mdDialogRef.updateSize('300vw','300vw')
  }

  get whyControl(): AbstractControl | null {
    return this.whyArribForm.get('whyControl');
  }

  public cancel(): void {
    this.close(false);
  }
  public close(value: boolean): void {
    this.mdDialogRef.close({ event: 'close', data: this.selectedWhy });
   // this.mdDialogRef.close(value);
  }

  @HostListener("keydown.esc")
  public onEsc(): void {
    this.close(false);
  }

  addWhy(): void {
    this.selectedWhy = this.whyControl?.value;
    this.close(false);
  }
}

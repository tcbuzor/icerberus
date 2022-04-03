import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'cpl-how-attrib-dlg',
  templateUrl: './how-attrib-dlg.component.html',
  styleUrls: ['./how-attrib-dlg.component.scss']
})
export class HowAttribDlgComponent  {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    message: string[],
    title: string
  }, private mdDialogRef: MatDialogRef<HowAttribDlgComponent>){
    // this.mdDialogRef.updateSize('300vw','300vw')
  }

  public cancel(): void {
    this.close(false);
  }
  public close(value: boolean): void {
    this.mdDialogRef.close(value);
  }

  @HostListener("keydown.esc")
  public onEsc(): void {
    this.close(false);
  }

  addHow(): void {
    this.close(false);
  }

}

import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'cpl-when-attrib-dlg',
  templateUrl: './when-attrib-dlg.component.html',
  styleUrls: ['./when-attrib-dlg.component.scss']
})
export class WhenAttribDlgComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    message: string[],
    title: string
  }, private mdDialogRef: MatDialogRef<WhenAttribDlgComponent>){
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


  addWhen(): void {
    this.close(false);
  }
}

import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'cpl-policy-preview-dlg',
  templateUrl: './policy-preview-dlg.component.html',
  styleUrls: ['./policy-preview-dlg.component.scss']
})
export class PolicyPreviewDlgComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    message: string,
    title: string
  }, private mdDialogRef: MatDialogRef<PolicyPreviewDlgComponent>){
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

}

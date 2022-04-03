import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CerbacPolicyError} from "app/shared/model/cerbac-policy-error.model";

@Component({
  selector: 'cpl-policy-error-dlg',
  templateUrl: './policy-error-dlg.component.html',
  styleUrls: ['./policy-error-dlg.component.scss']
})
export class PolicyErrorDlgComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    message: string[],
    title: string,
    errors: CerbacPolicyError
  }, private mdDialogRef: MatDialogRef<PolicyErrorDlgComponent>){
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

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands,no-console
    console.log("policyType: " + this.data.errors.uncommittedPolicy?.policyType);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands,no-console
    console.log("title:" + this.data.title)
  }


}

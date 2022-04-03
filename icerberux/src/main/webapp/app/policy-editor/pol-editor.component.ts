import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {ICerbacPolicy} from "app/entities/cerbac-policy/cerbac-policy.model";
import {HttpResponse} from "@angular/common/http";
import {CerbacPolicyService} from "app/entities/cerbac-policy/service/cerbac-policy.service";

@Component({
  selector: 'cpl-pol-editor',
  templateUrl: './pol-editor.component.html',
  styleUrls: ['./pol-editor.component.scss']
})
export class PolEditorComponent implements OnInit {
  displayedColumns = ['pid', 'policy'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<ICerbacPolicy[]>();
  filter: string | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  policies: any[] | undefined;
  cerbacPolicies?: ICerbacPolicy[];
  isLoading = false;

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  fileAttr = 'Load Policy File';


  constructor(private router: Router, private route: ActivatedRoute, protected cerbacPolicyService: CerbacPolicyService,) {
    //this.dataSource = new MatTableDataSource(this.policies);
  }

  loadAll(): void {
    this.isLoading = true;

    this.cerbacPolicyService.query().subscribe({
      next: (res: HttpResponse<ICerbacPolicy[]>) => {
        this.isLoading = false;
        this.cerbacPolicies = res.body ?? [];
        this.dataSource = new MatTableDataSource(this.cerbacPolicies);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }


  // uploadFileEvt(imgFile: any): void {
  //   if (imgFile.target.files && imgFile.target.files[0]) {
  //     this.fileAttr = '';
  //     // Array.from(imgFile.target.files).forEach((file: File) => {
  //     //   // this.fileAttr += file.name + ' - ';
  //     // });
  //
  //     // HTML5 FileReader API
  //     let reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       let image = new Image();
  //       image.src = e.target.result;
  //       image.onload = rs => {
  //         let imgBase64Path = e.target.result;
  //       };
  //     };
  //     reader.readAsDataURL(imgFile.target.files[0]);
  //
  //     // Reset if duplicate image uploaded again
  //     if(this.fileInput) {
  //       this.fileInput.nativeElement.value = "";
  //     }
  //
  //   } else {
  //     this.fileAttr = 'Choose File';
  //   }
  // }

  createPolicyClicked(): void {
    this.router.navigate(['new'], { relativeTo: this.route } );
  }

  ngOnInit(): void {
    this.loadAll();
  }
}

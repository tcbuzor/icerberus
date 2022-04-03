/* eslint-disable */
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ICerbacAction} from "app/entities/cerbac-action/cerbac-action.model";
import {ICerbacWho} from "app/entities/cerbac-who/cerbac-who.model";
import {ICerbacWhat} from "app/entities/cerbac-what/cerbac-what.model";
import {CerbacPolicyRuleView} from "app/shared/model/cerbac-policy-rule-view.model";
import {CerbacWhoView} from "app/shared/model/cerbac-who-view.model";
import {CerbacWhatView} from "app/shared/model/cerbac-what-view.model";
import {PolicyPreviewDlgComponent} from "app/policy-editor/create-policy/policy-preview-dlg/policy-preview-dlg.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {randomString} from "app/shared/util/utils";
import {CerbacPolicyTreeComponent} from "app/policy-editor/create-policy/cerbac-policy-tree/cerbac-policy-tree.component";
import {PolicyStepComponent} from "app/policy-editor/create-policy/policy-step/policy-step.component";
import {LocalDataSource} from "ng2-smart-table";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {PolicyErrorDlgComponent} from "app/policy-editor/create-policy/policy-error-dlg/policy-error-dlg.component";
import {CerbacWhy, ICerbacWhy} from "app/entities/cerbac-why/cerbac-why.model";
import {ICerbacWhere} from "app/entities/cerbac-where/cerbac-where.model";
import {ICerbacWhen} from "app/entities/cerbac-when/cerbac-when.model";
import {ICerbacHow} from "app/entities/cerbac-how/cerbac-how.model";
import {WhyAttribDlgComponent} from "app/policy-editor/create-policy/why-attrib-dlg/why-attrib-dlg.component";
import {WhereAttribDlgComponent} from "app/policy-editor/create-policy/where-attrib-dlg/where-attrib-dlg.component";
import {WhenAttribDlgComponent} from "app/policy-editor/create-policy/when-attrib-dlg/when-attrib-dlg.component";
import {HowAttribDlgComponent} from "app/policy-editor/create-policy/how-attrib-dlg/how-attrib-dlg.component";
import {
  CerbacCommittedPolicy,
  CerbacPolicyError,
  CerbacUnCommittedPolicy
} from "app/shared/model/cerbac-policy-error.model";
import {WhoAttribDlgComponent} from "app/policy-editor/create-policy/who-attrib-dlg/who-attrib-dlg.component";
import {ICerbacWhoPropView} from "app/shared/model/cerbac-who-prop-view.model";
import {ICerbacWhatPropView} from "app/shared/model/cerbac-what-prop-view.model";
import {WhatAttribDlgComponent} from "app/policy-editor/create-policy/what-attrib-dlg/what-attrib-dlg.component";

@Component({
  selector: 'cpl-policy-rules-step',
  templateUrl: './policy-rules-step.component.html',
  styleUrls: ['./policy-rules-step.component.scss'],
})
export class PolicyRulesStepComponent implements OnInit {

  @ViewChild(CerbacPolicyTreeComponent, { static: false }) policyTreeComponent: CerbacPolicyTreeComponent | undefined;
  @ViewChild(PolicyStepComponent, { static: false }) policyStepComponent: PolicyStepComponent | undefined;
  hasPolicyId = false;
  policyId : string | undefined;
  policyDataSource: LocalDataSource = new LocalDataSource();
  policyRules: CerbacPolicyRuleView[] = [];

  displayedColumns = ['sid', 'rule', 'actions'];
  dataSource: MatTableDataSource<CerbacPolicyRuleView> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  policyConflicts: string[] = [];
  policyInconsistencies: string[]= [];
  selectedValue: any;

  why: ICerbacWhy = {};
  where: ICerbacWhere = {};
  when: ICerbacWhen = {};
  how: ICerbacHow = {};

  cbRulesForm = this.fb.group({
    who: [null, Validators.required],
    what: [null, Validators.required],
    type: [null, Validators.required],
    action: [null, Validators.required],
    sid: [null, ''],
  });
  policyTemplateFG = this.fb.group( {
    templateCtrl: [null, Validators.required],
  });

  @Input()  whoEntities: ICerbacWho[] | undefined = [];
  @Input()  whatEntities: ICerbacWhat[] | undefined;
  @Input()  actions: ICerbacAction[] | undefined;
  @Input()  whyEntities: ICerbacWhy[] | undefined;
  @Input()  howEntities: ICerbacHow[] | undefined;
  dialogRef: MatDialogRef<PolicyPreviewDlgComponent> | undefined;
  polErrDialogRef: MatDialogRef<PolicyErrorDlgComponent> | undefined;
  whyConstraintDialogRef: MatDialogRef<WhyAttribDlgComponent> | undefined;
  whereConstraintDialogRef: MatDialogRef<WhereAttribDlgComponent> | undefined;
  whenConstraintDialogRef: MatDialogRef<WhenAttribDlgComponent> | undefined;
  howConstraintDialogRef: MatDialogRef<HowAttribDlgComponent> | undefined;
  whoAttribDialogRef: MatDialogRef<WhoAttribDlgComponent> | undefined;
  whatAttribDialogRef: MatDialogRef<WhatAttribDlgComponent> | undefined;
  templateControl: any;
  templates: string[] = [
    'Default',
    'Authorization',
    'Obligation',
    'Delegation',
    'Event-Condition-Action',
  ];
  cpError: CerbacPolicyError = {};
  selectedWhy: ICerbacWhy | undefined;
  selectedHow: ICerbacHow | undefined;
  selectedWhen: ICerbacWhen | undefined;
  selectedWhere: ICerbacWhere | undefined;

  selectedWhyText: string | undefined = '';
  whoAttribs: ICerbacWhoPropView[] = [];
  whatAttribs: ICerbacWhatPropView[] = [];


  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: MatDialog,
   ) {
    this.policyDataSource = new LocalDataSource(this.policyRules);
    this.dataSource = new MatTableDataSource(this.policyRules);
  }

  getPolicy(): CerbacPolicyRuleView {
    const who: ICerbacWho = this.cbRulesForm.get(['who'])!.value;
    const what: ICerbacWhat = this.cbRulesForm.get(['what'])!.value;
    const type = this.cbRulesForm.get(['type'])!.value;
    const actions: ICerbacAction[] = this.cbRulesForm.get(['action'])!.value;
    const cpRule = new CerbacPolicyRuleView();
    cpRule.type = type;
    const whoView = new CerbacWhoView();
    whoView.wType = who.name;
    cpRule.who = whoView;
    let wPart = "who:{" + "wType:" + whoView.wType ;
    if(this.whoAttribs && this.whoAttribs != null) {
      whoView.attributes = this.whoAttribs;
      let whoAttrib = ',attributes: [';
      let i = 0;
      this.whoAttribs.forEach(wa => {
        const ao = "{" + wa.name + ":" + wa.value + "}";
        whoAttrib = whoAttrib + ao ;
        if(i < this.whoAttribs.length) {
          whoAttrib = whoAttrib  + ",";
        }
        i = i + 1;
      });
      whoAttrib = whoAttrib + "]";
      wPart = wPart + whoAttrib;
    }
    wPart = wPart + "}";



    const whatView = new CerbacWhatView();
    whatView.wType = what.name;
    cpRule.what = whatView;

    let whatPart = "what:{" + "wType:" + whoView.wType ;
    if(this.whatAttribs && this.whatAttribs != null) {
      whatView.attributes = this.whatAttribs;
      let whatAttrib = ',attributes: [';
      let i = 0;
      this.whatAttribs.forEach(wa => {

        const ao = "{" + wa.name + ":" + wa.value + "}";
        whatAttrib = whatAttrib + ao;
        if(i < this.whatAttribs.length) {
          whatAttrib = whatAttrib  + ",";
        }
        i = i + 1;
      });
      whatAttrib = whatAttrib + "]";
      whatPart = whatPart + whatAttrib;
    }
    whatPart = whatPart + "}";


    const actionView: Array<string> = [];
    actions.forEach(a => {
      if(a.name) {
        actionView.push(a.name)
      }
    })
    cpRule.action = actionView;
    cpRule.sid = this.getUserStatementId();

    let rule = 'type:' + cpRule.type + ','+ wPart + ',' + whatPart;
   // console.log("why::" + this.selectedWhyText)
    if(this.selectedWhy) {
      const why  = ",why:{ reason:" + this.selectedWhy.reason + "}";
      rule = rule + why;
      cpRule.why = this.selectedWhy;
      console.log("<<<rule::" + rule)
    }

    cpRule.rule = rule;
    return cpRule;
  }

  previewClicked(): void {
  //  alert(this.getRootNode()?.item);
    const cpRule: CerbacPolicyRuleView = this.getPolicy();
    const options = {
      title: 'iCerberux Policy Preview',
      message: JSON.stringify(cpRule, this.replacer),
      cancelText: 'Cancel',
    };
    this.openPreview(options) ;
    // alert(JSON.stringify(cpRule))
  }

  replacer(key: string, value: any)
  {
    if (key=="rule" || key == "id") {
      return undefined;
    }
    else return value;
  }

  public openPreview(options: any): void {
    this.dialogRef = this.dialog.open(PolicyPreviewDlgComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        // confirmText: options.confirmText
        height: '200px',
        width: '200px',
      },
    });
  }

  public openPolicyErrorDialog(options: any): void {
    this.polErrDialogRef = this.dialog.open(PolicyErrorDlgComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        errors: options.errors,
        // confirmText: options.confirmText
        height: '200px',
        width: '200px',
      },
    });

  }

  getPolicyId(): string {
    return "cpol_" + randomString(4);
  }

  getStatementId(): string {
    return "P_" + randomString(4);
  }

  // getRootNode(): PolicyItemFlatNode | null {
  //   // if(this.policyTreeComponent) {
  //   //   for (let i = 0; i < this.policyTreeComponent.dataSource.data.length; i++) {
  //   //     if (this.policyTreeComponent.dataSource.data[i].item === 'CerbacPolicies') {
  //   //       return this.policyTreeComponent.dataSource.data[i];
  //   //     }
  //   //   }
  //   // }
  //   if(this.policyTreeComponent?.flatNodeMap) {
  //     for (let key of this.policyTreeComponent?.flatNodeMap.keys()) {
  //       alert('flatNode:' + key.item);
  //       if(key.item === 'CerbacPolicies'){
  //         return key;
  //       }
  //     }
  //   }
  //
  //   return null;
  // }

  // getNode(name: string): PolicyItemFlatNode | null {
  //   // if(this.policyTreeComponent) {
  //   //   for (let i = 0; i < this.policyTreeComponent.dataSource.data.length; i++) {
  //   //     if (this.policyTreeComponent.dataSource.data[i].item === name) {
  //   //       return this.policyTreeComponent.dataSource.data[i];
  //   //     }
  //   //   }
  //   // }
  //
  //   if(this.policyTreeComponent?.flatNodeMap) {
  //     for (let key of this.policyTreeComponent?.flatNodeMap.keys()) {
  //       alert('flatNode:' + key.item);
  //       if(key.item === name){
  //         return key;
  //       }
  //     }
  //   }
  //   return null;
  // }

  addRuleClicked(): void {
    const cpRule: CerbacPolicyRuleView = this.getPolicy();
    this.policyInconsistencies = [];
    this.policyConflicts = [];

    if(!this.isValid(cpRule)){
      const allErrors = this.policyInconsistencies.concat(this.policyConflicts);
      // alert("errors:::" + allErrors)
      const options = {
        title: 'Policy Error Detected',
        message: allErrors,
        cancelText: 'Cancel',
        errors: this.cpError,
      };
      this.openPolicyErrorDialog(options) ;
      return;
    }

    this.policyRules.push(cpRule);
    this.policyDataSource.refresh();
    this.dataSource.data = this.policyRules;
    this.selectedWhy = undefined;

    // if(!this.policyId) {
    //   let pid = this.policyStepComponent?.getPid();
    //   if(!pid) {
    //     pid = this.getPolicyId();
    //   }
    //   this.policyTreeComponent?.addRootPolicy(pid)
    //   this.policyId = pid;
    //
    //   alert('np policy ' + this.policyId);
    //
    // }

    // if(this.policyTreeComponent?.flatNodeMap) {
    //   for (let key of this.policyTreeComponent?.flatNodeMap.keys()) {
    //     alert('flatNode:' + key.item);
    //   }
    // }

    // if(this.policyId) {
    //  // const polNode =  this.getNode(this.policyId);
    //   //alert('policy_node' + polNode);
    //   if(cpRule.sid) {
    //     this.policyTreeComponent?.addPolicy(cpRule.sid);
    //   }
    // }

  }

  getUserStatementId(): string {
      let sid =  <string>this.cbRulesForm.get(['sid'])!.value;
      if(!sid) {
        sid = this.getStatementId();
      }
      return sid;
  }

  policySettings = {
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 6,
    },
    actions: {
      position: 'right',
    },

    edit: {
      editButtonContent: '<i class="nb-edit" style="color:red"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    mode: 'external',
    columns: {
      sid: {
        title: 'SID'
      },
      rule: {
        title: 'Policy Rule'
      }
    }
  };



  policyRuleSelected(data: CerbacPolicyRuleView, id: number): void {
  }

  onDeletePolicyRuleConfirm(data: CerbacPolicyRuleView): void {
    this.policyRules.forEach((element,index)=>{
      if(element.sid==data.sid) {
        this.policyRules.splice(index,1);
        this.dataSource.data = this.policyRules;
        //this.policyDataSource.refresh();
      }
    });
  }

  onEditPolicyRule(data: CerbacPolicyRuleView): void {
    alert('edit data:' + data.sid)
  }

  isValid(cpRule: CerbacPolicyRuleView): boolean {

    if(this.passedBasicRulesCheck(cpRule) &&
      this.passedInheritanceRulesCheck(cpRule) &&
      this.passedAggregationRulesCheck(cpRule)) {
      return true;
    }
    return false;
  }

  passedBasicRulesCheck(cpRule: CerbacPolicyRuleView): boolean {
    const sid =  cpRule.sid;
    const type = cpRule.type;
    const who = cpRule.who?.wType;
    const what = cpRule.what?.wType;
    const actions = cpRule.action?.join(",");
    let valid = true;

    this.cpError = new CerbacPolicyError();
    const unCommited = new CerbacUnCommittedPolicy();
    unCommited.sid = sid;
    unCommited.policyType = type;
    this.cpError.uncommittedPolicy = unCommited;
    //const commiteds: CerbacCommittedPolicy[] = [];
    this.cpError.committedPolicies = [];

    this.policyRules.forEach((data,index)=>{
      if(type !== data.type) {
        if((who === data.who?.wType) && (what === data.what?.wType) && actions === data.action?.join(",")) {
          if((type === "A+" && data.type === "A-") || (type === "A-" && data.type === "A+")){
            // Auth conflict
            const conflict = "Authorization Conflict Detected:" + sid + "<->" + data.sid + " " + type + "/" + data.type;
            this.policyConflicts.push(conflict);

            const commited = new CerbacCommittedPolicy();
            commited.sid = data.sid;
            commited.policyType = data.type;
            commited.errorType = "Authorization Conflict(" + type + "/" + data.type + ")";
            this.cpError.committedPolicies?.push(commited)
            valid = false;
          } else if((type === "O+" && data.type === "O-") || (type === "O-" && data.type === "O+")){
            const conflict = "Obligation Conflict Detected:" + sid + "<->" + data.sid + " " + type + "/" + data.type;
            this.policyConflicts.push(conflict);
            valid = false;

            const commited = new CerbacCommittedPolicy();
            commited.sid = data.sid;
            commited.policyType = data.type;
            commited.errorType = "Obligation Conflict(" + type + "/" + data.type + ")";
            this.cpError.committedPolicies?.push(commited)

            // Oblig conflict
          } else if((type === "A+" && data.type === "O-") || (type === "O-" && data.type === "A+")){
            // const inconsis = "Inconsistency Detected:" + sid + "<->" + data.sid + " " + type + "/" + data.type;
            // this.policyInconsistencies.push(inconsis);
            // valid = false;
            //
            // const commited = new CerbacCommittedPolicy();
            // commited.sid = data.sid;
            // commited.policyType = data.type;
            // commited.errorType = "Inconsistency (" + type + "/" + data.type + ")";
            // this.cpError.committedPolicies?.push(commited)
            // inconsistency
          } else if((type === "A-" && data.type === "O+") || (type === "O+" && data.type === "A-")){
            // inconsistency
            const inconsis = "Inconsistency Detected:" + sid + "<->" + data.sid + " " + type + "/" + data.type;
            this.policyInconsistencies.push(inconsis);
            valid = false;
            const commited = new CerbacCommittedPolicy();
            commited.sid = data.sid;
            commited.policyType = data.type;
            commited.errorType = "Inconsistency (" + type + "/" + data.type + ")";
            this.cpError.committedPolicies?.push(commited)
          }

        }
      }

    });
    console.log('uncommited policy:' + this.cpError.uncommittedPolicy.sid, this.cpError.uncommittedPolicy.policyType)
    return  valid;
  }

  passedInheritanceRulesCheck(cpRule: CerbacPolicyRuleView): boolean {
    return true;
  }

  passedAggregationRulesCheck(cpRule: CerbacPolicyRuleView): boolean {
    return true;
  }

  public openAddWhyPolicy(options: any): void {
    this.whyConstraintDialogRef = this.dialog.open(WhyAttribDlgComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        whyEntities: this.whyEntities,
        // confirmText: options.confirmText
        height: '400px',
        width: '400px',
      },
    });

    this.whyConstraintDialogRef.afterClosed().subscribe(result => {
      console.log('The why dialog was closed', result.data);
      this.selectedWhy = new CerbacWhy();
      this.selectedWhy.id = result.data.id;
      this.selectedWhy.reason = result.data.reason;
      //this.selectedWhy = result.data;
      this.selectedWhyText = this.selectedWhy?.reason;
      // console.log('this.selectedWhy::', this.selectedWhy);
      // console.log('this.selectedWhyText::', this.selectedWhyText);
    });
  }
  public openAddWhenPolicy(options: any): void {
    this.whenConstraintDialogRef = this.dialog.open(WhenAttribDlgComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        // confirmText: options.confirmText
        height: '400px',
        width: '400px',
      },
    });
  }
  public openAddWherePolicy(options: any): void {
    this.whereConstraintDialogRef = this.dialog.open(WhereAttribDlgComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        // confirmText: options.confirmText
        height: '400px',
        width: '400px',
      },
    });
  }

  public openAddHowPolicy(options: any): void {
    this.howConstraintDialogRef = this.dialog.open(HowAttribDlgComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        // confirmText: options.confirmText
        height: '400px',
        width: '400px',
      },
    });
  }
  addWhenClicked() {
    const options = {
      title: 'Add or Edit Environment Constraint - When',
      message: '',
      cancelText: 'Cancel',
    };
    this.openAddWhenPolicy(options) ;
  }

  addWhyClicked() {
    const options = {
      title: 'Add or Edit Environment Constraint - Why',
      message: '',
      cancelText: 'Cancel',
    };
    this.openAddWhyPolicy(options) ;
  }

  addWhereClicked() {
    const options = {
      title: 'Add or Edit Environment Constraint - Where',
      message: '',
      cancelText: 'Cancel',
    };
    this.openAddWherePolicy(options) ;
  }

  addHowClicked() {
    const options = {
      title: 'Add or Edit Environment Constraint - How',
      message: '',
      cancelText: 'Cancel',
    };
    this.openAddHowPolicy(options) ;
  }

  ngOnInit(): void {
    this.setDefaultValue();
  }

  setDefaultValue(){
    this.policyTemplateFG.patchValue({
      templateCtrl : this.templates[0]
    })
  }

  addWhoAttributes(): void {
    const options = {
      title: 'Add or Edit Subject Attributes - Who',
      message: '',
      cancelText: 'Cancel',
    };
    this.openAddWhoPolicy(options) ;
  }

  addWhatAttributes(): void {
    const options = {
      title: 'Add or Edit Target Attributes - What',
      message: '',
      cancelText: 'Cancel',
    };
    this.openAddWhatAttribPolicy(options) ;
  }

  public openAddWhatAttribPolicy(options: any): void {
    this.whatAttribDialogRef = this.dialog.open(WhatAttribDlgComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        height: '400px',
        width: '400px',
      },
    });

    this.whatAttribDialogRef.afterClosed().subscribe(result => {
      console.log('The what attributes dialog was closed', result.data);
      const whatAttribs: Array<ICerbacWhatPropView>  = result.data;
      this.whatAttribs = whatAttribs;
      console.log('whatAttribs', whatAttribs[0].name);
    });
  }

  public openAddWhoPolicy(options: any): void {
    this.whoAttribDialogRef = this.dialog.open(WhoAttribDlgComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        height: '400px',
        width: '400px',
      },
    });

    this.whoAttribDialogRef.afterClosed().subscribe(result => {
      console.log('The why dialog was closed', result.data);
      const whoAttribs: Array<ICerbacWhoPropView>  = result.data;
      this.whoAttribs = whoAttribs;
      console.log('whoAttribs', whoAttribs[0].name);
    });
  }
}

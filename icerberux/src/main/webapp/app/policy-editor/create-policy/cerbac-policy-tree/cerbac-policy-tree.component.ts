/* eslint-disable */
import {NestedTreeControl} from '@angular/cdk/tree';
import {ChangeDetectorRef, Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';


interface PolicyNode {
  name: string;
  children?: PolicyNode[];
}

const TREE_DATA: PolicyNode[] = [
  // {
  //   name: 'CerbacPolicies',
  //   children: []
  // }
];

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'cpl-cerbac-policy-tree',
  templateUrl: './cerbac-policy-tree.component.html',
  styleUrls: ['./cerbac-policy-tree.component.scss'],
})
export class CerbacPolicyTreeComponent {
  treeControl = new NestedTreeControl<PolicyNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<PolicyNode>();

  extraFruit: PolicyNode[] = [
    {name: 'Grape'},
    {name: 'Tangerine'},
    {name: 'Grapefruit'}
  ];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: PolicyNode) => !!node.children && node.children.length > 0;


  addRootPolicy(policyId: string): void {
    const root = {
      name: policyId,
      children: []
    }
    TREE_DATA.push(root);
    this.dataSource.data = [];
    this.dataSource.data = TREE_DATA;
  }

  addPolicy(policy: string): void {
    const policyNode = {
      name: policy,
    }
    TREE_DATA[0].children?.push(policyNode);
    this.dataSource.data = [];
    this.dataSource.data = TREE_DATA;
  }

  // addFruit() {
  //   console.log(`Trying to add another fruit...`);
  //   if (this.extraFruit.length) {
  //     const newFruit = this.extraFruit.shift();
  //     console.log(`Added new fruit: ${newFruit.name}`);
  //     TREE_DATA[0].children?.push(newFruit);
  //     // this.dataSource.data = TREE_DATA.slice(0); // doesn't work
  //     // this.dataSource.data = [...TREE_DATA]; // doesn't work
  //     this.dataSource.data = null;
  //     this.dataSource.data = TREE_DATA;
  //   } else {
  //     console.log(`No fruit left to add.`);
  //   }
  // }
}

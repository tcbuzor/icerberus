/* eslint-disable */
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {
  PolicyItemFlatNode, PolicyItemNode,
  PolicyListDatabase
} from "app/policy-editor/create-policy/cerbac-policy-tree/policy-list-database";

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'cpl-cerbac-policy-tree',
  templateUrl: './cerbac-policy-tree.component.html',
  styleUrls: ['./cerbac-policy-tree.component.scss'],
  providers: [PolicyListDatabase]
})
export class CerbacPolicyTreeComponent0 {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<PolicyItemFlatNode, PolicyItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<PolicyItemNode, PolicyItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: PolicyItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<PolicyItemFlatNode>;

  treeFlattener: MatTreeFlattener<PolicyItemNode, PolicyItemFlatNode>;

  dataSource: MatTreeFlatDataSource<PolicyItemNode, PolicyItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<PolicyItemFlatNode>(true /* multiple */);

  constructor(private _database: PolicyListDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<PolicyItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: PolicyItemFlatNode) => node.level;

  isExpandable = (node: PolicyItemFlatNode) => node.expandable;

  getChildren = (node: PolicyItemNode): PolicyItemNode[] => node.children;

  hasChild = (_: number, _nodeData: PolicyItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: PolicyItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use...
   */
  transformer = (node: PolicyItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item ? existingNode : new PolicyItemFlatNode();
    flatNode.item = <string>node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: PolicyItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: PolicyItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: PolicyItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: PolicyItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: PolicyItemFlatNode): void {
    let parent: PolicyItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: PolicyItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: PolicyItemFlatNode): PolicyItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: PolicyItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: PolicyItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
}

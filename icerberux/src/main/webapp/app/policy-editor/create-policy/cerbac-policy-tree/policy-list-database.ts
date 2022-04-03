/* eslint-disable */
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


/**
 * Node for policy item
 */
export class PolicyItemNode {
  children!: PolicyItemNode[];
  item?: string;
}

/** Flat policy item node with expandable and level information */
export class PolicyItemFlatNode {
  item!: string;
  level!: number;
  expandable!: boolean;
}
/**
 * The Json object for policy list data.
 */
const TREE_DATA = {
  CerbacPolicies: {
  }
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a policy item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class PolicyListDatabase {
  dataChange = new BehaviorSubject<PolicyItemNode[]>([]);

  get data(): PolicyItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `PolicyItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `PolicyItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): PolicyItemNode[] {
    return Object.keys(obj).reduce<PolicyItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new PolicyItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to policy list */
  insertItem(parent: PolicyItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as PolicyItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: PolicyItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

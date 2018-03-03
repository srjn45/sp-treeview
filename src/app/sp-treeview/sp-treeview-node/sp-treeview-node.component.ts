import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { Node } from '../model/node';
import { Config, CHECKED_VALUE_ALL, CHECKED_VALUE_LEAVES, CHECKED_VALUE_HIGHEST_SELECTED } from '../model/config';
import { SELECT_CHECKBOX, SELECT_NONE, SELECT_RADIO } from "../model/config";
import { MatCheckboxChange, MatRadioChange } from '@angular/material';

@Component({
  selector: 'sp-treeview-node',
  templateUrl: './sp-treeview-node.component.html',
  styleUrls: ['./sp-treeview-node.component.css']
})
export class SpTreeviewNodeComponent implements OnInit {

  private SELECT_CHECKBOX = SELECT_CHECKBOX;
  private SELECT_RADIO = SELECT_RADIO;
  private SELECT_NONE = SELECT_NONE;

  public hide: boolean = false;

  @Input() public node: Node;
  @Input() public config: Config = new Config();

  @Output() public checkChange: EventEmitter<Node> = new EventEmitter<Node>();

  @Output() public radioSelect: EventEmitter<any> = new EventEmitter<any>();

  @Output() public checkboxSelect: EventEmitter<any> = new EventEmitter<any>();


  @Output() public delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() public addChild: EventEmitter<Node> = new EventEmitter<Node>();

  @ViewChildren(SpTreeviewNodeComponent) children: QueryList<SpTreeviewNodeComponent>;


  constructor() {
  }

  ngOnInit() {
    if (this.config.select == this.SELECT_CHECKBOX) {
      this.checkChildrenRecursive(this.node);
    } else if (this.config.select == this.SELECT_RADIO) {
      // can check if multiple nodes are selected then log the error
    }

  }

  private checkChildrenRecursive(node: Node) {
    if (node == null || node.children == null) {
      return;
    }

    if (node.checked) {
      this.changeChildren(node);
      return;
    }

    node.children.filter(n => n.children != null).forEach(n => this.checkChildrenRecursive(n));

    this.checkChildren(node);
  }

  onCollapseExpand = () => {
    this.node.collapsed = !this.node.collapsed;
  }

  onRadioChange = (event: MatRadioChange) => {
    this.radioSelect.emit(event.value);
  }

  private childRadioSelected(value) {
    this.radioSelect.emit(value);
  }

  onCheckChange = (event: MatCheckboxChange) => {
    // cannot be indeterminate as selection is done
    this.node.indeterminate = false;
    // set new checked value
    this.node.checked = event.checked;
    // set the same checked value for all the children
    this.changeChildren(this.node);
    // notify parent of the change
    this.checkChange.emit(this.node);

    if (this.config.checkedValue == CHECKED_VALUE_HIGHEST_SELECTED) {
      this.checkboxSelect.emit(this.checkedHighest(this.node));
    } else if (this.config.checkedValue == CHECKED_VALUE_LEAVES) {
      this.checkboxSelect.emit(this.checkedLeaves(this.node));
    } else {
      // selected values all
      this.checkboxSelect.emit(this.checkedAll(this.node));
    }

  }

  private checkedLeaves(node: Node): any[] {
    if (!node.checked && !node.indeterminate) {
      return [];
    }
    if (node.children) {
      let values = [];
      node.children.forEach(n => {
        this.checkedLeaves(n).forEach(v => values.push(v));
      });
      return values;
    } else {
      return [node.value];
    }
  }

  private checkedAll(node: Node): any[] {
    if (!node.checked && !node.indeterminate) {
      return [];
    }
    if (node.children) {
      let values = [];
      if (node.checked) {
        values.push(node.value);
      }
      node.children.forEach(n => {
        this.checkedAll(n).forEach(v => values.push(v));
      });
      return values;
    } else {
      return [node.value];
    }
  }

  private checkedHighest(node: Node): any[] {
    if (node.checked) {
      return [node.value]
    }
    if (node.children) {
      let values = [];
      node.children.forEach(n => {
        this.checkedHighest(n).forEach(v => values.push(v));
      });
      return values;
    }
    return [];
  }

  private childCheckboxSelected(values: any[]) {

    if (this.config.checkedValue == CHECKED_VALUE_HIGHEST_SELECTED) {
      this.checkboxSelect.emit(this.checkedHighest(this.node));
    } else if (this.config.checkedValue == CHECKED_VALUE_LEAVES) {
      this.checkboxSelect.emit(this.checkedLeaves(this.node));
    } else {
      // selected values all
      this.checkboxSelect.emit(this.checkedAll(this.node));
    }
  }

  public getCheckedValues() {
    if (this.config.checkedValue == CHECKED_VALUE_HIGHEST_SELECTED) {
      return this.checkedHighest(this.node);
    } else if (this.config.checkedValue == CHECKED_VALUE_LEAVES) {
      return this.checkedLeaves(this.node);
    } else {
      // selected values all
      return this.checkedAll(this.node);
    }
  }

  /**
   * recursively set the value of all the children same as the parent
   * @param node 
   */
  private changeChildren(node: Node) {
    if (node == null || node.children == null) {
      return;
    }

    node.children.forEach(n => {
      n.checked = node.checked;
      n.indeterminate = false;
      this.changeChildren(n);
    });
  }

  private onChildCheckChange(child) {

    this.checkChildren(this.node);

    // notify parent of the change
    this.checkChange.emit(this.node);
  }

  private checkChildren(node: Node) {
    let checkedChildren: number = node.children.filter(n => n.checked).length;

    let indeterminateChildren: number = node.children.filter(n => n.indeterminate).length;

    if (indeterminateChildren > 0) {
      // if indeterminate child the indeterminate
      node.checked = false;
      node.indeterminate = true;
    } else {
      // if no indeterminate child
      node.indeterminate = false;
      if (checkedChildren == node.children.length) {
        // if all checked then checked
        node.checked = true;
      } else if (checkedChildren == 0) {
        // if all unchecked then unchecked
        node.checked = false;
      } else {
        // if not all checked then indeterminate
        node.checked = false;
        node.indeterminate = true;
      }
    }

  }

  onDelete = (value: any) => {

    if (this.node.children != null) {
      let index = this.node.children.findIndex(x => x.value == value);
      if (index != -1) {
        this.node.children.splice(index, 1);
      }
    }
    this.delete.emit(value);
  }

  onAddChild = (node: Node) => {
    this.addChild.emit(node);
  }

  filter(text: string): boolean {

    if (this.node.children == null) {
      if (this.node.text.toLowerCase().startsWith(text.toLowerCase())) {
        this.hide = false;
        return true;
      } else {
        this.hide = true;
        return false;
      }
    } else {
      let matchFound = false;
      this.children.forEach(x => {
        let childMatchFound = x.filter(text);
        if (!matchFound) {
          matchFound = childMatchFound;
        }
      });
      if (matchFound) {
        this.hide = false;
        return true;
      } else {
        if (this.node.text.toLowerCase().startsWith(text.toLowerCase())) {
          this.hide = false;
          return true;
        } else {
          this.hide = true;
          return false;
        }
      }
    }
  }

}



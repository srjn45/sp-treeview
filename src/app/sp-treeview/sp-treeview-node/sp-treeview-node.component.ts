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
      this.node.verifyChildrenRecursive();
    } else if (this.config.select == this.SELECT_RADIO) {
      // can check if multiple nodes are selected then log the error
    }

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
    // set new check status
    this.node.setChecked(event.checked);
    // notify parent of the change
    this.checkChange.emit(this.node);

    this.checkboxSelect.emit(this.node.getCheckedValues(this.config.checkedValue));

  }

  private childCheckboxSelected(values: any[]) {
    this.checkboxSelect.emit(this.node.getCheckedValues(this.config.checkedValue));
  }

  public getCheckedValues(): any[] {
    return this.node.getCheckedValues(this.config.checkedValue);
  }

  private onChildCheckChange(child) {

    this.node.checkImmediateChildren();

    // notify parent of the change
    this.checkChange.emit(this.node);
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



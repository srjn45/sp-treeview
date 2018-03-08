import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, TemplateRef } from '@angular/core';
import { Node } from '../model/node';
import { Config } from '../model/config';
import { SELECT_CHECKBOX, SELECT_NONE, SELECT_RADIO } from '../model/config';
import { MatCheckboxChange, MatRadioChange } from '@angular/material';
import { SpTreeviewNodeTemplate } from './sp-treeview-node-template';

@Component({
  selector: 'sp-treeview-node',
  templateUrl: './sp-treeview-node.component.html',
  styleUrls: ['./sp-treeview-node.component.css']
})
export class SpTreeviewNodeComponent implements OnInit {

  public SELECT_CHECKBOX = SELECT_CHECKBOX;
  public SELECT_RADIO = SELECT_RADIO;
  public SELECT_NONE = SELECT_NONE;

  public hide = false;

  @Input() public node: Node;
  @Input() public config: Config = new Config();
  @Input() public template: TemplateRef<SpTreeviewNodeTemplate>;

  @Output() public checkChange: EventEmitter<Node> = new EventEmitter<Node>();

  @Output() public radioSelect: EventEmitter<Node[]> = new EventEmitter<Node[]>();

  @Output() public checkboxSelect: EventEmitter<Node[]> = new EventEmitter<Node[]>();


  @Output() public delete: EventEmitter<Node> = new EventEmitter<Node>();
  @Output() public addChild: EventEmitter<Node> = new EventEmitter<Node>();

  @ViewChildren(SpTreeviewNodeComponent) children: QueryList<SpTreeviewNodeComponent>;


  constructor() {
  }

  ngOnInit() {
    if (this.config.select === this.SELECT_CHECKBOX) {
      this.node.verifyChildrenRecursive();
    } else if (this.config.select === this.SELECT_RADIO) {
      // can check if multiple nodes are selected then log the error
    }

  }

  onCollapseExpand = () => {
    this.node.collapsed = !this.node.collapsed;
  }

  onRadioChange = (event: MatRadioChange) => {
    this.radioSelect.emit([event.value]);
  }

  public childRadioSelected(nodes: Node[]) {
    this.radioSelect.emit(nodes);
  }

  onCheckChange = (event: MatCheckboxChange) => {
    // set new check status
    this.node.setChecked(event.checked);
    // notify parent of the change
    this.checkChange.emit(this.node);

    this.checkboxSelect.emit(this.node.getCheckedValues(this.config.checkedValue));

  }

  public childCheckboxSelected(values: any[]) {
    this.checkboxSelect.emit(this.node.getCheckedValues(this.config.checkedValue));
  }

  public getCheckedValues(): any[] {
    return this.node.getCheckedValues(this.config.checkedValue);
  }

  public onChildCheckChange(child) {

    this.node.checkImmediateChildren();

    // notify parent of the change
    this.checkChange.emit(this.node);
  }



  onDelete = (node: Node) => {

    if (this.node.children != null) {
      let index = this.node.children.findIndex(x => x.value === node.value);
      if (index !== -1) {
        this.node.children.splice(index, 1);
      }
    }
    this.delete.emit(node);
  }

  onAddChild = (node: Node) => {
    this.addChild.emit(node);
  }

  filter(text: string): boolean {

    if (this.node.children == null) {
      if (this.node.name.toLowerCase().startsWith(text.toLowerCase())) {
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
        if (this.node.name.toLowerCase().startsWith(text.toLowerCase())) {
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



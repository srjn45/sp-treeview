import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Config } from '../model/config';
import { SpTreeviewComponent } from '../sp-treeview/sp-treeview.component';

import { Node } from '../model/node';

@Component({
  selector: 'sp-treeview-dropdown',
  templateUrl: './sp-treeview-dropdown.component.html',
  styleUrls: ['./sp-treeview-dropdown.component.css']
})
export class SpTreeviewDropdownComponent implements OnInit {

  @Input() placeholder: string;

  @Input() nodes: Node[];
  @Input() config: Config = new Config();

  @Output() change: EventEmitter<Node[]> = new EventEmitter<Node[]>();

  @Output() delete: EventEmitter<Node> = new EventEmitter<Node>();
  @Output() addChild: EventEmitter<Node> = new EventEmitter<Node>();

  @ViewChild(SpTreeviewComponent) tree: SpTreeviewComponent;

  @ViewChild('chipList')
  public chipList: any;
  private chipsDiv: HTMLDivElement;

  visible = true;
  selectable = false;
  removable = true;

  selectedNodes: Node[] = [];

  public dropDown = false;


  constructor() {

  }

  ngOnInit() {
    this.nodes.forEach(n => {
      Node.nodify(n);
      n.verifyChildrenRecursive();
      n.getCheckedValues(this.config.checkedValue).forEach(v => this.selectedNodes.push(v));
    });
    this.chipsDiv = this.chipList._elementRef.nativeElement.children[0];
    this.dropDown = this.config.showDropdownDefault;
  }

  scrollLeft(event: Event) {
    event.stopPropagation();
    this.chipsDiv.scrollLeft -= 50;
  }

  scrollRight(event: Event) {
    event.stopPropagation();
    this.chipsDiv.scrollLeft += 50;
  }

  remove(node: Node): void {
    this.dropDown = !this.dropDown;
    node.setChecked(false);
    this.nodes.forEach(n => n.checkImmediateChildren());
    let index = this.selectedNodes.findIndex(n => n === node);
    if (index !== -1) {
      this.selectedNodes.splice(index, 1);
    }
    let values = [];
    this.tree.trees.forEach(t => {
      t.getCheckedValues().forEach(v => values.push(v))
    });
    this.change.emit(values);
  }

  onChange(nodes: Node[]) {
    this.selectedNodes = nodes;
    this.change.emit(nodes);
  }

  onDelete(value) {
    this.delete.emit(value);
  }

  onAddChild(node: Node) {
    this.addChild.emit(node);
  }
}

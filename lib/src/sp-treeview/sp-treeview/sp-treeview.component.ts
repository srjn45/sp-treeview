import { Component, OnInit, Input, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { Node } from '../model/node';
import { Config, SELECT_CHECKBOX, SELECT_RADIO } from '../model/config';
import { SpTreeviewNodeComponent } from '../sp-treeview-node/sp-treeview-node.component';

@Component({
  selector: 'sp-treeview',
  templateUrl: './sp-treeview.component.html',
  styleUrls: ['./sp-treeview.component.css']
})
export class SpTreeviewComponent implements OnInit {

  @Input() nodes: Node[];
  @Input() config: Config = new Config();

  @Output() change: EventEmitter<Node[]> = new EventEmitter<Node[]>();

  @Output() delete: EventEmitter<Node> = new EventEmitter<Node>();
  @Output() addChild: EventEmitter<Node> = new EventEmitter<Node>();

  @ViewChildren('tree') trees: QueryList<SpTreeviewNodeComponent>;

  constructor() { }

  ngOnInit() {

  }

  public getSelectedValues(): Node[] {
    let values: Node[];
    this.nodes.forEach(n => n.getCheckedValues(this.config.checkedValue).forEach(v => values.push(v)));
    return values;
  }

  onFilter(event: Event) {
    this.applyFilter((<HTMLInputElement>event.srcElement).value);
  }
  applyFilter(text: string) {
    this.trees.forEach(t => t.filter(text));
  }

  onChange(nodes: Node[]) {
    if (this.config.select === SELECT_CHECKBOX) {
      let values = [];
      this.trees.forEach(t => {
        t.getCheckedValues().forEach(v => values.push(v))
      });
      this.change.emit(values);
    } else if (this.config.select === SELECT_RADIO) {
      this.change.emit(nodes);
    }
  }

  onDelete(node) {
    if (this.nodes != null) {
      let index = this.nodes.findIndex(x => x.value === node.value);
      if (index !== -1) {
        this.nodes.splice(index, 1);
      }
    }
    this.delete.emit(node);

    let values = [];
    this.trees.forEach(t => {
      t.getCheckedValues().forEach(v => values.push(v))
    });
    this.change.emit(values);
  }

  onAddChild(node: Node) {
    this.addChild.emit(node);

    let values = [];
    this.trees.forEach(t => {
      t.node.verifyChildrenRecursive();
      t.getCheckedValues().forEach(v => values.push(v));
    });
    this.change.emit(values);

  }

}

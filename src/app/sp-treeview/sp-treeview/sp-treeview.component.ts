import { Component, OnInit, Input, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { Node } from '../model/node';
import { Config, SELECT_CHECKBOX, SELECT_RADIO } from '../model/config';
import { SpTreeviewNodeComponent } from '../sp-treeview-node/sp-treeview-node.component';

import { Observable } from "rxjs/Rx";

@Component({
  selector: 'sp-treeview',
  templateUrl: './sp-treeview.component.html',
  styleUrls: ['./sp-treeview.component.css']
})
export class SpTreeviewComponent implements OnInit {

  @Input() nodes: Node[];
  @Input() config: Config = new Config();

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() addChild: EventEmitter<Node> = new EventEmitter<Node>();

  @ViewChildren('tree') trees: QueryList<SpTreeviewNodeComponent>;

  constructor() { }

  ngOnInit() {

  }

  onFilter(event: Event) {
    this.trees.forEach(t => t.filter((<HTMLInputElement>event.srcElement).value));
  }
  applyFilter(text: string) {
    this.trees.forEach(t => t.filter(text));
  }

  onChange(event) {
    if (this.config.select == SELECT_CHECKBOX) {
      let values = [];
      this.trees.forEach(t => {
        t.getCheckedValues().forEach(v => values.push(v))
      });
      this.change.emit(values);
    } else if (this.config.select == SELECT_RADIO) {
      this.change.emit(event);
    }
  }

  onDelete(value) {
    if (this.nodes != null) {
      let index = this.nodes.findIndex(x => x.value == value);
      if (index != -1) {
        this.nodes.splice(index, 1);
      }
    }
    this.delete.emit(value);
  }

  onAddChild(node: Node) {
    this.addChild.emit(node);
  }

}

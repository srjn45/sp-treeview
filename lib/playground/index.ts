/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SpTreeviewModule, Node, Config, SELECT_CHECKBOX, CHECKED_VALUE_HIGHEST_SELECTED } from 'sp-treeview';

@Component({
  selector: 'app',
  template: `
  <div>
    <!-- <sp-treeview [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview> -->
    <sp-treeview-dropdown [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview-dropdown>
  </div>
  `
})
class AppComponent {

  nodes: Node[] = [
    new Node("Electronics", 1, [
      new Node("Mobile Phones", 11, [
        new Node("Pixel 2 XL", 111),
        new Node("OnePlus 5T", 112)
      ], true),
      new Node("Computer", 12, [
        new Node("Alienware", 121, [
          new Node("Alienware 17", 1211),
          new Node("Alienware 14", 1212, null, true)
        ]),
        new Node("HP", 122, [
          new Node("HP Omen", 1221),
          new Node("HP Pavelion", 1222, null, true)
        ])
      ])
    ]),
    new Node("Electronics", 1, [
      new Node("Mobile Phones", 11, [
        new Node("Pixel 2 XL", 111),
        new Node("OnePlus 5T", 112)
      ], true),
      new Node("Computer", 12, [
        new Node("Alienware", 121, [
          new Node("Alienware 17", 1211),
          new Node("Alienware 14", 1212)
        ]),
        new Node("HP", 122, [
          new Node("HP Omen", 1221),
          new Node("HP Pavelion", 1222, null, true)
        ])
      ])
    ]),
    new Node("Electronics", 1, [
      new Node("Mobile Phones", 11, [
        new Node("Pixel 2 XL", 111),
        new Node("OnePlus 5T", 112)
      ], true),
      new Node("Computer", 12, [
        new Node("Alienware", 121, [
          new Node("Alienware 17", 1211),
          new Node("Alienware 14", 1212)
        ]),
        new Node("HP", 122, [
          new Node("HP Omen", 1221),
          new Node("HP Pavelion", 1222, null, true)
        ])
      ])
    ])
  ];

  public config: Config = new Config(SELECT_CHECKBOX, CHECKED_VALUE_HIGHEST_SELECTED, true, true, false, true, '400px');

  constructor() {
    console.log(this.config);
  }
  onChange(values: any) {
    console.log(values);
  }
  onDelete(value) {
    console.log(value);
  }

  onAddChild(node: Node) {
    node.children.push(new Node('child', 999));
  }

}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, SpTreeviewModule]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

import { Component } from '@angular/core';
import { Node } from './sp-treeview/model/node';
import { Config, SELECT_CHECKBOX, SELECT_RADIO, CHECKED_VALUE_HIGHEST_SELECTED, SELECT_NONE } from './sp-treeview/model/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  nodes: Node[] = [
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

  public config: Config = new Config(SELECT_NONE, CHECKED_VALUE_HIGHEST_SELECTED);

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

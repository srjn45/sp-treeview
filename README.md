# sp-treeview
Tree view component in material design for Angular 5

## Features
- Tree view with infinite levels
- treeview in dropdown
- single-select node with radio button
- multi-select nodes with checkbox (All, only Leaves, Topmost node)
- delete node
- add child node

## Installation

To install this library, run:

```bash
$ npm install sp-treeview --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install sp-treeview
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import SpTreeviewModule
import { SpTreeviewModule } from 'sp-treeview';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify SpTreeviewModule as an import
    SpTreeviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>

<sp-treeview [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview>

or

<sp-treeview-dropdown [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview-dropdown>
```

## Usage

- sp-treeview/sp-treeview-dropdown takes Node[] and Config as input
- change event is fired on selection change in case of radio button/checkbox selection, delete and addChild event also fire change event
- delete event is fired when a node is deleted
- addChild event is fired to create a child of node

> <sp-treeview [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview>

> <sp-treeview-dropdown [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview-dropdown>

## Node

Tree is consist of nodes, each node contains

- name: string - display text
- value: any -  id or object that uniquily identifies the node
- children: Node[] - list of child nodes
- checked: boolean - if the node is selected or not
- collapsed: boolean - show child nodes or not
- disabled: boolean - node is disabled or enabled
- indeterminate: boolean - some of the child nodes are selected

## Config

Config is used to show/hide template elements or change functionality

- select: number - (default: SELECT_NONE)
    - SELECT_NONE - simple tree
    - SELECT_CHECKBOX - tree nodes with checkboxex
    - SELECT_RADIO - tree nodes with radio button
- checkedValue: number - (default: CHECKED_VALUE_ALL) which values need to be emitted in change event (only valid in case of SELECT_CHECKBOX)
    - CHECKED_VALUE_ALL - all selected nodes
    - CHECKED_VALUE_LEAVES - only the selected leave nodes
    - CHECKED_VALUE_HIGHEST_SELECTED - highest selected checkbox in every isolated branch
- deleteNode: boolean - (default: false) show/hide delete button
- addChild: boolean - (default: false) show/hide addChild button
- addChildOnLeaves: boolean - (default: false) show/hide addChild button on leave nodes
- filter: boolean - (default: true) show/hide filter
- height: string - (default: "auto") height of the dropdown
- showDropdownDefault: boolean - (default: false) show/hide dropdown by default


## License

MIT © [srjn45](mailto:srajanpathak45@gmail.com)
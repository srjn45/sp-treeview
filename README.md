# sp-treeview
Tree view component in material design for Angular 5

## Features
- Tree view with infinite levels
- treeview in dropdown
- single-select node with radio button
- multi-select nodes with checkbox (All, only Leaves, Topmost node)
- delete node
- add child node

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

- select: number - (SELECT_NONE, SELECT_CHECKBOX, SELECT_RADIO)
    --SELECT_NONE - simple tree
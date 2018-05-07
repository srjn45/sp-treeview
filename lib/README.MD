# sp-treeview

## Installation

To install this library, run:

```bash
$ npm install sp-treeview --save
```

## Consuming sp-treeview

You can import sp-treeview in any Angular application as follows:

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

Once sp-treeview is imported, you can use its components in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>

<sp-treeview [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview>

or

<sp-treeview-dropdown [placeholder]="'your placeholder here'" [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview-dropdown>
```

The nodes that construct the tree are constructed using

```
Node
{
  name: string,
  value: any,
  children?: Node[],
  checked = false,
  collapsed = false,
  disabled = false,
  indeterminate = false,
  deleteNode?: boolean,
  addChild?: boolean
}
```

and configurations can ne provided using

```
Config
{
  select = SELECT_NONE,
  checkedValue = CHECKED_VALUE_LEAVES,
  deleteNode = false,
  addChild = false,
  addChildOnLeaves = false,
  filter = true,
  height = 'auto',
  showDropdownDefault = false
}
```
## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [srjn45](mailto:srajanpathak45@gmail.com)


## Change Logs

### v0.9.7

> added keywords

### v0.9.6

> fixed parent checked status when child node is deleted via chips

> fixed issue in fetching selected nodes in leaves and all options

### v0.9.5

> minor bug fixes

### v0.9.4

> added node level config for deleteNode & addChild

### v0.9.3

> added placeholder on dropdown

> fixed filter issue when the tree is collapsed

> fixed exception thrown when removing chips with collapsed dropdown
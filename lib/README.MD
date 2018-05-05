# sp-treeview

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

<sp-treeview-dropdown [placeholder]="'your placeholder here'" [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview-dropdown>
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

### v0.9.3
> added placeholder on dropdown
> fixed filter issue when the tree is collapsed
> fixed exception thrown when removing chips with collapsed dropdown
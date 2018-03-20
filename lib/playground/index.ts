/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  template: `
  <div>
    <!-- <sp-treeview [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview> -->
    <!-- <sp-treeview-dropdown [nodes]="nodes" [config]="config" (change)="onChange($event)" (delete)="onDelete($event)" (addChild)="onAddChild($event)"></sp-treeview-dropdown> -->
  </div>
  `
})
class AppComponent {
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

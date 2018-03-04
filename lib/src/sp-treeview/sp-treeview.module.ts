import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatRadioModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatChipsModule } from "@angular/material";

import { SpTreeviewComponent } from './sp-treeview/sp-treeview.component';
import { SpTreeviewNodeComponent } from './sp-treeview-node/sp-treeview-node.component';
import { SpTreeviewDropdownComponent } from './sp-treeview-dropdown/sp-treeview-dropdown.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  declarations: [
    SpTreeviewNodeComponent,
    SpTreeviewComponent,
    SpTreeviewDropdownComponent
  ],
  exports: [
    SpTreeviewNodeComponent,
    SpTreeviewComponent,
    SpTreeviewDropdownComponent
  ]
})
export class SpTreeviewModule { }

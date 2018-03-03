import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpTreeviewModule } from './sp-treeview/sp-treeview.module';
import { MatRadioModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    SpTreeviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

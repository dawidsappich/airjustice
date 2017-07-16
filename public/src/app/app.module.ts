import { DataCollectionService } from './services/data-collection.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormSetComponent } from './form-set/form-set.component';

@NgModule({
  declarations: [
    AppComponent,
    FormSetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataCollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

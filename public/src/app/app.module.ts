import { DataCollectionService } from './services/data-collection.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './routing/app-rounting.module';

import { AppComponent } from './app.component';
import { InitialFormComponent } from './components/initial-form/initial-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsComponent } from './components/forms/forms.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialFormComponent,
    NavbarComponent,
    HomeComponent,
    FormsComponent,
    SearchFlightComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataCollectionService],
  bootstrap: [AppComponent]
})

export class AppModule { }
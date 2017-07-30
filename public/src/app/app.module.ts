import { ChoiceTrackerService } from './services/choice-tracker.service';
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
import { FormContainerComponent } from './components/form-container/form-container.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FlightTimingComponent } from './components/flight-timing/flight-timing.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialFormComponent,
    NavbarComponent,
    HomeComponent,
    FormContainerComponent,
    SearchFlightComponent,
    DatePickerComponent,
    FlightTimingComponent
  ],
  entryComponents: [InitialFormComponent, FlightTimingComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataCollectionService, ChoiceTrackerService],
  bootstrap: [AppComponent]
})

export class AppModule { }
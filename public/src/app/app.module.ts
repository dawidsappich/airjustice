import { NoAuthGuard } from './guards/noAuth.guard';
import { AuthGuard } from './guards/auth.guard';
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
import { NoclaimComponent } from './components/noclaim/noclaim.component';
import { ReasonComponent } from './components/reason/reason.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialFormComponent,
    NavbarComponent,
    HomeComponent,
    FormContainerComponent,
    SearchFlightComponent,
    DatePickerComponent,
    FlightTimingComponent,
    NoclaimComponent,
    ReasonComponent,
    LoginComponent,
    RegisterComponent
  ],
  entryComponents: [InitialFormComponent, FlightTimingComponent, NoclaimComponent, ReasonComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataCollectionService, ChoiceTrackerService, AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
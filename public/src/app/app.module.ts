import { DataCollectionService } from './services/data-collection.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './routing/app-rounting.module';

import { AppComponent } from './app.component';
import { FormSetComponent } from './components/form-set/form-set.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CheckClaimComponent } from './components/check-claim/check-claim.component';
import { DirectFlightComponent } from './components/direct-flight/direct-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    FormSetComponent,
    NavbarComponent,
    HomeComponent,
    CheckClaimComponent,
    DirectFlightComponent
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HousingRegisterComponent } from './housing-register/housing-register.component';
import { PeopleRegisterComponent } from './people-register/people-register.component';
import { PersonFormComponent } from './people-register/person-form/person-form.component';
import { PersonDataComponent } from './people-register/person-data/person-data.component';
import { FlatComponent } from './housing-register/flat/flat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatFormComponent } from './housing-register/flat-form/flat-form.component';
import { PaymentRegisterComponent } from './payment-register/payment-register.component';
import { ExpanseRegisterComponent } from './expanse-register/expanse-register.component';
import { HttpClientModule } from '@angular/common/http';
import { ExpanseSummaryComponent } from './expanse-register/expanse-summary/expanse-summary.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HousingRegisterComponent,
    PeopleRegisterComponent,
    PersonFormComponent,
    PersonDataComponent,
    FlatComponent,
    FlatFormComponent,
    PaymentRegisterComponent,
    ExpanseRegisterComponent,
    ExpanseSummaryComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

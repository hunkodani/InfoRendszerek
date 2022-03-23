import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpanseRegisterComponent } from './expanse-register/expanse-register.component';
import { HousingRegisterComponent } from './housing-register/housing-register.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PaymentRegisterComponent } from './payment-register/payment-register.component';
import { PeopleRegisterComponent } from './people-register/people-register.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'housing-register', component: HousingRegisterComponent },
  { path: 'people-register', component: PeopleRegisterComponent },
  { path: 'payment-register', component: PaymentRegisterComponent },
  { path: 'expanse-register', component: ExpanseRegisterComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

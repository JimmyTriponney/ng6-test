import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuSectionComponent } from './menu/menu-section/menu-section.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuService } from './services/menu.service';
import { AdminConcessionsComponent } from './tool-admin/admin-concessions/admin-concessions.component';
import { ViewConcessionComponent } from './tool-admin/admin-concessions/view-concession/view-concession.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConcessionService } from './services/concession.service';
import { AddConcessionComponent } from './tool-admin/admin-concessions/add-concession/add-concession.component';
import { ValidatorForm } from './services/validatorForm.service';


const appRoute: Routes = [
  { path: "", component: AppComponent},
  { path: "tool/admin/concession", component: AdminConcessionsComponent},
  { path: "tool/admin/concession/add", component: AddConcessionComponent},
  { path: "tool/admin/concession/edit/:id", component: AddConcessionComponent},
  { path: "tool/admin/concession/:id", component: ViewConcessionComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuSectionComponent,
    MenuItemComponent,
    AdminConcessionsComponent,
    ViewConcessionComponent,
    AddConcessionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MenuService,
    ConcessionService,
    ValidatorForm
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { ModalModule } from './create-media-modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { MyCollectionComponent } from './my-collection/my-collection.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @ts-ignore
@NgModule({
  declarations: [AppComponent, MyCollectionComponent],
  imports: [
    BrowserModule,
    AuthModule,
    HomeModule,
    AppRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    FontAwesomeModule,
    LayoutModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [MatDatepickerModule, MatFormFieldControl],
  bootstrap: [AppComponent],
})
export class AppModule {}

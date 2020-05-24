import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';

import { MenuComponent } from './shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InfoModule } from './info/info.module';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, InfoComponent],
  imports: [
    BrowserModule,
    AuthModule,
    HomeModule,
    InfoModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

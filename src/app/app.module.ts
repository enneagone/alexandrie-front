import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { CollectionDisplayComponent } from './collection-display/collection-display.component';
import { ElementComponent } from './collection-display/element/element.component';

@NgModule({
  declarations: [AppComponent, CollectionDisplayComponent, ElementComponent],
  imports: [
    BrowserModule,
    AuthModule,
    HomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    FontAwesomeModule,
    LayoutModule,
    SharedModule,
    ProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

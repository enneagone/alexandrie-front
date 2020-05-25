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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

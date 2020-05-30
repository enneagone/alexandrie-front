import { NgModule } from '@angular/core';
import { HomeAuthResolver } from './home-auth-resolver.service';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [HomeComponent],
  providers: [HomeAuthResolver],
})
export class HomeModule {}

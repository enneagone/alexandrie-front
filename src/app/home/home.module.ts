import { NgModule } from '@angular/core';
import { HomeAuthResolver } from './home-auth-resolver.service';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [HomeRoutingModule],
  declarations: [],
  providers: [HomeAuthResolver],
})
export class HomeModule {}

import { NgModule } from '@angular/core';

import { InfoAuthResolver } from './info-auth-resolver.service';
import { InfoRoutingModule } from './info-routing.module';

@NgModule({
  imports: [InfoRoutingModule],
  declarations: [],
  providers: [InfoRoutingModule],
})
export class InfoModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing.module';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faBirthdayCake,
  faEnvelope,
  faMapMarkerAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ProfileRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [ProfileComponent],
  providers: [],
  exports: [ProfileComponent],
})
export class ProfileModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faMapMarkerAlt, faEnvelope, faUserCircle, faBirthdayCake);
  }
}

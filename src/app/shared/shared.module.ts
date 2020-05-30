import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnneagoneAngularDsModule } from 'enneagone-angular-ds';

@NgModule({
  imports: [CommonModule, EnneagoneAngularDsModule],
  exports: [CommonModule, EnneagoneAngularDsModule],
  declarations: [],
})
export class SharedModule {}

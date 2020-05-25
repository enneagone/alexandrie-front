import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { InputChipComponent } from './input-chip.component';


@NgModule({
  declarations: [
    InputChipComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports: [InputChipComponent]
})
export class InputChipModule { }

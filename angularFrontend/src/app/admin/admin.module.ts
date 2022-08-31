import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminroutingModule } from './adminrouting.module';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminroutingModule
  ]
})
export class AdminModule { }

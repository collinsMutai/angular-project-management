import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserroutingModule } from './userrouting.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, FormsModule, UserroutingModule,],
})
export class UserModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuardService } from '../Services/auth-guard.service';

const userRoutes: Routes = [{ path: '', component: UserComponent }];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserroutingModule {}

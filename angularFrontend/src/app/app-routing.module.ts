import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data:{animation:'home'} },
  { path: 'login', component: LoginComponent, data:{animation:'login'} },

  {
    path: 'user', canActivate:[AuthGuardService],
    data:{user:true},
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin', canActivate:[AuthGuardService],
    data:{admin:true},
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

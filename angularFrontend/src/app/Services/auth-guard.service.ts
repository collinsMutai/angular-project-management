import { Injectable } from '@angular/core';
import {  CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService:AuthService, private router:Router){ }
  canActivate() {
   if(this.authService.isLoggedin()){
    return true
   }else{
    return false
   }
  }
}

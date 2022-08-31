import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedin=false

  login(){
    this.isLoggedin=true
  }
  logout(){
    this.isLoggedin=false
  }
  isauthenticated(){
    const promise = new Promise<boolean>((
      resolve,reject
    )=>{
      setTimeout(() => {
        resolve(this.isLoggedin)
      }, 500);
    })
    return promise
  }
}

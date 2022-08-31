import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  prom= new Promise<string>((resolve,reject)=>{
    setTimeout(()=>{
      resolve('Welcome to TheJitu School')
    },3000)
  })
 
  onLogout(){
    this.authService.logout()
    this.router.navigate(['/'])
  }


}

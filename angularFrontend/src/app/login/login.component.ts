import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../interfaces/login';
import { UserService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  @ViewChild('form') form!: NgForm;

  constructor(private userService: UserService,     private router:Router
    ) {}

  ngOnInit(): void {}
  onSubmit() {
    // console.log(this.form.value);
    const user: login = this.form.value

    this.userService.login(user).subscribe(
      (response) => {
        // console.log(response);
        response.token ? localStorage.setItem('token', response.token) : ''
        this.redirect()
      },
      (error) => console.log(error),
      () => console.log('user logged in')
    );
  }
  redirect(){
    const token = localStorage.getItem('token') as string
    this.userService.checkuser().subscribe(
      (response)=>{
        console.log(response);
        localStorage.setItem('name', response.name)
        localStorage.setItem('email', response.email)
        localStorage.setItem('role', response.role)

        if (response.role === 'admin') {
          this.router.navigate(['/admin'])

      } else {
        this.router.navigate(['/user'])
      }
        
      }
    )
  }
}

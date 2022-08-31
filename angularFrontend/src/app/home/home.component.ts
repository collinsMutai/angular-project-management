import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { register } from '../interfaces/register';
import {  RegisterService } from '../Services/signup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  name!:string;
  email!:string;
  password!:string
  constructor(private registerService:RegisterService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(8), this.checkSpecialCharacters, this.checkNumber, this.checkCapital]),
    });
  }
  onSubmit() {
    // console.log(this.form.value);
    const user:register=this.form.value

    console.log(user);
    
    this.registerService.signUp(user).subscribe(
      (response)=> console.log(response),
      (error)=> console.log(error),
      ()=> console.log('user added')
      
      
      
    )
  }
  checkSpecialCharacters(control:FormControl):{[s:string]:boolean   }|null{
    const value = control.value
    const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]+/.test(value)
    return !special?{special:true}:null
  
  }
  checkNumber(control:FormControl):{[s:string]:boolean   }|null{
    const value = control.value
    const number =  /[0-9]+/.test(value)
    return !number?{number:true}:null
   
  }
  checkCapital(control:FormControl):{[s:string]:boolean   }|null{
    const value = control.value
    const capital =  /[A-Z]+/.test(value)
    return !capital?{capital:true}:null
  
  }
  checkMinimum(): boolean{
    const result = this.form.get('password')?.errors!['minlength'] as {actualLength:number, requiredLength:number}
    if(result.actualLength<result.requiredLength){
      return true
    }else{
       return false
    }
  }
}

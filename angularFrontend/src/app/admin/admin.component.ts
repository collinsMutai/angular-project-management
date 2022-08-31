import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  name!:string;
  email!:string;
  password!:string
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }
onSubmit(){
  
}
}

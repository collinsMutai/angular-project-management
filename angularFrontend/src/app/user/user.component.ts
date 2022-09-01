import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getProject()
  }
getProject(){

  this.userService.fetchProject().subscribe(
    (response)=>{
      console.log(response);

    }
  )
}
}

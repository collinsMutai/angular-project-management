import { Component, OnInit } from '@angular/core';
import { ProjectInterface } from '../interfaces/project';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userProject: ProjectInterface[] = [];
  names: string | null = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.names = localStorage.getItem('name');

    this.getProject();
  }
  getProject() {
    this.userService.fetchProject().subscribe((response) => {
      console.log(response);
      this.userProject = response;
    });
  }
  completeAProject(project_id:string){
    this.userService.completeProject(project_id).subscribe(
      (response)=>{
        console.log(response);
        this.getProject()

      }
    )
  }
}

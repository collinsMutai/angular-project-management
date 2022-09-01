import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectInterface } from '../interfaces/project';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  name!: string;
  description!: string;
  end_date!: string;
  select_user!: string;
  selectOptions: any[] = [];
  projects: ProjectInterface [] = []
  names: string | null = '';
  // newProject!:string
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.names = localStorage.getItem('name');
    this.getUsers();
    this.getProjects();
    this.form = new FormGroup({
      name: new FormControl(null),
      description: new FormControl(null),
      end_date: new FormControl(null),
      assigned_user_email: new FormControl('assigned_user_email'),
    });
  }
  onSubmit() {
    const newproject: ProjectInterface = this.form.value;
    // console.log(this.form.value);
    this.adminService.assignProject(newproject).subscribe(
      (response) => {
        console.log(response);
        this.getProjects()
      },
      (error) => console.log(error)
    );
  }
  getUsers() {
    this.adminService.fetchUsers().subscribe((response) => {
      this.selectOptions = response;
      console.log(response);

    });

  }
  getProjects(){
    this.adminService.fetchProjects().subscribe((response)=>{
      this.projects = response
      console.log(this.projects);

    })
  }
}

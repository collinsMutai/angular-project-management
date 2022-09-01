import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectInterface } from '../interfaces/project';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl="http://localhost:7000/user/users"
assignProjectUrl="http://localhost:7000/project/newproject"
projectsUrl="http://localhost:7000/project/projects"
  constructor(private http:HttpClient) { }

  fetchUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}`)
  }
  assignProject(newProject:ProjectInterface):Observable<ProjectInterface>{
    return this.http.post<ProjectInterface>(`${this.assignProjectUrl}`,newProject)
  }
  fetchProjects():Observable<ProjectInterface[]>{
    return this.http.get<ProjectInterface[]>(`${this.projectsUrl}`)
  }
}

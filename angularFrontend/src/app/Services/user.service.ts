import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchProjectInterface, ProjectInterface } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
baseUrl="http://localhost:7000/project/project"

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
this.fetchProject()
  }

  fetchProject():Observable<ProjectInterface[]>{
    const assigned_user_email = localStorage.getItem('email') as string

    return this.http.get<ProjectInterface[]>(`${this.baseUrl}/${assigned_user_email}`)
  }
}

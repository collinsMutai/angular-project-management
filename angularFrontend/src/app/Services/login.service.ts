import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Observable } from 'rxjs';
import { login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="http://localhost:7000/user/login"
  checkUrl="http://localhost:7000/user/check"

  constructor(private http:HttpClient) { }

  login(user:login):Observable<login>{
    return this.http.post<login>(`${this.baseUrl}`,user)
  }
  checkuser():Observable<{ name: string, role: string, email: string }>{
    const token = localStorage.getItem('token') as string
    return this.http.get<{ name: string, role: string, email: string }>(`${this.checkUrl}`,{
      headers:new HttpHeaders({token})
    }
    )
  }
}


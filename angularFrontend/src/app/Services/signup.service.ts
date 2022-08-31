import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl="http://localhost:7000/user/signup"

  constructor(private http:HttpClient) { }

  signUp(user:register):Observable<register>{
    return this.http.post<register>(`${this.baseUrl}`,user)
  }
}

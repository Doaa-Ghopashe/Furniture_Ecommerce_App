import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http:HttpClient) { }

  register(data:UserInterface){
    return this.http.post('http://localhost:4000/register',data);
  }

  login(data:UserInterface){
    return this.http.post('http://localhost:4000/login',data)
  }

  profile(){

  }
}
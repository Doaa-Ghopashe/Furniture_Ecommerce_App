import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class VerifyTokenService {
  decodedToken!:any;
  constructor() { }

  decodeToken(){
    let token = sessionStorage.getItem('token');
    if(token){
      this.decodedToken = jwt_decode(token);
      return this.decodedToken.name
    }
  }
}

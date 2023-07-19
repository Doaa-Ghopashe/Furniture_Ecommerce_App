import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  
  getProducts() {
    return this.http.get(`https://64b28a4238e74e386d553b5c.mockapi.io/Data/Furnitures`);
  }
  
}

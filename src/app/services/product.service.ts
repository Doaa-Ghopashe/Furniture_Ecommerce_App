import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(data:any){
    return this.http.post('http://localhost:4000/product/add-product',data);
  }

  editProduct(){
    return ;
  }

  deleteProduct(){
    return ;
  }

  listProducts(){
    return ;
  }
}

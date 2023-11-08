import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    return this.http.post('http://localhost:4000/product/add-product', data);
  }

  editProduct(data: any) {
    return this.http.put('http://localhost:4000/product/update-product', data);
  }

  deleteProduct(id: String) {
    return this.http.delete(`http://localhost:4000/product/delete-product/${id}`);
  }

  listProducts() {
    return this.http.get('http://localhost:4000/product');
  }
}

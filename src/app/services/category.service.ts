import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(data: any) {
    return this.http.post('http://localhost:4000/category/add-category', data);
  }

  getAllCategories() {
    return this.http.get('http://localhost:4000/category/list-categories');
  }

  deleteCategory(id: String) {
    return this.http.delete(`http://localhost:4000/category/delete-category/${id}`)
  }

  updateCategory(data: any) {
    return this.http.put('http://localhost:4000/category/update-category', data);
  }
}

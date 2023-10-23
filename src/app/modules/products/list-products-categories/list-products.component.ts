import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {

  constructor(private router:Router){}

  NavigateToAddCategory(){
    this.router.navigate(['products/add-category'])
  }
}

import { Component } from '@angular/core';

import { ProductService } from '../services/product.service';
import { ProductInterface } from '../interfaces/product-interface';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  productlist!:ProductInterface[]

  constructor(private productservice:ProductService){}

  ngOnInit()
  {
    this.productservice.getProducts().subscribe((res:any)=>  this.productlist = res)
  }
}

import { Component } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product-interface';

import { ProductService } from 'src/app/services/product.service';
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

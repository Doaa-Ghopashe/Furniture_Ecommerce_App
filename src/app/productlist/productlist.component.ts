import { Component } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import ProductData from '../db.json';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  productlist:ProductInterface[] = ProductData
}

import { Component, Input } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';
import ProductData from '../db.json';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  @Input() product : ProductInterface | any;
  productlist:ProductInterface[] = ProductData
  constructor(private activetedrouter:ActivatedRoute)
  {

  }
  ngOnInit()
  {
    this.product = this.productlist.find((product)=>{
      return product.id == this.activetedrouter.snapshot.params['id'] && product.category == this.activetedrouter.snapshot.params['category']
    })
  }
}

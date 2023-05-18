import { Component, Input } from '@angular/core';

import { ProductInterface } from '../interfaces/product-interface';

import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../services/product.service';

import { faStar as solidsatr } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})

export class ProductdetailsComponent {
  @Input() productItem : ProductInterface | any;
  productlist!:ProductInterface[] ;
  solidfastar = solidsatr;
  regularfastar = faStar
  constructor(private activetedrouter:ActivatedRoute,private productservice:ProductService){}

  ngOnInit()
  {
    this.productservice.getProducts().subscribe(
      (res:any)=>{
        this.productItem =  res?.['products']?.find((product:ProductInterface)=>{
        return product.id == this.activetedrouter.snapshot.params['id']
        })
      }
    )
  }
  
}

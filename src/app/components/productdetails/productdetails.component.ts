import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';


import { faStar as solidsatr } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})

export class ProductdetailsComponent {
  @Input() productItem: ProductInterface | any;
  productlist!: ProductInterface[];
  solidfastar = solidsatr;
  regularfastar = faStar
  constructor(private activetedrouter: ActivatedRoute, private productservice: ProductService) { }

  ngOnInit() {
    this.productservice.getProducts().subscribe(
      (res: any) => {
        this.productItem = res?.['products']?.find((product: ProductInterface) => {
          return product.id == this.activetedrouter.snapshot.params['id']
        })
      }
    )
  }

}

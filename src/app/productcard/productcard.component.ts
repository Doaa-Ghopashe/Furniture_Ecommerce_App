import { Component, Input } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent {
  @Input() productItem:ProductInterface | any;
  @Input() val!:string;

  constructor (private router:Router)
  {

  }
  showDetails (id:number , category:string)
  {
    this.router.navigate(['productdetails',category,id])
  }
}

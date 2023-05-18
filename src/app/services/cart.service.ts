import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInterface } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject([]);
  cart_lsit!:ProductInterface[]|any;
  pubCart = this.cart.asObservable();
  constructor() { 
    this.cart_lsit =[]
  }
  
  setProductToCart (newProduct:any)
  {

    this.cart_lsit.push(newProduct)

    this.cart.next(this.cart_lsit)
  }
  getProductFromCart ()
  {
    return this.pubCart;
  } 
  removeProductFromCart (product:ProductInterface)
  {
    let prd_pos = this.cart_lsit.indexOf(product);
    this.cart_lsit.splice(prd_pos,1)
  }
}

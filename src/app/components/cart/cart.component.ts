import { Component } from '@angular/core';

import { ProductInterface } from '../../interfaces/product-interface';

import { CounterService } from '../../services/counter.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  counter!: number;
  cartlist !: ProductInterface[];
  prodquan!: number

  constructor(private counterservice: CounterService,  private cartservice: CartService) { }

  ngOnInit() {
    this.cartservice.getProductFromCart().subscribe((res: any) => this.cartlist = res)
    this.counterservice.getCounterVal().subscribe((res: number) => this.counter = res);
  }

  increment(product: ProductInterface, prodquan: number) {
    if (product.count && prodquan - product.count != 0) {
      this.counterservice.setCounter(++this.counter)
      product.count += 1
    }
  }

  decrement(product: ProductInterface, prodquan: number) {
    if (product.count && prodquan - product.count != 0 && product.count !== 1) {
      this.counterservice.setCounter(--this.counter);
      product.count -= 1;
    }
  }

  removecart(product: ProductInterface) {
    if (product.count) {
      let cartpos: number = this.cartlist.indexOf(product);
      this.counterservice.setCounter(this.counter - product.count);
      product.count = 0;
      this.cartlist.splice(cartpos, 1);
    }
  }

}

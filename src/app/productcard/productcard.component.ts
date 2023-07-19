import { Component, Input } from '@angular/core';
import { ProductInterface } from '../interfaces/product-interface';
import { Router } from '@angular/router';
import { CounterService } from '../services/counter.service';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent {
  @Input() productItem:any;
  @Input() val!:string;
  counter!:number;
  products!:ProductInterface[];
  product!:any
  constructor (private router:Router,private counterservice:CounterService ,private productservice:ProductService , private cartservice : CartService){}
  //
  ngOnInit()
  {
    this.counterservice.getCounterVal().subscribe((res)=>this.counter = res);
    this.productservice.getProducts().subscribe((res:any)=> this.products = res.products)
  }
  //
  showDetails (id:number )
  {
    this.router.navigate(['productdetails',id])
  }
  //
  addtocart(e:any)
  {
    e.stopPropagation();
    
    let prd_name:string = e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    
    if(e.target.innerText.toLowerCase() == "add to cart")
    {
      this.product = this.products.find((product:any)=>{
         return product.title.toUpperCase() == prd_name
      }) ;
     
      if(this.product?.stock > 0 )
      {
          this.counterservice.setCounter(this.counter+1);
          e.target.innerText = "Remove from cart"
          e.target.style.backgroundColor = "#c90d0d";
          e.target.style.color = "white"
          this.product.count = 1
          this.cartservice.setProductToCart(this.product);
      }
      
    }
    else
    {
      this.counterservice.setCounter(this.counter-1);
      e.target.innerText = "add to cart"
      e.target.style.backgroundColor = "rgb(252, 219, 135)";
      e.target.style.color = "black"
      this.product.count = 0
      this.cartservice.removeProductFromCart(this.product);
    }
    
  }
  
  
}

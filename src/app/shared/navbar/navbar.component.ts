import { Component } from '@angular/core';
import { faCartPlus,faUser } from '@fortawesome/free-solid-svg-icons';
import { CounterService } from 'src/app/services/counter.service';
import $ from "jquery";
import {  OwlOptions } from 'ngx-owl-carousel-o';
import { OwlDOMData } from 'ngx-owl-carousel-o/lib/models/owlDOM-data.model';
import { VerifyTokenService } from 'src/app/services/verify-token.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  facart:any = faCartPlus;
  fauser:any = faUser;
  currentMode:string = "black";
  count!:number;
  signedIn!:boolean;
  username!:string;
  // customOptions!:OwlOptions;
  // slides !: any;
  constructor(private counter:CounterService,private decodeToken:VerifyTokenService){}

  ngOnInit()
  {
    this.username = this.decodeToken.decodeToken()

    this.counter.counterVal.subscribe((res)=>this.count = res);

    this.signedIn = sessionStorage.getItem('token') ? true : false

  }

  changeMode(){

  }

  logout(){
    sessionStorage.removeItem('token')
  }

}

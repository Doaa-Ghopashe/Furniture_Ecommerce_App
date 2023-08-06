import { Component } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CounterService } from '../services/counter.service';
import $ from "jquery";
import {  OwlOptions } from 'ngx-owl-carousel-o';
import { OwlDOMData } from 'ngx-owl-carousel-o/lib/models/owlDOM-data.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  facart = faCartPlus;
  count!:number;
  customOptions!:OwlOptions;
  slides !: any;
  constructor(private counter:CounterService){}

  ngOnInit()
  {
    this.counter.counterVal.subscribe((res)=>this.count = res)
    $(".dropdown .btn").click(() => {
      $(".dropdown-mode").slideToggle();
  
    })

  }

}

import { Component } from '@angular/core';
import { faCartPlus,faUser } from '@fortawesome/free-solid-svg-icons';
import { CounterService } from 'src/app/services/counter.service';
import $ from "jquery";
import {  OwlOptions } from 'ngx-owl-carousel-o';
import { OwlDOMData } from 'ngx-owl-carousel-o/lib/models/owlDOM-data.model';
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
  // customOptions!:OwlOptions;
  // slides !: any;
  constructor(private counter:CounterService){}

  ngOnInit()
  {

    this.counter.counterVal.subscribe((res)=>this.count = res)
    $(".dropdown .btn").click(() => {
      $(".dropdown-mode").slideToggle();
    })

  }

  changeMode(){
    if(this.currentMode == "black"){
      document.documentElement.style.setProperty('--mode', '#e9e9e9');
      document.documentElement.style.setProperty('--fontcolor', 'black');
    }else{
      document.documentElement.style.setProperty('--mode', 'black');
      document.documentElement.style.setProperty('--fontcolor', 'white');
    }
    this.currentMode  = document.documentElement.style.getPropertyValue('--mode');
  }

}

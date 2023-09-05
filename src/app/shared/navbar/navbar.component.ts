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
      document.documentElement.style.setProperty('--mode', 'white');
      document.documentElement.style.setProperty('--fontcolor', 'black');
      document.documentElement.style.setProperty('--navbarcolor', '#dadada');
      document.documentElement.style.setProperty('--overlaycolor', 'linear-gradient(90deg, rgba(255, 255, 255, 0.44) 50%, rgba(255, 255, 255, 0.17) 50%)');
      document.documentElement.style.setProperty('--btncolor', '#bbbbbb');
      document.documentElement.style.setProperty('--bordercolor', 'rgb(255 255 255 / 46%)');
    }else{
      document.documentElement.style.setProperty('--mode', 'black');
      document.documentElement.style.setProperty('--fontcolor', 'white');
      document.documentElement.style.setProperty('--navbarcolor', 'rgb(33, 33, 33)');
      document.documentElement.style.setProperty('--overlaycolor', 'linear-gradient(90deg, rgba(0, 0, 0, 0.44) 50%, rgba(0, 0, 0, 0.17) 50%)');
      document.documentElement.style.setProperty('--btncolor', '#484848');
      document.documentElement.style.setProperty('--bordercolor', 'rgba(39, 39, 39, 0.137)');
    }
    this.currentMode  = document.documentElement.style.getPropertyValue('--mode');
  }

}

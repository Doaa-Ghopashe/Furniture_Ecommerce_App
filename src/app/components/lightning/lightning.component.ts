import { Component } from '@angular/core';

@Component({
  selector: 'app-lightning',
  templateUrl: './lightning.component.html',
  styleUrls: ['./lightning.component.css']
})
export class LightningComponent {
  cord!:any;
  bulb:string = "lightoff";
  constructor(){
    this.cord = document.getElementById("cord");
  }
  changebulb(){

   if(this.bulb == "lightoff" ){
    this.bulb  = "lighton";
    document.documentElement.style.setProperty('--headerbgColor','rgba(199, 250, 167, 0.77) 0%, rgba(190, 255, 150, 0.77) 37.19%, rgba(255, 255, 255, 0.77) 99.99%, rgba(155, 190, 137, 0.77) 100%')
   }else{
    this.bulb  = "lightoff";
    document.documentElement.style.setProperty('--headerbgColor','rgba(199, 250, 167, 0.64) 0%, rgba(190, 255, 150, 0.60) 44.89%, rgba(255, 255, 255, 0.68) 99.99%')
   }
  }
}

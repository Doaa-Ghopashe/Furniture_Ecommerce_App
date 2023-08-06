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
    if(this.bulb == "lighton"){
      this.bulb = "lightoff";
      document.documentElement.style.setProperty('--mode', 'black');
      document.documentElement.style.setProperty('--fontcolor', 'white');
    }else{
      this.bulb = "lighton";
      document.documentElement.style.setProperty('--mode', 'white');
      document.documentElement.style.setProperty('--fontcolor', 'black');
    }
  }
}

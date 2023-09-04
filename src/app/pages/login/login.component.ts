import { Component } from '@angular/core';
import { faEyeSlash , faChevronLeft , faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { 
  // Trigger is imported here
  trigger, 
  state, 
  style, 
  transition, 
  animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
  
    // Trigger is used here
    trigger('openedwindow',[
      state('signup', style({
        // dispaly:"flex",
        width:'100%',
      })),
      state('signin', style({
        width:'0%',
        padding:0,
        margin:0,
        height:0
      })),
      transition('signup => signin',animate(200)),
      transition('signin => signup',animate(200))
    ])
  ]
})
export class LoginComponent {
  faeye:any = faEyeSlash;
  faright: any = faChevronRight;
  faleft:any = faChevronLeft;
  state = 'green';
  div:any = {
    signup:true,
    signin:false
  }

  openwindow() {
    this.state == 'signup' ?
    this.state = 'signin' : this.state = 'signup';
  }
}

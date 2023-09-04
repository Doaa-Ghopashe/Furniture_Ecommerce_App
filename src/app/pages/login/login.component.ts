import { Component } from '@angular/core';
import { faEyeSlash, faChevronLeft, faChevronRight, faExclamationCircle, faEye} from '@fortawesome/free-solid-svg-icons';

import { 
  // Trigger is imported here
  trigger, 
  state, 
  style, 
  transition, 
  animate } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('openedwindow',[
      state('signup', style({
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
  faeyeslash:any = faEyeSlash;
  faeye:any = faEye;
  isShown:boolean = false;
  isShown2:boolean = false;
  faright: any = faChevronRight;
  faleft:any = faChevronLeft;
  errorSign:any=faExclamationCircle;

  state:string = 'signup';
  

  signInForm = new FormGroup({
    "fullName":new FormControl("",[Validators.required]),
    "email" : new FormControl("",[Validators.required,Validators.email]),
    "address":new FormControl("",[Validators.required]),
    "phoneNumber":new FormControl("",[Validators.required,Validators.pattern(/[0-9]{10}/)]),
    "password":new FormControl("",[
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{8,}$/)]),
    "confirmPass":new FormControl("",[Validators.required]),
  })
  openwindow = () =>this.state == 'signup' ? this.state = 'signin' : this.state = 'signup';

  loginIn(){

  }

  showPassword(){
    this.isShown =!this.isShown;
  }
  showConfirmPassword(){
    this.isShown2 =!this.isShown2
  }
}

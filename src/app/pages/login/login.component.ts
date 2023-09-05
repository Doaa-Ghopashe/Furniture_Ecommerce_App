import { Component } from '@angular/core';
import { faEyeSlash, faChevronLeft, faChevronRight, faExclamationCircle, faEye, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { trigger,state, style, transition, animate } from '@angular/animations';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
  faeyeslash:IconDefinition;
  faeye:IconDefinition;
  faright: IconDefinition;
  faleft:IconDefinition;
  errorSign:IconDefinition;
  
  isShown:boolean;
  isShown2:boolean;
  state:string;

  signInForm:FormGroup;
  
  
  constructor(private fb : FormBuilder){
    this.faeye = faEye;
    this.faeyeslash = faEyeSlash;
    this.faright = faChevronRight;
    this.faleft = faChevronLeft;
    this.errorSign=faExclamationCircle;

    this.signInForm = fb.group({
      "fullName": ["",Validators.required],
      "email": ["",[Validators.required,Validators.email]],
      // "address":["",Validators.required],
      // "phoneNumber":["",[Validators.required,Validators.pattern(/[0-9]{10}/)]],
      "password":["",[   Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{8,}$/)]],
      "confirmPass":["",[Validators.required,this.checkMatching()]]
    }) // we can dispense of phoneNumber and address and put them in another form

    this.state = 'signup';
    this.isShown = false;
    this.isShown2 = false;
  }

  ngOnInit(){
    
  }

  //A custom validator to check if confirmed password match password or not
  checkMatching():ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null =>{
      const val = control.value;
      return val == this.signInForm?.controls["password"]?.value?null:{passwordMatch:true};
    }
  }

  loginIn(){
    
  }

 
}

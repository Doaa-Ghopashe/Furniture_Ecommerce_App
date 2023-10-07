import { Component } from '@angular/core';
import { faEyeSlash, faChevronLeft, faChevronRight, faExclamationCircle, faEye, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { trigger,state, style, transition, animate } from '@angular/animations';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { error } from 'jquery';
import Swal from 'sweetalert2';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Route, Router } from '@angular/router';
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
  signUpForm:FormGroup;
  signInForm:FormGroup;
  
  constructor(private fb : FormBuilder,private user_service:UserService,private router:Router){
    this.faeye = faEye;
    this.faeyeslash = faEyeSlash;
    this.faright = faChevronRight;
    this.faleft = faChevronLeft;
    this.errorSign=faExclamationCircle;

    this.signUpForm = fb.group({
      name: ["",Validators.required],
      email: ["",[Validators.required,Validators.email]],
      password:["",[   Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{8,}$/)]],
      confirmPassword:["",[Validators.required,this.checkMatching()]]
    })

    this.signInForm = fb.group({
      email: ["",[Validators.required,Validators.email]],
      password:["",[   Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{8,}$/)]],
    })
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
      return val == this.signUpForm?.controls["password"]?.value?null:{passwordMatch:true};
    }
  }

  register(){
    //after the register successding we want to redirect the user to the login
    this.user_service.register(this.signUpForm.value).subscribe({
      next:(res)=>{
        setTimeout(()=>{
          this.signUpForm.reset();
          this.state = 'signin';
        },200)
      },
      error:(res)=>{
        Swal.fire({
          text:res.error,
          showConfirmButton:false,
          timer:5000,
          icon:'error',
          width: 600,
          padding: '3em',
          backdrop: `
            rgba(0,0,0,0.4)
            left top
            no-repeat
          `
        })
      }
    })
  }

  logIn(){
    console.log(this.signInForm.value)
    this.user_service.login(this.signInForm.value).subscribe({
      next:(res)=>{
        sessionStorage.setItem('token',JSON.stringify(res));                                                                                                                                  
        this.router.navigate(['/']);
      },
      error:(res)=>{
        Swal.fire({
          text:res.error,
          icon:'error',
          timer:5000,
          showConfirmButton:false,
          width: 600,
          padding: '3em',
          backdrop: `
            rgba(0,0,0,0.4)
            left top
            no-repeat
          `
        })
      }
    })
  }

 
}

import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorSign = faExclamationCircle;
  radius: number = 0
  size: number = 0
  word!: string;
  arr: string[] = ["Hungry ?", "Go, And", "Register"];
  i: number = 0;
  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      usrname: new FormControl('', [Validators.pattern(/^([A-Z]+.[0-9]*|[a-z]+.[0-9]*).$/), Validators.required]),
      pass: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!|\$|@|%|#])/), Validators.required, Validators.minLength(8)]),
      passconfirm: new FormControl('', [Validators.required, this.createPasswordConfirmValidator()])

    })

    setInterval(() => {
      if (this.radius < 100) {
        this.word = this.arr[this.i]
        this.radius += this.radius + 100
        this.size = 30
      }
      else {
        if (this.i < this.arr.length - 1) {
          this.i++;
        }
        else {
          this.i = 0
        }
        this.radius = 0;
        this.size = 0
      }
    }, 3000)
  }
  onRegister() {
    console.log(this.registerForm.controls['pass'])

  }
  createPasswordConfirmValidator(pass?: any): ValidatorFn {
    let passwordValid:Boolean;

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (this.registerForm?.controls['pass'].value) {

        passwordValid = (value == this.registerForm?.controls['pass'].value) ? true : false ;

        return !passwordValid ? { matched: true } : null;
      }
      return { matched: true };
    }
  }

  overfield(e:any)
  {
    e.target.previousElementSibling.style.fontSize = "12px";
    e.target.previousElementSibling.style.top = "0"
  }

  checkval(e:any)
  {
    if(!e.target.value)
    {
      e.target.previousElementSibling.style.fontSize = "18px";
      e.target.previousElementSibling.style.top = "12px"
    }
    
  }
}


//pattern(/.+@(gmail|yahoo).com/)

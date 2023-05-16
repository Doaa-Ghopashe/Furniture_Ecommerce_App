import { Component } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorSign = faExclamationCircle;
  radius: number = 0
  size: number = 0
  word!: string;
  arr: string[] = ["Starving ?", "So, Go And", "Login"];
  i: number = 0;
  constructor() {
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
  loginIn(loginForm:any) {
    // console.log(this.registerForm.controls['pass'])

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

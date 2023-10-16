import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgettenpass',
  templateUrl: './forgettenpass.component.html',
  styleUrls: ['./forgettenpass.component.css']
})
export class ForgettenpassComponent {
  emailForm!: FormGroup;
  errorSign!: IconDefinition;

  constructor(private fb: FormBuilder, private user_service: UserService, private rooute: ActivatedRoute) { }
  ngOnInit() {
    this.errorSign = faExclamationCircle;

    this.emailForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }

  sendMail() {
    const { userId, uniqueString } = this.rooute.snapshot.params;
    /////////ERRORRRRRR
    this.user_service
      .forgetPassword(userId, uniqueString,this.emailForm.value)
      .subscribe((res:any) => { 
        console.log(res.message);
      })
  }
}

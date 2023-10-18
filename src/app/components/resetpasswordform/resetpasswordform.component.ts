import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resetpasswordform',
  templateUrl: './resetpasswordform.component.html',
  styleUrls: ['./resetpasswordform.component.css']
})
export class ResetpasswordformComponent {
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
      .passwordReset  (userId, uniqueString,this.emailForm.value)
      .subscribe((res:any) => { 
        console.log(res.message);
      })
  }
}

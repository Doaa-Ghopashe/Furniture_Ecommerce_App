import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
    this.user_service
      .passwordReset  (userId, uniqueString,this.emailForm.value)
      .subscribe({
        next:(res:any)=>{
          Swal.fire({
            text:res.message,
            showConfirmButton:false,
            timer:5000,
            icon:'success',
            width: 600,
            padding: '3em',
            backdrop: `
              rgba(0,0,0,0.4)
              left top
              no-repeat
            `
          })
        },
        error:(res)=>{
          Swal.fire({
            text:res.error.message,
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
}

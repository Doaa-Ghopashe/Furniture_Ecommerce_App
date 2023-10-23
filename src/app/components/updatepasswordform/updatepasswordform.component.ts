import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IconDefinition, faExclamationCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatepasswordform',
  templateUrl: './updatepasswordform.component.html',
  styleUrls: ['./updatepasswordform.component.css']
})
export class UpdatepasswordformComponent {
  resetPasswordForm!: FormGroup;
  isShown!: boolean;
  isShown2!: boolean;
  faeyeslash!: IconDefinition;
  faeye!: IconDefinition;
  errorSign!: IconDefinition;

  constructor(private user_service: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      password: ["", [Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{8,}$/)]],
      confirmPassword: ["", [Validators.required, this.checkMatching()]]
    })
    this.isShown = false;
    this.isShown2 = false;
    this.faeye = faEye;
    this.errorSign = faExclamationCircle;
    this.faeyeslash = faEyeSlash;
  }

  saveNewPassword() {
    const { userId,uniqueString } = this.route.snapshot.params;
    this.user_service
      .updatePassword(this.resetPasswordForm.value,userId,uniqueString )
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
          });
          setTimeout(()=>{
            this.router.navigate(['/login']);
          },200)
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

  //A custom validator to check if confirmed password match password or not
  checkMatching(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      return val == this.resetPasswordForm?.controls["password"]?.value ? null : { passwordMatch: true };
    }
  }
}

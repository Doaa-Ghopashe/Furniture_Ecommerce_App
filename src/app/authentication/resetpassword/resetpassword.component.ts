import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IconDefinition, faExclamationCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  resetPasswordForm!: FormGroup;
  isShown!: boolean;
  isShown2!: boolean;
  faeyeslash!: IconDefinition;
  faeye!: IconDefinition;
  errorSign!: IconDefinition;

  constructor(private user_service: UserService, private fb: FormBuilder, private route: ActivatedRoute) { }

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
      .subscribe()
  }

  //A custom validator to check if confirmed password match password or not
  checkMatching(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      return val == this.resetPasswordForm?.controls["password"]?.value ? null : { passwordMatch: true };
    }
  }
}

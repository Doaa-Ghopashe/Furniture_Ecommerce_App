import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IconDefinition, faHandshake } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  message:string = "Waiting for verification";
  fashake!:IconDefinition;
  constructor(private user_service:UserService,private route:ActivatedRoute,private router:Router){
  
  }

  ngOnInit(){
    const {userId,uniqueString}=this.route.snapshot.params;

    this.fashake = faHandshake;

    this.user_service.verificationRequest(userId,uniqueString).subscribe({
      next:(res:any)=>{
        this.message = res.message
      },
      error:(res:any)=>{
        this.message = res.error.message
      }
    })
  }

  redirectToSignIn(){
    this.router.navigate(["login"])
  }
}

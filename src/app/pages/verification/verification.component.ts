import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  message:string = "Waiting for verification";

  constructor(private user_service:UserService,private route:ActivatedRoute){
  
  }

  ngOnInit(){
    const {userId,uniqueString}=this.route.snapshot.params;

    this.user_service.verificationRequest(userId,uniqueString).subscribe((res:any)=>{
      this.message = res.message
    })
  }
}

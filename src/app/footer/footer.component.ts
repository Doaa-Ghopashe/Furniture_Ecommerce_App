import { Component } from '@angular/core';
import { faArrowAltCircleRight , faClock , faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faInstagram , faFacebook , faTwitter , faDropbox } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faarrow = faArrowAltCircleRight;
  fainstgram = faInstagram;
  fafacebook = faFacebook;
  fatwitter = faTwitter;
  faclock = faClock;
  fahand = faHandshake;
  fatimer= faDropbox
}

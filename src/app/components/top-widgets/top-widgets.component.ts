import { Component } from '@angular/core';
import { Icon, IconDefinition, toHtml } from '@fortawesome/fontawesome-svg-core';
import { faBoxes, faDollarSign, faMapMarkerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent {
  locationIcon!:IconDefinition;
  boxesIcon!:IconDefinition;
  poundIcon!:IconDefinition
  userIcon!:IconDefinition;

  constructor(){}

  ngOnInit(){
    this.locationIcon = faMapMarkerAlt;
    this.boxesIcon = faBoxes;
    this.poundIcon = faDollarSign;
    this.userIcon = faUsers
  }
}

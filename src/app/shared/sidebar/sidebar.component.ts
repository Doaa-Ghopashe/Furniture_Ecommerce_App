import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChair, faChartPie, faEnvelope, faHome, faTable, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 homeIcon1!:IconDefinition;
 userIcon!:IconDefinition;
 envlopeIcon!:IconDefinition;
 chartPieIcon!:IconDefinition;
 homeIcon2!:IconDefinition;
 settingIcon!:IconDefinition;

 constructor(){}
 ngOnInit(){
  this.homeIcon1 = faChair;
  this.homeIcon2 = faTable;

  this.userIcon = faUsers;
  this.envlopeIcon = faEnvelope;
  this.chartPieIcon = faChartPie;
  this.settingIcon ;

 }
}

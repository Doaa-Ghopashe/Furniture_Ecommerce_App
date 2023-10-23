import { Component } from '@angular/core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
  warningicon = faExclamationTriangle
}

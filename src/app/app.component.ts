import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faExclamationCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cpanle';
  trashIcon!:IconDefinition;
  infoIcon!:IconDefinition;
  penIcon!:IconDefinition;
  leftChevronIcon!:IconDefinition;
  rightChevronIcon!:IconDefinition;

  ngOnInit() {

    this.trashIcon = faTrash;

    this.penIcon = faPen;

    this.leftChevronIcon = faChevronLeft;

    this.rightChevronIcon = faChevronRight;

    this.infoIcon = faExclamationCircle;
  }
}

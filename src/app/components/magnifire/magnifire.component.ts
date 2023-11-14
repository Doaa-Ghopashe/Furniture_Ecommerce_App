import { Component, Input } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-magnifire',
  templateUrl: './magnifire.component.html',
  styleUrls: ['./magnifire.component.css']
})
export class MagnifireComponent {
  @Input() x_axis!: number;
  @Input() y_axis!: number;
  @Input() mouseInside!: boolean;
  @Input() bck_X!: number;
  @Input() bck_Y!: number;
  @Input() image!: string;

  construct() { }

  ngOnInit() {
    let glass = document.getElementsByClassName('lens')[0] as HTMLElement;
  }
}

import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent {

  @Input() product!: Product;

  X: number = 0;
  Y: number = 0;

  backgroundX: number = 0;
  backgroundY: number = 0;

  mouseVisible: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  move(e: any) {
    this.mouseVisible = true;

    const container = document.getElementsByClassName('img-container')[0] as HTMLElement;

    const image = document.querySelector('.img-container img') as HTMLImageElement;
    
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    this.X = mouseX - 50;
    this.Y = mouseY - 50;

    
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    const ratioX = imageWidth / containerRect.width;

    const ratioY = imageHeight / containerRect.height;

    this.backgroundX = -mouseX * ratioX;
    
    this.backgroundY = -mouseY * ratioY - 90;
  }

  hide() {
    this.mouseVisible = false;
  }

  getImageUrl(image: string): string {
    const imageUrl = 'http://localhost:4000' + image.split('public').join('');
    return imageUrl;
  }

}

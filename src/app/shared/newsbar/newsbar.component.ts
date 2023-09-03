import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import $ from "jquery";
// import { OwlOptions } from 'ngx-owl-carousel-o';
// import { OwlDOMData } from 'ngx-owl-carousel-o/lib/models/owlDOM-data.model';
@Component({
  selector: 'app-newsbar',
  templateUrl: './newsbar.component.html',
  styleUrls: ['./newsbar.component.css']
})

export class NewsbarComponent {

  @ViewChild('updateBar') updateBar!: ElementRef;
  @ViewChild('topBar') topBar!: ElementRef;

  scrollLeft!:number;
  Data:string[] = ['Discount 10% in bedroom Category' , 'Discount 20% in kid\'s beds' , 'Discount 10% on red table']
  ngAfterViewInit() {
    this.scrollLeft = this.updateBar.nativeElement.scrollWidth - 1485;

    let root = document.documentElement;
    root.style.setProperty("--sliderwidth", "-" + this.topBar.nativeElement.offsetWidth + "px");
    root.style.setProperty("--window-width", window.innerWidth + "px");
    
    if (this.scrollLeft < 2000) {
      $(".top-update-bar").css("animation-duration", "50s");
    } else if (this.scrollLeft < 4000) {
      $(".top-update-bar").css("animation-duration", "70s");
    } else if (this.scrollLeft < 6000) {
      $(".top-update-bar").css("animation-duration", "90s");
    } else {
      $(".top-update-bar").css("animation-duration", "110s");
    }
  }

}

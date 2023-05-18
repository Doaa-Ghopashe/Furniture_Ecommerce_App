import { Component } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CounterService } from '../services/counter.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  facart = faCartPlus;
  count!:number;
  
  constructor(private counter:CounterService){}

  ngOnInit()
  {
    this.counter.counterVal.subscribe((res)=>this.count = res)
  }
  
}

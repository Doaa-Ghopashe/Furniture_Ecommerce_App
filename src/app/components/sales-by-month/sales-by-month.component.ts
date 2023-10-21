import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.css']
})
export class SalesByMonthComponent {
  chart = new Chart({
    chart:{
      type:'line',
      height: 325
    },
    title:{
      text:"Month wise sales"
    },
    xAxis:{
      categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis:{
      title:{
        text:'Revenue in $'
      }
    },
    series:[
      {
        name:'Arizona',
        type:'line',
        data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 196]
      },
      {
        name:'Cairo',
        type:'line',
        data: [70, 52, 95, 145, 95, 215, 98, 200, 128, 100, 196]
      },
      {
        name:'Domiat',
        type:'line',
        color:'orange',
        data: [55, 52, 0, 97, 75, 115, 98, 22, 65, 187, 200]
      }
    ],
    credits:{
      enabled:false
    }
  })
}

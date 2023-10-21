import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-top-three-products',
  templateUrl: './top-three-products.component.html',
  styleUrls: ['./top-three-products.component.css']
})
export class TopThreeProductsComponent {
  chart = new Chart({
    chart: {
      type: 'bar',
      height: 225
    },
    title: {
      text: "Top 3 Products"
    },
    xAxis: {
      categories: ['Couch', 'Table', 'Chair']
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [
      {
        type: 'bar',
        showInLegend:false,
        data: [
          {
            name: 'Couch',
            y: 350,
            color: 'orange'
          },
          {
            name: 'Table',
            y: 250,
            color: 'blue'
          },
          {
            name: 'Chair',
            y: 280,
            color: 'red'
          }
        ]
      }
    ],
    credits: {
      enabled: false
    }
  })
}

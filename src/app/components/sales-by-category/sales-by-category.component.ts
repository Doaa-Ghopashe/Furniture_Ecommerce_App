import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-sales-by-category',
  templateUrl: './sales-by-category.component.html',
  styleUrls: ['./sales-by-category.component.css']
})
export class SalesByCategoryComponent {
  chart = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: "Category wise sales"
    },
    xAxis: {
      categories: ['Electricty', 'BathRoom', 'LivingRoom', 'BedRoom']
    },
    yAxis: {
      title: {
        text: 'Revenue in %'
      }
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Electronics',
            y: 41.0,
            color: 'orange'
          },
          {
            name: 'LivingRoom',
            y: 30.0,
            color: 'blue'
          },
          {
            name: 'BedRoom',
            y: 40.0,
            color: 'red'
          },
          {
            name: 'BathRoom',
            y: 10.0,
            color: 'purple'
          }
        ]
      }
    ],
    credits: {
      enabled: false
    }
  })
}

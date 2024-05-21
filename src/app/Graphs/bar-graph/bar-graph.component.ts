import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.createBarGraph();
  }

  createBarGraph(): void {
    const barCanvas = this.barCanvas.nativeElement;
    const ctx = barCanvas.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Tickets',
            data: [165, 159, 280, 381, 456, 255, 340],
            backgroundColor: '#00e400',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 0,
            barThickness: 15
          }]
        },
        options: {
          scales: {

            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: false,
              min: 100,
              max: 500,
            
              ticks: {
                stepSize: 100,
              }
            }
            
           
            
          }
        }
      });
    }
  }

}

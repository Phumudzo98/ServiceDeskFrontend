import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-escalated-graph',
  templateUrl: './escalated-graph.component.html',
  styleUrls: ['./escalated-graph.component.css']
})
export class EscalatedGraphComponent {

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
            backgroundColor: '#FF5A00',
            borderColor: 'rgb(255,90,0)',
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


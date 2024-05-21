import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit, AfterViewInit {

  @ViewChild('barCanvas', { static: true }) private barCanvas!: ElementRef;
  companyId: string = '';
  authToken: string | null | undefined;
  token: any;

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[] = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  selectedYear: number = new Date().getFullYear();
  updatedAtDates: string[] = [];
  ticketData: number[] = [];
  chart: Chart | undefined;

  private apiUrl = 'http://localhost:8080/api/ticket/tickets/open';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.authToken = sessionStorage.getItem('auth-user');
    if (this.authToken) {
      this.token = jwt_decode(this.authToken);
      this.extractCompanyId();
    }
  }

  ngAfterViewInit(): void {
    this.generateUpdatedAtDates();
    this.fetchDataAndCreateChart();
  }

  private extractCompanyId() {
    if (this.token && this.token.hasOwnProperty('companyId')) {
      this.companyId = this.token.companyId;
    } else {
      this.companyId = 'Default Company ID';
    }
  }

  generateUpdatedAtDates(): void {
    console.log('Generating dates for year:', this.selectedYear);
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    this.updatedAtDates = months.map(month => `${this.selectedYear}-${month}-01`);
    console.log('Updated dates:', this.updatedAtDates);
  }

  getTotalClosedTicketsForMonth(companyId: string, updatedAt: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}?companyId=${companyId}&updatedAt=${updatedAt}`);
  }

  fetchDataAndCreateChart(): void {
    this.generateUpdatedAtDates(); // Regenerate dates based on selected year

    const requests = this.updatedAtDates.map(date =>
      this.getTotalClosedTicketsForMonth(this.companyId, date).toPromise()
        .catch(() => 0) // If request fails, return 0 for that month
    );

    Promise.all(requests).then(data => {
      this.ticketData = data.map(item => item as number);
      console.log('Fetched data:', this.ticketData); // Debugging line
      this.createBarGraph();
    }).catch(error => {
      console.error('Error fetching ticket data', error);
      this.ticketData = Array(12).fill(0);
      this.createBarGraph();
    });
  }

  createBarGraph(): void {
    const barCanvas = this.barCanvas.nativeElement;
    const ctx = barCanvas.getContext('2d');
    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.months,
          datasets: [{
            label: 'Tickets',
            data: this.ticketData,
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
              min: 0,
              max: 10,
              ticks: {
                stepSize: 2,
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context');
    }
  }

  onYearChange(event: any): void {
    this.selectedYear = event.target.value;
    console.log('Year changed to:', this.selectedYear);
  }

  downloadCSV(): void {
    const csvData = this.convertToCSV(this.updatedAtDates, this.ticketData);
    this.downloadFile(csvData, 'ticket_data.csv');
  }

  convertToCSV(dates: string[], data: number[]): string {
    let csvContent = 'Month,Year,Ticket Count\n';
    this.months.forEach((month, index) => {
      const date = dates[index];
      const ticketCount = data[index];
      const year = date.split('-')[0];
      csvContent += `${month},${year},${ticketCount}\n`;
    });
    return csvContent;
  }

  downloadFile(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

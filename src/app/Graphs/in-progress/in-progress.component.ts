import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.css']
})
export class InProgressComponent implements AfterViewInit {

  @ViewChild('barCanvas', { static: true }) private barCanvas!: ElementRef;
  companyId: string = '';
  authToken: string | null | undefined;
  token: any;
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: number[] = Array.from({ length: 11 }, (_, i) => 2020 + i); // Range from 2020 to 2030
  selectedYear: number = new Date().getFullYear();
  updatedAtDates: string[] = [];
  ticketData: number[] = [];
  chart: Chart | undefined;

  // New properties to store filtered data
  filteredDates: string[] = [];
  filteredTicketData: number[] = [];

  private apiUrl = 'http://localhost:8080/api/ticket/tickets/progress';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.authToken = sessionStorage.getItem('auth-user');
    if (this.authToken) {
      this.token = jwt_decode(this.authToken);
      this.extractCompanyId();
    }
  }

  ngAfterViewInit(): void {
    this.generateInitialUpdatedAtDates();
    this.fetchDataAndCreateChart();
  }

  private extractCompanyId() {
    if (this.token && this.token.hasOwnProperty('companyId')) {
      this.companyId = this.token.companyId;
    } else {
      this.companyId = 'Default Company ID';
    }
  }

  generateInitialUpdatedAtDates(): void {
    console.log('Generating dates for the current year up to the current month:', this.selectedYear);
    const currentMonth = new Date().getMonth() + 1;
    const months = Array.from({ length: currentMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));
    this.updatedAtDates = months.map(month => `${this.selectedYear}-${month}-01`);
    console.log('Initial dates:', this.updatedAtDates);
  }

  generateUpdatedAtDates(startDate: string, endDate: string): void {
    console.log('Generating dates from', startDate, 'to', endDate);
    this.updatedAtDates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date(start);

    while (current <= end) {
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      this.updatedAtDates.push(`${year}-${month}-01`);
      current.setMonth(current.getMonth() + 1);
    }
    console.log('Filtered dates:', this.updatedAtDates);
  }

  getTotalClosedTicketsForMonth(companyId: string, updatedAt: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}?companyId=${companyId}&updatedAt=${updatedAt}`);
  }

  fetchDataAndCreateChart(): void {
    const requests = this.updatedAtDates.map(date =>
      this.getTotalClosedTicketsForMonth(this.companyId, date).toPromise()
        .catch(() => 0) // If request fails, return 0 for that month
    );

    Promise.all(requests).then(data => {
      this.ticketData = data.map(item => item as number);
      console.log('Fetched data:', this.ticketData); // Debugging line
      this.createBarGraph(this.updatedAtDates);
    }).catch(error => {
      console.error('Error fetching ticket data', error);
      this.ticketData = Array(this.updatedAtDates.length).fill(0);
      this.createBarGraph([]);
    });
  }

  filterDates(startDate: string, endDate: string, dates: string[]): string[] {
    return dates.filter(date => (!startDate || date >= startDate) && (!endDate || date <= endDate));
  }

  createBarGraph(filteredDates: string[]): void {
    const barCanvas = this.barCanvas.nativeElement;
    const ctx = barCanvas.getContext('2d');
    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }
      const labels = filteredDates.map(date => {
        const [, month] = date.split('-');
        return this.months[parseInt(month, 10) - 1]; // Only include the month
      });
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Tickets',
            data: this.filteredTicketData.length > 0 ? this.filteredTicketData : this.ticketData,
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
    this.generateInitialUpdatedAtDates(); // Regenerate dates for the selected year
    this.fetchDataAndCreateChart(); // Fetch new data when year changes
  }

  onStartDateChange(event: any): void {
    this.startDate = event.target.value;
    console.log('Start date changed to:', this.startDate);
  }

  onEndDateChange(event: any): void {
    this.endDate = event.target.value;
    console.log('End date changed to:', this.endDate);
  }

  applyFilters(startDate: string, endDate: string): void {
    console.log('Applying filters with start date:', this.startDate, 'and end date:', this.endDate);
    if (!this.startDate || !this.endDate) {
      console.log('Start date and end date must be specified.');
      return;
    }

    this.generateUpdatedAtDates(this.startDate, this.endDate);

    const requests = this.updatedAtDates.map(date =>
      this.getTotalClosedTicketsForMonth(this.companyId, date).toPromise()
        .catch(() => 0) // If request fails, return 0 for that month
    );

    Promise.all(requests).then(data => {
      this.filteredTicketData = data.map(item => item as number);
      console.log('Filtered data:', this.filteredTicketData); // Debugging line
      this.createBarGraph(this.updatedAtDates);
    }).catch(error => {
      console.error('Error fetching ticket data', error);
      this.filteredTicketData = Array(this.updatedAtDates.length).fill(0);
      this.createBarGraph(this.updatedAtDates);
    });
  }

  downloadCSV(): void {
    // Use filtered dates and ticket data for CSV
    const csvData = this.convertToCSV(this.updatedAtDates, this.filteredTicketData.length > 0 ? this.filteredTicketData : this.ticketData);
    this.downloadFile(csvData, 'ticket_data.csv');
  }

  convertToCSV(dates: string[], data: number[]): string {
    let csvContent = 'Month,Year,Ticket Count\n';
    dates.forEach((date, index) => {
      const [year, month] = date.split('-');
      const ticketCount = data[index];
      csvContent += `${this.months[parseInt(month, 10) - 1]},${year},${ticketCount}\n`;
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
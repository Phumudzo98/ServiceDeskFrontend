import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {

  user: any;
  private apiUrl = 'http://localhost:8080/api/users/get-user'; // Replace with your actual API endpoint
  TicketUser: any[] = []; // Initialize as an array to store ticket objects
  searchQuery: string = '';
  filteredTickets: any[] = [];
  openTicketCount: number = 0;
  closedTicketCount: number=0;
  inProgressTicketCount:number=0;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const accountId = params.get('accountId');
      if (accountId) {
        this.getAgentById(accountId);
      } else {
        console.error('No accountId provided in route');
      }
    });
  }

  getAgentById(accountId: string): void {
    this.http.get<any>(`${this.apiUrl}/${accountId}`).subscribe(
      data => {
        console.log(accountId);
        this.user = data;
      },
      error => {
        console.error('Error fetching agent data', error);
        console.log(accountId);
      }
    );
  }

  getUserTicket(accountId: string): void {
    const url = `http://localhost:8080/api/ticket/get-user-tickets/${accountId}`;
    this.http.get<any[]>(url).subscribe(
      data => {
        this.TicketUser = data;
        this.filteredTickets = data; // Initialize filtered tickets with the full list
        this.countOpenTickets(); // Count the open tickets initially
        this.countInProgressTickets();
        this.countClosedTickets();
      },
      error => {
        console.error('Error fetching agent data', error);
      }
    );
  }
  countOpenTickets() {
    this.openTicketCount = this.filteredTickets.filter(ticket => ticket.status === 'Open').length;
  }

  countClosedTickets() {
    this.closedTicketCount = this.filteredTickets.filter(ticket => ticket.status === 'Closed').length;
  }

  countInProgressTickets() {
    this.inProgressTicketCount = this.filteredTickets.filter(ticket => ticket.status === 'In progress').length;
  }
}



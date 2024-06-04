import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/utility/models/models';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent {
  agent: any;
  private apiUrl = 'http://localhost:8080/api/users/get-agent'; // Replace with your actual API endpoint
  TicketUser: any; // Initialize as an array to store ticket objects
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
        this.agent = data;
      },
      error => {
        console.error('Error fetching agent data', error);
      }
    );
  }

  getUserTicket(accountId: string): void {
    const url = `http://localhost:8080/api/ticket/get-user-tickets/${accountId}`;
    this.http.get<any>(url).subscribe(
      data => {
        this.TicketUser = data;
      },
      error => {
        console.error('Error fetching agent data', error);
      }
    );
  }
}
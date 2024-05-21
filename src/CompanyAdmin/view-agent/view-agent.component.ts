import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent {
  agent: any;
  private apiUrl = 'http://localhost:8080/api/users/get-agent'; // Replace with your actual API endpoint

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
}
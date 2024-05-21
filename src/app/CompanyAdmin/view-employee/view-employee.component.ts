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
}


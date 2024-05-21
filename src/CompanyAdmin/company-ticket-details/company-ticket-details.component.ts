import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { StorageService } from 'src/app/utility/services/Storage/storage.service';

@Component({
  selector: 'app-company-ticket-details',
  templateUrl: './company-ticket-details.component.html',
  styleUrls: ['./company-ticket-details.component.css']
})
export class CompanyTicketDetailsComponent {

  constructor(private router: Router,private http: HttpClient, private storage : StorageService) { }

  navigateToDestination() {
      this.router.navigate(['/employee-tickets']);
  }

  //Button to select

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile); Do something with the selected file
  }

  dataArray:any[]=[]

  

  ngOnInit():void {

    const token = this.storage.getUser()
    const decodedToken:any=jwtDecode(token);
    const companyId=decodedToken.companyId;


    let url:string="http://localhost:8080/api/ticket/get-tickets/"+companyId;

    this.http.get<any[]>(url).subscribe(data=>{
      
      this.dataArray=data;
      console.log(data);
    },
  error=>
  {
    console.log(error);
    
  })

  
}
}

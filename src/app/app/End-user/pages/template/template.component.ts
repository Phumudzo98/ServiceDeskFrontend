import { Component, OnInit } from '@angular/core';
import { DynamicDataService } from 'src/app/utility/services/Dynamic/dynamic_data.service';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TicketsComponent } from '../../components/tickets/tickets.component';
import { TicketsinfoComponent } from '../../components/ticketsinfo/ticketsinfo.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  compo:string="";
  defaultComponent:any;
  constructor(private dataservice:DynamicDataService) { 
    this.defaultComponent= DashboardComponent;
    const dara = this.dataservice.getDataStream();
    dara.subscribe({
      next: (dara:string)=>{
        this.compo=dara;
        switch (this.compo)
        {
                  case "tickets":
                  this.defaultComponent=TicketsComponent;
                  break;
                  case "viewtickets":
                  this.defaultComponent=TicketsinfoComponent;
                  break;
        }
      }
    })
  }
  openComponent(value:string){
    switch (value)
    {
      case "tickets":
            this.defaultComponent=TicketsComponent;
            break;   
    }
  }
  ngOnInit(): void {
  }
}

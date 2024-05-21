import { SafeResourceUrl } from "@angular/platform-browser";

export class Login {
    email!:string;
    password!:any;
    companyId!:string;
}
export class Email { 
    email!: string;
 }
export class UpdatePassword{
    email!:string;
    password!:any;
    confirm_password!:any;
}
export class Account {
    companyId!:string;
    email!:string;
    accountId!:string;
    isExpired!:boolean;
    fullName!:string;
    position!:string;
    contactNumber!:string;  
}
export class Tickets {
    ticketId!: any;
    companyId!:any;
    customerUserId!: any;
    customerAgentId!:any;
    category!:string;
    priority!:string;
    description!:string;
    status!:string;
    createdAt!:any;
    updateAt!:any;
}
export class TicketResolution{
    ticketResolutionId!:any;
    resolution!:string;
    ticket_id!:any;
}
export class EscalatedTicket {
    ticketResolutionId!:any;
    reason!:string;
    escalatedTo!:any;
    ticket_id!:any;
}
export class Dashboard{
    ticketLoggedIn!:any;
    newTickets!:any;
    closedTickets!:any;
    escalatedTickets!:any;
}

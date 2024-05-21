import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { TemplateComponent } from './End-user/pages/template/template.component';
import { DashboardComponent } from './End-user/components/dashboard/dashboard.component';
import { TicketsComponent } from './End-user/components/tickets/tickets.component';
import { TicketsinfoComponent } from './End-user/components/ticketsinfo/ticketsinfo.component';
import { UserLoginComponent } from './End-user/pages/user-login/user-login.component';
import { EncryptionDecryption } from './utility/encryption/encryption.service';
import { HttpRequestInterceptor } from './utility/helpers/HttpInterceptor';
import { DynamicDataService } from './utility/services/Dynamic/dynamic_data.service';
import { EmployeeLoginComponent } from './Employee/employee-login/employee-login.component';
import { EmployeeRegisterComponent } from './Employee/employee-register/employee-register.component';
import { EmployeeForgortPasswordComponent } from './Employee/employee-forgort-password/employee-forgort-password.component';
import { EmployeeTicketsComponent } from './Employee/employee-tickets/employee-tickets.component';
import { TicketDetailsComponent } from './Employee/ticket-details/ticket-details.component';
import { KnowledgebaseComponent } from './Employee/knowledgebase/knowledgebase.component';
import { SettingsComponent } from './Employee/settings/settings.component';
import { NoTicketsComponent } from './Employee/no-tickets/no-tickets.component';
import { AdminLoginComponent } from './Super-Admin/admin-login/admin-login.component';
import { AdminFgtPasswordComponent } from './Super-Admin/admin-fgt-password/admin-fgt-password.component';
import { AdminDashboardComponent } from './Super-Admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './Super-Admin/admin-users/admin-users.component';
import { SubscriptionsComponent } from './Super-Admin/subscriptions/subscriptions.component';
import { AdminSettingsComponent } from './Super-Admin/admin-settings/admin-settings.component';
import { EditSubscriptionComponent } from './Super-Admin/edit-subscription/edit-subscription.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BarGraphComponent } from './Graphs/bar-graph/bar-graph.component';
import { UnresolvedComponent } from './Graphs/unresolved/unresolved.component';
import { InProgressComponent } from './Graphs/in-progress/in-progress.component';
import { SidebarComponent } from '../CompanyAdmin/sidebar/sidebar.component';
import { TopMenuComponent } from '../assets/Top Menus/top-menu/top-menu.component';
import { CompanyAdminDashboardComponent } from '../CompanyAdmin/company-admin-dashboard/company-admin-dashboard.component';
import { ReportsComponent } from '../CompanyAdmin/reports/reports.component';
import { CompanyTicketsComponent } from '../CompanyAdmin/company-tickets/company-tickets.component';
import { CompanySettingsComponent } from '../CompanyAdmin/company-settings/company-settings.component';

import { MoreSettingsComponent } from '../CompanyAdmin/more-settings/more-settings.component';
import { ViewEmployeeComponent } from '../CompanyAdmin/view-employee/view-employee.component';
import { ViewAgentComponent } from '../CompanyAdmin/view-agent/view-agent.component';
import { AdminSidebarComponent } from './Super-Admin/admin-sidebar/admin-sidebar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { CompanyLoginComponent } from '../CompanyAdmin/company-login/company-login.component';
import { CompanyRegisterComponent } from '../CompanyAdmin/company-register/company-register.component';
import { CompanyFgtPasswordComponent } from '../CompanyAdmin/company-fgt-password/company-fgt-password.component';
import { CompanyChangePasswordComponent } from '../CompanyAdmin/company-change-password/company-change-password.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { EmployeeTopMenuComponent } from '../assets/Top Menus/company-top-menu/employee-top-menu.component';
import { AdminTopMenuComponent } from '../assets/Top Menus/admin-top-menu/admin-top-menu.component';
import { EmployeeSidebarComponent } from './Employee/employee-sidebar/employee-sidebar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './Single Page/home/home.component';
import { CompanySubscriptionsComponent } from 'src/CompanyAdmin/company-subscriptions/company-subscriptions.component';
import { CompanyTicketDetailsComponent } from '../CompanyAdmin/company-ticket-details/company-ticket-details.component';
import { AdminChangePasswordComponent } from './Super-Admin/admin-change-password/admin-change-password.component';
import { EmployeeChangePasswordComponent } from './Employee/employee-change-password/employee-change-password.component';
import { UserEmployeeComponent } from './user-employee/user-employee.component';
import { PackageFormComponent } from './package-form/package-form.component';
import { EscalatedGraphComponent } from './Graphs/escalated-graph/escalated-graph.component';






@NgModule({
  declarations: [
    AppComponent,

    TemplateComponent,
    DashboardComponent,
    TicketsComponent,
    TicketsinfoComponent,
    UserLoginComponent,
    EmployeeLoginComponent,
    EmployeeRegisterComponent,
    EmployeeForgortPasswordComponent,
    EmployeeTicketsComponent,
    TicketDetailsComponent,
    KnowledgebaseComponent,
    SettingsComponent,
    NoTicketsComponent,
    AdminLoginComponent,
    AdminFgtPasswordComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    SubscriptionsComponent,
    AdminSettingsComponent,
    EditSubscriptionComponent,
    BarGraphComponent,
    UnresolvedComponent,
    InProgressComponent,
    SidebarComponent,
    TopMenuComponent,
    CompanyAdminDashboardComponent,
    ReportsComponent,
    CompanyTicketsComponent,
    CompanySettingsComponent,
    MoreSettingsComponent,
    ViewEmployeeComponent,
    ViewAgentComponent,
    AdminSidebarComponent,
    CompanyLoginComponent,
    CompanyRegisterComponent,
    CompanyFgtPasswordComponent,
    CompanyChangePasswordComponent,
    ProfileDropdownComponent,
    EmployeeTopMenuComponent,
    AdminTopMenuComponent,
    EmployeeSidebarComponent,
    NotificationsComponent,
    HomeComponent,
    CompanySubscriptionsComponent,
    CompanyTicketDetailsComponent,
    AdminChangePasswordComponent,
    EmployeeChangePasswordComponent,
    UserEmployeeComponent,
    PackageFormComponent,
    EscalatedGraphComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatSnackBarModule, 
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule, // Import the MatNativeDateModule
    MatInputModule,
    DatePipe,
    MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, 
    MatMenuModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},EncryptionDecryption,DynamicDataService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

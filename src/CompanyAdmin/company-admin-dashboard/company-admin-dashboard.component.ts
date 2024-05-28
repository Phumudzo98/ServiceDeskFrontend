import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BarGraphComponent } from 'src/app/Graphs/bar-graph/bar-graph.component';
import { EscalatedGraphComponent } from 'src/app/Graphs/escalated-graph/escalated-graph.component';
import { InProgressComponent } from 'src/app/Graphs/in-progress/in-progress.component';
import { UnresolvedComponent } from 'src/app/Graphs/unresolved/unresolved.component';

@Component({
  selector: 'app-company-admin-dashboard',
  templateUrl: './company-admin-dashboard.component.html',
  styleUrls: ['./company-admin-dashboard.component.css']
})
export class CompanyAdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(BarGraphComponent, { static: false }) private barGraphComponent!: BarGraphComponent;
  @ViewChild(InProgressComponent, { static: false }) private inProgressComponent!: InProgressComponent;
  @ViewChild(UnresolvedComponent, { static: false }) private unresolvedComponent!: UnresolvedComponent;
  @ViewChild(EscalatedGraphComponent, { static: false }) private escalatedGraphComponent!: EscalatedGraphComponent;
  years: number[] = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  startDate: string = '';
  endDate: string = '';

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const componentsMap = new Map<any, () => void>([
      [this.barGraphComponent, () => this.barGraphComponent.fetchDataAndCreateChart()],
      [this.inProgressComponent, () => this.inProgressComponent.fetchDataAndCreateChart()],
      [this.escalatedGraphComponent, () => this.escalatedGraphComponent.fetchDataAndCreateChart()],
      [this.unresolvedComponent, () => this.unresolvedComponent.fetchDataAndCreateChart()]
    ]);
  
    for (const [component, method] of componentsMap) {
      if (component) {
        method();
        return; // Stop after the first component is found and its method is called
      }
    }
  
    console.error('No graph component is available');
  }
  updateDatesOpen(startDate: string, endDate: string): void {
    this.startDate = startDate;
    this.endDate = endDate;

    if (this.barGraphComponent) {
      this.barGraphComponent.applyFilters(this.startDate, this.endDate);
      this.closeFilter('opened');
    } else {
      console.error('No graph component is available');
    }
  }
  updateDatesInProgress(startDate: string, endDate: string): void {
    this.startDate = startDate;
    this.endDate = endDate;
  if (this.inProgressComponent) {
    this.inProgressComponent.applyFilters(this.startDate, this.endDate);
    this.closeFilter('inProgress');
  }  else {
      console.error('No graph component is available');
    }
  }
  updateDatesEscalated(startDate: string, endDate: string): void {
    this.startDate = startDate;
    this.endDate = endDate;
    if (this.escalatedGraphComponent) {
      this.escalatedGraphComponent.applyFilters(this.startDate, this.endDate);
      this.closeFilter('escalated');
    }  else {
      console.error('No graph component is available');
    }
  }
  updateDatesClosed(startDate: string, endDate: string): void {
    this.startDate = startDate;
    this.endDate = endDate;
    if (this.unresolvedComponent) {
      this.unresolvedComponent.applyFilters(this.startDate, this.endDate);
      this.closeFilter('closed');
    }  else {
      console.error('No graph component is available');
    }
  }
  dropdownOpen = false;
  dropdownStates: { [key: string]: boolean } = {
    opened: false,
    inProgress: false,
    closed: false,
    escalated: false,
  };
  
  toggleDropdown(dropdown: string) {
    this.dropdownStates[dropdown] = !this.dropdownStates[dropdown];
  }

  closeFilter(dropdown: string) {
    this.dropdownStates[dropdown] = false;
  }

  onStartDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.startDate = target.value;
    console.log('Start Date changed to: ', this.startDate);
  }

  onEndDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.endDate = target.value;
    console.log('End Date changed to: ', this.endDate);
  }

  
 


  DownloadCSVOpen(): void {
    if (this.barGraphComponent) {
      this.barGraphComponent.downloadCSV();
    }else {
      console.error('No graph component is available');
    }
  }
  DownloadCSVInProgress(): void {
    if (this.inProgressComponent) {
      this.inProgressComponent.downloadCSV();
    }else {
      console.error('No graph component is available');
    }
  }
  DownloadCSVClosed(): void {
    if (this.unresolvedComponent) {
      this.unresolvedComponent.downloadCSV();
    } else {
      console.error('No graph component is available');
    }
  }
  DownloadCSVEscalated(): void {
    if (this.escalatedGraphComponent) {
      this.escalatedGraphComponent.downloadCSV();
    } else {
      console.error('No graph component is available');
    }
  }
  resetPage(): void {
    if (this.barGraphComponent) {
      this.barGraphComponent.fetchDataAndCreateChart(); // Ensure this method initializes the chart to its default state
    }
  }

}

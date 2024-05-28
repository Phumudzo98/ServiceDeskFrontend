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
  // Separate date variables for each section
  openedStartDate: string = '';
  openedEndDate: string = '';
  inProgressStartDate: string = '';
  inProgressEndDate: string = '';
  closedStartDate: string = '';
  closedEndDate: string = '';
  escalatedStartDate: string = '';
  escalatedEndDate: string = '';
  showSpinner: boolean=false;
  showSpinnerClosed: boolean=false;
  showSpinnerEscalated: boolean=false;
  showSpinnerInProgress: boolean=false;
  showSpinnerOpen: boolean=false;


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
    this.showSpinnerOpen = true; // Show the spinner for opened component
    this.startDate = startDate;
    this.endDate = endDate;
  
    if (this.barGraphComponent) {
      setTimeout(() => {
        this.barGraphComponent.applyFilters(this.startDate, this.endDate);
        this.closeFilter('opened');
        this.showSpinnerOpen = false; // Hide the spinner after operations complete
      }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
    } else {
      console.error('No graph component is available');
      this.showSpinnerOpen = false; // Hide the spinner if no graph component is available
    }
  }
  
  updateDatesInProgress(startDate: string, endDate: string): void {
    this.showSpinnerInProgress = true; // Show the spinner for inProgress component
    this.startDate = startDate;
    this.endDate = endDate;
  
    if (this.inProgressComponent) {
      setTimeout(() => {
        this.inProgressComponent.applyFilters(this.startDate, this.endDate);
        this.closeFilter('inProgress');
        this.showSpinnerInProgress = false; // Hide the spinner after operations complete
      }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
    } else {
      console.error('No graph component is available');
      this.showSpinnerInProgress = false; // Hide the spinner if no graph component is available
    }
  }
  
  updateDatesEscalated(startDate: string, endDate: string): void {
    this.showSpinnerEscalated = true; // Show the spinner for escalated component
    this.startDate = startDate;
    this.endDate = endDate;
  
    if (this.escalatedGraphComponent) {
      setTimeout(() => {
        this.escalatedGraphComponent.applyFilters(this.startDate, this.endDate);
        this.closeFilter('escalated');
        this.showSpinnerEscalated = false; // Hide the spinner after operations complete
      }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
    } else {
      console.error('No graph component is available');
      this.showSpinnerEscalated = false; // Hide the spinner if no graph component is available
    }
  }
  
  updateDatesClosed(startDate: string, endDate: string): void {
    this.showSpinnerClosed = true; // Show the spinner for closed component
    this.startDate = startDate;
    this.endDate = endDate;
  
    if (this.unresolvedComponent) {
      setTimeout(() => {
        this.unresolvedComponent.applyFilters(this.startDate, this.endDate);
        this.closeFilter('closed');
        this.showSpinnerClosed = false; // Hide the spinner after operations complete
      }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
    } else {
      console.error('No graph component is available');
      this.showSpinnerClosed = false; // Hide the spinner if no graph component is available
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

  
  onStartDateChange(event: Event, section: string) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    switch (section) {
      case 'opened':
        this.openedStartDate = value;
        break;
      case 'inProgress':
        this.inProgressStartDate = value;
        break;
      case 'closed':
        this.closedStartDate = value;
        break;
      case 'escalated':
        this.escalatedStartDate = value;
        break;
    }
    console.log(`${section} Start Date changed to: `, value);
  }

  onEndDateChange(event: Event, section: string) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    switch (section) {
      case 'opened':
        this.openedEndDate = value;
        break;
      case 'inProgress':
        this.inProgressEndDate = value;
        break;
      case 'closed':
        this.closedEndDate = value;
        break;
      case 'escalated':
        this.escalatedEndDate = value;
        break;
    }
    console.log(`${section} End Date changed to: `, value);
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
 // Define currentComponent as a string variable in your component class
currentComponent: string | null = null;

// Update the resetPage method to set the currentComponent variable
resetPage(componentName: string): void {
  this.currentComponent = componentName; // Set currentComponent to the componentName parameter

  switch (componentName) {
    case 'opened':
      this.showSpinner = true; // Show the spinner for opened component
      setTimeout(() => {
        this.barGraphComponent.resetFilters(); // Perform reset operations for opened component
        this.openedEndDate = '';
        this.openedStartDate = '';
        this.showSpinner = false; // Hide the spinner after operations complete
        this.currentComponent = null; // Reset currentComponent after operations complete
      }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
      break;
    case 'inProgress':
      this.showSpinner = true; // Show the spinner for inProgress component
      setTimeout(() => {
        this.inProgressComponent.resetFilters(); // Perform reset operations for inProgress component
        this.inProgressEndDate = '';
        this.inProgressStartDate = '';
        this.showSpinner = false; // Hide the spinner after operations complete
        this.currentComponent = null; // Reset currentComponent after operations complete
      }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
      break;
    case 'escalated':
      this.showSpinner = true; // Show the spinner for escalated component
      setTimeout(() => {
        this.escalatedGraphComponent.resetFilters(); // Perform reset operations for escalated component
        this.escalatedEndDate = '';
        this.escalatedStartDate = '';
        this.showSpinner = false; // Hide the spinner after operations complete
        this.currentComponent = null; // Reset currentComponent after operations complete
      }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
      break;
    case 'closed':
      this.showSpinner = true; // Show the spinner for closed component
      setTimeout(() => {
        this.unresolvedComponent.resetFilters(); // Perform reset operations for closed component
        this.closedEndDate = '';
        this.closedStartDate = '';
        this.showSpinner = false; // Hide the spinner after operations complete
        this.currentComponent = null; // Reset currentComponent after operations complete
      }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
      break;
    default:
      this.showSpinner = false; // Hide the spinner if component name is not recognized
      this.currentComponent = null; // Reset currentComponent if component name is not recognized
  }
}

  
  
  

}

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
    // Call fetchDataAndCreateChart() from BarGraphComponent
    if (this.barGraphComponent) {
      this.barGraphComponent.fetchDataAndCreateChart();
    } else {
      console.error('BarGraphComponent is not available');
    }
  }
  updateDates(startDate: string, endDate: string): void {
    this.startDate = startDate;
    this.endDate = endDate;

    if (this.barGraphComponent) {
      this.barGraphComponent.applyFilters(this.startDate, this.endDate);
    } else {
      console.error('BarGraphComponent is not available');
    }
  }

  onStartDateChange(event: any): void {
    this.startDate = event.target.value;
    console.log('Start date changed to:', this.startDate);
  }

  onEndDateChange(event: any): void {
    this.endDate = event.target.value;
    console.log('End date changed to:', this.endDate);
  }


  DownloadCSVOpen(): void {
    if (this.barGraphComponent) {
      this.barGraphComponent.downloadCSV();
    } else {
      console.error('BarGraphComponent is not available');
    }
  }

}

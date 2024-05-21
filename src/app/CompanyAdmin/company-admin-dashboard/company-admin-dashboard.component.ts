import { Component, ViewChild } from '@angular/core';
import { BarGraphComponent } from 'src/app/Graphs/bar-graph/bar-graph.component';
import { EscalatedGraphComponent } from 'src/app/Graphs/escalated-graph/escalated-graph.component';
import { InProgressComponent } from 'src/app/Graphs/in-progress/in-progress.component';
import { UnresolvedComponent } from 'src/app/Graphs/unresolved/unresolved.component';

@Component({
  selector: 'app-company-admin-dashboard',
  templateUrl: './company-admin-dashboard.component.html',
  styleUrls: ['./company-admin-dashboard.component.css']
})
export class CompanyAdminDashboardComponent {
  @ViewChild(BarGraphComponent, { static: false }) private barGraphComponent!: BarGraphComponent;
  @ViewChild(InProgressComponent, { static: false }) private inProgressComponent!: InProgressComponent;
  @ViewChild(UnresolvedComponent, { static: false }) private unresolvedComponent!: UnresolvedComponent;
  @ViewChild(EscalatedGraphComponent, { static: false }) private escalatedGraphComponent!: EscalatedGraphComponent;
  years: number[] = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  constructor() { }

  ngOnInit(): void {
    // Call fetchDataAndCreateChart() from BarGraphComponent
    if (this.barGraphComponent) {
      this.barGraphComponent.fetchDataAndCreateChart();
    } else {
      console.error('BarGraphComponent is not available');
    }
  }

  applyFilters() {
    // Filter Logic
  }

  DownloadCSVOpen(): void {
    if (this.barGraphComponent) {
      this.barGraphComponent.downloadCSV();
    } else {
      console.error('BarGraphComponent is not available');
    }
  }

  onYearChange(any:Event): void {
    if (this.barGraphComponent) {
      this.barGraphComponent.onYearChange(event);
    } else {
      console.error('BarGraphComponent is not available');
    }
  }
  ApplyFilters():void{
    if(this.barGraphComponent){
      this.barGraphComponent.fetchDataAndCreateChart();
    }
  }

  DownloadCSVProgress(): void {
    if (this.inProgressComponent) {
      this.inProgressComponent.downloadCSV();
    } else {
      console.error('InProgressComponent is not available');
    }
  }

  DownloadCSVEscalated(): void {
    if (this.escalatedGraphComponent) {
      this.escalatedGraphComponent.downloadCSV();
    } else {
      console.error('EscalatedGraphComponent is not available');
    }
  }

  DownloadCSVClosed(): void {
    if (this.unresolvedComponent) {
      this.unresolvedComponent.downloadCSV();
    } else {
      console.error('UnresolvedComponent is not available');
    }
  }
}

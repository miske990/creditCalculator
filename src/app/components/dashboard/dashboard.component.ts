import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalculateBoxComponent } from '../calculate-box/calculate-box.component';
import { OfferBoxComponent } from '../offer-box/offer-box.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public calculate_data: any;
  public payment_plan_data: any;
  public indicators: boolean = false;

  constructor(public dialog: MatDialog, private apiService: ApiService, private route: Router) { }

  ngOnInit(): void {
  }

  openCalculateBox(): void {
    const dialogRef = this.dialog.open(CalculateBoxComponent, {
      panelClass: 'my-class',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.calculate_data = result.data;
      this.calculatePaymentPlan(this.calculate_data);
    });
  }

  calculatePaymentPlan(calculate_data: any) {
    this.indicators = true;
    this.apiService.calculate(calculate_data)
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.indicators = false;
            this.payment_plan_data = res.body;
            this.openOfferBox()
          }
        },
        (err) => {
          this.indicators = false;
          console.log('error', err);
        }
      )
  }

  openOfferBox(): void {
    const dialogRef = this.dialog.open(OfferBoxComponent, {
      panelClass: 'my-class2',
      data: this.payment_plan_data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  signOut() {
    localStorage.removeItem('token');
    this.route.navigateByUrl('sign-in');
  }

}

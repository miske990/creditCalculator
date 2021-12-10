import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { CalculateBoxComponent } from '../calculate-box/calculate-box.component';

@Component({
  selector: 'app-offer-box',
  templateUrl: './offer-box.component.html',
  styleUrls: ['./offer-box.component.css']
})
export class OfferBoxComponent implements OnInit {

  public payment_plan_data: any;
  public formated_date: any;
  public dateOfFirstPayment: any;
  public purchase_value: any;
  public interest_rate: any;
  public approval_costs: any;
  public risk_assessment_costs: any;
  public contractual_interest: any;
  public eom: any;
  public total_payment: any;
  public selectedIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<OfferBoxComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.payment_plan_data = data;
    this.dateOfFirstPayment = this.payment_plan_data[0].firstInstallmentDate;
    let date = new Date(this.dateOfFirstPayment).toLocaleDateString("en-us")
    let date2 = moment(date).format('DD MMM. YYYY');
    this.formated_date = date2;
    this.purchase_value = this.payment_plan_data[0].loanAmount;
    this.interest_rate = this.payment_plan_data[0].nominalInterestRate;
    this.approval_costs = this.payment_plan_data[0].costOfReview;
    this.risk_assessment_costs = this.payment_plan_data[0].costOfRisk;
    this.contractual_interest = this.payment_plan_data[0].clientInterest;
    this.eom = this.payment_plan_data[0].eom;
    this.total_payment = this.payment_plan_data[0].totalAmount;
  }

  ngOnInit(): void {
  }

  setIndex(index: number) {
    this.selectedIndex = index;
    this.dateOfFirstPayment = this.payment_plan_data[index].firstInstallmentDate;
    let date = new Date(this.dateOfFirstPayment).toLocaleDateString("en-us")
    let date2 = moment(date).format('DD MMM. YYYY');
    this.formated_date = date2;
    this.purchase_value = this.payment_plan_data[index].loanAmount;
    this.interest_rate = this.payment_plan_data[index].nominalInterestRate;
    this.approval_costs = this.payment_plan_data[index].costOfReview;
    this.risk_assessment_costs = this.payment_plan_data[index].costOfRisk;
    this.contractual_interest = this.payment_plan_data[index].clientInterest;
    this.eom = this.payment_plan_data[index].eom;
    this.total_payment = this.payment_plan_data[index].totalAmount;
  }

  back() {
    this.dialogRef.close();
    this.openCalculate();
  }

  openCalculate() {
    const dialogRef = this.dialog.open(CalculateBoxComponent, {
      panelClass: 'my-class',
      data: {}
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

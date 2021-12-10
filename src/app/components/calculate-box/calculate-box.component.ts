import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-calculate-box',
  templateUrl: './calculate-box.component.html',
  styleUrls: ['./calculate-box.component.css']
})
export class CalculateBoxComponent implements OnInit {

  public products: any = [];
  public calculate_data: any;
  public amount: string = "";
  public formGroup: FormGroup;
  public indicators: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CalculateBoxComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.indicators = true;
    this.apiService.info()
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.products = res.body.products;
            this.indicators = false;
          }
        },
        (err) => {
          this.indicators = false;
          console.log('error', err);
        }
      )
    this.createForm()
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'amount': [this.amount || '', Validators.required],
      'vendorProductCode': ['']
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  calculate(value: any) {
    this.dialogRef.close({ data: value });
  }

  closeDialog() {
    this.dialogRef.close({ data: {} });
  }

}

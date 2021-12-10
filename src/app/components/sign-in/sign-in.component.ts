import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginForm: FormGroup;
  public hide: boolean = true;
  public indicators_error: boolean = false;
  public error_message: string = "";
  public indicators: boolean = false;
  
  constructor( private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.createForm();
  }

  public createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ])
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  public submit() {
    this.indicators = true;
    this.authenticationService.login(this.loginForm.value)
    .subscribe(
      (res: any) => {
        if(res.status == 200) {
          this.indicators = false;
          this.router.navigateByUrl('dashboard');
        }
      },
      (err) => {
        this.indicators = false;
        this.indicators_error = true;
        this.error_message = "Invalid username or password!"
        console.log('error', err);
      }
    )
  }

}

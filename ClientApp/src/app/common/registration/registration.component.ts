import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatButton} from "@angular/material";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(256)
  ]);

  public passwordFromControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  public registrationForm = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFromControl
  });

  public submitRegistration(){
    let email = this.registrationForm.value.email;
    let password = this.registrationForm.value.password;
    this.navigateToProfil();
  }

  public navigateToProfil(){
    this.router.navigate(['user'])
  }
  constructor(public router : Router) {

  }
  ngOnInit() {
  }

}

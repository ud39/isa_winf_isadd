import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatButton} from "@angular/material";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";


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

  public registerUser(){
    this.userService.submitRegistration(this.registrationForm);
    this.navigateToProfil();
  }

  public navigateToProfil(){
    this.router.navigate(['user'])
  }

  constructor(public router : Router, public userService:UserService) {

  }
  ngOnInit() {
  }

}

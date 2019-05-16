import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
  )
  {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordTypeAgain: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formForRegister() { return this.registerForm.controls; }

}

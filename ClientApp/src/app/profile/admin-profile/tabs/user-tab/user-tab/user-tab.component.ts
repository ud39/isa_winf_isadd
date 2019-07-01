import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {

  constructor() { }
  public emailFormControl = new FormControl('',[
    Validators.maxLength(256)
  ]);

  public userFormGroup = new FormGroup({
    email : this.emailFormControl
  });

  getUserInput() : FormGroup{
    return this.userFormGroup
  }
  ngOnInit() {
  }

}

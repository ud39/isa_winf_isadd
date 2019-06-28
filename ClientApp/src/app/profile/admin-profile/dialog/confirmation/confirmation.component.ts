import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class ConfirmationComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
  }

}

import {Component, Inject, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material";


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class EditListComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
  }

}

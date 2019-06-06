import {Component, OnInit, ViewChild} from '@angular/core';

import {MatCheckbox} from "@angular/material";
import {CheckboxComponent} from "./checkbox/checkbox.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[CheckboxComponent]
})

export class SearchComponent implements OnInit {
  @ViewChild("cb") component1: CheckboxComponent;

  constructor() {

  }

  clear() {
    this.component1.unselectCheckBoxes();
  }

  getCheckBoxes(){
    let checkBoxes: MatCheckbox [] = this.component1.selectedCheckBoxes();
  }

  ngOnInit() {
  }

}

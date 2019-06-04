import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ViewEncapsulation} from "@angular/core";
import {Router} from '@angular/router';
import {MatCheckbox} from "@angular/material";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {

  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;


  showOrHide: boolean = false;

  constructor(private router: Router) {

  }

  selectedCheckBoxes(){
    return this.cbs.toArray();
  }

  unselectCheckBoxes(){
    let array: MatCheckbox [] = this.cbs.toArray();
    array.forEach(function (value){
      if(value.checked == true){
        value.toggle();
      }
    })
  }

  ngOnInit() {

  }

}


import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ViewEncapsulation} from "@angular/core";
import {Router} from '@angular/router';
import {MatCheckbox} from "@angular/material";


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {

  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;

  states: string = '';
  showOrHide: boolean = false;

  constructor(private router: Router) {

  }

  selectedCheckBoxes(){
    return this.cbs.toArray();
  }

  static unselectCheckBoxes(cbs){
    let array: MatCheckbox [] = cbs.toArray();
    array.forEach(function (value){
      if(value.checked == true){
        value.toggle();
      }
    })
  }

  clear(){
    CheckboxComponent.unselectCheckBoxes(this.cbs);
  }

  ngOnInit() {

  }

}


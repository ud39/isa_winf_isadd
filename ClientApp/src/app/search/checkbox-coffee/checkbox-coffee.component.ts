import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Router} from "@angular/router";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {FormControl} from "@angular/forms";
import {MatCheckbox} from "@angular/material";

@Component({
  selector: 'app-checkbox-coffee',
  templateUrl: './checkbox-coffee.component.html',
  styleUrls: ['./checkbox-coffee.component.css']
})
export class CheckboxCoffeeComponent implements OnInit {

  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;

  constructor(private router:Router, private checkBoxService: CheckBoxesService) { }

  private myControl = new FormControl();

  getJsonOfSearch(): JSON{
    return this.checkBoxService.getjsonOfSearch(this.myControl,this.cbs.toArray());
  }

  clear() {
    this.checkBoxService.unselectCheckBoxes(this.cbs);
  }


  ngOnInit() {
  }

}

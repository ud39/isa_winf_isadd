import {Component, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {FormControl} from "@angular/forms";
import {MatCheckbox, MatSelect} from "@angular/material";
import {CheckboxComponent} from "../checkbox/checkbox.component";

@Component({
  selector: 'app-checkbox-coffee',
  templateUrl: './checkbox-coffee.component.html',
  styleUrls: ['./checkbox-coffee.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CheckboxComponent]
})
export class CheckboxCoffeeComponent implements OnInit {

  @ViewChildren('cb') cbs: QueryList<MatCheckbox>;
  @ViewChildren(MatSelect) selects : QueryList<MatSelect>;
  constructor(public router: Router, public checkBoxService: CheckBoxesService) {
  }

  public selectedRoast;
  public selectedGrind;
  public selectedBean;
  public selectedOrigin;

  public origins = [
    {value: 'lightRoast', viewValue: 'Helle Röstung'},
    {value: 'middleRoast', viewValue: 'Mittlere Röstung'},
    {value: 'darkRoast', viewValue: 'Dunkle Röstung'},
  ];

  public roasts = [
    {value: 'lightRoast', viewValue: 'Helle Röstung'},
    {value: 'middleRoast', viewValue: 'Mittlere Röstung'},
    {value: 'darkRoast', viewValue: 'Dunkle Röstung'},
  ];
  public grinds = [
    {value: 'veryCoarse', viewValue: 'Sehr Grob'},
    {value: 'coarse', viewValue: 'Grob'},
    {value: 'coarseMiddle', viewValue: 'Grob bis Mittel'},
    {value: 'middle', viewValue: 'Mittel'},
    {value: 'fine', viewValue: 'Fein'},
    {value: 'veryFine', viewValue: 'Sehr Fein'},
  ];

  public beans = [
    {value: 'arabica', viewValue: 'Arabica'},
    {value: 'robusta', viewValue: 'Robusta'},
  ];
  public myControl = new FormControl();
  public coffeeFormControls = new Array<FormControl>(this.myControl);
  getJsonOfSearch(): JSON {
    return this.checkBoxService.getjsonOfSearch(this.coffeeFormControls, this.cbs.toArray());
  }

  clear() {
    this.checkBoxService.clear(this.cbs,this.coffeeFormControls,  this.selects.toArray());
  }


  ngOnInit() {
  }

}

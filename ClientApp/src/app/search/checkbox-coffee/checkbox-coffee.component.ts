import {Component, EventEmitter, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
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
  @ViewChildren(MatInput) inputsCoffee : QueryList<MatInput>;

  constructor(public router: Router, public checkBoxService: CheckBoxesService) {
  }

  public selectedRoast;
  public selectedGrind;

  public roasts = [
    {value: 'none', viewValue: 'Keine'},
    {value: 'lightRoast', viewValue: 'Helle Röstung'},
    {value: 'middleRoast', viewValue: 'Mittlere Röstung'},
    {value: 'darkRoast', viewValue: 'Dunkle Röstung'},
  ];
  public grinds = [
    {value: 'none', viewValue: 'Keine'},
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

  public beanNameFormControl = new FormControl('',[]);
  public blendNameFormControl = new FormControl('',[]);
  public coffeeFormGroup = new FormGroup({
    nameBean: this.beanNameFormControl,
    nameBlend: this.blendNameFormControl
  });

  getJsonOfSearch(): JSON {
    console.log(this.checkBoxService.getJsonOfSearch(this.inputsCoffee.toArray(), this.cbs.toArray()));
    return this.checkBoxService.getJsonOfSearch(this.inputsCoffee.toArray(), this.cbs.toArray());
  }

  clear() {
    this.checkBoxService.clear(this.cbs,this.coffeeFormGroup,  this.selects.toArray());
  }


  ngOnInit() {
  }

  @Output() callNavigateToCoffee = new EventEmitter<void>();
  triggerSearchCoffee():void{
    console.log("Call form Coffee");
    this.callNavigateToCoffee.emit();
  }
}

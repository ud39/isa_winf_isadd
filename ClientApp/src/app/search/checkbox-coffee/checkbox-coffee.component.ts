import {Component, EventEmitter, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {Observable} from "rxjs";
import {InputFormService} from "../../services/admin/input-form.service";
import {map, startWith} from "rxjs/operators";

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

  constructor(public router: Router, public checkBoxService: CheckBoxesService, public inputFormService:InputFormService) {
  }

  public selectedRoast = new FormControl('',[]);
  public selectedGrind = new FormControl('',[]);
  public options: string[] = [];
  public filteredOptions: Observable<string[]>;
  public roasts = [
    {value: '', viewValue: 'Keine'},
    {value: 'raw', viewValue: 'Roh'},
    {value: 'roasted', viewValue: 'Helle Röstung'},
    {value: 'medium roasted', viewValue: 'Mittlere Röstung'},
    {value: 'dark roasted', viewValue: 'Dunkle Röstung'},
  ];
  public grinds = [
    {value: 'veryCoarse', viewValue: 'Sehr Grob'},
    {value: 'coarse', viewValue: 'Grob'},
    {value: 'coarseMiddle', viewValue: 'Grob bis Mittel'},
    {value: 'middle', viewValue: 'Mittel'},
    {value: 'fine', viewValue: 'Fein'},
    {value: 'veryFine', viewValue: 'Sehr Fein'},
  ];

  public beanNameFormControl = new FormControl('',[]);
  public coffeeFormGroup = new FormGroup({
    nameBean: this.beanNameFormControl,
    grind: this.selectedGrind,
    roast: this.selectedRoast
  });

  getJsonOfSearch(): JSON {

    return this.checkBoxService.getJsonOfSearchWithSelect(this.inputsCoffee.toArray(), this.cbs.toArray(),this.selects.toArray());
  }

  clear() {
    this.checkBoxService.clear(this.cbs, this.coffeeFormGroup,  this.selects.toArray());
  }

  fillOutOptions(){
    this.inputFormService.getBeans().subscribe(shop =>{
      shop.forEach( value => {
        this.options.push(value.name)
      })
    })
  }
  ngOnInit() {
    this.fillOutOptions();
    this.filteredOptions = this.beanNameFormControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 2 ? this.checkBoxService._filter(val,this.options): []),
      );
  }

  @Output() callNavigateToCoffee = new EventEmitter<void>();
  triggerSearchCoffee():void{
    this.callNavigateToCoffee.emit();
  }
}

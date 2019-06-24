import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ViewEncapsulation} from "@angular/core";
import {Router} from '@angular/router';
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ShopService} from "../../services/shop/shop.service";
import {Global} from "../../global";


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [CheckBoxesService],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {

  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;
  @ViewChild('inputShop') inputShop: MatInput;
  @ViewChildren(MatSelect) select : QueryList<MatSelect>;
  @ViewChild('selectPOI') selectPoi : MatSelect;
  @ViewChild('selectPrice') selectPrice : MatSelect;

  constructor(private router: Router, private checkBoxService: CheckBoxesService,
              private shopService: ShopService, private global: Global) {

  }

  public shopNameFormControl = new FormControl();
  public options: string[] = [];
  public filteredOptions: Observable<string[]>;
  public filteredPoi: Observable<string[]>;
  public shopFormControls = new Array<FormControl>(this.shopNameFormControl);
  fillOutOptions(){
    this.shopService.getShops().subscribe(shop =>{
      shop.forEach( value => {
        this.options.push(value.name)
      })
    })
  }

  getjsonOfSearchWithSelect(): JSON{
    return this.checkBoxService.getjsonOfSearchWithSelect(this.shopFormControls,this.cbs.toArray(), this.select.toArray());
  }

  clear(){
    this.checkBoxService.clear(this.cbs,this.shopFormControls,  this.select.toArray());
  }

  ngOnInit() {
    this.shopService.getShops();
    this.fillOutOptions();
    this.filteredOptions = this.shopNameFormControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 2 ? this.checkBoxService._filter(val,this.options): []),
      );
    console.log(this.shopNameFormControl);
  }

  ngAfterViewInit(){
    console.log(this.selectPrice.selectionChange.subscribe(value => {
      console.log(value);
    }));
  }

}


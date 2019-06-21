import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ViewEncapsulation} from "@angular/core";
import {Router} from '@angular/router';
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith, tap} from "rxjs/operators";
import {ShopService} from "../../services/shop/shop.service";
import {VALID} from "@angular/forms/src/model";


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

  constructor(private router: Router, private checkBoxService: CheckBoxesService, private shopService: ShopService) {

  }

  private myControl = new FormControl();
  private options: string[] = [];
  private filteredOptions: Observable<string[]>;
  private filteredPoi: Observable<string[]>;

  fillOutOptions(){
    this.shopService.getShops().subscribe(shop =>{
      shop.forEach( value => {
        this.options.push(value.name)
      })
    })
  }

  getjsonOfSearchWithSelect(): JSON{
    return this.checkBoxService.getjsonOfSearchWithSelect(this.myControl,this.cbs.toArray(), this.select.toArray());
  }

  clear(){
    this.checkBoxService.clear(this.cbs,this.myControl,  this.select.toArray());
  }

  ngOnInit() {
    this.shopService.getShops();
    this.fillOutOptions();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 2 ? this.checkBoxService._filter(val,this.options): []),
      );

  }

  ngAfterViewInit(){
    console.log(this.selectPrice.selectionChange.subscribe(value => {
      console.log(value);
    }));
  }

}


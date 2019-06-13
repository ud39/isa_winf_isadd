import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ViewEncapsulation} from "@angular/core";
import {Router} from '@angular/router';
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {CheckBoxesService} from "../../services/checkboxes.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ShopService} from "../../services/shop/shop.service";


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
  @ViewChildren('select') select : QueryList<MatSelect>;

  states: string = '';
  showOrHide: boolean = false;

  constructor(private router: Router, private checkBoxService: CheckBoxesService, private shopService: ShopService) {

  }

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

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
    this.checkBoxService.clear(this.cbs,this.myControl, this.select.toArray());
  }

  ngOnInit() {
    this.shopService.getPosts();
    this.fillOutOptions();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this.checkBoxService._filter(val,this.options): [])
      )

  }

  ngAfterViewInit(){
  }

}


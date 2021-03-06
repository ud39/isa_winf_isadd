import {Component, EventEmitter, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Poi} from "../../interfaces/entity/Poi";
import {BusStation} from "../../interfaces/entity/BusStation";
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {Router} from "@angular/router";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {ShopService} from "../../services/shop/shop.service";
import {InputFormService} from "../../services/admin/input-form.service";
import {FormControl, FormGroup} from "@angular/forms";
import {forkJoin, Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-home-check-box',
  templateUrl: './home-check-box.component.html',
  styleUrls: ['./home-check-box.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeCheckBoxComponent implements OnInit {
  public checkBoxPois : Poi[];
  public checkBoxBusStation: BusStation[];
  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;
  @ViewChildren(MatSelect) selects : QueryList<MatSelect>;
  @ViewChildren(MatInput) inputSearch : QueryList<MatInput>;
  constructor(public router: Router, public checkBoxService: CheckBoxesService,
              public shopService: ShopService,
              public inputService: InputFormService) {

  }
  public streetNameFormControl = new FormControl();
  public shopNameFormControl = new FormControl();
  public priceClass = ['niedrig', 'mittel', 'hoch'];
  public options: string[] = [];
  public filteredOptions: Observable<string[]>;
  public shopFormControls = new FormGroup({
    shopName:this.shopNameFormControl,
    streetName:this.streetNameFormControl
  });
  fillOutOptions(){
    this.shopService.getShops().subscribe(shop =>{
      shop.forEach( value => {
        this.options.push(value.name)
      })
    })
  }

  getJsonOfSearchWithSelect(): JSON{
    return this.checkBoxService.getJsonOfSearchWithSelect(this.inputSearch.toArray(),this.cbs.toArray(), this.selects.toArray());
  }

  clear(){
    this.checkBoxService.clear(this.cbs,this.shopFormControls,this.selects.toArray());
  }

  ngOnInit() {
    this.fillOutOptions();
    this.filteredOptions = this.shopNameFormControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 2 ? this.checkBoxService._filter(val,this.options): []),
      );
    forkJoin([
      this.inputService.getPois(),
      this.inputService.getBusStations()
    ]).subscribe(([pois, busStation]) => {
      this.checkBoxPois = pois;
      this.checkBoxBusStation = busStation;
    })
  }

  @Output() callNavigateToShop = new EventEmitter<void>();
  navigateTo(){
    this.callNavigateToShop.emit();
  }
}

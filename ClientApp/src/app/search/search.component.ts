import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {CheckboxEquipmentComponent} from "./checkbox-equipment/checkbox-equipment.component";
import {CheckboxCoffeeComponent} from "./checkbox-coffee/checkbox-coffee.component";
import {Global} from "../global";
import {Router} from "@angular/router";
import {ShopService} from "../services/shop/shop.service";
import {EventService} from "../services/event/event.service";
import {EquipmentService} from "../services/equipment/equipment.service";
import {CoffeeService} from "../services/coffee/coffee.service";
import {MatTabGroup} from "@angular/material";
import {HomeCheckBoxComponent} from "./home-check-box/home-check-box.component";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[CheckboxComponent, CheckboxEquipmentComponent, Global],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit,  AfterViewInit {
  @ViewChild("cb") checkBoxComponent: CheckboxComponent;
  @ViewChild("cbeq") checkBoxEquipment: CheckboxEquipmentComponent;
  @ViewChild("cbcof") chechBoxComponentCoffee: CheckboxCoffeeComponent;
  @ViewChild("cbhome") checkBoxHomeEquipment: HomeCheckBoxComponent;
  @ViewChild('matTabGroup') matTabGroup : MatTabGroup;
  @Input() urlPath: string;
  public jsonOfSearch: JSON;
  public urlGlobalPath = Global.urlName;

  constructor(public router: Router, public shopService: ShopService, public eventService: EventService,
              public equipmentService: EquipmentService, public coffeeService: CoffeeService) {

  }

  getJsonOfSearch(): JSON {
    switch (this.urlPath) {
      case this.urlGlobalPath.get('home'):
        this.jsonOfSearch = this.checkBoxHomeEquipment.getJsonOfSearchWithSelect();
        break;
      case this.urlGlobalPath.get('shop'):
        this.jsonOfSearch = this.checkBoxComponent.getJsonOfSearchWithSelect();
        break;
      case this.urlGlobalPath.get('supplies'):
        switch(this.matTabGroup.selectedIndex){
          case 0:
          this.jsonOfSearch = this.checkBoxEquipment.getJsonOfSearch();
          break;
          case 1:
          this.jsonOfSearch = this.chechBoxComponentCoffee.getJsonOfSearch();
          break;
        }
        break;
      case this.urlGlobalPath.get('wiki'):
        this.jsonOfSearch = this.checkBoxEquipment.getJsonOfSearch();
        this.jsonOfSearch = this.chechBoxComponentCoffee.getJsonOfSearch();
        break;
    }
    return this.jsonOfSearch
  }

  clearCheckBoxes(): void {
    switch (this.urlPath) {
      case this.urlGlobalPath.get('home'):
        this.checkBoxHomeEquipment.clear();
        break;
      case this.urlGlobalPath.get('shop'):
        this.checkBoxComponent.clear();
        break;
      case this.urlGlobalPath.get('supplies'):
        switch(this.matTabGroup.selectedIndex){
          case 0:
          this.checkBoxEquipment.clear();
          break;
          case 1:
          this.chechBoxComponentCoffee.clear();
          this.chechBoxComponentCoffee.clear();
        }
      break;
      case this.urlGlobalPath.get('event'):
        this.checkBoxEquipment.clear();
        this.chechBoxComponentCoffee.clear();
        break;
    }
  }


searchShops(){
  this.getJsonOfSearch();
  switch (this.urlPath) {
    case this.urlGlobalPath.get('home'):
    this.shopService.navigateTo(this.jsonOfSearch);
    break;
    case this.urlGlobalPath.get('shop'):
    this.shopService.navigateTo(this.jsonOfSearch);
    break;
    case this.urlGlobalPath.get('supplies'):
      switch(this.matTabGroup.selectedIndex){
        case 0:
        this.getJsonOfSearch();
        this.shopService.searchSupplies(this.jsonOfSearch);
        break;
        case 1:
        this.getJsonOfSearch();
        this.shopService.searchSupplies(this.jsonOfSearch);
      }


  break;
  case this.urlGlobalPath.get('wiki'):
    this.coffeeService.navigateTo(this.jsonOfSearch);
  break;
}
}

  ngOnInit() {
  }


  ngAfterViewInit(){
  }

}

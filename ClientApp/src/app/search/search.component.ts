import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {CheckboxEquipmentComponent} from "./checkbox-equipment/checkbox-equipment.component";
import {CheckboxCoffeeComponent} from "./checkbox-coffee/checkbox-coffee.component";
import {Global} from "../global";
import {Router} from "@angular/router";
import {ShopService} from "../services/shop/shop.service";
import {EventService} from "../services/event/event.service";
import {EquipmentService} from "../services/equipment/equipment.service";
import {CoffeeService} from "../services/coffee/coffee.service";
;



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[CheckboxComponent, CheckboxEquipmentComponent, Global]
})

export class SearchComponent implements OnInit {
  @ViewChild("cb") checkBoxComponent: CheckboxComponent;
  @ViewChild("cbeq") checkBoxEquipment: CheckboxEquipmentComponent;
  @ViewChild("cbcof") chechBoxComponentCoffee: CheckboxCoffeeComponent;
  @Input() urlPath: string;
  public jsonOfSearch: JSON;
  public urlGlobalPath = Global.urlName;

  constructor(public router: Router, public shopService: ShopService, public eventService:EventService,
              public equipmentService: EquipmentService, public coffeeService:CoffeeService) {

  }

  getJsonOfSearch(): JSON{

    console.log(this.urlGlobalPath);
    switch(this.urlPath){
      case this.urlGlobalPath.get('shop'):
      this.jsonOfSearch = this.checkBoxComponent.getJsonOfSearchWithSelect();
      break;
      case this.urlGlobalPath.get('wikiEquipment'):
      this.jsonOfSearch = this.checkBoxEquipment.getJsonOfSearch();
      break;
      case this.urlGlobalPath.get('wikiCoffee'):
      this.jsonOfSearch = this.chechBoxComponentCoffee.getJsonOfSearch();
      case this.urlGlobalPath.get('wiki'):
      this.jsonOfSearch = this.checkBoxEquipment.getJsonOfSearch();
      this.jsonOfSearch = this.chechBoxComponentCoffee.getJsonOfSearch();
      break;
    }
    console.log(this.jsonOfSearch);
    return  this.jsonOfSearch
  }

  clearCheckBoxes() {
    switch (this.urlPath) {
      case this.urlGlobalPath.get('shop'):
      this.checkBoxComponent.clear();
      break;
      case this.urlGlobalPath.get('wikiEquipment'):
      this.checkBoxEquipment.clear();
      break;
      case this.urlGlobalPath.get('wikiCoffee'):
      this.chechBoxComponentCoffee.clear();
      break;
      case this.urlGlobalPath.get('wiki'):
      this.checkBoxEquipment.clear();
      this.chechBoxComponentCoffee.clear();
      break;
    }
  }

  navigateToShop(){
    this.getJsonOfSearch();
    this.shopService.navigateTo(this.jsonOfSearch)
  }

  navigateToEquipmentCoffee(){
    this.getJsonOfSearch();
    switch(this.urlPath){
      case this.urlGlobalPath.get('wiki'):
        this.navigateToEquipmentCategory();
        this.navigateToCoffee();
        break;
      case this.urlGlobalPath.get('wikiEquipment'):
        this.navigateToEquipmentCategory();
        break;
      case this.urlGlobalPath.get('wikiCoffee'):
        this.navigateToEquipmentCategory();
        break;
      case this.urlGlobalPath.get('events'):
        this.navigateToEvent();
        break;
    }
  }

  navigateToEvent(){
    this.eventService.navigateTo(this.jsonOfSearch);
  }

  navigateToEquipmentCategory(){
    this.equipmentService.navigateTo(this.jsonOfSearch);
  }

  navigateToCoffee(){
    this.coffeeService.navigateTo(this.jsonOfSearch);
  }

  ngOnInit() {
    console.log(this.urlPath);
  }
}

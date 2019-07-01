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
  @ViewChild(MatTabGroup) matTabGroup : MatTabGroup;
  @Input() urlPath: string;
  public jsonOfSearch: JSON;
  public urlGlobalPath = Global.urlName;

  constructor(public router: Router, public shopService: ShopService, public eventService: EventService,
              public equipmentService: EquipmentService, public coffeeService: CoffeeService) {

  }

  getJsonOfSearch(): JSON {

    switch (this.urlPath) {
      case this.urlGlobalPath.get('shop'):
        this.jsonOfSearch = this.checkBoxComponent.getJsonOfSearchWithSelect();
        break;
      case this.urlGlobalPath.get('suppliesEq'):
        this.jsonOfSearch = this.checkBoxEquipment.getJsonOfSearch();
        break;
      case this.urlGlobalPath.get('suppliesIng'):
        this.jsonOfSearch = this.chechBoxComponentCoffee.getJsonOfSearch();
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
      case this.urlGlobalPath.get('shop'):
        this.checkBoxComponent.clear();
        break;
      case this.urlGlobalPath.get('supplies'):
        this.checkBoxEquipment.clear();
        this.chechBoxComponentCoffee.clear();
        break;
      case this.urlGlobalPath.get('wiki'):
        this.checkBoxEquipment.clear();
        this.chechBoxComponentCoffee.clear();
        break;
    }
  }

  navigateToEquipmentCoffeeWiki() {
    this.getJsonOfSearch();
    switch (this.urlPath) {
      case this.urlGlobalPath.get('wiki'):
        this.navigateToSupplies();
        this.navigateToCoffee();
        break;
      case this.urlGlobalPath.get('suppliesEq'):
        this.navigateToSupplies();
        break;
      case this.urlGlobalPath.get('suppliesIng'):
        this.navigateToSupplies();
        break;
      case this.urlGlobalPath.get('events'):
        this.navigateToEvent();
        break;
    }
  }

  //TODO Make if statement from HTML to more compact function
  displaySearchInterface(): boolean {
    return null
  }

  navigateToShop() {
    this.getJsonOfSearch();
    this.shopService.navigateTo(this.jsonOfSearch)
  }


  navigateToEvent() {
    this.eventService.navigateTo(this.jsonOfSearch);
  }

  navigateToSupplies() {
    this.equipmentService.navigateTo(this.jsonOfSearch);
  }

  navigateToCoffee() {
    this.coffeeService.navigateTo(this.jsonOfSearch);
  }

  public matTabActive: string = 'Shop';
  check(){
    console.log(this.urlPath == this.urlGlobalPath.get('shop'));
    return this.urlPath == this.urlGlobalPath.get('shop');
  }
  ngOnInit() {

  }

  ngAfterViewInit(){
    this.matTabGroup.selectedIndex = 0;
    this.matTabGroup.selectedTabChange.subscribe(event => {
      this.matTabActive = event.tab.textLabel;
    });
  }
}

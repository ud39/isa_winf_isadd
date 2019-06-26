import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {CheckboxEquipmentComponent} from "./checkbox-equipment/checkbox-equipment.component";
import {CheckboxCoffeeComponent} from "./checkbox-coffee/checkbox-coffee.component";
import {Global} from "../global";
import {NavigationExtras, Router} from "@angular/router";
import {ShopService} from "../services/shop/shop.service";
import {Shop} from "../interfaces/entity/Shop";
import {HttpParams} from "@angular/common/http";



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
  constructor(public router: Router, public shopService: ShopService) {

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
  navigateTo(){
    this.getJsonOfSearch();
    let params = new HttpParams();
    Object.keys(this.jsonOfSearch).forEach(key =>
    {
      console.log((this.jsonOfSearch[key] != "" && this.jsonOfSearch[key] != null)
        || this.jsonOfSearch[key]);

      if((this.jsonOfSearch[key] != "" && this.jsonOfSearch[key] != null) || this.jsonOfSearch[key])
      {
        params = params.append(key,this.jsonOfSearch[key])
      }
    });
    let navigationExtras : NavigationExtras ={
      queryParams: {params}
    };
    console.log(navigationExtras.queryParams);
    this.router.navigate(['/shops'], navigationExtras);
    console.log(this.shopService.getShopWithParams(params).subscribe(value => {
    console.log(value);
    }));
  }

  ngOnInit() {
    console.log(this.urlPath);
  }
}

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {CheckboxEquipmentComponent} from "./checkbox-equipment/checkbox-equipment.component";
import {CheckboxCoffeeComponent} from "./checkbox-coffee/checkbox-coffee.component";
import {Global} from "../global";
import {NavigationExtras, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {HttpParamsOptions} from "@angular/common/http/src/params";



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

  constructor(public globalVariables: Global, public router: Router) {

  }

  getJsonOfSearch(): JSON{
    let urlPath = this.globalVariables.urlName;
    console.log(urlPath);
    switch(this.urlPath){
      case urlPath.get('shop'):
      this.jsonOfSearch = this.checkBoxComponent.getJsonOfSearchWithSelect();
      break;
      case urlPath.get('wikiEquipment'):
      this.jsonOfSearch = this.checkBoxEquipment.getJsonOfSearch();
      break;
      case urlPath.get('wikiCoffee'):
      this.jsonOfSearch = this.chechBoxComponentCoffee.getJsonOfSearch();
    }
    console.log(this.jsonOfSearch);
    return  this.jsonOfSearch
  }

  clearCheckBoxes() {
    let urlPath = this.globalVariables.urlName;
    switch (this.urlPath) {
      case urlPath.get('shop'):
      this.checkBoxComponent.clear();
      break;
      case urlPath.get('wikiEquipment'):
      this.checkBoxEquipment.clear();
      break;
      case urlPath.get('wikiCoffee'):
      this.chechBoxComponentCoffee.clear();
      break;
      case urlPath.get('wiki'):
      this.checkBoxEquipment.clear();
      this.chechBoxComponentCoffee.clear();
      break;
    }
  }
  navigateTo(){
    this.getJsonOfSearch();
    const httpParams: HttpParamsOptions = { param: this.jsonOfSearch } as HttpParamsOptions;
    let queryParams = new HttpParams(httpParams);
    console.log(queryParams);
  }

  ngOnInit() {
    console.log(this.urlPath);
  }
}

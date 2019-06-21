import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {CheckboxEquipmentComponent} from "./checkbox-equipment/checkbox-equipment.component";
import {CheckboxCoffeeComponent} from "./checkbox-coffee/checkbox-coffee.component";
import {RouteService} from "../services/routing/route.service";
import {Global} from "../global";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[CheckboxComponent, CheckboxEquipmentComponent, Global]
})

export class SearchComponent implements OnInit {
  @ViewChild("cb") checkBoxComponent: CheckboxComponent;
  @ViewChild("cbeq") checkBoxEquipment: CheckboxEquipmentComponent;
  @ViewChild("cbcof") chechBoxComponentCoffee: CheckboxCoffeeComponent
  @Input() urlPath: string;
  private jsonOfSearch: JSON;

  constructor(private globalVariables: Global) {

  }

  getJsonOfSearch(): JSON{
    let urlPath = this.globalVariables.urlName;
    console.log(urlPath);
    switch(this.urlPath){
      case urlPath.get('shop'):
      this.jsonOfSearch = this.checkBoxComponent.getjsonOfSearchWithSelect();
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
    }
  }

  ngOnInit() {
  }
}

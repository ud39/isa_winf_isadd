import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {CheckboxEquipmentComponent} from "./checkbox-equipment/checkbox-equipment.component";
import {CheckboxCoffeeComponent} from "./checkbox-coffee/checkbox-coffee.component";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[CheckboxComponent, CheckboxEquipmentComponent]
})

export class SearchComponent implements OnInit {
  @ViewChild("cb") checkBoxComponent: CheckboxComponent;
  @ViewChild("cbeq") checkBoxEquipment: CheckboxEquipmentComponent;
  @ViewChild("cbcof") chechBoxComponentCoffee: CheckboxCoffeeComponent
  @Input() urlPath: string;
  private jsonOfSearch: JSON;

  constructor() {

  }

  getJsonOfSearch(): JSON{
    switch(this.urlPath){
      case '/shop':
      this.jsonOfSearch = this.checkBoxComponent.getjsonOfSearchWithSelect();
      break;
      case '/wiki/equipment':
      this.jsonOfSearch = this.checkBoxEquipment.getJsonOfSearch();
      break;
      case '/wiki/coffee':
      this.jsonOfSearch = this.chechBoxComponentCoffee.getJsonOfSearch();
    }
    console.log(this.jsonOfSearch);
    return  this.jsonOfSearch
  }

  clearCheckBoxes() {
    switch (this.urlPath) {
      case '/shop':
      this.checkBoxComponent.clear();
      break;
      case '/wiki/equipment':
      this.checkBoxEquipment.clear();
      break;
      case '/wiki/coffee':
      this.chechBoxComponentCoffee.clear();
    }
  }

  ngOnInit() {
  }
}

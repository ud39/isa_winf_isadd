import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSelect} from "@angular/material";

@Component({
  selector: 'app-content-tab',
  templateUrl: './content-tab.component.html',
  styleUrls: ['./content-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentTabComponent implements OnInit {
  @ViewChild('multipleSelectBlend') multipleSelectBlend : MatSelect;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'hotdog-3', viewValue: 'Hotdog'}
  ];

  private selected;
  private content: string[] = ["Blend", "Bohnen", "Equipment", "Kaffee Drink"];

  private valueNameBlend='';
  private valueNameBean='';
  private valueNameEquipment='';
  private valueNameCoffeeDrink='';

  private descriptionBlend = '';
  private descriptionBean = '';
  private descriptionEquipment = '';
  private descriptionCoffeeDrink = '';

  pushMultipleSelectedValue(select :MatSelect){
    let selectedValue: Array<string> = [];
    for(let sel of select.value){
      selectedValue.push(sel);
    }
    return selectedValue;
  }
  constructor() { }

  ngOnInit() {
  }

  text(){
    console.log('Values' + '\n' + this.valueNameBean + '\n' + this.valueNameBlend + '\n' + this.valueNameEquipment + '\n' + this.valueNameCoffeeDrink + '\n');
    console.log('Description' + '\n' + this.descriptionBean + '\n' + this.descriptionBlend + '\n' + this.descriptionEquipment + '\n' + this.descriptionCoffeeDrink + '\n' + this.pushMultipleSelectedValue(this.multipleSelectBlend).length);
  }
}

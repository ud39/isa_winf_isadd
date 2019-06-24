import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSelect} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-content-tab',
  templateUrl: './content-tab.component.html',
  styleUrls: ['./content-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentTabComponent implements OnInit {
  @ViewChild('multipleSelectBlend') multipleSelectBlend : MatSelect;

  public selectContentFormControl = new FormControl('',[
    Validators.required,
  ]);

  private setStartValue(){
    this.selectContentFormControl.setValue('Blend')
  }
  public selected = "Blend";
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'hotdog-3', viewValue: 'Hotdog'}
  ];

  public   content = [
    {value: 'Blend', viewValue: 'Blend'},
    {value: 'Bean', viewValue: 'Bohnen'},
    {value: 'Equipment', viewValue: 'Equipment'},
    {value: 'CoffeeDrink', viewValue: 'KaffeeDrink'},
    {value: 'Manufacturer', viewValue: 'Hersteller'},
    {value: 'Equipment-category', viewValue: 'Equipment Kategorie'}
  ];

  public nameBlendFormControl = new FormControl('',[]);
  public nameBeanFormControl = new FormControl('',[]);
  public nameEquipmentFormControl = new FormControl('',[]);
  public nameCoffeeDrinkFormControl = new FormControl('',[]);
  public nameManufacturerFormControl = new FormControl('',[]);

  public descriptionBlendFormControl = new FormControl('',[]);
  public descriptionBeanFormControl = new FormControl('',[]);
  public descriptionEquipmentFormControl = new FormControl('',[]);
  public descriptionCoffeeDrinkFormControl = new FormControl('',[]);

  public selectBlendFormControl = new FormControl('',[]);

  public blendFormGroup = new FormGroup({name: this.nameBlendFormControl, description: this.descriptionBlendFormControl, blends: this.selectBlendFormControl, select: this.selectContentFormControl});
  public beanFormGroup = new FormGroup({name: this.nameBeanFormControl, description: this.descriptionBeanFormControl, select: this.selectContentFormControl});
  public equipmentFormGroup = new FormGroup({name: this.nameEquipmentFormControl, description: this.descriptionEquipmentFormControl, select: this.selectContentFormControl});
  public coffeeDrinkFormGroup = new FormGroup({name: this.nameCoffeeDrinkFormControl, description: this.descriptionCoffeeDrinkFormControl, select: this.selectContentFormControl});
  public manufacturerFormGroup = new FormGroup({name: this.nameManufacturerFormControl, select: this.selectContentFormControl});

  constructor() { }

  public clear(){
  }
  ngOnInit() {
    this.setStartValue();
  }

  public getContentInput(): FormGroup{
    switch (this.selected) {
      case 'Blend':
        return this.blendFormGroup;
      case 'Bean':
        return this.beanFormGroup;
      case 'Equipment':
        return this.equipmentFormGroup;
      case 'CoffeeDrink':
        return this.coffeeDrinkFormGroup;
      case 'Manfacturer':
        return this.manufacturerFormGroup;
    }
  }
  public text() {
    console.log(this.blendFormGroup)
  }
}

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

  private selectContentFormControl = new FormControl('',[
    Validators.required,
  ]);

  private inputContent = new FormGroup({
    selectContent: this.selectContentFormControl,
  });


  private selected;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'hotdog-3', viewValue: 'Hotdog'}
  ];

  private   content = [
    {value: 'Blend', viewValue: 'Blend'},
    {value: 'Bean', viewValue: 'Bohnen'},
    {value: 'Equipment', viewValue: 'Equipment'},
    {value: 'CoffeeDrink', viewValue: 'KaffeeDrink'},
    {value: 'Manufacturer', viewValue: 'Hersteller'}
  ];

  private nameBlendFormControl = new FormControl('',[

    ]);
  private nameBeanFormControl = new FormControl('',[

    ]);
  private nameEquipmentFormControl = new FormControl('',[

    ]);
  private nameCoffeeDrinkFormControl = new FormControl('',[

    ]);
  private nameManufacturerFormControl = new FormControl('',[

    ]);

  private descriptionBlendFormControl = new FormControl('',[

  ]);
  private descriptionBeanFormControl = new FormControl('',[

  ]);
  private descriptionEquipmentFormControl = new FormControl('',[

  ]);
  private descriptionCoffeeDrinkFormControl = new FormControl('',[

  ]);
  private blendFormGroup = new FormGroup({name: this.nameBlendFormControl, description: this.descriptionBlendFormControl});
  private beanFormGroup = new FormGroup({name: this.nameBeanFormControl, description: this.descriptionBeanFormControl});
  private equipmentFormGroup = new FormGroup({name: this.nameEquipmentFormControl, description: this.descriptionEquipmentFormControl});
  private coffeeDrinkFormGroup = new FormGroup({name: this.nameCoffeeDrinkFormControl, description: this.descriptionCoffeeDrinkFormControl});
  private manufacturerFormGroup = new FormGroup({name: this.nameManufacturerFormControl});

  private pushMultipleSelectedValue(select :MatSelect){
    let selectedValue: Array<string> = [];
    for(let sel of select.value){
      selectedValue.push(sel);
    }
    return selectedValue;
  }
  constructor() { }

  private clear(){
  }
  ngOnInit() {
  }

  getSelectedFormGroup(): FormGroup{
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
  private text() {
    console.log(this.blendFormGroup)
  }
}

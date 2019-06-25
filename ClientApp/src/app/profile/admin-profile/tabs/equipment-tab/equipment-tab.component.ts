import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CheckboxEquipmentComponent} from "../../../../search/checkbox-equipment/checkbox-equipment.component";

@Component({
  selector: 'app-equipment-tab',
  templateUrl: './equipment-tab.component.html',
  styleUrls: ['./equipment-tab.component.css']
})
export class EquipmentTabComponent implements OnInit {
  @ViewChild('cbEq') checkBoxes : CheckboxEquipmentComponent;

  public equipmentNameFormControl = new FormControl('',[
    Validators.required
    ]
  );

  public equipmentDescriptionFormControl = new FormControl('',[
    ]
  );

  public selectEquipmentCategoryFormControl = new FormControl('',[]);

  public equipmentInput = new FormGroup({
    equipmentName: this.equipmentNameFormControl,
    equipmentDescrition: this.equipmentDescriptionFormControl,
    equipmentCategory: this.selectEquipmentCategoryFormControl
  });

  public getEquipmentInput(){
    return this.equipmentInput;
  }

  constructor() { }

  ngOnInit() {
  }

}

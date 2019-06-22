import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-equipment-tab',
  templateUrl: './equipment-tab.component.html',
  styleUrls: ['./equipment-tab.component.css']
})
export class EquipmentTabComponent implements OnInit {

  private equipmentNameFormControl = new FormControl('',[
    Validators.required
    ]
  );

  private equipmentDescriptionFormControl = new FormControl('',[
    ]
  );

  private equipmentInput = new FormGroup({
    equipmentName: this.equipmentNameFormControl,
    equipmentDescrition: this.equipmentDescriptionFormControl
  });

  public getEquipmentInput(){
    return this.equipmentInput;
  }

  constructor() { }

  ngOnInit() {
  }

}

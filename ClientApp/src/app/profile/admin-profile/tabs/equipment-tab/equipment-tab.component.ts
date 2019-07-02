import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CheckboxEquipmentComponent} from "../../../../search/checkbox-equipment/checkbox-equipment.component";
import {AdminService} from "../../../../services/admin/admin.service";
import {EquipmentCategory} from "../../../../interfaces/entity/EquipmentCategory";
import {InputFormService} from "../../../../services/admin/input-form.service";

@Component({
  selector: 'app-equipment-tab',
  templateUrl: './equipment-tab.component.html',
  styleUrls: ['./equipment-tab.component.css']
})
export class EquipmentTabComponent implements OnInit {
  @ViewChild('cbEq') checkBoxes : CheckboxEquipmentComponent;

  public chooseEquipmentCategory: EquipmentCategory[];
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
    equipmentCategory: this.selectEquipmentCategoryFormControl
  });

  public getEquipmentInput(){
    return this.equipmentInput;
  }

  constructor(public adminService: AdminService, public inputFormService : InputFormService) {}

  fillOutInputForm(equipmentCategory:EquipmentCategory){
    this.equipmentNameFormControl.setValue(equipmentCategory.name);
  }

  getJsonOfEquipment():JSON{
    return null
  }

  compareEquipmentCategory(equipment1 : EquipmentCategory, equipment2:EquipmentCategory){
    return equipment1.name == equipment2.name;
  }
  ngOnInit() {
  }


  //jan
  onFileChanged(files, event) {
    this.adminService.onFileChanged2(files, event, "equipment")
  }

  onUpload(fromWhere) {
    this.adminService.onUpload(fromWhere);
  }

  deleteImage(fromWhere) {
    this.adminService.deleteImage(fromWhere);
  }

}

import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {Router} from "@angular/router";
import {MatCheckbox, MatInput, MatSelect, MatTabGroup} from "@angular/material";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Global} from "../../global";
import {CompareService} from "../../services/compare/compare.service";
import {InputFormService} from "../../services/admin/input-form.service";
import {EquipmentCategory} from "../../interfaces/entity/EquipmentCategory";
import {forkJoin, Observable} from "rxjs";
import {Poi} from "../../interfaces/entity/Poi";
import {BusStation} from "../../interfaces/entity/BusStation";

@Component({
  selector: 'app-checkbox-equipment',
  templateUrl: './checkbox-equipment.component.html',
  styleUrls: ['./checkbox-equipment.component.css'],
  encapsulation:ViewEncapsulation.None,
  providers:[CheckboxComponent]

})
export class CheckboxEquipmentComponent implements OnInit {
  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;
  @ViewChildren(MatSelect) selects : QueryList<MatSelect>;
  @ViewChildren(MatInput) inputs : QueryList<MatInput>;

  public matTabActive;
  public checkBoxPois : Poi[];
  public checkBoxBusStation: BusStation[];
  public streetNameFormControl = new FormControl();
  public shopNameFormControl = new FormControl();
  public options: string[] = [];
  public filteredOptions: Observable<string[]>;
  public shopFormControls = new FormGroup({
    shopName:this.shopNameFormControl,
    streetName:this.streetNameFormControl
  });

  public equipmentCategory : EquipmentCategory[];
  public selectEquipmentCategoryFormControl = new FormControl('',[]);
  public urlGlobalPath = Global.urlName;
  public equipmentNameFormControl = new FormControl('',[]);
  public formGroupEquipment = new FormGroup({
    name: this.equipmentNameFormControl
  });
  constructor(public router:Router, public checkBoxService: CheckBoxesService, public compareService: CompareService, public inputService:InputFormService) { }

  getJsonOfSearch(): JSON{
    return this.checkBoxService.getJsonOfSearchWithSelect(this.inputs.toArray(),this.cbs.toArray(),this.selects.toArray());
  }

  clear() {
    this.checkBoxService.clear(this.cbs, this.formGroupEquipment, this.selects.toArray())
  }

  @Output() callNavigateToEquipment = new EventEmitter<void>();

  triggerSearchEquipment():void{
    this.callNavigateToEquipment.emit();
  }

  triggerSearchBlend():void{
    this.callNavigateToEquipment.emit();
  }

  triggerSearchBean():void{
    this.callNavigateToEquipment.emit();
  }

  ngOnInit() {
  this.inputService.getEquipmentCategories().subscribe(value =>{
  this.equipmentCategory =  value
  });
    forkJoin([
      this.inputService.getPois(),
      this.inputService.getBusStations()
    ]).subscribe(([pois, busStation]) => {
      this.checkBoxPois = pois;
      this.checkBoxBusStation = busStation;
    })
  }
}

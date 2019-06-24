import {Component, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {Router} from "@angular/router";
import {MatCheckbox} from "@angular/material";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-checkbox-equipment',
  templateUrl: './checkbox-equipment.component.html',
  styleUrls: ['./checkbox-equipment.component.css'],
  encapsulation:ViewEncapsulation.None,
  providers:[CheckboxComponent]

})
export class CheckboxEquipmentComponent implements OnInit {
  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;

  constructor(public router:Router, public checkBoxService: CheckBoxesService) { }
  public myControl = new FormControl();
  public equipmentFormControls = new Array<FormControl>(this.myControl);
  getJsonOfSearch(): JSON{
    return this.checkBoxService.getjsonOfSearch(this.equipmentFormControls,this.cbs.toArray());
  }

  clear() {
    this.checkBoxService.unselectCheckBoxes(this.cbs);
  }

  ngOnInit() {
  }

}

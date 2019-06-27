import {Component, EventEmitter, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {Router} from "@angular/router";
import {MatCheckbox, MatInput, MatSelect} from "@angular/material";
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
  @ViewChildren(MatSelect) selects : QueryList<MatSelect>;
  @ViewChildren(MatInput) inputs : QueryList<MatInput>;
  constructor(public router:Router, public checkBoxService: CheckBoxesService) { }

  getJsonOfSearch(): JSON{
    console.log(this.inputs.toArray(),this.cbs.toArray(),this.selects.toArray());
    return this.checkBoxService.getJsonOfSearchWithSelect(this.inputs.toArray(),this.cbs.toArray(),this.selects.toArray());
  }

  clear() {
    this.checkBoxService.unselectCheckBoxes(this.cbs);
  }

  @Output() callNavigateToEquipment = new EventEmitter<void>();

  triggerSearchEquipment():void{
    console.log("Call form Equipment");
    this.callNavigateToEquipment.emit();
  }

  ngOnInit() {
  }

}

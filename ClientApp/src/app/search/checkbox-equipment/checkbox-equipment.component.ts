import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {Router} from "@angular/router";
import {MatCheckbox} from "@angular/material";
import {CheckBoxesService} from "../../services/checkboxes.service";

@Component({
  selector: 'app-checkbox-equipment',
  templateUrl: './checkbox-equipment.component.html',
  styleUrls: ['./checkbox-equipment.component.css'],
  providers:[CheckboxComponent]

})
export class CheckboxEquipmentComponent implements OnInit {
  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;

  constructor(private router:Router, private checkBoxService: CheckBoxesService) { }

  getCheckBoxes() : JSON{
    return this.checkBoxService.getCheckBoxesValues(this.cbs.toArray());
  }

  clear() {
    this.checkBoxService.unselectCheckBoxes(this.cbs);
  }

  ngOnInit() {
  }

}

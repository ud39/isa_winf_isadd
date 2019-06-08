import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {Router} from "@angular/router";
import {MatCheckbox} from "@angular/material";

@Component({
  selector: 'app-checkbox-equipment',
  templateUrl: './checkbox-equipment.component.html',
  styleUrls: ['./checkbox-equipment.component.css'],
  providers:[CheckboxComponent]

})
export class CheckboxEquipmentComponent implements OnInit {
  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;

  constructor(private router:Router) { }

  clear() {
    CheckboxComponent.unselectCheckBoxes(this.cbs);
  }

  ngOnInit() {
  }

}

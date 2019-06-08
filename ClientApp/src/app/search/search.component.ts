import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CheckboxComponent} from "./checkbox/checkbox.component";
import {CheckboxEquipmentComponent} from "./checkbox-equipment/checkbox-equipment.component";



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[CheckboxComponent]
})

export class SearchComponent implements OnInit {
  @ViewChild("cb") component1: CheckboxComponent;
  @ViewChild("cbeq") component2: CheckboxEquipmentComponent;

  @Input() urlPath: string;


  constructor() {

  }

  clearCheckBoxes() {
    switch (this.urlPath) {
      case '/shop':
      this.component1.clear();
      break;
      case '/equipment':
      this.component2.clear();
    }


  }

  ngOnInit() {

  }
}

import { Component, OnInit } from '@angular/core';
import {Equipment} from "../../../interfaces/entity/Equipment";

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  public equipments: Equipment[];
  constructor() { }

  ngOnInit() {
  }

}

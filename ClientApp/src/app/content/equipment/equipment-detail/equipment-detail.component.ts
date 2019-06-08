import { Component, OnInit } from '@angular/core';
import {Equipment} from "../../../interfaces/entity/Equipment";


@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {

  public equipment: Equipment;

  constructor() { }

  ngOnInit() {
  }

}

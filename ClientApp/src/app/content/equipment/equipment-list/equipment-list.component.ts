import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Equipment} from "../../../interfaces/entity/Equipment";
import {ShopService} from "../../../services/shop/shop.service";

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
  encapsulation:ViewEncapsulation.None,
})
export class EquipmentListComponent implements OnInit {

  constructor(public shopService:ShopService){}
  public equipments: Equipment[];
  ngOnInit() {
    this.shopService.getShops().subscribe(result => {
      this.shopService.shops = result;
    }, error => console.error(error));
  }

}

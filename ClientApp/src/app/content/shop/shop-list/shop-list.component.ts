import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShopService} from "../../../services/shop/shop.service";
import {Shop} from "../../../interfaces/entity/Shop";







@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopListComponent implements OnInit {

  public currentShops: Shop[];

  constructor(public service: ShopService)
  {
  }

  ngOnInit() {
   this.service.getShops().subscribe(result => {
      this.service.shops = result;
   }, error => console.error(error));
  }
}

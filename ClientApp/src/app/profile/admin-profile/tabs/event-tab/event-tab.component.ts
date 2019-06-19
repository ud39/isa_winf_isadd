import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSelect} from "@angular/material";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventTabComponent implements OnInit {
  @ViewChild('multipleSelectShop') multipleSelectShop : MatSelect;

  private shops : Shop[];
  private eventName;
  private eventDescription;
  private accessFee;
  constructor(private shopSerivce: ShopService) { }

  ngOnInit() {
    this.shopSerivce.getShops().subscribe(value => {
      this.shops = value;
      console.log(this.shops);
    })
  }
  private myDate = new Date();

  private minDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth(),
    this.myDate.getDate()
  );

  private maxDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth() + 24,
    this.myDate.getDate()
  );
}


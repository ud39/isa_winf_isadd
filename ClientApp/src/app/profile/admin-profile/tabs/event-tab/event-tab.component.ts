import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSelect} from "@angular/material";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventTabComponent implements OnInit {
  @ViewChild('multipleSelectShop') multipleSelectShop : MatSelect;

  private shops : Shop[];

  private eventNameFormControl = new FormControl('',[
    Validators.required
  ]);
  private eventDescriptionFormControl = new FormControl('',[
    Validators.maxLength(500),
  ]);

  private datePickerFormControl = new FormControl('',[
  ]);

  private selectShopFormControl = new FormControl('', [
    Validators.required,
  ]);

  private accessFeeFormControl = new FormControl('',[
    Validators.min(-1)
  ]);

  private selectLocationControl = new FormControl('',[
  ]);

  private eventInput = new FormGroup({
    eventName: this.eventNameFormControl,
    eventDescription: this.eventDescriptionFormControl,
    eventAccessFee: this.accessFeeFormControl,
    eventDate: this.datePickerFormControl,
    location: this.selectLocationControl,
    selectShop: this.selectShopFormControl
  });

  public getEventInput(){
    return this.eventInput;
  }

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


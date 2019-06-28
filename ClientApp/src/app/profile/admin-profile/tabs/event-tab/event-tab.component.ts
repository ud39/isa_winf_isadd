import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSelect} from "@angular/material";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";
import {Event} from "../../../../interfaces/entity/Event";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../../services/event/event.service";
import {AdminService} from "../../../../services/admin/admin.service";

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventTabComponent implements OnInit {
  @ViewChild('multipleSelectShop') multipleSelectShop : MatSelect;

  public shops : Shop[];
  public events: Event[];
  public eventNameFormControl = new FormControl('',[
    Validators.required
  ]);
  public eventDescriptionFormControl = new FormControl('',[
    Validators.maxLength(500),
  ]);

  public datePickerFormControl = new FormControl('',[
  ]);

  public selectShopFormControl = new FormControl('', [
    Validators.required,
  ]);

  public accessFeeFormControl = new FormControl('',[
    Validators.min(-1)
  ]);

  public locationStreetFormControl = new FormControl('',[]);
  public locationStreetNrFormControl = new FormControl('',[]);
  public locationTownFormControl = new FormControl('',[]);
  public locationPostalCodeFormControl = new FormControl('',[]);

  public locationFormGroup = new FormGroup({
    street:this.locationStreetFormControl,
    streetNr:this.locationStreetNrFormControl,
    town:this.locationTownFormControl,
    postalCode:this.locationPostalCodeFormControl
  });

  public eventInput = new FormGroup({
    eventName: this.eventNameFormControl,
    eventDescription: this.eventDescriptionFormControl,
    eventAccessFee: this.accessFeeFormControl,
    eventDate: this.datePickerFormControl,
    location: this.locationFormGroup,
    selectShop: this.selectShopFormControl
  });

  public getEventInput(){
    return this.eventInput;
  }

  constructor(public shopSerivce: ShopService, public eventService: EventService, public adminService: AdminService) { }

  ngOnInit() {
    this.shopSerivce.getShops().subscribe(value => {
      this.shops = value;
      console.log(this.shops);
    })
    this.eventService.getEvents().subscribe(value => {
      this.events = value;
    })
  }

  public myDate = new Date();

  public minDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth(),
    this.myDate.getDate()
  );

  public maxDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth() + 24,
    this.myDate.getDate()
  );



  //jan
  onFileChanged(event) {
    this.adminService.onFileChanged(event)
  }

  onUpload(fromWhere) {
    this.adminService.onUpload(fromWhere);
  }

  deleteImage(fromWhere) {
    this.adminService.deleteImage(fromWhere);
  }














}


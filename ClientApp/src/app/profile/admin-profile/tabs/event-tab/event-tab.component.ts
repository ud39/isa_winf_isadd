import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSelect} from "@angular/material";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";
import {Event} from "../../../../interfaces/entity/Event";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../../services/event/event.service";
import {AdminService} from "../../../../services/admin/admin.service";
import {CompareService} from "../../../../services/compare/compare.service";

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
  public selectedEvent;
  public eventNameFormControl = new FormControl('',[
    Validators.required
  ]);
  public eventDescriptionFormControl = new FormControl('',[
    Validators.maxLength(500),
  ]);

  public beginDatePickerFormControl = new FormControl('',[
    Validators.required
  ]);
  public endDatePickerFormControl = new FormControl('',[
    Validators.required
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
  public locationCountryFormControl = new FormControl('',[]);

  public beginEndDateFormGroup = new FormGroup({
    begin: this.beginDatePickerFormControl,
    end: this.endDatePickerFormControl
  },{validators:this.compareService.eventDateValidator});

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
    beginEndDate: this.beginEndDateFormGroup,
    location: this.locationFormGroup,
    selectShop: this.selectShopFormControl
  });

  public getEventInput(){
    return this.eventInput;
  }

  constructor(public shopSerivce: ShopService, public eventService: EventService, public adminService: AdminService,
              public compareService: CompareService) { }

  ngOnInit() {
    this.shopSerivce.getShops().subscribe(value => {
      this.shops = value;
    });
    this.eventService.getEvents().subscribe(value => {
      this.events = value;
    });
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

  fillOutInputForm(event:Event){
    this.eventNameFormControl.setValue(event.name);
    this.eventDescriptionFormControl.setValue(event.description);
    this.accessFeeFormControl.setValue(event.accessFee);
    this.selectShopFormControl.setValue(event.coffeeShop);
    this.beginDatePickerFormControl.setValue(event.startTime);
    this.endDatePickerFormControl.setValue(event.endTime);
  }

  getJsonOfEvent() : JSON {
    let json : JSON;

    //add images
    if(this.adminService.eventImage.toString().length > 0 && this.adminService.event_Filename.length >0){
      let eventImages = JSON.parse('"images:' + this.adminService.event_Filename)
      json["images"] = eventImages;
    }


    return json;
  }

  //jan
  onFileChanged(file, event) {
    this.adminService.onFileChanged2(file, event, "event")
  }

  onUpload(fromWhere) {
    this.adminService.onUpload(fromWhere);
  }

  deleteImage(fromWhere) {
    this.adminService.deleteImage(fromWhere);
  }














}


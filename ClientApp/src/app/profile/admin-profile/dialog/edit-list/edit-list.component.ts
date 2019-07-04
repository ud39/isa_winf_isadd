import {Component, Inject,OnDestroy, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material";
import {InputFormService} from "../../../../services/admin/input-form.service";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";
import {Event} from "../../../../interfaces/entity/Event";
import {Subscription} from "rxjs";
import {EventService} from "../../../../services/event/event.service";
import {User} from "../../../../interfaces/entity/User";
import {UserService} from "../../../../services/user/user.service";
import {Blend} from "../../../../interfaces/entity/Blend";
import {Bean} from "../../../../interfaces/entity/Bean";
import {Poi} from "../../../../interfaces/entity/Poi";
import {BusStation} from "../../../../interfaces/entity/BusStation";
import {CoffeeDrink} from "../../../../interfaces/entity/CoffeeDrink";
import {EquipmentCategory} from "../../../../interfaces/entity/EquipmentCategory";
import {Global} from "../../../../global";


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class EditListComponent implements OnInit, OnDestroy {

  public content;
  public subscription : Subscription;
  public currentTabActiveLabel = "";
  public shopEditContent : Shop[];
  public eventEditContent : Event[];
  public shopEquipmentEditContent : Shop[];
  public blendEditContent: Blend[];
  public beanEditContent: Bean[];
  public poiEditControl: Poi[];
  public busStationEditControl: BusStation[];
  public coffeeDrinkEditControl: CoffeeDrink[];
  public equipmentCategoryEditControl: EquipmentCategory[];

  public currentTab = this.datas.tabActive;
  public selectedContent : string;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public datas,
              public inputFormService : InputFormService,
              public shopService:ShopService,
              private dialogRef: MatDialogRef<EditListComponent>,
              public eventService:EventService,
              public userService:UserService) {}


  public imagePreviewPath = Global.url + 'image/GetById?ContentType=preview&fileName=';

  public getImage(filenName){



    var name = this.imagePreviewPath + filenName +"-preview.png";
    console.log(":::::::::::::::::::::::::::::");
    console.log("-->"+name);
    return name;
  }


  ngOnInit() {
    this.getCurrentActiveDataToEdit();
  }

  getCurrentActiveDataToEdit():void{
    switch(this.currentTab){
      case 'Shop':
        this.datas.data.shopService.getShops().subscribe(value => {
        this.shopEditContent = value;


        console.log(this.shopEditContent);
        });
        break;
      case 'Event':
        this.eventEditContent = this.datas.data.events;
        break;
      case 'Bohnen & Zubehör':
        this.shopEquipmentEditContent = this.datas.data.shops;
        break;
      case 'Content':
      this.selectedContent = this.datas.data.selectContentFormControl.value;
        switch (this.datas.data.selectContentFormControl.value) {
          case 'Blend':
            this.inputFormService.getBlends().subscribe(result => {
            this.blendEditContent = result
            });
          break;
          case 'Bean':
            this.inputFormService.getBeans().subscribe(result =>{
            this.beanEditContent = result
            });
          break;
          case 'BusStation':
            console.log('BusStation');
            this.inputFormService.getBusStations().subscribe(result =>{
            this.busStationEditControl = result
            });
          break;
          case 'Poi':
            this.inputFormService.getPois().subscribe(result =>{
              this.poiEditControl = result
            });
          break;
          case 'CoffeeDrink':
            this.inputFormService.getCoffeeDrinks().subscribe(result =>{
              this.coffeeDrinkEditControl = result
            });
          break;
          case 'Equipment-category':
            console.log('Get All EquQ');
            this.inputFormService.getEquipmentCategories().subscribe(result => {
              this.equipmentCategoryEditControl = result
            })
          break;
        }
        break;
      case 'User':
        break;
    }
  }

  getCurrentObjectOfClickedListItem(id:any) {
    switch (this.currentTab) {
      case 'Shop':
        let selectedShop : Shop = id;
        this.subscription = this.shopService.getShop(selectedShop.id).subscribe(value => {
        this.dialogRef.close(value);
        });
      break;
      case 'Event':
        console.log('Current Tab');
        console.log(id);
        let seletecEvent : Event = id;
        console.log(seletecEvent);
        this.subscription = this.eventService.getEvent(seletecEvent.id).subscribe(value => {
        this.dialogRef.close(value);
        });
      break;
      case 'Bohnen & Zubehör':
        let selectedEquipmentShop : Shop = id;
        this.subscription = this.shopService.getShop(selectedEquipmentShop).subscribe(value => {
        this.dialogRef.close(value);
        });
      break;
      case 'Content':
        this.selectedContent = this.datas.data.selectContentFormControl.value;
        switch (this.selectedContent) {
          case 'Blend':
            let selectedBlend : Blend = id;
            this.subscription = this.inputFormService.getBlend(selectedBlend).subscribe(value => {
            this.dialogRef.close(value);
            });
          break;
          case 'Bean':
            let selectedBean : Bean = id;
            this.subscription = this.inputFormService.getBean(selectedBean).subscribe(value => {
              this.dialogRef.close(value);
            });
          break;
          case 'Poi':
            let selectedPoi : Poi = id;
            this.subscription = this.inputFormService.getPoi(selectedPoi).subscribe(value => {
              console.log(value);
              this.dialogRef.close(value);
            });
            break;
          case 'CoffeeDrink':
            let selectedCoffeeDrink : CoffeeDrink = id;
            this.subscription = this.inputFormService.getCoffeeDrink(selectedCoffeeDrink).subscribe(value => {
              this.dialogRef.close(value)
            });
          break;
          case 'BusStation':
            let selectedBusStation : BusStation = id;
            this.subscription = this.inputFormService.getBusStation(selectedBusStation).subscribe(value => {
              this.dialogRef.close(value)
            });
          break;
          case 'Equipment-category':
           let selectedEquipmentCategory: EquipmentCategory = id;
           this.subscription = this.inputFormService.getEquipmentCategory(selectedEquipmentCategory).subscribe(value => {
             this.dialogRef.close(value)
           });
           break;
        }break;
      case 'User':
      let selectUser : User = id;
      this.subscription = this.inputFormService.getUser(selectUser).subscribe(value => {
        this.dialogRef.close(value)
      });
        break;
    }


  }

  ngOnDestroy() {
  }
}

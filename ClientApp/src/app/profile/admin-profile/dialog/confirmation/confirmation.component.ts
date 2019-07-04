import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material";
import {Subscription} from "rxjs";
import {Shop} from "../../../../interfaces/entity/Shop";
import {Event} from "../../../../interfaces/entity/Event";
import {Blend} from "../../../../interfaces/entity/Blend";
import {Bean} from "../../../../interfaces/entity/Bean";
import {Poi} from "../../../../interfaces/entity/Poi";
import {BusStation} from "../../../../interfaces/entity/BusStation";
import {CoffeeDrink} from "../../../../interfaces/entity/CoffeeDrink";
import {EquipmentCategory} from "../../../../interfaces/entity/EquipmentCategory";
import {InputFormService} from "../../../../services/admin/input-form.service";
import {ShopService} from "../../../../services/shop/shop.service";
import {EventService} from "../../../../services/event/event.service";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../interfaces/entity/User";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class ConfirmationComponent implements OnInit {

  public content;
  public subscription: Subscription;
  public currentTabActiveLabel = "";
  public eventEditContent: Event[];
  public shopEquipmentEditContent: Shop[];
  public blendEditContent: Blend[];
  public beanEditContent: Bean[];
  public poiEditControl: Poi[];
  public busStationEditControl: BusStation[];
  public coffeeDrinkEditControl: CoffeeDrink[];
  public equipmentCategoryEditControl: EquipmentCategory[];

  public currentTab = this.datas.tabActive;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public datas,
              public inputFormService: InputFormService,
              public shopService: ShopService,
              private dialogRef: MatDialogRef<ConfirmationComponent>,
              public eventService: EventService,
              public userService: UserService) {
  }


  ngOnInit() {
  }

  test() {
    console.log(this.datas);
  }
}


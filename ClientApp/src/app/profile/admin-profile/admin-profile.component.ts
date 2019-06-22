import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatTabGroup} from "@angular/material";
import {ShopTabComponent} from "./tabs/shop-tab/shop-tab.component";
import {EventTabComponent} from "./tabs/event-tab/event-tab.component";
import {ContentTabComponent} from "./tabs/content-tab/content-tab.component";
import {EquipmentTabComponent} from "./tabs/equipment-tab/equipment-tab.component";
import {InputFormService} from "../../services/admin/input-form.service";
export interface Content{
  value: string;
}
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class AdminProfileComponent implements OnInit {
  @ViewChild('matTabShop') matTabGroup : MatTabGroup;
  @ViewChild(ShopTabComponent) shopTab: ShopTabComponent;
  @ViewChild(EventTabComponent) eventTab: EventTabComponent;
  @ViewChild(ContentTabComponent) contentTab: ContentTabComponent;
  @ViewChild(EquipmentTabComponent) equipmentTab: EquipmentTabComponent;

  public matTabActive : string = 'Shop';

  ngOnInit() {
    this.matTabGroup.selectedIndex = 0;
    this.matTabGroup.selectedTabChange.subscribe(event =>{
      this.matTabActive = event.tab.textLabel;
    });

  }

  private whichTabIsActive() : FormGroup{
    switch (this.matTabActive) {
      case 'Shop':
        return this.shopTab.getInputShop();
      case 'Equipment':
        return this.equipmentTab.getEquipmentInput();
      case 'Event':
        return this.eventTab.getEventInput();
      case 'Content':
        return this.contentTab.getSelectedFormGroup();
    }
  }

  editContent(){
    let formGroup = this.whichTabIsActive();
    console.log(formGroup);
  }

  addContent(){

  }

  deleteContent(){

  }

  saveContent(){

  }

  restoreContent(){

  }

  constructor(private inputFormService: InputFormService) { }


}

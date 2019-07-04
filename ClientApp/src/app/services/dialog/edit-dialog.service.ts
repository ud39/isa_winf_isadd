import { Injectable } from '@angular/core';
import {EditListComponent} from "../../profile/admin-profile/dialog/edit-list/edit-list.component";
import {ShopTabComponent} from "../../profile/admin-profile/tabs/shop-tab/shop-tab.component";
import {MatDialog} from "@angular/material";
import {EventTabComponent} from "../../profile/admin-profile/tabs/event-tab/event-tab.component";
import {ContentTabComponent} from "../../profile/admin-profile/tabs/content-tab/content-tab.component";

@Injectable({
  providedIn: 'root'
})
export class EditDialogService {

  constructor() {
  }

  openShopDialog(shopTab: ShopTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefShop = dialog.open(EditListComponent, {
      data: {data: shopTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
      disableClose :false
    });

    dialogRefShop.afterClosed().subscribe(value => {
      if (value) {
        shopTab.shop = value;
        shopTab.fillOutInputForm(value);
        return value;
      }
    });
  }

  openEventDialog(eventTab: EventTabComponent, matTabActive: string, dialog: MatDialog) {
    console.log('Hallo Event');
    const dialogRefEvent = dialog.open(EditListComponent, {
      data: {data: eventTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
      disableClose :false
    });

    dialogRefEvent.afterClosed().subscribe(value => {
      if (value) {
        console.log('Fillout');
        eventTab.selectedEvent = value;
        eventTab.fillOutInputForm(value);
        return value;
      }
    });
  }

  openBlendDialog(contentTab: ContentTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefBlend = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
      disableClose :false
    });
    dialogRefBlend.afterClosed().subscribe(value => {
      if (value) {
        contentTab.selectedContent = value;
        contentTab.fillOutInputForm(value);
      }
    });
  }

  openBeanDialog(contentTab: ContentTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefBean = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
      disableClose :false
    });
    dialogRefBean.afterClosed().subscribe(value => {
      if (value) {
        contentTab.selectedContent = value;
        contentTab.fillOutInputForm(value);
      }
    });
  }


  openCoffeeDrinkDialog(contentTab: ContentTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefCoffeeDrink = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
      disableClose :false
    });
    dialogRefCoffeeDrink.afterClosed().subscribe(value => {
      if (value) {
        contentTab.selectedContent = value;
        contentTab.fillOutInputForm(value);
      }
    });
  }

  openPoiDialog(contentTab: ContentTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefPoi = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
      disableClose :false
    });

    dialogRefPoi.afterClosed().subscribe(value => {
      if (value) {
        contentTab.selectedContent = value;
        contentTab.fillOutInputForm(value);
      }
    });
  }

  openBusStationDialog(contentTab: ContentTabComponent, matTabActive:string,dialog:MatDialog){
    const dialogRefBusStation = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
      disableClose :false
    });

    dialogRefBusStation.afterClosed().subscribe(value => {
      if (value) {
        contentTab.selectedContent = value;
        contentTab.fillOutInputForm(value);
      }
    });
  }

  openEquipmentCategoryDialog(contentTab: ContentTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefEquipmentCategory = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
      disableClose :false
    });
    dialogRefEquipmentCategory.afterClosed().subscribe(value => {
      if (value) {
        contentTab.selectedContent = value;
        contentTab.fillOutInputForm(value);
      }
    });
  }
}


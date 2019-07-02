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
    });

    dialogRefShop.afterClosed().subscribe(value => {
      if (value) {
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
    });

    dialogRefEvent.afterClosed().subscribe(value => {
      if (value) {
        console.log('Fillout');
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
    });
    dialogRefBean.afterClosed().subscribe(value => {
      if (value) {
        contentTab.fillOutInputForm(value);
      }
    });
  }


  openCoffeeDrinkDialog(contentTab: ContentTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefCoffeeDrink = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
    });
    dialogRefCoffeeDrink.afterClosed().subscribe(value => {
      if (value) {
        contentTab.fillOutInputForm(value);
      }
    });
  }

  openPoiDialog(contentTab: ContentTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefPoi = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px',
    });

    dialogRefPoi.afterClosed().subscribe(value => {
      if (value) {
        contentTab.fillOutInputForm(value);
      }
    });
  }

  openEquipmentCategoryDialog(contentTab: ContentTabComponent, matTabActive: string, dialog: MatDialog) {
    const dialogRefEquipmentCategory = dialog.open(EditListComponent, {
      data: {data: contentTab, tabActive: matTabActive},
      height: '500px',
      width: '800px'
    });
    dialogRefEquipmentCategory.afterClosed().subscribe(value => {
      if (value) {
        contentTab.fillOutInputForm(value);
      }
    });
  }
}


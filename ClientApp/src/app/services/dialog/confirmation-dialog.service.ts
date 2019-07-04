import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {ConfirmationComponent} from "../../profile/admin-profile/dialog/confirmation/confirmation.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  openShopDialog(shop: JSON, matTabActive: string, dialog: MatDialog) {
    const dialogRefShop = dialog.open(ConfirmationComponent, {
      data: {data: shop, tabActive: matTabActive},
      height: '500px',
      width: '500px',
    });

    dialogRefShop.afterClosed().subscribe(value => {
      if (value) {
        return value;
      }
    });
  }

  openEventDialog(event: JSON, matTabActive: string, dialog: MatDialog) {
    const dialogRefEvent = dialog.open(ConfirmationComponent, {
      data: {data: event, tabActive: matTabActive},
      height: '200px',
      width: '500px',
    });

    dialogRefEvent.afterClosed().subscribe(value => {
      if (value) {
        return value;
      }
    });
  }

  openBlendDialog(contentTab: JSON, matTabActive: string, dialog: MatDialog, selectedContent:string) {
    const dialogRefBlend = dialog.open(ConfirmationComponent, {
      data: {data: contentTab, tabActive: matTabActive, selectedContent:selectedContent},
      height: '500px',
      width: '800px',
    });
    dialogRefBlend.afterClosed().subscribe(value => {
      if (value) {
        return value
      }
    });
  }

  openBeanDialog(contentTab: JSON, matTabActive: string, dialog: MatDialog, selectedContent:string) {
    const dialogRefBean = dialog.open(ConfirmationComponent, {
      data: {data: contentTab, tabActive: matTabActive,selectedContent:selectedContent},
      height: '500px',
      width: '800px',
    });
    dialogRefBean.afterClosed().subscribe(value => {
      if (value) {
        return value
      }
    });
  }


  openCoffeeDrinkDialog(contentTab: JSON, matTabActive: string, dialog: MatDialog, selectedContent:string) {
    const dialogRefCoffeeDrink = dialog.open(ConfirmationComponent, {
      data: {data: contentTab, tabActive: matTabActive,selectedContent:selectedContent},
      height: '500px',
      width: '800px',
    });
    dialogRefCoffeeDrink.afterClosed().subscribe(value => {
      if (value) {
        return value
      }
    });
  }

  openPoiDialog(contentTab: JSON, matTabActive: string, dialog: MatDialog, selectedContent:string) {
    const dialogRefPoi = dialog.open(ConfirmationComponent, {
      data: {data: contentTab, tabActive: matTabActive,selectedContent:selectedContent},
      height: '500px',
      width: '800px',
    });

    dialogRefPoi.afterClosed().subscribe(value => {
      if (value) {
        return value
      }
    });
  }

  openBusStationDialog(contentTab: JSON, matTabActive:string,dialog:MatDialog, selectedContent:string){
    const dialogRefBusStation = dialog.open(ConfirmationComponent, {
      data: {data: contentTab, tabActive: matTabActive,selectedContent:selectedContent},
      height: '500px',
      width: '800px',
    });

    dialogRefBusStation.afterClosed().subscribe(value => {
      if (value) {
        return value
      }
    });
  }

  openEquipmentCategoryDialog(contentTab: JSON, matTabActive: string, dialog: MatDialog, selectedContent:string) {
    const dialogRefEquipmentCategory = dialog.open(ConfirmationComponent, {
      data: {data: contentTab, tabActive: matTabActive, selectedContent:selectedContent},
      height: '500px',
      width: '800px'
    });
    dialogRefEquipmentCategory.afterClosed().subscribe(value => {
      if (value) {
        return value
      }
    });
  }
}

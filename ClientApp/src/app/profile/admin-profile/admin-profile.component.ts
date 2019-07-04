import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatDialog, MatTabGroup} from "@angular/material";
import {ShopTabComponent} from "./tabs/shop-tab/shop-tab.component";
import {EventTabComponent} from "./tabs/event-tab/event-tab.component";
import {ContentTabComponent} from "./tabs/content-tab/content-tab.component";
import {EquipmentTabComponent} from "./tabs/equipment-tab/equipment-tab.component";
import {InputFormService} from "../../services/admin/input-form.service";
import {UserTabComponent} from "./tabs/user-tab/user-tab/user-tab.component";
import {ArticleTabComponent} from "./tabs/article-tab/article-tab.component";
import {EditDialogService} from "../../services/dialog/edit-dialog.service";
import {Shop} from "../../interfaces/entity/Shop";
import {ConfirmationDialogService} from "../../services/dialog/confirmation-dialog.service";


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
  @ViewChild(UserTabComponent) userTab :UserTabComponent;
  @ViewChild(ArticleTabComponent) articleTab: ArticleTabComponent;

  public body : JSON;
  public matTabActive : string = 'Shop';
  public activeFormGroup : FormGroup;
  public editStatus : boolean = true;
  public restorePossible : boolean = true;
  ngOnInit() {
    this.whichTabIsActive();
    this.matTabGroup.selectedTabChange.subscribe(event =>{
      this.matTabActive = event.tab.textLabel;
      this.whichTabIsActive();
    });

  }

  public whichTabIsActive() : void{
    switch (this.matTabActive) {
      case 'Shop':
        this.activeFormGroup = this.shopTab.getInputShop();
        break;
      case 'Equipment':
        this.activeFormGroup = this.equipmentTab.getEquipmentInput();
        break;
      case 'Event':
        this.activeFormGroup = this.eventTab.getEventInput();
        break;
      case 'Content':
        this.activeFormGroup = this.contentTab.getContentInput();
        break;
      case 'User':
        this.activeFormGroup = this.userTab.getUserInput();
        break;
      case 'Artikel':
        this.activeFormGroup = this.articleTab.getArticleInput();
        break;
    }
  }

  public getContentJSON():void{
    switch (this.matTabActive) {
      case 'Shop':
        this.body = this.shopTab.getJsonOfShop();
        break;
      case 'Bohnen & Zubehör':
        this.body = this.equipmentTab.getJsonOfEquipment();
        break;
      case 'Event':
        console.log('Get Json Event');
        this.body = this.eventTab.getJsonOfEvent();
        break;
      case 'Content':
        this.body = this.contentTab.getJsonOfContent();
        console.log(this.body);
        break;
      case 'User':
        this.body = this.contentTab.getJsonOfContent();
        break;
      case 'Artikel':
        this.body = this.articleTab.getJsonOfArticle();
        break;
    }
  }

  public clearCheckBox():void{
    switch (this.matTabActive) {
      case 'Shop':
        this.shopTab.checkBoxes.clear();
        break;
      case 'Bohnen & Zubehör':
        this.equipmentTab.checkBoxes.clear();
        break;
    }
  }


  public openEditListDialog(): any{
    this.editStatus = false;
    switch (this.matTabActive) {
      case 'Shop':
       this.editDialogService.openShopDialog(this.shopTab,this.matTabActive,this.dialog);
       this.restorePossible = false;
        break;
      case 'Bohnen & Zubehör':
        break;
      case 'Event':
        this.editDialogService.openEventDialog(this.eventTab,this.matTabActive,this.dialog);
        this.restorePossible = false;
        break;
      case 'Content':
        this.whichTabIsActive();
        switch (this.contentTab.selectContentFormControl.value) {
          case 'Blend':
          this.editDialogService.openBlendDialog(this.contentTab,this.matTabActive,this.dialog);
          this.restorePossible = false;
          break;
          case 'Bean':
          this.editDialogService.openBeanDialog(this.contentTab,this.matTabActive,this.dialog);
          this.restorePossible = false;
          break;
          case 'CoffeeDrink':
          this.editDialogService.openCoffeeDrinkDialog(this.contentTab,this.matTabActive,this.dialog);
          this.restorePossible = false;
          break;
          case 'Poi':
          this.editDialogService.openPoiDialog(this.contentTab,this.matTabActive,this.dialog);
          this.restorePossible = false;
          break;
          case 'Equipment-category':
          this.editDialogService.openEquipmentCategoryDialog(this.contentTab,this.matTabActive,this.dialog);
          this.restorePossible = false;
          break;
          case 'BusStation':
          this.editDialogService.openBusStationDialog(this.contentTab,this.matTabActive,this.dialog);
          this.restorePossible = false;
          break;
        }
    }
    this.editStatus = true;
  }


  addContent(){
    this.getContentJSON();
    console.log(this.body);
    switch (this.matTabActive) {
      case 'Shop':
        console.log("Shop Add");
        this.inputFormService.postContentShop(this.body).subscribe(value => {
          if(value.body){
          console.log('Shop Dialog');
          this.confirmationDialogService.openShopDialog(this.body,this.matTabActive,this.dialog)
          }
        });
        break;
      case 'Event':
        console.log("Event Add");
        this.inputFormService.postContentEvent(this.body).subscribe(value => {
          console.log(value.body);
          if(value){

            console.log("------------------------------------------");
            console.log(value);
            this.confirmationDialogService.openEventDialog(this.body,this.matTabActive,this.dialog)
          }
        });
        break;
      case 'Content':
        this.whichTabIsActive();
        this.getContentJSON();
        switch (this.contentTab.selectContentFormControl.value) {
          case 'Blend':
            this.inputFormService.postContent(this.body,this.contentTab.selectContentFormControl.value).subscribe(value => {
              if(value.body){
                this.confirmationDialogService.openBlendDialog(this.body,this.matTabActive,this.dialog,this.contentTab.selectContentFormControl.value);
              }
            });
            break;
          case 'Bean':
            this.inputFormService.postContent(this.body,this.contentTab.selectContentFormControl.value).subscribe(value => {
              if(value.body){
                this.confirmationDialogService.openBeanDialog(this.body,this.matTabActive,this.dialog,this.contentTab.selectContentFormControl.value);
                this.restorePossible = false;
              }
            });
            break;
          case 'CoffeeDrink':
            this.inputFormService.postContent(this.body,this.contentTab.selectContentFormControl.value).subscribe(value => {
              if(value.body){
                this.confirmationDialogService.openEventDialog(this.body,this.matTabActive,this.dialog)
                this.confirmationDialogService.openCoffeeDrinkDialog(this.body,this.matTabActive,this.dialog, this.contentTab.selectContentFormControl.value);
                this.restorePossible = false;
              }
            });
            break;
          case 'Poi':
            this.inputFormService.postContent(this.body,this.contentTab.selectContentFormControl.value).subscribe(value => {
              if(value.body){
                this.confirmationDialogService.openPoiDialog(this.body,this.matTabActive,this.dialog, this.contentTab.selectContentFormControl.value);
                this.restorePossible = false;
              }
            });
            break;
          case 'Equipment-category':
            this.inputFormService.postContent(this.body,this.contentTab.selectContentFormControl.value).subscribe(value => {
              if(value.body){
                this.confirmationDialogService.openEquipmentCategoryDialog(this.body,this.matTabActive,this.dialog, this.contentTab.selectContentFormControl.value);
                this.restorePossible = false;
              }
            });
            break;
          case 'BusStation':
            this.inputFormService.postContent(this.body,this.contentTab.selectContentFormControl.value).subscribe(value => {
              if(value.body){
                this.confirmationDialogService.openBusStationDialog(this.body,this.matTabActive,this.dialog, this.contentTab.selectContentFormControl.value);
                this.restorePossible = false;
              }
            });
            break;
        }break;
      case 'User':
        this.inputFormService.postUser(this.body).subscribe();
        break;
      case 'Artikel':
        this.inputFormService.postContentArticle(this.body).subscribe();
        break;
    }
  }

  deleteContent(){
    switch (this.matTabActive) {
      case 'Shop':
        this.inputFormService.deleteContentShop(this.shopTab.shop.id).subscribe();
        this.shopTab.shopService.getShops().subscribe(value => {
          this.shopTab.shops = value;
        });
        this.emptyInput();
        break;
      case 'Event':
        this.inputFormService.deleteContentEvent(this.eventTab.selectedEvent.id).subscribe(value => {
          if(value){
            this.eventTab.eventService.getEvents().subscribe(value => {
              this.eventTab.events = value;
            })
          }
        });
        break;
      case 'Content':
        switch (this.contentTab.selectContentFormControl.value) {
          case 'Blend':
            this.inputFormService.deleteBlend(this.contentTab.getQueryParamsOfContent()).subscribe(value =>{
              if(value){
              this.emptyInput();
              this.restorePossible = false;
              }
            });

            break;
          case 'Bean':
            this.inputFormService.deleteBean(this.contentTab.getQueryParamsOfContent()).subscribe(value =>{
              if(value) {
                this.emptyInput();
                this.restorePossible = false;
              }
            });
            this.emptyInput();
            this.restorePossible = false;
            break;
          case 'CoffeeDrink':
            this.inputFormService.deleteCoffeeDrink(this.contentTab.getQueryParamsOfContent()).subscribe(value =>{
              if(value){
                this.emptyInput();
                this.restorePossible = false;
              }
            });
            break;
          case 'Poi':
            this.inputFormService.deletePoi(this.contentTab.getQueryParamsOfContent()).subscribe(value =>{
              if(value){
              this.emptyInput();
              this.restorePossible = false;
              }
            });
            break;
          case 'BusStation':
            this.inputFormService.deleteBusStation(this.contentTab.getQueryParamsOfContent()).subscribe(value =>{
              if(value){
              this.emptyInput();
              this.restorePossible = false;
              }

            });
            break;
          case 'Equipment-category':
            this.inputFormService.deleteEquipmentCategory(this.contentTab.getQueryParamsOfContent()).subscribe(value => {
              if(value){
              this.emptyInput();
              this.restorePossible = false;
              }
            })
        }
      break;
      case 'User':
        this.inputFormService.postUser(this.body).subscribe();
        this.emptyInput();
        break;
      case 'Artikel':
        this.inputFormService.postContentArticle(this.body).subscribe();
        this.emptyInput();
        break;
    }
  }

  saveContent(){
    this.getContentJSON();
    console.log(this.body + 'Before');
    console.log(this.body);
    switch (this.matTabActive) {
      case 'Shop':
        delete this.body['busstation'];
        this.body = <JSON> {};
        this.shopTab.getJsonOfShopEdit();
        this.inputFormService.updateShop(this.body).subscribe(value => {
          console.log(value);
        });
        break;
      case 'Event':
        console.log("Event Store");
        this.inputFormService.postContentEvent(this.body).subscribe();
        break;
      case 'Content':
        switch (this.contentTab.selectContentFormControl.value) {
          case 'Blend':
            this.inputFormService.updateBlend(this.body).subscribe(value =>{
              console.log('update Blend');
              console.log(value);
            });
            this.restorePossible = false;
            break;
          case 'Bean':
            this.inputFormService.updateBean(this.body).subscribe(value =>{
              if(value) {
                console.log('update Bean');
                this.restorePossible = false;
              }
            });
            break;
          case 'CoffeeDrink':
            this.inputFormService.updateCoffeeDrink(this.body).subscribe(value =>{
              if(value){
                console.log('update CoffeeDrink');
              }
            });
            break;
          case 'Poi':
            this.inputFormService.updatePoi(this.body).subscribe(value =>{
              if(value){
                console.log('update Poi');

              }
            });
            break;
          case 'BusStation':
            this.inputFormService.updateBusStation(this.body).subscribe(value =>{
              if(value){
              console.log('update BusStation');
              this.emptyInput();
              }
            });
            break;
          case 'Equipment-category':
            this.inputFormService.updateEquipmentCategory(this.body).subscribe(value => {
              if(value){
                console.log('update Equipment-Category');
                this.emptyInput();
              }
            })
        }break;
      case 'User':
        console.log("User Store");
        this.inputFormService.postUser(this.body).subscribe();
        break;
      case 'Artikel':
        console.log("Article Store");
        this.inputFormService.postContentArticle(this.body).subscribe();
        break;
    }
  }

  restoreContent(){
   switch (this.matTabActive) {
     case 'Shop':
       this.shopTab.fillOutInputForm(this.shopTab.shop);
     break;
     case 'Event':
       this.eventTab.fillOutInputForm(this.eventTab.selectedEvent);
     break;
     case 'Content':
       console.log(this.contentTab.selectedContent);
       console.log("Content");
       this.contentTab.fillOutInputForm(this.contentTab.selectedContent);
     break;
     case 'User':
   }



  }

  emptyInput(){
    this.activeFormGroup.reset('');
    this.clearCheckBox();
  }

  constructor(private inputFormService: InputFormService, public dialog: MatDialog, public editDialogService: EditDialogService,
              public confirmationDialogService:ConfirmationDialogService) { }

}

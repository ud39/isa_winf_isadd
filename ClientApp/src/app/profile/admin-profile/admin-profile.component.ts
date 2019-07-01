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
import {EditListComponent} from "./dialog/edit-list/edit-list.component";
import {ConfirmationComponent} from "./dialog/confirmation/confirmation.component";
import {UserTabComponent} from "./tabs/user-tab/user-tab/user-tab.component";
import {ArticleTabComponent} from "./tabs/article-tab/article-tab.component";


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
    this.matTabGroup.selectedIndex = 0;
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
        const dialogRefShop = this.dialog.open(EditListComponent, {
          data: {data: this.shopTab, tabActive:this.matTabActive},
          height: '500px',
          width: '800px',
        });

        dialogRefShop.afterClosed().subscribe(value => {
          if(value)
          {
          this.shopTab.fillOutInputForm(value);
          this.shopTab.shop = value;
          this.restorePossible = false;
          }
        });
        break;
      case 'Bohnen & Zubehör':
        const dialogRefEquipment = this.dialog.open(EditListComponent, {
          data: {data: this.equipmentTab, tabActive:this.matTabActive},
          height: '500px',
          width: '800px',
        });

        dialogRefEquipment.afterClosed().subscribe(value => {
          if(value){
          this.equipmentTab.fillOutInputForm(value);
          this.restorePossible = false;
          }
        });
        break;
      case 'Event':
        console.log('Hallo Event');
        const dialogRefEvent= this.dialog.open(EditListComponent, {
          data: {data: this.eventTab, tabActive:this.matTabActive},
          height: '500px',
          width: '800px',
        });

        dialogRefEvent.afterClosed().subscribe(value => {
          if(value){
          console.log('Fillout');
          this.eventTab.fillOutInputForm(value);
          this.eventTab.selectedEvent = value;
          this.restorePossible = false;
          }
        });
        break;
      case 'Content':
        switch (this.contentTab.selectContentFormControl.value) {
          case 'Blend':
            const dialogRefBlend = this.dialog.open(EditListComponent, {
              data: {data: this.contentTab, tabActive:this.matTabActive},
              height: '500px',
              width: '800px',
            });
            dialogRefBlend.afterClosed().subscribe(value => {
              if(value){
              this.contentTab.selectedContent = value;
              this.contentTab.fillOutInputForm(value);
              this.restorePossible = false;
              }
            });
          break;
          case 'Bean':
            const dialogRefBean = this.dialog.open(EditListComponent,{
              data: {data: this.contentTab, tabActive:this.matTabActive},
              height: '500px',
              width: '800px',
            });
            dialogRefBean.afterClosed().subscribe(value =>{
              if(value){
              this.contentTab.fillOutInputForm(value);
              this.restorePossible = false;
              }
            });
          break;
          case 'CoffeeDrink':
            const dialogRefCoffeeDrink = this.dialog.open(EditListComponent,{
              data: {data: this.contentTab, tabActive:this.matTabActive},
              height: '500px',
              width: '800px',
            });
            dialogRefCoffeeDrink.afterClosed().subscribe(value =>{
              if(value){
              this.contentTab.fillOutInputForm(value);
              this.restorePossible = false;
              }
            });
          break;
          case 'Poi':
            const dialogRefPoi= this.dialog.open(EditListComponent, {
              data: {data: this.contentTab, tabActive:this.matTabActive},
              height: '500px',
              width: '800px',
            });

            dialogRefPoi.afterClosed().subscribe(value => {
              if(value){
                this.contentTab.fillOutInputForm(value);
                this.restorePossible = false;
              }
            });
          break;
          case 'Equipment-category':
            const dialogRefEquipmentCategory = this.dialog.open(EditListComponent,{
              data: {data: this.contentTab, tabActive:this.matTabActive},
              height: '500px',
              width: '800px'
            })
        }
    }
    this.editStatus = true;
  }

  public openConfirmationDialog(data: any): any{
    this.editStatus = false;
    switch (this.matTabActive) {
      case 'Shop':
        const dialogRefShop = this.dialog.open(ConfirmationComponent, {
          data: {data: this.shopTab, tabActive:this.matTabActive},
          height: '500px',
          width: '800px',
        });

        dialogRefShop.afterClosed().subscribe(value => {
          console.log(value);
          this.shopTab.fillOutInputForm(value);
          this.shopTab.shop = value;
        });
        break;
      case 'Bohnen & Zubehör':
        const dialogRefEquipment = this.dialog.open(ConfirmationComponent, {
          data: {data: this.equipmentTab, tabActive:this.matTabActive},
          height: '500px',
          width: '800px',
        });

        dialogRefEquipment.afterClosed().subscribe(value => {
          this.equipmentTab.fillOutInputForm(value);
        });
        break;
      case 'Event':
        const dialogRefEvent= this.dialog.open(ConfirmationComponent, {
          data: {data: this.eventTab, tabActive:this.matTabActive},
          height: '500px',
          width: '800px',
        });

        dialogRefEvent.afterClosed().subscribe(value => {
          this.eventTab.fillOutInputForm(value);
        });
        break;
      case 'Content':
        const dialogRefContent = this.dialog.open(ConfirmationComponent, {
          data: {data: this.contentTab, tabActive:this.matTabActive},
          height: '500px',
          width: '800px',
        });
        dialogRefContent.afterClosed().subscribe(value => {
          console.log(value);
          this.contentTab.selectedContent = value;
          this.contentTab.fillOutInputForm(value);
        });
    }
  }

  addContent(){
    this.getContentJSON();
    console.log(this.body);
    switch (this.matTabActive) {
      case 'Shop':
        this.inputFormService.postContentShop(this.body).subscribe();
        break;
      case 'Bohnen & Zubehör':
        this.inputFormService.postContentEquipment(this.body);
        break;
      case 'Event':
        this.inputFormService.postContentEvent(this.body);
        break;
      case 'Content':
        console.log("Content Add");
        this.inputFormService.postContent(this.body,this.contentTab.selectContentFormControl.value);
        break;
      case 'User':
        this.inputFormService.postUser(this.body);
        break;
      case 'Artikel':
        this.inputFormService.postContentArticle(this.body);
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
      case 'Bohnen & Zubehör':
        this.inputFormService.postContentEquipment(this.body);
        this.emptyInput();
        break;
      case 'Event':
        this.inputFormService.deleteContentEvent(this.eventTab.selectedEvent.id).subscribe();
        this.emptyInput();
        break;
      case 'Content':
        this.inputFormService.postContent(this.body,this.contentTab.selectContentFormControl.value);
        this.emptyInput();
        break;
      case 'User':
        this.inputFormService.postUser(this.body);
        this.emptyInput();
        break;
      case 'Artikel':
        this.inputFormService.postContentArticle(this.body);
        this.emptyInput();
        break;
    }
  }

  saveContent(){

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

  constructor(private inputFormService: InputFormService, public dialog: MatDialog) { }

}

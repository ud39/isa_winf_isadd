import {Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {AdminService} from "../../services/admin/admin.service";
import {CheckboxComponent} from "../../search/checkbox/checkbox.component";
import {Blend} from "../../interfaces/entity/Blend";
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatTabGroup} from "@angular/material";
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
  @ViewChild('shopCheckBox') shopCheckBox : CheckboxComponent;
  public matTabActive : number = 0;

  private json: JSON;
  myControl = new FormControl();
  options: string[] = [];
  selected = "Blend";
  filteredOptions: Observable<string[]>;

  street = '';
  country = '';
  streetNr : number;

  contents: Content[] = [
    {value: 'Blend'},
    {value: 'Bean'},
    {value: 'Coffee_Drink'},
  ];


  ngOnInit() {
    this.matTabGroup.selectedIndexChange.subscribe(event => {
      this.matTabActive = event;
    });
  }

  getJSONofShop(){
    console.log(this.shopCheckBox.getjsonOfSearchWithSelect());
    console.log(2);
  }

  editContent(){

  }

  addContent(){

  }

  deleteContent(){

  }

  saveContent(){

  }

  restoreContent(){

  }


  constructor(private admin_service: AdminService) { }


}

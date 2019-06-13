import {Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {MatTabGroup} from "@angular/material" ;
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {AdminService} from "../../services/admin/admin.service";
import {CheckboxComponent} from "../../search/checkbox/checkbox.component";

export interface Content{
  value: string;
}
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminProfileComponent implements OnInit {
  @ViewChild('matTabShop') matTabGroup : MatTabGroup;
  @ViewChild('shopCheckBox') shopCheckBox : CheckboxComponent;
  public matTabActive : number = 0;

  private json: JSON;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  value = '';
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

  upload(files){
    this.admin_service.upload(files);
  }

  show(){
    this.admin_service.show();
  }


}

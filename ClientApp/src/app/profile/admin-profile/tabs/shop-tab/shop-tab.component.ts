import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Content} from "../../admin-profile.component";
import {AdminService} from "../../../../services/admin/admin.service";


@Component({
  selector: 'app-shop-tab',
  templateUrl: './shop-tab.component.html',
  styleUrls: ['./shop-tab.component.css']
})
export class ShopTabComponent implements OnInit {


  private json: JSON;
  myControl = new FormControl();
  options: string[] = [];
  selected = "Blend";
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

  constructor(private admin_service: AdminService) { }

  ngOnInit() {
  }


  upload(files){
    this.admin_service.upload(files);
  }

  onFileChanged(event) {
    this.admin_service.onFileChanged(event)
  }

  onUpload(fromWhere) {
    this.admin_service.onUpload(fromWhere);
  }









}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";;
import {AdminService} from "../../../../services/admin/admin.service";

@Component({
  selector: 'app-shop-tab',
  templateUrl: './shop-tab.component.html',
  styleUrls: ['./shop-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class ShopTabComponent implements OnInit {


  private json: JSON;

  options: string[] = [];
  selected = "Blend";
  filteredOptions: Observable<string[]>;
  value;
  street;
  country;
  town;
  streetNr : number;

  streetFormControl = new FormControl('',[

    ]);
  streetNrFormControl = new FormControl('',[

    ]);
  countryFromControl = new FormControl('',[

    ]);
  townFromControl = new FormControl('',[

    ]);
  shopNameFormControl = new FormControl('',[
    Validators.required
    ]);


  inputShop = new FormGroup({
      street: this.streetFormControl,
      streetNr: this.streetNrFormControl,
      country: this.countryFromControl,
      city: this.townFromControl,
      shopName: this.shopNameFormControl
    }
  );

  getInputShop(): FormGroup{
    return this.inputShop;
  }
  constructor(private admin_service: AdminService) { }


  ngOnInit() {
  }


  onFileChanged(event) {
    this.admin_service.onFileChanged(event)
  }

  onUpload(fromWhere) {
    this.admin_service.onUpload(fromWhere);
  }

  deleteImage(fromWhere) {
    this.admin_service.deleteImage(fromWhere);
  }


}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";;
import {AdminService} from "../../../../services/admin/admin.service";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";

@Component({
  selector: 'app-shop-tab',
  templateUrl: './shop-tab.component.html',
  styleUrls: ['./shop-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class ShopTabComponent implements OnInit {


  public json: JSON;
  public shop: Shop;
  public options: string[] = [];
  public selected = "Blend";
  public filteredOptions: Observable<string[]>;

  public streetFormControl = new FormControl('',[

    ]);
  public streetNrFormControl = new FormControl('',[

    ]);
  public countryFormControl = new FormControl('',[

    ]);
  public townFormControl = new FormControl('',[

    ]);
  public shopNameFormControl = new FormControl('',[
    Validators.required
    ]);

  public postalCodeFormControl = new FormControl('',[]);

  inputShop = new FormGroup({
      street: this.streetFormControl,
      streetNr: this.streetNrFormControl,
      country: this.countryFormControl,
      city: this.townFormControl,
      shopName: this.shopNameFormControl
    }
  );

  getInputShop(): FormGroup{
    return this.inputShop;
  }
  constructor(public admin_service: AdminService, public shopService: ShopService) { }

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

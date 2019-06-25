import {Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";;
import {AdminService} from "../../../../services/admin/admin.service";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";
import {MatInput, MatSelect} from "@angular/material";
import {CheckboxComponent} from "../../../../search/checkbox/checkbox.component";
import {CheckBoxesService} from "../../../../services/interactive-element/checkboxes.service";

@Component({
  selector: 'app-shop-tab',
  templateUrl: './shop-tab.component.html',
  styleUrls: ['./shop-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class ShopTabComponent implements OnInit {
  @ViewChildren('address') addressInputs: QueryList<MatInput>;
  @ViewChild('checkbox') checkBoxes : CheckboxComponent;
  @ViewChildren('nameDescription') nameDescriptionInputs : QueryList<MatInput>;


  inputs : Array<MatInput>;
  public json: JSON;
  public shop: Shop;
  public shops: Shop[];
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
  public shopWebsiteFormControl = new FormControl('',[]);

  public shopFoundingYearFormControl = new FormControl('',[]);

  public postalCodeFormControl = new FormControl('',[]);

  public shopDescriptionFormControl = new FormControl('',[]);

  inputShop = new FormGroup({
      street: this.streetFormControl,
      streetNr: this.streetNrFormControl,
      country: this.countryFormControl,
      city: this.townFormControl,
      postalCode: this.postalCodeFormControl,
      shopName: this.shopNameFormControl,
      shopDescription: this.shopDescriptionFormControl
    }
  );

  getInputShop(): FormGroup{
    return this.inputShop;
  }
  constructor(public admin_service: AdminService, public shopService: ShopService, public checkBoxService: CheckBoxesService) { }

  getJsonOfShop(): JSON{
    return this.checkBoxService.getJsonOfShopInput(this.addressInputs.toArray(), this.nameDescriptionInputs.toArray(), this.checkBoxes.cbs.toArray(),this.checkBoxes.selects.toArray())
  }

  ngOnInit(): void {
    this.shopService.getShops().subscribe(value => {
      this.shops = value;
    })
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

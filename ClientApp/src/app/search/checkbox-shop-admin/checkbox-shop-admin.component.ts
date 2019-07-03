import {Component, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Poi} from "../../interfaces/entity/Poi";
import {BusStation} from "../../interfaces/entity/BusStation";
import {MAT_CHECKBOX_CLICK_ACTION, MatCheckbox, MatInput, MatSelect} from "@angular/material";
import {Global} from "../../global";
import {Router} from "@angular/router";
import {CheckBoxesService} from "../../services/interactive-element/checkboxes.service";
import {ShopService} from "../../services/shop/shop.service";
import {InputFormService} from "../../services/admin/input-form.service";
import {FormControl, FormGroup} from "@angular/forms";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-checkbox-shop-admin',
  templateUrl: './checkbox-shop-admin.component.html',
  styleUrls: ['./checkbox-shop-admin.component.css'],
  providers: [CheckBoxesService, Global,  { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxShopAdminComponent implements OnInit {

  tape = [null, true, false];
  public checkBoxPois : Poi[];
  public checkBoxBusStation: BusStation[];
  @ViewChildren('cb') cbs : QueryList<MatCheckbox>;
  @ViewChildren(MatSelect) selects : QueryList<MatSelect>;
  @ViewChildren(MatInput) inputSearch : QueryList<MatInput>;
  public urlGlobalPath = Global.urlName;
  constructor(public router: Router, public checkBoxService: CheckBoxesService) {

  }


  public priceClass = ['niedrig', 'mittel', 'hoch'];
  public options: string[] = [];
  public filteredOptions: Observable<string[]>;
  public wlanFormControl = new FormControl(null,[]);
  public latteArtFormControl = new FormControl(null,[]);
  public outdoorFormControl = new FormControl(null,[]);
  public childFriendlyFormControl = new FormControl(null,[]);
  public workstationFormControl = new FormControl(null,[]);
  public shopFormControl = new FormControl(null,[]);
  public disableFriendlyFormControl = new FormControl(null,[]);
  public petFriendlyFormControl = new FormControl(null,[]);
  public warmFoodFormControl = new FormControl(null,[]);
  public coldFoodFormControl = new FormControl(null,[]);
  public franchiseFormControl = new FormControl(null,[]);
  public checkBoxFormGroup = new FormGroup({
    wlan: this.wlanFormControl,
    latteArt: this.latteArtFormControl,
    outdoor: this.outdoorFormControl,
    childFriendly: this.childFriendlyFormControl,
    disableFriendly: this.disableFriendlyFormControl,
    petFriendly: this.petFriendlyFormControl,
    warmFood: this.warmFoodFormControl,
    coldFood: this.coldFoodFormControl,
    franchise: this.franchiseFormControl,
    workstation: this.workstationFormControl,
    shop: this.shopFormControl,
  });
  getJsonOfSearchWithSelect(): JSON{
    return this.checkBoxService.getJsonOfSearchWithSelect(this.inputSearch.toArray(),this.cbs.toArray(), this.selects.toArray());
  }

  clear(){
    this.checkBoxService.clear(this.cbs,this.checkBoxFormGroup,this.selects.toArray());
  }

  ngOnInit() {
  }

}

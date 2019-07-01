import {Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, forkJoin, Observable} from "rxjs";
import {AdminService} from "../../../../services/admin/admin.service";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";
import {MatInput, MatOption} from "@angular/material";
import {CheckboxComponent} from "../../../../search/checkbox/checkbox.component";
import {CheckBoxesService} from "../../../../services/interactive-element/checkboxes.service";
import {BusStation} from "../../../../interfaces/entity/BusStation";
import {EquipmentCategory} from "../../../../interfaces/entity/EquipmentCategory";
import {Blend} from "../../../../interfaces/entity/Blend";
import {Poi} from "../../../../interfaces/entity/Poi";
import {CoffeeDrink} from "../../../../interfaces/entity/CoffeeDrink";
import {InputFormService} from "../../../../services/admin/input-form.service";
import {map} from "rxjs/operators";
import {Bean} from "../../../../interfaces/entity/Bean";


@Component({
  selector: 'app-shop-tab',
  templateUrl: './shop-tab.component.html',
  styleUrls: ['./shop-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class ShopTabComponent implements OnInit {
  @ViewChildren('address') addressInputs: QueryList<MatInput>;
  @ViewChild('checkbox') checkBoxes : CheckboxComponent;
  @ViewChildren('inputs') nameDescriptionInputs : QueryList<MatInput>;
  @ViewChildren(MatOption) bus : QueryList<MatOption>;

  public isLoaded = false;
  public selectedPoi: Poi[];
  public selectedBlend: Blend[];
  public selectedEquipmentCategory: EquipmentCategory[];
  public selectedCoffeeDrinks: CoffeeDrink[];
  public selectedBusStations : BusStation[];

  public choosePois: Poi[];
  public chooseBlends: Blend[];
  public chooseCoffeeDrinks: CoffeeDrink[];
  public chooseEquipmentCategories: EquipmentCategory[];
  public chooseBusStations : BusStation[];
  public chooseBeans : Bean[];

  public values$;
  public json: JSON;
  public shop: Shop;
  public shops: Shop[];
  public options: string[] = [];
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


  getJsonOfShop(): JSON{
    return this.checkBoxService.getJsonOfShopInput(this.addressInputs.toArray(), this.nameDescriptionInputs.toArray(), this.checkBoxes.cbs.toArray(),this.checkBoxes.selects.toArray())
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

  ngOnInit() {
    this.values$ = forkJoin(
      [
      this.inputService.getBusStation(),
      this.inputService.getPois(),
      this.inputService.getBeans(),
      this.inputService.getBlends(),
      this.inputService.getEquipmentCategories()
      ]
    ).subscribe(
      ([busStations, pois, beans, blends, equipmentCatagories]) => {
        this.chooseBusStations = busStations;
        this.choosePois = pois;
        this.chooseBeans = beans;
        this.chooseBlends = blends;
        this.chooseEquipmentCategories = equipmentCatagories;
        this.isLoaded = true;
      }
    );
  }

  constructor(public admin_service: AdminService, public shopService: ShopService,
              public checkBoxService: CheckBoxesService, public inputService: InputFormService) { }
}


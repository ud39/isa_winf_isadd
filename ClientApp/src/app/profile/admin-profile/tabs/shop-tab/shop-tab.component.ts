import {Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {forkJoin} from "rxjs";
import {AdminService} from "../../../../services/admin/admin.service";
import {ShopService} from "../../../../services/shop/shop.service";
import {Shop} from "../../../../interfaces/entity/Shop";
import {MatInput, MatOption, MatSelect} from "@angular/material";
import {CheckboxComponent} from "../../../../search/checkbox/checkbox.component";
import {CheckBoxesService} from "../../../../services/interactive-element/checkboxes.service";
import {BusStation} from "../../../../interfaces/entity/BusStation";
import {EquipmentCategory} from "../../../../interfaces/entity/EquipmentCategory";
import {Blend} from "../../../../interfaces/entity/Blend";
import {Poi} from "../../../../interfaces/entity/Poi";
import {CoffeeDrink} from "../../../../interfaces/entity/CoffeeDrink";
import {InputFormService} from "../../../../services/admin/input-form.service";
import {Bean} from "../../../../interfaces/entity/Bean";
import {CompareService} from "../../../../services/compare/compare.service";
import {forEach} from "@angular/router/src/utils/collection";


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
  @ViewChildren(MatSelect) selects : QueryList<MatSelect>;

  public isLoaded = false;

  public selectBusStationFromControl = new FormControl('',[]);
  public selectPoiFormControl = new FormControl('',[]);
  public selectBlendFormControl = new FormControl('',[]);
  public selectEquipmentCategoryFormControl = new FormControl('',[]);
  public selectCoffeeDrinkFormControl = new FormControl('',[]);
  public selectBeanFormCotnrol = new FormControl('',[]);

  public choosePois: Poi[];
  public chooseBlends: Blend[];
  public chooseCoffeeDrinks: CoffeeDrink[];
  public chooseEquipmentCategories: EquipmentCategory[];
  public chooseBusStations : BusStation[];
  public chooseBeans : Bean[];



  public mondayOpenFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public tuesdayOpenFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public wednesdayOpenFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public thursdayOpenFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public fridayOpenFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public saturdayOpenFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public sundayOpenFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);

  public openTimeFormGrouo = new FormGroup({
    monday: this.mondayOpenFormControl,
    tuesday: this.tuesdayOpenFormControl,
    wednesday: this.wednesdayOpenFormControl,
    thursday: this.thursdayOpenFormControl,
    friday: this.fridayOpenFormControl,
    saturday: this.saturdayOpenFormControl,
    sunday: this.sundayOpenFormControl,
  });



  public mondayCloseFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public tuesdayCloseFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public wednesdayCloseFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public thursdayCloseFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public fridayCloseFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public saturdayCloseFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public sundayCloseFormControl = new FormControl('',[
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);

  public closeTimeFormGrouo = new FormGroup({
    monday: this.mondayCloseFormControl,
    tuesday: this.tuesdayCloseFormControl,
    wednesday: this.wednesdayCloseFormControl,
    thursday: this.thursdayCloseFormControl,
    friday: this.fridayCloseFormControl,
    saturday: this.saturdayCloseFormControl,
    sunday: this.sundayCloseFormControl,
  });







  public values$;
  public json: JSON;
  public shop: Shop;
  public shops: Shop[];

  public streetFormControl = new FormControl('',[

    ]);
  public streetNrFormControl = new FormControl('',[
    Validators.pattern('[0-9]|^$')
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

  public postalCodeFormControl = new FormControl('',[
    Validators.pattern('[0-9]{2,}|^$')
  ]);

  public shopDescriptionFormControl = new FormControl('',[]);

  public companyNameFormControl = new FormControl('',[
    Validators.required

  ]);
  inputShop = new FormGroup({
      openingTime: this.openTimeFormGrouo,
      closingTime: this.closeTimeFormGrouo,
      street: this.streetFormControl,
      streetNr: this.streetNrFormControl,
      country: this.countryFormControl,
      city: this.townFormControl,
      postalCode: this.postalCodeFormControl,
      shopName: this.shopNameFormControl,
      shopWebsite: this.shopWebsiteFormControl,
      companyName: this.companyNameFormControl,
      foundingyear : this.shopFoundingYearFormControl,
      shopDescription: this.shopDescriptionFormControl,
      selectBean: this.selectBeanFormCotnrol,
      selectBlend: this.selectBlendFormControl,
      selectCoffeeDrink: this.selectCoffeeDrinkFormControl,
      selectBusStation: this.selectBusStationFromControl,
      selectPoi: this.selectPoiFormControl,
      selectEquipmentCategory: this.selectEquipmentCategoryFormControl

    }
  );

  getInputShop(): FormGroup{
    return this.inputShop;
  }

  fillOutInputForm(selectedShop:Shop){
    this.shopNameFormControl.setValue(selectedShop.name);
    this.shopDescriptionFormControl.setValue(selectedShop.description);
    this.shopWebsiteFormControl.setValue(selectedShop.website);
    this.shopFoundingYearFormControl.setValue(selectedShop.foundingYear);
    this.companyNameFormControl.setValue(selectedShop.companyName);
    this.countryFormControl.setValue(selectedShop.address.country);
    this.postalCodeFormControl.setValue(selectedShop.address.postalCode);
    this.streetNrFormControl.setValue(selectedShop.address.streetNumber);
    this.streetFormControl.setValue(selectedShop.address.streetName);
    this.townFormControl.setValue(selectedShop.address.town);

    this.selectBeanFormCotnrol.setValue(selectedShop.beans);
    this.selectBusStationFromControl.setValue(selectedShop.reachableByBus);
    this.selectBlendFormControl.setValue(selectedShop.blends);
    this.selectPoiFormControl.setValue(selectedShop.listOfPoi);
    this.selectEquipmentCategoryFormControl.setValue(selectedShop.equipmentCategories);
    this.selectCoffeeDrinkFormControl.setValue(selectedShop.coffeeDrinks);

    this.inputService.fillOutOpenCloseTime(selectedShop,this.openTimeFormGrouo,this.closeTimeFormGrouo)
    this.checkBoxService.fillOutCheckBoxes(selectedShop,this.checkBoxes.cbs.toArray());

  }

  getJsonOfShop(): JSON{
    let json : JSON = this.checkBoxService.getJsonOfShopInput(this.addressInputs.toArray(), this.nameDescriptionInputs.toArray(), this.checkBoxes.cbs.toArray(),this.selects.toArray());

    let temp ='';
    this.adminService.getAllCoffeeShopImages().forEach((value: string, key: string) => {
      temp +=  ',{"fileName":"' + key + '"}';
    });
    temp = temp.slice(1);
    let jsonImageList = JSON.parse('[' + temp + ']');


    console.log(JSON.stringify(jsonImageList));
    json["images"] = jsonImageList;

    return json;
  }

  onFileChanged(files, event, fromWhere) {
    this.adminService.onFileChangedShop(files, event,"shop", fromWhere)
  }

  onUpload(fromWhere) {
    this.adminService.onUpload(fromWhere);
  }

  deleteImage(fromWhere) {
    this.adminService.deleteImage(fromWhere);
  }

  ngOnInit() {
    this.values$ = forkJoin(
      [
        this.inputService.getCoffeeDrinks(),
        this.inputService.getBeans(),
        this.inputService.getBlends(),
        this.inputService.getBusStations(),
        this.inputService.getPois(),
        this.inputService.getEquipmentCategories()
      ]
    ).subscribe(
      ([coffeeDrinks, beans, blends, busStations, pois, equipmentCategories]) => {
        this.chooseCoffeeDrinks = coffeeDrinks;
        this.chooseBeans = beans;
        this.chooseBlends = blends;
        this.chooseBusStations = busStations;
        this.choosePois = pois;
        this.chooseEquipmentCategories = equipmentCategories;
        console.log(this.chooseBusStations);
        this.isLoaded =true;
      }
    );
    this.shopService.getShops().subscribe(value => {
      this.shops = value;
    })
  }

  public loadData(){
  }

  public validateFormControl(){
    this.postalCodeFormControl.updateValueAndValidity();
    this.postalCodeFormControl.markAsTouched({onlySelf:true});
    this.streetNrFormControl.updateValueAndValidity();
    this.streetNrFormControl.markAsTouched({onlySelf:true});
    this.mondayOpenFormControl.updateValueAndValidity();
    this.mondayOpenFormControl.markAsTouched({onlySelf:true});
    this.tuesdayOpenFormControl.updateValueAndValidity();
    this.tuesdayOpenFormControl.markAsTouched({onlySelf:true});
    this.wednesdayOpenFormControl.updateValueAndValidity();
    this.wednesdayOpenFormControl.markAsTouched({onlySelf:true});
    this.thursdayOpenFormControl.updateValueAndValidity();
    this.thursdayOpenFormControl.markAsTouched({onlySelf:true});
    this.fridayOpenFormControl.updateValueAndValidity();
    this.fridayOpenFormControl.markAsTouched({onlySelf:true});
    this.saturdayOpenFormControl.updateValueAndValidity();
    this.saturdayOpenFormControl.markAsTouched({onlySelf:true});
    this.sundayOpenFormControl.updateValueAndValidity();
    this.sundayOpenFormControl.markAsTouched({onlySelf:true});

    this.mondayCloseFormControl.updateValueAndValidity();
    this.mondayCloseFormControl.markAsTouched({onlySelf:true});
    this.tuesdayCloseFormControl.updateValueAndValidity();
    this.tuesdayCloseFormControl.markAsTouched({onlySelf:true});
    this.wednesdayCloseFormControl.updateValueAndValidity();
    this.wednesdayCloseFormControl.markAsTouched({onlySelf:true});
    this.thursdayCloseFormControl.updateValueAndValidity();
    this.thursdayCloseFormControl.markAsTouched({onlySelf:true});
    this.fridayCloseFormControl.updateValueAndValidity();
    this.fridayCloseFormControl.markAsTouched({onlySelf:true});
    this.saturdayCloseFormControl.updateValueAndValidity();
    this.saturdayCloseFormControl.markAsTouched({onlySelf:true});
    this.sundayCloseFormControl.updateValueAndValidity();
    this.sundayCloseFormControl.markAsTouched({onlySelf:true});

  }
  constructor(public adminService: AdminService, public shopService: ShopService,
              public checkBoxService: CheckBoxesService, public inputService: InputFormService,
              public compareService: CompareService) { }
}


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
import {EventService} from "../../../../services/event/event.service";
import {CheckboxShopAdminComponent} from "../../../../search/checkbox-shop-admin/checkbox-shop-admin.component";



@Component({
  selector: 'app-shop-tab',
  templateUrl: './shop-tab.component.html',
  styleUrls: ['./shop-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class ShopTabComponent implements OnInit {
  @ViewChildren('address') addressInputs: QueryList<MatInput>;
  @ViewChild('checkbox') checkBoxes: CheckboxShopAdminComponent;
  @ViewChildren('inputs') nameDescriptionInputs: QueryList<MatInput>;
  @ViewChildren(MatOption) bus: QueryList<MatOption>;
  @ViewChildren(MatSelect) selects: QueryList<MatSelect>;

  public isLoaded = true;

  public selectBusStationFromControl = new FormControl('', []);
  public selectPoiFormControl = new FormControl('', []);
  public selectBlendFormControl = new FormControl('', []);
  public selectEquipmentCategoryFormControl = new FormControl('', []);
  public selectCoffeeDrinkFormControl = new FormControl('', []);
  public selectBeanFormCotnrol = new FormControl('', []);

  public choosePois: Poi[];
  public chooseBlends: Blend[];
  public chooseCoffeeDrinks: CoffeeDrink[];
  public chooseEquipmentCategories: EquipmentCategory[];
  public chooseBusStations: BusStation[];
  public chooseBeans: Bean[];

  public editBusStation: BusStation[];
  public editPos: Poi[];

  public mondayOpenFormControl = new FormControl('', [
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public tuesdayOpenFormControl = new FormControl('', [
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public wednesdayOpenFormControl = new FormControl('', [
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public thursdayOpenFormControl = new FormControl('', [
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public fridayOpenFormControl = new FormControl('', [
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public saturdayOpenFormControl = new FormControl('', [
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);
  public sundayOpenFormControl = new FormControl('', [
    Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
  ]);


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



  public openingCloseTimeFormGroup = new FormGroup({
    mondayOpen:this.mondayOpenFormControl,
    tuesdayOpen:this.tuesdayOpenFormControl,
    wednesdayOpen:this.wednesdayOpenFormControl,
    thursdayOpen:this.thursdayOpenFormControl,
    fridayOpen:this.fridayOpenFormControl,
    saturdayOpen:this.saturdayOpenFormControl,
    sundayOpen:this.sundayOpenFormControl,
    mondayClose:this.mondayCloseFormControl,
    tuesdayClose:this.tuesdayCloseFormControl,
    wednesdayClose:this.wednesdayCloseFormControl,
    thursdayClose:this.thursdayCloseFormControl,
    fridayClose:this.fridayCloseFormControl,
    saturdayClose:this.saturdayCloseFormControl,
    sundayClose:this.sundayCloseFormControl,
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

  public shopFoundingYearFormControl = new FormControl('',[
    Validators.pattern('[1-2][7-9,0][0-9]{2}')
  ]);

  public postalCodeFormControl = new FormControl('',[
    Validators.pattern('[0-9]{2,}|^$')
  ]);

  public shopDescriptionFormControl = new FormControl('',[]);

  public companyNameFormControl = new FormControl('',[
    Validators.required

  ]);
  inputShop = new FormGroup({
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
      selectEquipmentCategory: this.selectEquipmentCategoryFormControl,
      openingClosing: this.openingCloseTimeFormGroup

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
    this.adminService.clearImages();
    this.adminService.setImages(selectedShop.images);


    this.selectBeanFormCotnrol.setValue(selectedShop.beans);
    this.selectBusStationFromControl.setValue(selectedShop.reachableByBus);
    this.selectBlendFormControl.setValue(selectedShop.blends);
    this.selectPoiFormControl.setValue(selectedShop.listOfPoi);
    this.selectEquipmentCategoryFormControl.setValue(selectedShop.equipmentCategories);
    this.selectCoffeeDrinkFormControl.setValue(selectedShop.coffeeDrinks);

    this.inputService.fillOutOpenCloseTime(selectedShop,this.openingCloseTimeFormGroup);
    this.checkBoxService.fillOutCheckBoxes(selectedShop,this.checkBoxes.checkBoxFormGroup);

  }

  getJsonOfShop(): JSON{
    console.log(this.compareService.calculateDifferenceOfArrayBusStation(this.shop.reachableByBus,this.selectBusStationFromControl.value,this.compareService));
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

  public validateControl(){
    if(!this.openingCloseTimeFormGroup.valid && !this.openingCloseTimeFormGroup.valid)
    Object.keys(this.openingCloseTimeFormGroup.controls).forEach(key => {
      const openingFormControl = this.openingCloseTimeFormGroup.controls[key];
      const closignFormControl = this.openingCloseTimeFormGroup.controls[key];
      openingFormControl.updateValueAndValidity();
      closignFormControl.markAsTouched({ onlySelf: true });
    });
  }


  ngOnInit() {
    this.values$ = forkJoin(
      [
        this.inputService.getCoffeeDrinks(),
        this.inputService.getBeans(),
        this.inputService.getBlends(),
        this.inputService.getBusStations(),
        this.inputService.getPois(),
        this.inputService.getEquipmentCategories(),
        ],
    ).subscribe(
      ([coffeeDrinks, beans, blends, busStations, pois, equipmentCategories]) => {
        this.chooseCoffeeDrinks = coffeeDrinks;
        this.chooseBeans = beans;
        this.chooseBlends = blends;
        this.chooseBusStations = busStations;
        this.editBusStation = busStations;
        this.choosePois = pois;
        this.chooseEquipmentCategories = equipmentCategories;
        this.isLoaded = true;
      }
    );
    this.shopService.getShops().subscribe(value => {
      this.shops = value;

    })
  }


  constructor(public adminService: AdminService, public shopService: ShopService,
              public checkBoxService: CheckBoxesService, public inputService: InputFormService,
              public compareService: CompareService, public eventService : EventService) { }

}


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


@Component({
  selector: 'app-shop-tab',
  templateUrl: './shop-tab.component.html',
  styleUrls: ['./shop-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class ShopTabComponent implements OnInit {
  @ViewChildren('address') addressInputs: QueryList<MatInput>;
  @ViewChild('checkbox') checkBoxes: CheckboxComponent;
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

  public addBusStation: BusStation[];
  public removeBusStation: BusStation[];

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

  public openTimeFormGroup = new FormGroup({
    monday: this.mondayOpenFormControl,
    tuesday: this.tuesdayOpenFormControl,
    wednesday: this.wednesdayOpenFormControl,
    thursday: this.thursdayOpenFormControl,
    friday: this.fridayOpenFormControl,
    saturday: this.saturdayOpenFormControl,
    sunday: this.sundayOpenFormControl,
  }, {validators: this.compareService.openingClosingTimeValidator});


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

  public closeTimeFormGroup = new FormGroup({
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

    this.inputService.fillOutOpenCloseTime(selectedShop,this.openTimeFormGroup,this.closeTimeFormGroup);
    this.checkBoxService.fillOutCheckBoxes(selectedShop,this.checkBoxes.cbs.toArray());

  }

  getJsonOfShop(): JSON{
    return this.checkBoxService.getJsonOfShopInput(this.addressInputs.toArray(), this.nameDescriptionInputs.toArray(), this.checkBoxes.cbs.toArray(),this.selects.toArray())
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
        this.choosePois = pois;
        this.chooseEquipmentCategories = equipmentCategories;
      }
    );
    forkJoin([]);
    this.shopService.getShops().subscribe(value => {
      this.shops = value;
    })
  }
  public validateFormControl(){
  }
  public addBusStationToArray(busStation: any){
      if(this.chooseBusStations.length > 1)
      {


      }
  }

  constructor(public admin_service: AdminService, public shopService: ShopService,
              public checkBoxService: CheckBoxesService, public inputService: InputFormService,
              public compareService: CompareService, public eventService : EventService) { }

}


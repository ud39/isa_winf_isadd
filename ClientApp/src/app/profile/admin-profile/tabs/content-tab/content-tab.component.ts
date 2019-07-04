import {Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {MatInput, MatSelect} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EquipmentCategory} from "../../../../interfaces/entity/EquipmentCategory";
import {CoffeeDrink} from "../../../../interfaces/entity/CoffeeDrink";
import {Bean} from "../../../../interfaces/entity/Bean";
import {Blend} from "../../../../interfaces/entity/Blend";
import {InputFormService} from "../../../../services/admin/input-form.service";
import {CompareService} from "../../../../services/compare/compare.service";
import {BusStation} from "../../../../interfaces/entity/BusStation";
import {Poi} from "../../../../interfaces/entity/Poi";
import {HttpParams} from "@angular/common/http";
import {Company} from "../../../../interfaces/entity/Company";

@Component({
  selector: 'app-content-tab',
  templateUrl: './content-tab.component.html',
  styleUrls: ['./content-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentTabComponent implements OnInit {
  @ViewChild('multipleSelectBlend') multipleSelectBlend : MatSelect;
  @ViewChildren('address') addressInputs: QueryList<MatInput>;
  public selectContentFormControl = new FormControl('',[
    Validators.required,
  ]);

  public json = {

  };

  public chooseEquipmentCategory : EquipmentCategory[];
  public selectedContent: any;
  public content = [
    {value: 'Blend', viewValue: 'Blend'},
    {value: 'Bean', viewValue: 'Bohnen'},
    {value: 'CoffeeDrink', viewValue: 'Kaffee Getränke'},
    {value: 'Company', viewValue: 'Firma'},
    {value: 'Equipment-category', viewValue: 'Equipment Kategorie'},
    {value: 'BusStation', viewValue: 'Bus Haltestelle'},
    {value: 'Poi', viewValue: 'Landmarken'}
  ];

  public blendPriceClass = [
    {value: 'low', viewValue: 'niedrig'},
    {value: 'middle', viewValue: 'mittel'},
    {value: 'high', viewValue: 'hoch'},
  ];

  public roasts = [
    {value: 'none', viewValue: 'Keine'},
    {value: 'lightRoast', viewValue: 'Helle Röstung'},
    {value: 'middleRoast', viewValue: 'Mittlere Röstung'},
    {value: 'darkRoast', viewValue: 'Dunkle Röstung'},
  ];
  public grinds = [
    {value: 'none', viewValue: 'Keine'},
    {value: 'veryCoarse', viewValue: 'Sehr Grob'},
    {value: 'coarse', viewValue: 'Grob'},
    {value: 'coarseMiddle', viewValue: 'Grob bis Mittel'},
    {value: 'middle', viewValue: 'Mittel'},
    {value: 'fine', viewValue: 'Fein'},
    {value: 'veryFine', viewValue: 'Sehr Fein'},
  ];


  public blendNameFormControl = new FormControl('',[
    Validators.required
  ]);
  public blendProvenanceFormControl = new FormControl('',[
    Validators.required
  ]);
  public selectBlendBeanFormControl = new FormControl('',[
    this.compareService.atLeastTwoBeanSelected
  ]);

  public blendRoastFormControl = new FormControl('',[]);
  public blendGrindFormControl = new FormControl('',[]);

  public selectBlendPriceClassFormControl = new FormControl('',[]);
  public avaibleBeans : Bean[];


  public beanNameFormControl = new FormControl('',[]);
  public beanProvenanceFormControl = new FormControl('',[]);
  public beanRoastFormControl = new FormControl('',[]);
  public beanGrindFormControl = new FormControl('',[]);

  public selectEquipmentCategoryFormControl = new FormControl('',[]);

  public busStationNameFormControl = new FormControl('',[]);
  public busStationLineFormControl = new FormControl('',[]);

  public equipmentNameFormControl = new FormControl('',[]);
  public coffeeDrinkNameFormControl = new FormControl('',[]);
  public equipmentCategoryNameFormControl = new FormControl('',[]);

  public poiNameFormControl = new FormControl('',[]);
  public streetFormControl = new FormControl('',[]);
  public streetNrFormControl = new FormControl('',[]);
  public countryFormControl = new FormControl('',[]);
  public postalCodeFormControl = new FormControl('',[]);
  public townFormControl = new FormControl('',[]);
  public companyNameFormControl = new FormControl('',[]);

  public validateFormControl(){
    this.postalCodeFormControl.updateValueAndValidity();
    this.postalCodeFormControl.markAsTouched({onlySelf:true});
    this.streetNrFormControl.updateValueAndValidity();
    this.streetNrFormControl.markAsTouched({onlySelf:true});
  }



  public blendFormGroup = new FormGroup({name: this.blendNameFormControl,blends: this.blendProvenanceFormControl, beans: this.selectBlendBeanFormControl, grind: this.blendGrindFormControl, roast:this.blendRoastFormControl});
  public beanFormGroup = new FormGroup({name: this.beanNameFormControl, select: this.beanProvenanceFormControl, grind:this.beanGrindFormControl,roast:this.beanRoastFormControl});
  public equipmentFormGroup = new FormGroup({name: this.equipmentNameFormControl, select: this.selectContentFormControl});
  public coffeeDrinkFormGroup = new FormGroup({name: this.coffeeDrinkNameFormControl, select: this.selectContentFormControl});
  public equipmentCategoryNameFormGroup = new FormGroup({name: this.equipmentCategoryNameFormControl});
  public poiFormGroup = new FormGroup({name: this.poiNameFormControl, streetName:this.streetFormControl, streetname: this.streetNrFormControl, postalCode:this.postalCodeFormControl, country:this.countryFormControl,town:this.townFormControl});
  public busStationFormGroup = new FormGroup({name: this.busStationNameFormControl, line:this.busStationLineFormControl});
  public companyFormGroup = new FormGroup({name: this.companyNameFormControl});
  constructor(public inputFormService: InputFormService, public compareService: CompareService) { }

  fillOutInputForm(data:Blend|Bean|EquipmentCategory|CoffeeDrink|BusStation|Poi){
    console.log('restore content');
    switch(this.selectContentFormControl.value){
      case 'Blend':
        let blend : Blend = <Blend> data;
        this.blendNameFormControl.setValue(blend.name);
        this.blendProvenanceFormControl.setValue(blend.provenance);
        this.selectBlendBeanFormControl.setValue('');
        this.blendGrindFormControl.setValue(blend);
      break;
      case 'Beans':
        let bean : Bean = <Bean> data;
        this.beanNameFormControl.setValue(bean.name);
        this.beanProvenanceFormControl.setValue(bean.provenance);
        this.beanGrindFormControl.setValue(bean.grind);
        this.beanRoastFormControl.setValue(bean.roast);
      break;
      case 'BusStation':
        let busStation : BusStation = <BusStation> data;
        this.busStationNameFormControl.setValue(busStation.name);
        this.busStationLineFormControl.setValue(busStation.line);
        break;
      case 'Poi':
        let poi : Poi = <Poi> data;
        console.log("fill out");
        this.poiNameFormControl.setValue(poi.name);
        this.postalCodeFormControl.setValue(poi.address.postalCode);
        this.streetFormControl.setValue(poi.address.streetName);
        this.streetNrFormControl.setValue(poi.address.streetNumber);
        this.countryFormControl.setValue(poi.address.country);
        this.townFormControl.setValue(poi.address.town);
        break;
      case 'CoffeeDrink':
        let coffeeDrink = <CoffeeDrink> data;
        this.coffeeDrinkNameFormControl.setValue(coffeeDrink.name);
        break;
      case 'Equipment-category':
        let equipmentCategory = <EquipmentCategory> data;
        this.equipmentCategoryNameFormControl.setValue(equipmentCategory.name);
        break;
      case 'Company':
        let company = <Company> data;
        this.companyNameFormControl.setValue(company.name);
        break;
    }
  }

  ngOnInit() {
    this.selectContentFormControl.setValue('Blend');
    this.inputFormService.getEquipmentCategories().subscribe(result =>{
      this.chooseEquipmentCategory = result;
    });
    this.inputFormService.getBeans().subscribe(result => {
      this.avaibleBeans = result;
    })
  }

  public getContentInput(): FormGroup{
    switch (this.selectContentFormControl.value) {
      case 'Blend':
        return this.blendFormGroup;
      case 'Bean':
        console.log('Bean get FormGroup');
        return this.beanFormGroup;
      case 'Equipment':
        return this.equipmentFormGroup;
      case 'CoffeeDrink':
        return this.coffeeDrinkFormGroup;
      case 'Equipment-category':
        return this.equipmentCategoryNameFormGroup;
      case 'Poi':
        return this.poiFormGroup;
      case 'BusStation':
        return this.busStationFormGroup;
      case 'Company':
        return this.companyFormGroup;
    }
  }
  public getJsonOfContent():JSON{
    switch (this.selectContentFormControl.value) {
      case 'Blend':
        this.json['name'] = this.blendNameFormControl.value;
        this.json['provenance'] = this.blendProvenanceFormControl.value;
        this.json['bean'] = this.selectBlendBeanFormControl.value;
        console.log(this.json);
        return <JSON> this.json;
      case 'Bean':
        this.json['name'] = this.beanNameFormControl.value;
        this.json['provenance'] = this.beanProvenanceFormControl.value;
        this.json['priceClass'] = this.beanFormGroup.value;
        this.json['roast'] = this.beanRoastFormControl.value;
        this.json['grind'] = this.beanGrindFormControl.value;
        console.log(this.json);
        return <JSON> this.json;
      case 'CoffeeDrink':
        this.json['name'] = this.coffeeDrinkNameFormControl.value;
        console.log(this.json);
        return <JSON> this.json;
      case 'Equipment-category':
        this.json['name'] = this.equipmentCategoryNameFormControl.value;
        console.log(this.json);
        return <JSON> this.json;
      case 'Company':
        this.json['name'] = this.companyNameFormControl;
        console.log(this.json);
        return  <JSON> this.json;
      case 'BusStation':
        this.json['name'] = this.busStationNameFormControl.value;
        this.json['line']     = this.busStationLineFormControl.value;
        return  <JSON> this.json;
      case 'Poi':
        this.json['name'] = this.poiNameFormControl.value;
        this.json['address']['streetName'] = this.streetFormControl.value;
        this.json['address']['streetNumber'] = this.streetFormControl.value;
        this.json['address']['postalCode'] = this.postalCodeFormControl.value;
        this.json['address']['town'] = this.townFormControl.value;
        this.json['address']['country'] = this.countryFormControl.value;
        console.log(this.json);
        return  <JSON> this.json;
    }
  }

  public getQueryParamsOfContent():HttpParams{
    let params = new HttpParams();
    switch (this.selectContentFormControl.value) {
      case 'Blend':
        params = params.set('name',this.blendNameFormControl.value);
        console.log(params);
        return params;
      case 'Bean':
        params = params.set('name',this.beanNameFormControl.value).append('provenance',this.beanProvenanceFormControl.value);
        console.log(params);
        return params;
      case 'CoffeeDrink':
        params = params.set('name',this.coffeeDrinkNameFormControl.value.toString().charAt(0).toUpperCase() + this.coffeeDrinkNameFormControl.value.toString().slice(1));
        console.log(params);
        return params;
      case 'Company':
        return null;
      case 'BusStation':
        params = params.set('name',this.busStationNameFormControl.value).append('line',this.busStationLineFormControl.value);
        console.log(params);
        return params;
      case 'Poi':
        params = params.set('name',this.poiNameFormControl.value).append('address.streetName',this.streetFormControl.value)
          .append('address.streetNumber',this.streetNrFormControl.value).append('address.postalCode', this.postalCodeFormControl.value)
          .append('address.country',this.countryFormControl.value).append('address.town',this.townFormControl.value);
        console.log(params);
        return params;
      case 'Equipment-category':
        params = params.set('name',this.equipmentCategoryNameFormControl.value.toString().charAt(0).toUpperCase() + this.equipmentCategoryNameFormControl.value.toString().slice(1));
        return params;
    }
  }
}

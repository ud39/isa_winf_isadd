import { Injectable } from '@angular/core';
import {BusStation} from "../../interfaces/entity/BusStation";
import {Blend} from "../../interfaces/entity/Blend";
import {Bean} from "../../interfaces/entity/Bean";
import {Poi} from "../../interfaces/entity/Poi";
import {EquipmentCategory} from "../../interfaces/entity/EquipmentCategory";
import {CoffeeDrink} from "../../interfaces/entity/CoffeeDrink";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  constructor() { }


  public compareBusStation(busStation1 : BusStation, busStation2: BusStation) {
    return  busStation1.name == busStation2.name &&
      busStation1.line == busStation2.line;
  }

  public compareBlend(blend1 : Blend, blend2:Blend){
    return blend1.name == blend2.name &&
      blend1.provenance == blend2.provenance;
  }

  public compareBean(bean1 : Bean, bean2 : Bean){
    return bean1.name == bean2.name &&
      bean1.provenance == bean2.provenance
  }

  public comparePoi(poi1 : Poi , poi2: Poi){
    return poi1.name == poi2.name;
  }

  public compareEquipmentCategory(equipmentCategory1 : EquipmentCategory, equipmentCategory2 : EquipmentCategory){
    return equipmentCategory1.name == equipmentCategory2.name &&
           equipmentCategory1.imageFileName == equipmentCategory2.imageFileName;
  }

  public compareCoffeeDrink(coffeeDrink1 : CoffeeDrink, coffeeDrink2 : CoffeeDrink){
    return coffeeDrink1.name == coffeeDrink2.name;
  }

  public comparePriceClass(priceClass1:string, priceClass2:string){
    return priceClass1 == priceClass2;
  }

  public openingClosingTimeValidator(openingformGroup:FormGroup) {
    let opening: string = openingformGroup.get('monday').value;
    let closing: string = openingformGroup.get('tuesday').value;
    if(opening.length > 0 && closing.length > 0) {
      let openingTime: number = Number(opening.replace(':', ''));
      let closingTime: number = Number(closing.replace(':', ''));

    if (openingTime > closingTime && (openingTime.toString().length == 4 && closingTime.toString().length == 4)){
      console.log('setError');
      openingformGroup.get('tuesday').setErrors({
        notMatch: 'closing time must be later than opening time'
      })
    }else{
      return null;
    }}else{
      return null;
    }
  }

  public atLeastTwoBeanSelected(formControl:FormControl){
    let beans : Bean[] = formControl.value;
    if(beans.length < 2){
      return {
        beans: 'only one bean was selected'
      }
    }else{
      return null;
    }
  }
}

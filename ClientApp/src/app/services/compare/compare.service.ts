import { Injectable } from '@angular/core';
import {BusStation} from "../../interfaces/entity/BusStation";
import {Blend} from "../../interfaces/entity/Blend";
import {Bean} from "../../interfaces/entity/Bean";
import {Poi} from "../../interfaces/entity/Poi";
import {EquipmentCategory} from "../../interfaces/entity/EquipmentCategory";
import {CoffeeDrink} from "../../interfaces/entity/CoffeeDrink";
import {FormGroup} from "@angular/forms";

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

  matchingOpeningClosingTime(openingTime: string, closingTime: string) {
    return (group: FormGroup) => {
      let openingTimeOfDay = group.controls[openingTime];
      let closingTimeOfDay = group.controls[closingTime];
      if (openingTimeOfDay.value < closingTimeOfDay.value) {
        return closingTimeOfDay.setErrors({notEquivalent: true})
      }else{
        return closingTimeOfDay.setErrors({notEquivalent: true})
      }
    }
  }
}

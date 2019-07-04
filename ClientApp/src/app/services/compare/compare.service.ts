import { Injectable } from '@angular/core';
import {BusStation} from "../../interfaces/entity/BusStation";
import {Blend} from "../../interfaces/entity/Blend";
import {Bean} from "../../interfaces/entity/Bean";
import {Poi} from "../../interfaces/entity/Poi";
import {Event} from "../../interfaces/entity/Event";
import {EquipmentCategory} from "../../interfaces/entity/EquipmentCategory";
import {CoffeeDrink} from "../../interfaces/entity/CoffeeDrink";
import {FormControl, FormGroup} from "@angular/forms";
import {Shop} from "../../interfaces/entity/Shop";

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  constructor() {
  }


  public compareBusStation(busStation1: BusStation, busStation2: BusStation) {
    return busStation1.name == busStation2.name
      && busStation1.line == busStation2.line;
  }

  public compareBlend(blend1: Blend, blend2: Blend) {
    return blend1.name == blend2.name

  }

  public compareBean(bean1: Bean, bean2: Bean) {
    return bean1.name == bean2.name &&
      bean1.provenance == bean2.provenance
  }

  public comparePoi(poi1: Poi, poi2: Poi) {
    return poi1.name == poi2.name
      && poi1.address.streetName == poi2.address.streetName
      && poi1.address.country == poi2.address.country
      && poi1.address.postalCode == poi2.address.postalCode
      && poi1.address.streetNumber == poi2.address.streetNumber
      && poi1.address.town == poi2.address.town
  }

  public compareEquipmentCategory(equipmentCategory1: EquipmentCategory, equipmentCategory2: EquipmentCategory) {
    return equipmentCategory1.name == equipmentCategory2.name
  }

  public compareCoffeeDrink(coffeeDrink1: CoffeeDrink, coffeeDrink2: CoffeeDrink) {
    return coffeeDrink1.name == coffeeDrink2.name;
  }

  public compareEvent(event1: Event, event2: Event) {
    return event1.id == event2.id;
  }

  public compareShop(shop1: number, shop2: number) {
    return shop1 && shop2 ? shop1 === shop2 : shop1 === shop2
  }


  public calculateDifferenceOfArrayBusStation(array1: BusStation[], array2: BusStation[], compareFn: CompareService)
    : [BusStation[], BusStation[]] {
    //Find values that are in result1 but not in result2
    let uniqueResultOne = array1.filter(function (obj) {
      return !array2.some(function (obj2) {
        return compareFn.compareBusStation(obj, obj2)
      });
    });

    //Find values that are in result2 but not in result1
    let uniqueResultTwo = array2.filter(function (obj) {
      return !array1.some(function (obj2) {
        return compareFn.compareBusStation(obj, obj2)
      });
    });
    return [uniqueResultOne, uniqueResultTwo];
  }

  public calculateDifferenceOfArrayBean(array1: Bean[], array2: Bean[], compareFn: CompareService)
    : [Bean[], Bean[]] {
    //Find values that are in result1 but not in result2
    let uniqueResultOne = array1.filter(function (obj) {
      return !array2.some(function (obj2) {
        return compareFn.compareBean(obj, obj2)
      });
    });

    //Find values that are in result2 but not in result1
    let uniqueResultTwo = array2.filter(function (obj) {
      return !array1.some(function (obj2) {
        return compareFn.compareBean(obj, obj2)
      });
    });
    return [uniqueResultOne, uniqueResultTwo];
  }

  public calculateDifferenceOfArrayBlend(array1: Blend[], array2: Blend[], compareFn: CompareService)
    : [Blend[], Blend[]] {
    //Find values that are in result1 but not in result2
    let uniqueResultOne = array1.filter(function (obj) {
      return !array2.some(function (obj2) {
        return compareFn.compareBlend(obj, obj2)
      });
    });

    //Find values that are in result2 but not in result1
    let uniqueResultTwo = array2.filter(function (obj) {
      return !array1.some(function (obj2) {
        return compareFn.compareBlend(obj, obj2)
      });
    });
    return [uniqueResultOne, uniqueResultTwo];
  }

  public calculateDifferenceOfArrayCoffeeDrink(array1: CoffeeDrink[], array2: CoffeeDrink[], compareFn: CompareService)
    : [CoffeeDrink[], CoffeeDrink[]] {
    //Find values that are in result1 but not in result2
    let uniqueResultOne = array1.filter(function(obj) {
      return !array2.some(function (obj2) {
        return compareFn.compareCoffeeDrink(obj, obj2)
      });
    });

    //Find values that are in result2 but not in result1
    let uniqueResultTwo = array2.filter(function (obj) {
      return !array1.some(function (obj2) {
        return compareFn.compareCoffeeDrink(obj, obj2)
      });
    });
    return [uniqueResultOne, uniqueResultTwo];
  }

  public calculateDifferenceOfArrayPoi(array1: Poi[], array2: Poi[], compareFn: CompareService)
    : [Poi[], Poi[]] {
    //Find values that are in result1 but not in result2
    let uniqueResultOne = array1.filter(function (obj) {
      return !array2.some(function (obj2) {
        return compareFn.comparePoi(obj, obj2)
      });
    });

    //Find values that are in result2 but not in result1
    let uniqueResultTwo = array2.filter(function (obj) {
      return !array1.some(function (obj2) {
        return compareFn.comparePoi(obj, obj2)
      });
    });
    return [uniqueResultOne, uniqueResultTwo];
  }

  public calculateDifferenceOfArrayEvent(array1: Event[], array2: Event[], compareFn: CompareService)
    : [Event[], Event[]] {
    //Find values that are in result1 but not in result2
    let uniqueResultOne = array1.filter(function (obj) {
      return !array2.some(function (obj2) {
        return compareFn.compareEvent(obj, obj2)
      });
    });

    //Find values that are in result2 but not in result1
    let uniqueResultTwo = array2.filter(function (obj) {
      return !array1.some(function (obj2) {
        return compareFn.compareEvent(obj, obj2)
      });
    });
    return [uniqueResultOne, uniqueResultTwo];
  }

  public calculateDifferenceOfArrayEquipmentCategory(array1: EquipmentCategory[], array2: EquipmentCategory[], compareFn: CompareService)
    : [EquipmentCategory[], EquipmentCategory[]] {
    //Find values that are in result1 but not in result2
    let uniqueResultOne = array1.filter(function (obj) {
      return !array2.some(function (obj2) {
        return compareFn.compareEquipmentCategory(obj, obj2)
      });
    });

    //Find values that are in result2 but not in result1
    let uniqueResultTwo = array2.filter(function (obj) {
      return !array1.some(function (obj2) {
        return compareFn.compareEquipmentCategory(obj, obj2)
      });
    });
    return [uniqueResultOne, uniqueResultTwo];
  }

  public eventDateValidator(formEventGroup: FormGroup){
    let beginEventDate = formEventGroup.get('startTime').value;
    let endEventDate = formEventGroup.get('endTime').value;
    if(beginEventDate > endEventDate){
      formEventGroup.get('endTime').setErrors({
        unMatch: 'Dates invalid'
      })
    }else{
      return null;
    }
  }

  public mondayOpeningClosingTimeValidator(openingformGroup: FormGroup) {
    let opening: string = openingformGroup.get('monday').value;
    let closing: string = openingformGroup.get('tuesday').value;
    if (opening.length > 0 && closing.length > 0) {
      let openingTime: number = Number(opening.replace(':', ''));
      let closingTime: number = Number(closing.replace(':', ''));

      if (openingTime > closingTime && (openingTime.toString().length == 4 && closingTime.toString().length == 4)) {
        console.log('setError');
        openingformGroup.get('tuesday').setErrors({
          notMatch: 'closing time must be later than opening time'
        })
      } else {
        return null;
      }
    }
  }

  public foundingYearValidator(formControl: FormControl){
    if(formControl.value < 1700){
      return {
        foundingYear: 'founding year to early'
      }
    }else{
      return null
    }
  }

  public atLeastTwoBeanSelected(formControl: FormControl) {
    let beans: Bean[] = formControl.value;
    if (beans.length < 2) {
      return {
        beans: 'only one bean was selected'
      }
    } else {
      return null;
    }
  }
}

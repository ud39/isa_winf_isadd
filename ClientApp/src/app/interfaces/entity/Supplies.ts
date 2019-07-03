import {Address} from "../complex/Address";
import {Poi} from "./Poi";
import {EquipmentCategory} from "./EquipmentCategory";
import {BusStation} from "./BusStation";


export interface Supplies extends Address{
  id:number;
  name:string;
  priceClass:string;
  poi:Poi[];
  equipmentCategories:EquipmentCategory[];
  busStation:BusStation[];
}


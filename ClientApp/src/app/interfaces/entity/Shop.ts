import {Address} from "../complex/Address";
import {Bean} from "./Bean";
import {Image} from "./Image";
import {CoffeeDrink} from "./CoffeeDrink";
import {BusStation} from "./BusStation";
import {EquipmentCategory} from "./EquipmentCategory";
import {Blend} from "./Blend";
import {Poi} from "./Poi";
import {OpeningTime} from "./OpeningTime";
import {Event} from "./Event";

export interface Shop {
  id:number;
  name: string;
  foundingYear: number;
  seats: number;
  website: string;
  companyName: string
  priceClass: string;
  franchise: boolean;
  wlan:boolean;
  disabledFriendly:boolean;
  fairTrade:boolean;
  childFriendly:boolean;
  workstation:boolean;
  latteArt:boolean;
  petsFriendly:boolean;
  outdoor:boolean;
  warmFood:boolean;
  coldFood:boolean;
  description: string;
  address:Address;
  averageTotalRating:number;
  beans: Bean[];
  blends: Blend[];
  events: Event[];
  images: Image[];
  coffeeDrinks: CoffeeDrink[];
  listOfPoi: Poi[];
  reachableByBus: BusStation[];
  equipmentCategories: EquipmentCategory[];
  openingTimes: OpeningTime[];
}

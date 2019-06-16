import {Address} from "../complex/Address";


export interface Shop {
  name: string;
  founding_year: number;
  seats: number;
  website: string;
  food: string;
  price_class: string;
  franchise: string;
  wlan:boolean;
  disabled_friendly:boolean;
  fair_trade:boolean;
  child_friendly:boolean;
  workstation:boolean;
  latte_art:boolean;
  pets_friendly:boolean;
  outdoor:boolean;
  description: string;
  address:Address;
}

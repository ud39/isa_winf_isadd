import {Address} from "../complex/Address";


export interface Shop {
  name: string;
  foundingYear: number;
  seats: number;
  website: string;
  food: string;
  priceClass: string;
  franchise: string;
  wlan:boolean;
  disabledFriendly:boolean;
  fairTrade:boolean;
  childFriendly:boolean;
  workstation:boolean;
  latteArt:boolean;
  petsFriendly:boolean;
  outdoor:boolean;
  description: string;
  address:Address;
}

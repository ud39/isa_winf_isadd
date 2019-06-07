import {Address} from "../complex/Address";


export interface Shop extends Address {
  name: string;
  outDoor: boolean;
  fair_trade: string;
  disabledFriendly: boolean;
  Description: string;
  Wlan: boolean;
  childFriendly: boolean;
  website:string;
  foundingYear:number;
  petsFriendly:boolean;
  latteArt:boolean;
  Seats:string;
  Workstation:boolean
  Food:string;
  priceClass: string;
}

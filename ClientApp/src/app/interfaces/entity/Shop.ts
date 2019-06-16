import {Address} from "../complex/Address";


export interface Shop extends Address {
  name: string;
  outDoor: boolean;
  fair_trade: string;
  disabledFriendly: boolean;
  Description: string;
  wlan: boolean;
  childFriendly: boolean;
  website:string;
  foundingYear:number;
  petsFriendly:boolean;
  latteArt:boolean;
  seats:string;
  workstation:boolean
  food:string;
  priceClass: number;
  country: string;
  town: string;
  postal_Code: number;
  street_Name: string;
  street_Number: number;
}

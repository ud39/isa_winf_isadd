import {Bean} from "./Bean";

export interface Blend {
  name: string;
  provenance: string;
  grind:string;
  roast:string;
  priceClass: string;
  beans: Bean[];
}

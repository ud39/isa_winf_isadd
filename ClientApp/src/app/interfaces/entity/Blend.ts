import {Bean} from "./Bean";

export interface Blend {
  name: string;
  provenance: string;
  priceClass: string;
  beans: Bean[];
}
